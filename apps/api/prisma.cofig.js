import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Point this to your schema file location
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});