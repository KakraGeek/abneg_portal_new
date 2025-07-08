import dotenv from "dotenv";
dotenv.config();
import { db } from "./connection";
import { events } from "./schema";

// Define your sample events
const sampleEvents = [
  {
    name: "Agritech Innovations Forum 2025",
    date: new Date("2025-08-12T10:00:00Z"),
    description: "Harnessing AI and IoT for Sustainable Agribusiness in Africa. Speakers: Dr. Kwame Bediako, Lillian Okonjo. Virtual (Zoom)."
  },
  {
    name: "Women in Agribusiness Leadership Summit",
    date: new Date("2025-09-19T09:00:00Z"),
    description: "Empowering women across the agribusiness value chain. Accra International Conference Centre, Ghana."
  },
  {
    name: "Monthly ABNEG Webinar – Agribusiness Finance & Grants",
    date: new Date("2025-07-30T16:00:00Z"),
    description: "Finance and grants for agribusiness. Host: ABNEG Financial Literacy Team. Speaker: Emmanuel Addo."
  },
  {
    name: "ABNEG Nigeria Chapter – Regional Networking Meetup",
    date: new Date("2025-08-03T09:00:00Z"),
    description: "Lagos Business School, Nigeria. Introductions, Member Spotlights, Market Linkage Strategies."
  },
  {
    name: "North America Members’ Mixer",
    date: new Date("2025-09-07T09:00:00Z"),
    description: "Online (Google Meet). Diaspora agribusiness investors, processors, and tech partners."
  }
];

async function seed() {
  try {
    await db.insert(events).values(sampleEvents);
    console.log("Sample events seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding events:", error);
    process.exit(1);
  }
}

seed(); 