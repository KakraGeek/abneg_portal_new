// abneg-portal/api/registrations.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/db/connection';
import { users, registrations } from '../src/db/schema';
import { eq, and } from 'drizzle-orm';

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
  // Register for an event
  if (req.method === 'POST') {
    try {
      const auth0Id = getUserIdFromAuthHeader(req);
      const { eventId } = req.body;

      // Input validation
      if (!eventId) {
        return res.status(400).json({ error: "Missing eventId" });
      }
      if (!auth0Id) {
        return res.status(401).json({ error: "Unauthorized: No Auth0 user id found" });
      }

      // Find user in DB
      const dbUser = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
      if (dbUser.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if already registered
      const existingRegistration = await db
        .select()
        .from(registrations)
        .where(and(eq(registrations.userId, dbUser[0].id), eq(registrations.eventId, eventId)));

      if (existingRegistration.length > 0) {
        return res.status(409).json({ error: "Already registered for this event" });
      }

      // Create registration
      const newRegistration = await db.insert(registrations).values({
        userId: dbUser[0].id,
        eventId: eventId,
      }).returning();

      res.status(201).json({ registration: newRegistration[0] });
    } catch (error) {
      console.error("Error creating registration:", error);
      res.status(500).json({ error: "Failed to create registration" });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
} 