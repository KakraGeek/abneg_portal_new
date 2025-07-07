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
