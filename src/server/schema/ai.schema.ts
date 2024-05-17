import { number, object, string, TypeOf } from "zod";

export const createEmbeddingInputSchema = object({
  tableName: string({ required_error: "Table name is required" }),
  text: string({ required_error: "Text is required" }),
});

export const searchInputSchema = object({
  tableName: string({ required_error: "Table name is required" }),
  text: string({ required_error: "Text is required" }),
});

export type CreateEmbeddingInput = TypeOf<typeof createEmbeddingInputSchema>;
export type SearchInput = TypeOf<typeof searchInputSchema>;
