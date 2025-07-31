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

// Helper to check if user has admin role
function hasAdminRole(req: VercelRequest): boolean {
  const authHeader = req.headers.authorization || (req.headers as any).Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.split(' ')[1];
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const roles = payload["https://abneg-portal/roles"] || [];
    return roles.includes("admin") || roles.includes("super_admin");
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { action, id } = req.query;

  // Create a new loan request
  if (req.method === 'POST' && !action) {
    try {
      const auth0Id = getUserIdFromAuthHeader(req);
      if (!auth0Id) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const {
        amount,
        purpose,
        repaymentPeriod,
        collateral,
        contact,
        location,
        bankName,
        bankBranch,
        accountNumber,
        guarantorName,
        guarantorContact,
        guarantorRelationship
      } = req.body;
      
      if (!amount || !purpose) {
        return res.status(400).json({ error: "Amount and purpose are required" });
      }
      
      // Find user in DB
      const dbUser = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
      if (dbUser.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Insert loan request
      const newLoan = await db.insert(loanRequests).values({
        userId: dbUser[0].id,
        amount,
        purpose,
        repaymentPeriod,
        collateral,
        contact,
        location,
        bankName,
        bankBranch,
        accountNumber,
        guarantorName,
        guarantorContact,
        guarantorRelationship,
        status: "pending",
      }).returning();
      
      res.status(201).json({ loan: newLoan[0] });
    } catch (error) {
      console.error("Error creating loan request:", error);
      res.status(500).json({ error: "Failed to create loan request" });
    }
    return;
  }

  // Get all loan applications (admin only)
  if (req.method === 'GET' && !action) {
    try {
      if (!hasAdminRole(req)) {
        return res.status(403).json({ error: "Access denied: Admins only" });
      }
      
      const allLoans = await db.select().from(loanRequests).orderBy(loanRequests.status, loanRequests.createdAt);
      res.json({ loans: allLoans });
    } catch (error) {
      console.error("Error fetching loans:", error);
      // Return more detailed error information for debugging
      res.status(500).json({ 
        error: "Failed to fetch loans", 
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
    }
    return;
  }

  // Get all loan applications for the current member
  if (req.method === 'GET' && action === 'my-loans') {
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
      
      // Get all loan requests for this user
      const myLoans = await db.select().from(loanRequests).where(eq(loanRequests.userId, dbUser[0].id)).orderBy(loanRequests.createdAt);
      res.json({ loans: myLoans });
    } catch (error) {
      console.error("Error fetching member loans:", error);
      res.status(500).json({ error: "Failed to fetch member loans" });
    }
    return;
  }

  // Update loan application status (admin only)
  if (req.method === 'PATCH' && id) {
    try {
      if (!hasAdminRole(req)) {
        return res.status(403).json({ error: "Access denied: Admins only" });
      }
      
      const { status, adminNote } = req.body;
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }
      
      const updateFields: any = { status };
      if (adminNote !== undefined) updateFields.adminNote = adminNote;
      
      const updated = await db.update(loanRequests).set(updateFields).where(eq(loanRequests.id, Number(id))).returning();
      if (updated.length === 0) {
        return res.status(404).json({ error: "Loan application not found" });
      }
      
      res.json({ loan: updated[0] });
    } catch (error) {
      console.error("Error updating loan status:", error);
      res.status(500).json({ error: "Failed to update loan status" });
    }
    return;
  }

  res.status(404).json({ error: 'Not found' });
}
