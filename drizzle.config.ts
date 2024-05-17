import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  out: "./src/migrations",
  schema: "./src/server/supabase/schema",
  dbCredentials: { url: process.env.DATABASE_URL! },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
} satisfies Config;
