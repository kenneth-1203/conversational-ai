import { eq } from "drizzle-orm";
import { db } from "../supabase/db";
import { conversations } from "../supabase/schema";
import type {
  GetConversationInput,
  UpdateConversationInput,
} from "../schema/chat.schema";

export const updateConversationHandler = async ({
  input,
}: {
  input: UpdateConversationInput;
}) => {
  if (input.id) {
    await db.update(conversations).set({ ...input });
    return { data: input.id }
  } else {
    const data = await db
      .insert(conversations)
      .values({ ...input })
      .returning({ id: conversations.id });
    return { data };
  }
};

export const getConversationHandler = async ({
  input,
}: {
  input: GetConversationInput;
}) => {
  const conversation = await db.query.conversations.findFirst({
    where: eq(conversations.id, input.id),
  });
  return { data: conversation };
};

export const getConversationsHandler = async () => {
  const conversations = await db.query.conversations.findMany({ limit: 10 });
  return { data: conversations };
};
