// abneg-portal/api/loans.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
// import { db } from '../src/db/connection';
// import { users, loanRequests, members } from '../src/db/schema';
// import { eq } from 'drizzle-orm';

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

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ message: "loans API is working!" });
}
