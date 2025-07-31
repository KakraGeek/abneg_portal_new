// scripts/syncMembers.ts
import { db } from '../src/db/connection';
import { users, members } from '../src/db/schema';
import { eq } from 'drizzle-orm';
import 'dotenv/config';
console.log("DATABASE_URL:", process.env.DATABASE_URL);

async function syncMembers() {
  const allUsers = await db.select().from(users);
  let added = 0;
  for (const user of allUsers) {
    const existingMember = await db.select().from(members).where(eq(members.userId, user.id));
    if (existingMember.length === 0) {
      await db.insert(members).values({
        userId: user.id,
        status: "active",
        phone: "",
        location: "",
      });
      added++;
    }
  }
  console.log(`Sync complete! Added ${added} missing members.`);
  process.exit(0);
}

syncMembers().catch((err) => {
  console.error("Error syncing members:", err);
  process.exit(1);
});
