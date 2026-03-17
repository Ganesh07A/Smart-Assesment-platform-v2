import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
dotenv.config();
// Initialize the Postgres adapter
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// Pass the adapter to PrismaClient
export const prisma = new PrismaClient({ adapter });