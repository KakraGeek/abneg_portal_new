import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

// Users table (already present, but let's ensure it's up to date)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Roles table
export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., "admin", "member"
  description: text("description"),
});

// Members table
export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  roleId: integer("role_id").notNull().references(() => roles.id),
  joinedAt: timestamp("joined_at").defaultNow(),
});
