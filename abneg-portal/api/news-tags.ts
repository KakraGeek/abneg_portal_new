// abneg-portal/api/news-tags.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/db/connection';
import { newsTags } from '../src/db/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const tags = await db.select().from(newsTags);
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tags' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 