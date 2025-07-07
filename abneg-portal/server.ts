import express from "express";
import cors from "cors";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq, and } from "drizzle-orm";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import schema
import { users, roles, userRoles, members } from "./src/db/schema";

// Database connection
if (!process.env['DATABASE_URL']) {
  console.error("❌ DATABASE_URL environment variable is not set!");
  console.log("Please set your Neon PostgreSQL connection string:");
  console.log("Example: postgresql://username:password@host:port/database");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env['DATABASE_URL'],
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    console.log("Please check your DATABASE_URL and try again.");
  } else {
    console.log("✅ Database connected successfully!");
    release();
  }
});

const db = drizzle(pool);

const app = express();
const PORT = 5000; // Use a different port than Vite

app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/api/hello", (req: any, res: any) => {
  res.json({ message: "Hello from Express API!" });
});

// Get all roles
app.get("/api/roles", async (req: any, res: any) => {
  try {
    const allRoles = await db.select().from(roles);
    res.json({ roles: allRoles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
});

// Create a new role (admin only)
app.post("/api/roles", async (req: any, res: any) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Role name is required" });
    }

    const newRole = await db.insert(roles).values({
      name,
      description,
    }).returning();

    res.status(201).json({ role: newRole[0] });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ error: "Failed to create role" });
  }
});

// Register a new user with default role
app.post("/api/users/register", async (req: any, res: any) => {
  try {
    const { auth0Id, name, email, picture } = req.body;
    
    if (!auth0Id || !email) {
      return res.status(400).json({ error: "Auth0 ID and email are required" });
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
    
    if (existingUser.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Create new user
    const newUser = await db.insert(users).values({
      auth0Id,
      name,
      email,
      picture,
    }).returning();

    // Get default "member" role
    const memberRole = await db.select().from(roles).where(eq(roles.name, "member"));
    
    if (memberRole.length === 0) {
      // Create default roles if they don't exist
      await db.insert(roles).values([
        { name: "member", description: "Regular member" },
        { name: "admin", description: "Administrator" },
        { name: "super_admin", description: "Super Administrator" },
      ]);
    }

    // Assign default member role
    const defaultRole = await db.select().from(roles).where(eq(roles.name, "member"));
    
    await db.insert(userRoles).values({
      userId: newUser[0].id,
      roleId: defaultRole[0].id,
    });

    // Create member record with logging
    console.log("Attempting to insert into members table for userId:", newUser[0].id);
    const insertedMembers = await db.insert(members).values({
      userId: newUser[0].id,
      status: "active",
      location: "", // Provide default value for NOT NULL constraint
      phone: "",    // Provide default value for NOT NULL constraint
    }).returning();
    console.log("Inserted member record:", insertedMembers);

    res.status(201).json({ 
      user: newUser[0],
      member: insertedMembers[0],
      message: "User registered successfully with member role" 
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Get user with roles
app.get("/api/users/:auth0Id", async (req: any, res: any) => {
  try {
    const { auth0Id } = req.params;
    
    const user = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
    
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get user roles
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

    res.json({ user: userWithRoles });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Assign role to user (admin only)
app.post("/api/users/:auth0Id/roles", async (req: any, res: any) => {
  try {
    const { auth0Id } = req.params;
    const { roleName, assignedBy } = req.body;
    
    if (!roleName) {
      return res.status(400).json({ error: "Role name is required" });
    }

    // Get user
    const user = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get role
    const role = await db.select().from(roles).where(eq(roles.name, roleName));
    if (role.length === 0) {
      return res.status(404).json({ error: "Role not found" });
    }

    // Check if user already has this role
    const existingRole = await db
      .select()
      .from(userRoles)
      .where(and(eq(userRoles.userId, user[0].id), eq(userRoles.roleId, role[0].id)));

    if (existingRole.length > 0) {
      return res.status(409).json({ error: "User already has this role" });
    }

    // Assign role
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
    console.error("Error assigning role:", error);
    res.status(500).json({ error: "Failed to assign role" });
  }
});

// Remove role from user (admin only)
app.delete("/api/users/:auth0Id/roles/:roleName", async (req: any, res: any) => {
  try {
    const { auth0Id, roleName } = req.params;

    // Get user
    const user = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get role
    const role = await db.select().from(roles).where(eq(roles.name, roleName));
    if (role.length === 0) {
      return res.status(404).json({ error: "Role not found" });
    }

    // Remove role
    await db
      .delete(userRoles)
      .where(and(eq(userRoles.userId, user[0].id), eq(userRoles.roleId, role[0].id)));

    res.json({ message: `Role '${roleName}' removed successfully` });
  } catch (error) {
    console.error("Error removing role:", error);
    res.status(500).json({ error: "Failed to remove role" });
  }
});

// --- Super Admin Middleware ---
function requireSuperAdmin(req: any, res: any, next: any) {
  // Assume Auth0 user info is in req.auth and roles in req.auth["https://abneg-portal/roles"]
  const user = req.auth;
  const roles = user && (user["https://abneg-portal/roles"] || []);
  if (!roles.includes("super_admin")) {
    return res.status(403).json({ error: "Access denied: Super Admins only" });
  }
  next();
}

// Get all users with their roles (Super Admin only)
app.get("/api/users", requireSuperAdmin, async (req: any, res: any) => {
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
    res.json({ users: usersWithRoles });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// PATCH /api/users/:id/role - Update a user's role (Super Admin only)
app.patch("/api/users/:id/role", requireSuperAdmin, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { newRole } = req.body;
    if (!newRole) {
      return res.status(400).json({ error: "New role is required" });
    }
    // Get the role ID
    const role = await db.select().from(roles).where(eq(roles.name, newRole));
    if (role.length === 0) {
      return res.status(404).json({ error: "Role not found" });
    }
    // Remove all current roles for the user
    await db.delete(userRoles).where(eq(userRoles.userId, id));
    // Assign the new role
    await db.insert(userRoles).values({ userId: id, roleId: role[0].id });
    res.json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Failed to update user role" });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
