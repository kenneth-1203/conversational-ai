// src/singleton/pgVectorStore.ts
import { PGVectorStore } from "llamaindex/storage/vectorStore/PGVectorStore";
import { env } from "@/env.mjs";

class VectorStore {
  private static instance: PGVectorStore;
  private static tableName: string;

  private constructor() {}

  public static getInstance(tableName: string): PGVectorStore {
    if (!VectorStore.instance) {
      VectorStore.instance = new PGVectorStore({
        connectionString: env.DATABASE_URL,
        dimensions: 1536,
        schemaName: "embeddings",
        tableName,
      });
      VectorStore.tableName = tableName;
    } else if (VectorStore.tableName !== tableName) {
      throw new Error(
        `PGVectorStore instance already exists with tableName: ${tableName}`
      );
    }
    return VectorStore.instance;
  }
}

export default VectorStore;
