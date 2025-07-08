import express from "express";
import cors from "cors";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq, and, inArray } from "drizzle-orm";
import dotenv from "dotenv";
dotenv.config();
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import { db } from "./src/db/connection"; // Your Drizzle DB connection
import { events, registrations } from "./src/db/schema";

// Import schema
import { users, roles, userRoles, members, loanRequests } from "./src/db/schema";
import { paymentReceipts } from "./src/db/schema";
import { newsPosts, newsTags, newsPostTags } from "./src/db/schema";

import type { Request, Response } from "express";

// Database connection
if (!process.env['DATABASE_URL']) {
  console.error("❌ DATABASE_URL environment variable is not set!");
  console.log("Please set your Neon PostgreSQL connection string:");
  console.log("Example: postgresql://username:password@host:port/database");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env['DATABASE_URL'],
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    console.log("Please check your DATABASE_URL and try again.");
  } else {
    console.log("✅ Database connected successfully!");
    release();
  }
});

const app = express();
const PORT = 5000; // Use a different port than Vite

app.use(cors());
app.use(express.json());

const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-5po0pxymvmjcxwug.us.auth0.com/.well-known/jwks.json`
  }),
  audience: "https://dev-5po0pxymvmjcxwug.us.auth0.com/api/v2/",
  issuer: `https://dev-5po0pxymvmjcxwug.us.auth0.com/`,
  algorithms: ["RS256"]
});

