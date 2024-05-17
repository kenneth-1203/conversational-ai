import {
  createEmbeddingHandler,
  searchHandler,
} from "../controllers/ai.controller";
import {
  searchInputSchema,
  createEmbeddingInputSchema,
} from "../schema/ai.schema";
import { protectedProcedure, router } from "..";

export const aiRouter = router({
  createEmbedding: protectedProcedure
    .input(createEmbeddingInputSchema)
    .mutation(({ input }) => createEmbeddingHandler({ input })),
  search: protectedProcedure
    .input(searchInputSchema)
    .mutation(({ input }) => searchHandler({ input })),
});
