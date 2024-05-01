import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "../../env.mjs";

import * as schema from "./schema";

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(env.DATABASE_URL, { prepare: false });
export const db = drizzle(client, { schema });
