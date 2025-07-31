import 'dotenv/config';
import { db } from "./connection";
import { paymentReceipts } from "./schema";

async function seedReceipts() {
  // Use userId: 5 for all sample receipts
  await db.insert(paymentReceipts).values([
    {
      userId: 5,
      amount: 5000,
      status: "successful",
      date: new Date("2024-06-01T10:00:00Z"),
      reference: "FLW1234567890",
    },
    {
      userId: 5,
      amount: 2000,
      status: "pending",
      date: new Date("2024-06-10T15:30:00Z"),
      reference: "FLW0987654321",
    },
    {
      userId: 5,
      amount: 3500,
      status: "failed",
      date: new Date("2024-06-15T09:45:00Z"),
      reference: "FLW1122334455",
    },
  ]);
  console.log("Seeded payment_receipts table with sample data for userId 5.");
  process.exit(0);
}

seedReceipts().catch((err) => {
  console.error("Error seeding receipts:", err);
  process.exit(1);
}); 