import { pgTable, serial, text, timestamp, integer, varchar } from "drizzle-orm/pg-core";

// Users table - linked to Auth0
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  auth0Id: varchar("auth0_id", { length: 255 }).notNull().unique(), // Auth0 user ID
  name: text("name"),
  email: text("email").notNull(),
  picture: text("picture"), // Profile picture URL
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Roles table
export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(), // e.g., "admin", "member", "super_admin"
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User roles junction table (many-to-many relationship)
export const userRoles = pgTable("user_roles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  roleId: integer("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
  assignedAt: timestamp("assigned_at").defaultNow(),
  assignedBy: integer("assigned_by").references(() => users.id), // Who assigned this role
});

// Members table (for additional member-specific data)
export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: text("status").default("active"), // e.g., "active", "inactive", "pending"
  phone: text("phone"),
  location: text("location"),
  joinedAt: timestamp("joined_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Loan Requests table
export const loanRequests = pgTable("loan_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(),
  purpose: text("purpose").notNull(),
  repaymentPeriod: text("repayment_period"),
  collateral: text("collateral"),
  contact: text("contact"),
  location: text("location"),
  bankName: text("bank_name"),
  bankBranch: text("bank_branch"),
  accountNumber: text("account_number"),
  guarantorName: text("guarantor_name"),
  guarantorContact: text("guarantor_contact"),
  guarantorRelationship: text("guarantor_relationship"),
  status: text("status").default("pending"), // e.g., 'pending', 'approved', 'rejected'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Events table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  date: timestamp("date").notNull(),
  description: text("description"),
  // Add more fields as needed (e.g., location, organizer)
});

// Registrations table (event RSVPs)
export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  // Optionally, add a unique constraint for (eventId, userId) to prevent double RSVPs
});

// Payment Receipts table
export const paymentReceipts = pgTable("payment_receipts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(),
  status: text("status").notNull(), // e.g., 'successful', 'pending', 'failed'
  date: timestamp("date").notNull(), // Payment date
  reference: text("reference"), // Flutterwave reference or transaction ID
  createdAt: timestamp("created_at").defaultNow(),
});

// News Posts table: stores each blog/news article
export const newsPosts = pgTable("news_posts", {
  id: serial("id").primaryKey(), // Unique ID for each post
  title: text("title").notNull(), // Title of the post
  content: text("content").notNull(), // Main content/body
  featuredImageUrl: text("featured_image_url"), // URL for the featured image
  createdAt: timestamp("created_at").defaultNow(), // When the post was created
});

// Tags table: stores each tag/category
export const newsTags = pgTable("news_tags", {
  id: serial("id").primaryKey(), // Unique ID for each tag
  name: text("name").notNull().unique(), // Tag name (e.g., "Events", "Training")
});

// Join table: links posts and tags (many-to-many relationship)
export const newsPostTags = pgTable("news_post_tags", {
  postId: integer("post_id").notNull().references(() => newsPosts.id, { onDelete: "cascade" }), // Post ID
  tagId: integer("tag_id").notNull().references(() => newsTags.id, { onDelete: "cascade" }), // Tag ID
});
