// abneg-portal/api/members.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/db/connection';
import { users, members } from '../src/db/schema';
import { eq } from 'drizzle-orm';

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
  const { action } = req.query;

  // Get current member info (for dashboard)
  if (req.method === 'GET' && action === 'me') {
    try {
      const auth0Id = getUserIdFromAuthHeader(req);
      if (!auth0Id) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      // Find user in DB
      const dbUser = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
      if (dbUser.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Find member info
      const member = await db.select().from(members).where(eq(members.userId, dbUser[0].id));
      if (member.length === 0) {
        return res.status(404).json({ error: "Member record not found" });
      }
      
      // Placeholder for subscriptions (empty array for now)
      const subscriptions = [];
      res.json({
        name: dbUser[0].name,
        email: dbUser[0].email,
        status: member[0].status,
        joinedAt: member[0].joinedAt,
        subscriptions,
      });
    } catch (error) {
      console.error("Error fetching member dashboard info:", error);
      res.status(500).json({ error: "Failed to fetch member info" });
    }
    return;
  }

  // Update current member profile info
  if (req.method === 'PATCH' && action === 'me') {
    try {
      const auth0Id = getUserIdFromAuthHeader(req);
      if (!auth0Id) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const { name, phone, location } = req.body;
      
      // Find user in DB
      const dbUser = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
      if (dbUser.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Update name in users table if provided
      if (name !== undefined) {
        await db.update(users).set({ name }).where(eq(users.id, dbUser[0].id));
      }
      
      // Update phone/location in members table if provided
      const member = await db.select().from(members).where(eq(members.userId, dbUser[0].id));
      if (member.length === 0) {
        return res.status(404).json({ error: "Member record not found" });
      }
      
      const updateFields: any = {};
      if (phone !== undefined) updateFields.phone = phone;
      if (location !== undefined) updateFields.location = location;
      
      if (Object.keys(updateFields).length > 0) {
        await db.update(members).set(updateFields).where(eq(members.userId, dbUser[0].id));
      }
      
      res.json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Error updating member profile:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
    return;
  }

  res.status(404).json({ error: 'Not found' });
} 