import {
  customType,
  jsonb,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const vector = customType<{
  data: number[];
  driverData: string;
  config: { size: number };
}>({
  dataType(config) {
    const dt =
      !!config && typeof config.size === "number"
        ? `vector(${config.size})`
        : "vector";
    return dt;
  },
  fromDriver(value) {
    return JSON.parse(value);
  },
  toDriver(value) {
    return JSON.stringify(value);
  },
});

export const embeddings = pgTable("embeddings", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  external_id: varchar("external_id"),
  collection: varchar("collection"),
  document: text("document"),
  metadata: jsonb("metadata").default("{}"),
  embeddings: vector("embeddings", { size: 1536 }),
});

export type Embeddings = typeof embeddings.$inferSelect;
export type NewEmbeddings = typeof embeddings.$inferInsert;
