// abneg-portal/api/payments.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/db/connection';
import { paymentReceipts } from '../src/db/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      // This endpoint handles both /api/payments and /api/receipts
      const receipts = await db.select().from(paymentReceipts);
      res.status(200).json({ receipts });
    } catch (error) {
      console.error("Error fetching receipts:", error);
      res.status(500).json({ error: 'Failed to fetch receipts' });
    }
  } else if (req.method === 'POST') {
    // Future: Handle payment processing
    res.status(200).json({ message: 'Payment processing not yet implemented' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
