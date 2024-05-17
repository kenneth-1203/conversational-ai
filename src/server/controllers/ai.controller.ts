import {
  VectorStoreIndex,
  OpenAIEmbedding,
  Settings,
  OpenAI,
  Document,
} from "llamaindex";
import { embeddings } from "@/server/supabase/schema/embeddings.schema";
import type { SearchInput, CreateEmbeddingInput } from "../schema/ai.schema";
import { db } from "../supabase/db";
import { env } from "../../env.mjs";
import VectorStore from "../utils/singleton";

Settings.llm = new OpenAI({ apiKey: env.OPENAI_API_KEY, model: "gpt-4o" });
Settings.embedModel = new OpenAIEmbedding({
  apiKey: env.OPENAI_API_KEY,
  model: "text-embedding-3-small",
  dimensions: 1536,
});
Settings.chunkSize = 512;
Settings.chunkOverlap = 20;

export const createEmbeddingHandler = async ({
  input,
}: {
  input: CreateEmbeddingInput;
}) => {
  try {
    const embedding = await Settings.embedModel.getTextEmbedding(input.text);
    const document = new Document({ text: input.text, embedding });
    const vectorStore = VectorStore.getInstance(input.tableName);
    await vectorStore.add([document]);

    return "Successfully indexed data";
  } catch (error) {
    throw new Error(`Unexpected error occured: ${error}`);
  }
};

export const searchHandler = async ({ input }: { input: SearchInput }) => {
  try {
    const vectorStore = VectorStore.getInstance(input.tableName);
    const index = await VectorStoreIndex.fromVectorStore(vectorStore);
    const queryEngine = index.asQueryEngine({ similarityTopK: 3 });
    const response = await queryEngine.query({ query: input.text });

    // queryEngine.responseSynthesizer.synthesize({ nodesWithScore })
    return response.response;
  } catch (error) {
    throw new Error(`Unexpected error occured: ${error}`);
  }
};
