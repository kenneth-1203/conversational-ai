import { protectedProcedure, router } from "..";
import {
  getConversationHandler,
  getConversationsHandler,
  updateConversationHandler,
} from "../controllers/chat.controller";
import {
  getConversationSchema,
  updateConversationSchema,
} from "../schema/chat.schema";

export const chatRouter = router({
  updateConversation: protectedProcedure
    .input(updateConversationSchema)
    .mutation(({ input }) => updateConversationHandler({ input })),
  getConversation: protectedProcedure
    .input(getConversationSchema)
    .query(({ input }) => getConversationHandler({ input })),
  getConversations: protectedProcedure.query(() => getConversationsHandler()),
});
