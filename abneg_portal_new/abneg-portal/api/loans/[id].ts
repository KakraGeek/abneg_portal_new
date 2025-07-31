import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../../src/db/connection';
import { loanRequests } from '../../src/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  if (req.method !== 'PATCH') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { status } = req.body;
    if (!status) {
      res.status(400).json({ error: 'Status is required' });
      return;
    }
    const updated = await db
      .update(loanRequests)
      .set({ status })
      .where(eq(loanRequests.id, Number(id)))
      .returning();
    if (updated.length === 0) {
      res.status(404).json({ error: 'Loan not found' });
      return;
    }
    res.status(200).json({ loan: updated[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update loan status' });
  }
}
