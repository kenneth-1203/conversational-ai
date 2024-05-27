import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./users.schema";
import { topics } from "./topics.schema";
import { projects } from "./projects.schema";

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  projectId: integer("project_id")
    .references(() => projects.id, {
      onDelete: "cascade",
    })
    .notNull(),
  topicId: integer("topic_id")
    .references(() => topics.id, {
      onDelete: "cascade",
    })
    .notNull(),
  title: text("title").notNull(),
  conversationList: json("conversation_list").default([]).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").default(sql`current_timestamp`),
});

export type Conversation = typeof conversations.$inferSelect;
