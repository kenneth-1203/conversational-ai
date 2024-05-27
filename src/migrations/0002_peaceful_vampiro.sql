CREATE TABLE IF NOT EXISTS "question_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"topic_id" integer NOT NULL,
	"question" text DEFAULT '' NOT NULL,
	"answer" text DEFAULT '' NOT NULL,
	"frequency" integer DEFAULT 0,
	"conversation_list" json DEFAULT '[]'::json NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_history" ADD CONSTRAINT "question_history_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
