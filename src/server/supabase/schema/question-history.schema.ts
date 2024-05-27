import { integer, json, pgTable, serial, text } from "drizzle-orm/pg-core";

import { topics } from "./topics.schema";

export const questionHistory = pgTable("question_history", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id")
    .references(() => topics.id, {
      onDelete: "cascade",
    })
    .notNull(),
  question: text("question").default("").notNull(),
  answer: text("answer").default("").notNull(),
  frequency: integer("frequency").default(0),
  conversationList: json("conversation_list").default([]).notNull(),
});

export type QuestionHistory = typeof questionHistory.$inferSelect;
