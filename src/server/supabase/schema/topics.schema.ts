import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { projects } from "./projects.schema";

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .references(() => projects.id, {
      onDelete: "cascade",
    })
    .notNull(),
  topicName: varchar("topic_name", { length: 256 }).default("").notNull(),
  collectionName: uuid("collection_name").defaultRandom().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").default(sql`current_timestamp`),
});

export type Topic = typeof topics.$inferSelect;
