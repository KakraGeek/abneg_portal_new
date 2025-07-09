// abneg-portal/api/contact.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
// import your db and schema here (if you want to save messages)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    // Example: const { name, email, message } = req.body;
    // Save to DB or send email as needed
    res.status(200).json({ message: 'Contact form received (not yet implemented)' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