// Public: Get all events
app.get("/api/events", async (req, res) => {
  try {
    const allEvents = await db.select().from(events);
    res.json(allEvents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Public: Get paginated news posts with tags and featured image, with optional tag filtering
app.get("/api/news", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const offset = (page - 1) * limit;
    const tagFilter = req.query.tag as string | undefined;

    let posts;

    if (tagFilter) {
      // Find the tag ID for the given tag name
      const tag = await db.select().from(newsTags).where(eq(newsTags.name, tagFilter));
      if (tag.length === 0) {
        res.json([]); // No posts if tag doesn't exist
        return;
      }
      const tagId = tag[0].id;

      // Find post IDs with this tag
      const postTagLinks = await db.select().from(newsPostTags).where(eq(newsPostTags.tagId, tagId));
      const postIds = postTagLinks.map((link) => link.postId);

      if (postIds.length === 0) {
        res.json([]); // No posts with this tag
        return;
      }

      // Fetch posts with these IDs, with pagination
      posts = await db
        .select()
        .from(newsPosts)
        .where(inArray(newsPosts.id, postIds))
        .limit(limit)
        .offset(offset);
    } else {
      // No tag filter: fetch all posts
      posts = await db
        .select()
        .from(newsPosts)
        .limit(limit)
        .offset(offset);
    }

    // For each post, fetch its tags
    const postsWithTags = await Promise.all(
      posts.map(async (post) => {
        const tagLinks = await db
          .select()
          .from(newsPostTags)
          .where(eq(newsPostTags.postId, post.id));
        const tagIds = tagLinks.map((link) => link.tagId);
        const tags = tagIds.length
          ? await db.select().from(newsTags).where(inArray(newsTags.id, tagIds))
          : [];
        return {
          ...post,
          tags: tags.map((t) => t.name),
        };
      })
    );

    res.json(postsWithTags);
  } catch (error) {
    console.error("Error fetching news posts:", error);
    res.status(500).json({ error: "Failed to fetch news posts" });
  }
});

// Public: Get all news tags for filtering
app.get("/api/news-tags", async (req: Request, res: Response) => {
  try {
    const tags = await db.select().from(newsTags);
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});

// Apply this middleware to all /api routes (except /api/events)
app.use("/api", checkJwt);

// Test endpoint
app.get("/api/hello", (req: any, res: any) => {
  res.json({ message: "Hello from Express API!" });
});

// Get all roles
app.get("/api/roles", async (req: any, res: any) => {
  try {
    const allRoles = await db.select().from(roles);
    res.json({ roles: allRoles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
});

// Create a new role (admin only)
app.post("/api/roles", async (req: any, res: any) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Role name is required" });
    }

    const newRole = await db.insert(roles).values({
      name,
      description,
    }).returning();

    res.status(201).json({ role: newRole[0] });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ error: "Failed to create role" });
  }
});

// Register a new user with default role
app.post("/api/users/register", async (req: any, res: any) => {
  try {
    const { auth0Id, name, email, picture } = req.body;
    
    if (!auth0Id || !email) {
      return res.status(400).json({ error: "Auth0 ID and email are required" });
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
    
    if (existingUser.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Create new user
    const newUser = await db.insert(users).values({
      auth0Id,
      name,
      email,
      picture,
    }).returning();

    // Get default "member" role
    const memberRole = await db.select().from(roles).where(eq(roles.name, "member"));
    
    if (memberRole.length === 0) {
      // Create default roles if they don't exist
      await db.insert(roles).values([
        { name: "member", description: "Regular member" },
        { name: "admin", description: "Administrator" },
        { name: "super_admin", description: "Super Administrator" },
      ]);
    }

    // Assign default member role
    const defaultRole = await db.select().from(roles).where(eq(roles.name, "member"));
    
    await db.insert(userRoles).values({
      userId: newUser[0].id,
      roleId: defaultRole[0].id,
    });

    // Check if member record already exists for this user
    const existingMember = await db.select().from(members).where(eq(members.userId, newUser[0].id));
    if (existingMember.length === 0) {
      // Create member record
      await db.insert(members).values({
        userId: newUser[0].id,
        status: "active",
        phone: "",
        location: "",
      });
    }

    res.status(201).json({ 
      user: newUser[0],
      member: existingMember[0], // Use existingMember[0] to get the record
      message: "User registered successfully with member role" 
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Get user with roles
app.get("/api/users/:auth0Id", async (req: any, res: any) => {
  try {
    const { auth0Id } = req.params;
    
    const user = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
    
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get user roles
    const userRoleData = await db
      .select({
        roleId: userRoles.roleId,
        roleName: roles.name,
        roleDescription: roles.description,
        assignedAt: userRoles.assignedAt,
      })
      .from(userRoles)
      .innerJoin(roles, eq(userRoles.roleId, roles.id))
      .where(eq(userRoles.userId, user[0].id));

    const userWithRoles = {
      ...user[0],
      roles: userRoleData,
    };

    res.json({ user: userWithRoles });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Assign role to user (admin only)
app.post("/api/users/:auth0Id/roles", async (req: any, res: any) => {
  try {
    const { auth0Id } = req.params;
    const { roleName, assignedBy } = req.body;
    
    if (!roleName) {
      return res.status(400).json({ error: "Role name is required" });
    }

    // Get user
    const user = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get role
    const role = await db.select().from(roles).where(eq(roles.name, roleName));
    if (role.length === 0) {
      return res.status(404).json({ error: "Role not found" });
    }

    // Check if user already has this role
    const existingRole = await db
      .select()
      .from(userRoles)
      .where(and(eq(userRoles.userId, user[0].id), eq(userRoles.roleId, role[0].id)));

    if (existingRole.length > 0) {
      return res.status(409).json({ error: "User already has this role" });
    }

    // Assign role
    const newUserRole = await db.insert(userRoles).values({
      userId: user[0].id,
      roleId: role[0].id,
      assignedBy: assignedBy || null,
    }).returning();

    res.status(201).json({ 
      userRole: newUserRole[0],
      message: `Role '${roleName}' assigned successfully` 
    });
  } catch (error) {
    console.error("Error assigning role:", error);
    res.status(500).json({ error: "Failed to assign role" });
  }
});

// Remove role from user (admin only)
app.delete("/api/users/:auth0Id/roles/:roleName", async (req: any, res: any) => {
  try {
    const { auth0Id, roleName } = req.params;

    // Get user
    const user = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get role
    const role = await db.select().from(roles).where(eq(roles.name, roleName));
    if (role.length === 0) {
      return res.status(404).json({ error: "Role not found" });
    }

    // Remove role
    await db
      .delete(userRoles)
      .where(and(eq(userRoles.userId, user[0].id), eq(userRoles.roleId, role[0].id)));

    res.json({ message: `Role '${roleName}' removed successfully` });
  } catch (error) {
    console.error("Error removing role:", error);
    res.status(500).json({ error: "Failed to remove role" });
  }
});

// --- Super Admin Middleware ---
function requireSuperAdmin(req: any, res: any, next: any) {
  // Assume Auth0 user info is in req.auth and roles in req.auth["https://abneg-portal/roles"]
  const user = req.auth;
  const roles = user && (user["https://abneg-portal/roles"] || []);
  if (!roles.includes("super_admin")) {
    return res.status(403).json({ error: "Access denied: Super Admins only" });
  }
  next();
}

// Get all users with their roles (Super Admin only)
app.get("/api/users", requireSuperAdmin, async (req: any, res: any) => {
  try {
    const allUsers = await db.select().from(users);
    const usersWithRoles = await Promise.all(
      allUsers.map(async (user: any) => {
        const userRoleData = await db
          .select({
            roleId: userRoles.roleId,
            roleName: roles.name,
            roleDescription: roles.description,
            assignedAt: userRoles.assignedAt,
          })
          .from(userRoles)
          .innerJoin(roles, eq(userRoles.roleId, roles.id))
          .where(eq(userRoles.userId, user.id));
        return {
          ...user,
          roles: userRoleData,
        };
      })
    );
    res.json({ users: usersWithRoles });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// PATCH /api/users/:id/role - Update a user's role (Super Admin only)
app.patch("/api/users/:id/role", requireSuperAdmin, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { newRole } = req.body;
    if (!newRole) {
      return res.status(400).json({ error: "New role is required" });
    }
    // Get the role ID
    const role = await db.select().from(roles).where(eq(roles.name, newRole));
    if (role.length === 0) {
      return res.status(404).json({ error: "Role not found" });
    }
    // Remove all current roles for the user
    await db.delete(userRoles).where(eq(userRoles.userId, id));
    // Assign the new role
    await db.insert(userRoles).values({ userId: id, roleId: role[0].id });
    res.json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Failed to update user role" });
  }
});

// Create a new loan request
app.post("/api/loans", async (req: any, res: any) => {
  try {
    const user = req.auth;
    if (!user || !user.sub) {
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
    const dbUser = await db.select().from(users).where(eq(users.auth0Id, user.sub));
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
});

// Get current member info (for dashboard)
app.get("/api/members/me", async (req: any, res: any) => {
  try {
    // Extract Auth0 user info from request (assume middleware sets req.auth)
    const user = req.auth;
    if (!user || !user.sub) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Find user in DB
    const dbUser = await db.select().from(users).where(eq(users.auth0Id, user.sub));
    if (dbUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    // Find member info
    const member = await db.select().from(members).where(eq(members.userId, dbUser[0].id));
    if (member.length === 0) {
      return res.status(404).json({ error: "Member record not found" });
    }
    // Placeholder for subscriptions (empty array for now)
    const subscriptions = [];
    res.json({
      name: dbUser[0].name,
      email: dbUser[0].email,
      status: member[0].status,
      joinedAt: member[0].joinedAt,
      subscriptions,
    });
  } catch (error) {
    console.error("Error fetching member dashboard info:", error);
    res.status(500).json({ error: "Failed to fetch member info" });
  }
});

// Update current member profile info
app.patch("/api/members/me", async (req: any, res: any) => {
  try {
    const user = req.auth;
    if (!user || !user.sub) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { name, phone, location } = req.body;
    // Find user in DB
    const dbUser = await db.select().from(users).where(eq(users.auth0Id, user.sub));
    if (dbUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    // Update name in users table if provided
    if (name !== undefined) {
      await db.update(users).set({ name }).where(eq(users.id, dbUser[0].id));
    }
    // Update phone/location in members table if provided
    const member = await db.select().from(members).where(eq(members.userId, dbUser[0].id));
    if (member.length === 0) {
      return res.status(404).json({ error: "Member record not found" });
    }
    const updateFields: any = {};
    if (phone !== undefined) updateFields.phone = phone;
    if (location !== undefined) updateFields.location = location;
    if (Object.keys(updateFields).length > 0) {
      await db.update(members).set(updateFields).where(eq(members.userId, dbUser[0].id));
    }
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating member profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// --- Admin Middleware (admin or super_admin) ---
function requireAdmin(req: any, res: any, next: any) {
  const user = req.auth;
  const roles = user && (user["https://abneg-portal/roles"] || []);
  if (!roles.includes("admin") && !roles.includes("super_admin")) {
    return res.status(403).json({ error: "Access denied: Admins only" });
  }
  next();
}

// Get all loan applications (admin only, pending first)
app.get("/api/loans", requireAdmin, async (req: any, res: any) => {
  try {
    // Join with users to get applicant info if needed
    // Use correct Drizzle orderBy syntax: orderBy(loanRequests.status, loanRequests.createdAt)
    const allLoans = await db.select().from(loanRequests).orderBy(loanRequests.status, loanRequests.createdAt);
    res.json({ loans: allLoans });
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).json({ error: "Failed to fetch loans" });
  }
});

// Update loan application status (admin only)
app.patch("/api/loans/:id", requireAdmin, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }
    // Optionally add adminNote column to schema if you want to store notes
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
});

// Get all loan applications for the current member
app.get("/api/my-loans", async (req: any, res: any) => {
  try {
    const user = req.auth;
    if (!user || !user.sub) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Find user in DB
    const dbUser = await db.select().from(users).where(eq(users.auth0Id, user.sub));
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
});

app.post("/api/registrations", async (req: any, res: any) => {
  // Get Auth0 user id from the authenticated session
  const auth0Id = req.auth?.sub; // Auth0 user id (e.g., 'auth0|abc123')
  const { eventId } = req.body;

  // Input validation
  if (!eventId) {
    return res.status(400).json({ error: "Missing eventId" });
  }
  if (!auth0Id) {
    return res.status(401).json({ error: "Unauthorized: No Auth0 user id found" });
  }

  try {
    // Look up the user in the users table by Auth0 id
    const userRecord = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
    if (userRecord.length === 0) {
      return res.status(404).json({ error: "User not found in database" });
    }
    const userId = userRecord[0].id;

    // Optional: Prevent duplicate RSVPs
    const existing = await db
      .select()
      .from(registrations)
      .where(and(eq(registrations.eventId, eventId), eq(registrations.userId, userId)));

    if (existing.length > 0) {
      return res.status(409).json({ error: "Already registered for this event" });
    }

    // Insert new registration
    await db.insert(registrations).values({ eventId, userId });
    res.status(201).json({ message: "RSVP successful" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register RSVP" });
  }
});

// Get payment receipts for the logged-in user
app.get("/api/receipts", async (req: any, res: any) => {
  try {
    // Auth0 user ID is in req.auth.sub
    const auth0Id = req.auth?.sub;
    if (!auth0Id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Find the user's numeric ID
    const userRows = await db.select().from(users).where(eq(users.auth0Id, auth0Id));
    if (userRows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const userId = userRows[0].id;
    // Fetch receipts for this user
    const receipts = await db.select().from(paymentReceipts).where(eq(paymentReceipts.userId, userId));
    res.json({ receipts });
  } catch (error) {
    console.error("Error fetching receipts:", error);
    res.status(500).json({ error: "Failed to fetch receipts" });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
