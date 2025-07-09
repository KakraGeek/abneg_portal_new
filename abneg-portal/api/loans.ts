// abneg-portal/api/loans.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/db/connection';
import { users, loanRequests, members } from '../src/db/schema';
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

  // 1. Get all loans
  if (req.method === 'GET' && !action) {
    try {
      const loans = await db.select().from(loanRequests);
      res.status(200).json({ loans });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch loans' });
    }
    return;
  }

  // 2. Get loans for current user
  if (req.method === 'GET' && action === 'my-loans') {
    const auth0Id = getUserIdFromAuthHeader(req);
    if (!auth0Id) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    try {
      const user = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
      if (!user.length) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      const userId = user[0].id;
      const loans = await db.select().from(loanRequests).where(eq(loanRequests.userId, userId));
      res.status(200).json({ loans });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch loans' });
    }
    return;
  }

  // 3. Get member info for current user
  if (req.method === 'GET' && action === 'member') {
    const auth0Id = getUserIdFromAuthHeader(req);
    if (!auth0Id) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    try {
      const user = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
      if (!user.length) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      const userId = user[0].id;
      const member = await db.select().from(members).where(eq(members.userId, userId));
      if (!member.length) {
        res.status(404).json({ error: 'Member not found' });
        return;
      }
      res.status(200).json(member[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch member info' });
    }
    return;
  }

  // 4. Update member info for current user
  if (req.method === 'PATCH' && action === 'member') {
    const auth0Id = getUserIdFromAuthHeader(req);
    if (!auth0Id) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const { phone, location, status } = req.body; // Only update fields that exist in members
    try {
      const user = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
      if (!user.length) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      const userId = user[0].id;
      const updated = await db.update(members)
        .set({ phone, location, status })
        .where(eq(members.userId, userId))
        .returning();
      if (!updated.length) {
        res.status(404).json({ error: 'Member not found' });
        return;
      }
      res.status(200).json(updated[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update member info' });
    }
    return;
  }

  res.status(404).json({ error: 'Not found' });
}
