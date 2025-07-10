// abneg-portal/api/roles.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/db/connection';
import { roles } from '../src/db/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Get all roles
  if (req.method === 'GET') {
    try {
      const allRoles = await db.select().from(roles);
      res.status(200).json({ roles: allRoles });
    } catch (error) {
      console.error("Error fetching roles:", error);
      res.status(500).json({ error: 'Failed to fetch roles' });
    }
    return;
  }

  // Create a new role (admin only)
  if (req.method === 'POST') {
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
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
