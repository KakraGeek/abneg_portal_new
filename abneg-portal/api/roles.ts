// abneg-portal/api/roles.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/db/connection';
import { roles } from '../src/db/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const allRoles = await db.select().from(roles);
      res.status(200).json({ roles: allRoles });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch roles' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
