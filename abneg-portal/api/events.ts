import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/db/connection';
import { events } from '../src/db/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const allEvents = await db.select().from(events);
      res.status(200).json(allEvents);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
