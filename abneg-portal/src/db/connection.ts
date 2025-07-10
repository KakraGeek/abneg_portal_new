import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Create a PostgreSQL connection pool using the DATABASE_URL environment variable
// For Vercel serverless functions, we need to handle connection pooling differently
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Add connection pool settings for serverless
  max: 1, // Limit connections for serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Export the Drizzle ORM database instance
export const db = drizzle(pool); 