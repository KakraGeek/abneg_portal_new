// abneg-portal/api/users.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/db/connection';
import { users, roles, userRoles } from '../src/db/schema';
import { eq, and } from 'drizzle-orm';

// Helper to extract Auth0 user ID from the Authorization header
function getUserIdFromAuthHeader(req: VercelRequest): string | null {
  const authHeader = req.headers.authorization || (req.headers as any).Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return payload.sub || null;
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { action, userId, roleName } = req.query;

  // 1. Register a new user
  if (req.method === 'POST' && action === 'register') {
    const { auth0Id, name, email } = req.body;
    if (!auth0Id || !name || !email) {
      res.status(400).json({ error: 'auth0Id, name, and email are required' });
      return;
    }
    try {
      const existing = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
      if (existing.length > 0) {
        res.status(409).json({ error: 'User already exists' });
        return;
      }
      const newUser = await db.insert(users).values({ auth0Id, name, email }).returning();
      res.status(201).json({ user: newUser[0] });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
    return;
  }

  // 2. Get current user info (from token)
  if (req.method === 'GET' && action === 'me') {
    const auth0Id = getUserIdFromAuthHeader(req);
    if (!auth0Id) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    try {
      const user = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
      if (user.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Ensure a members record exists for this user
      const existingMember = await db.select().from(members).where(eq(members.userId, user[0].id));
      if (existingMember.length === 0) {
        await db.insert(members).values({
          userId: user[0].id,
          status: "active",
          phone: "",
          location: "",
        });
      }

      // Get roles for this user
      const userRoleData = await db
        .select({
          roleId: userRoles.roleId,
          roleName: roles.name,
          roleDescription: roles.description,
          assignedAt: userRoles.assignedAt,
        })
        .from(userRoles)
        .innerJoin(roles, eq(userRoles.roleId, roles.id))
        .where(eq(userRoles.userId, user[0].id));
      const userWithRoles = {
        ...user[0],
        roles: userRoleData,
      };
      res.status(200).json({ user: userWithRoles });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
    return;
  }

  // 3. Get roles for a user
  if (req.method === 'GET' && action === 'roles' && userId) {
    try {
      const user = await db.select().from(users).where(eq(users.auth0Id, userId as string));
      if (user.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      const userRoleData = await db
        .select({
          roleId: userRoles.roleId,
          roleName: roles.name,
          roleDescription: roles.description,
          assignedAt: userRoles.assignedAt,
        })
        .from(userRoles)
        .innerJoin(roles, eq(userRoles.roleId, roles.id))
        .where(eq(userRoles.userId, user[0].id));
      res.status(200).json({ roles: userRoleData });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user roles' });
    }
    return;
  }

  // 4. Update roles for a user (assign role)
  if (req.method === 'PATCH' && action === 'roles' && userId && roleName) {
    // For PATCH, let's assume you want to assign a new role
    const { assignedBy } = req.body;
    try {
      const user = await db.select().from(users).where(eq(users.auth0Id, userId as string));
      if (user.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      const role = await db.select().from(roles).where(eq(roles.name, roleName as string));
      if (role.length === 0) {
        res.status(404).json({ error: 'Role not found' });
        return;
      }
      const existingRole = await db
        .select()
        .from(userRoles)
        .where(and(eq(userRoles.userId, user[0].id), eq(userRoles.roleId, role[0].id)));
      if (existingRole.length > 0) {
        res.status(409).json({ error: 'User already has this role' });
        return;
      }
      const newUserRole = await db.insert(userRoles).values({
        userId: user[0].id,
        roleId: role[0].id,
        assignedBy: assignedBy || null,
      }).returning();
      res.status(201).json({
        userRole: newUserRole[0],
        message: `Role '${roleName}' assigned successfully`
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to assign role' });
    }
    return;
  }

  // Handler for GET /api/users (no action param) to return all users and their roles
  if (req.method === 'GET' && !action) {
    try {
      const allUsers = await db.select().from(users);
      const usersWithRoles = await Promise.all(
        allUsers.map(async (user: any) => {
          const userRoleData = await db
            .select({
              roleId: userRoles.roleId,
              roleName: roles.name,
              roleDescription: roles.description,
              assignedAt: userRoles.assignedAt,
            })
            .from(userRoles)
            .innerJoin(roles, eq(userRoles.roleId, roles.id))
            .where(eq(userRoles.userId, user.id));
          return {
            ...user,
            roles: userRoleData,
          };
        })
      );
      res.status(200).json({ users: usersWithRoles });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
    return;
  }

  res.status(404).json({ error: 'Not found' });
} 