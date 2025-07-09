// abneg-portal/api/payments.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/db/connection';
import { paymentReceipts } from '../src/db/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    // Example: const { userId, amount, method } = req.body;
    // Save payment to DB (not yet implemented)
    res.status(200).json({ message: 'Payment received (not yet implemented)' });
  } else if (req.method === 'GET') {
    try {
      const payments = await db.select().from(paymentReceipts);
      res.status(200).json({ payments });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch payments' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
