import { env } from "@/env.mjs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(env.DATABASE_URL, { prepare: false });
export const db = drizzle(client, { schema });
