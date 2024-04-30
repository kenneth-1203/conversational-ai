import { env } from "@/env.mjs";
import type { Config } from "drizzle-kit";

export default {
  driver: "pg",
  out: "./drizzle",
  schema: "./src/db/index.ts",
  dbCredentials: { connectionString: env.DATABASE_URL },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
} satisfies Config;
