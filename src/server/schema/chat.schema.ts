import z, { TypeOf, array, date, number, object, string } from "zod";

export const messageSchema = object({
  id: string(),
  question: string(),
  answer: string(),
  questionHistoryId: number(),
  createdAt: date(),
});

export const updateConversationSchema = object({
  id: number().optional(),
  userId: number({ required_error: "User ID is required" }),
  topicId: number({ required_error: "Topic ID is required" }),
  projectId: number({ required_error: "Project ID is required" }),
  title: string({ required_error: "Title is required" }),
  conversationList: array(messageSchema),
  updatedAt: date(),
});

export const getConversationSchema = object({
  id: number({ required_error: "ID is required" }),
});

export type UpdateConversationInput = TypeOf<typeof updateConversationSchema>;
export type GetConversationInput = TypeOf<typeof getConversationSchema>;