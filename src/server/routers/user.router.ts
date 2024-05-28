import { protectedProcedure, publicProcedure, router } from "..";
import { userSchema } from "../schema/user.schema";
import {
  createUserHandler,
  getUserProjectsHandler,
} from "../controllers/user.controller";

export const userRouter = router({
  createUser: publicProcedure
    .input(userSchema)
    .mutation(({ input }) => createUserHandler({ input })),
  getUserProjects: protectedProcedure.query(({ ctx }) =>
    // TODO: complete handler for get user projects using
    // ctx.user to get user email, and get user row from db
    // fianlly use user.id for the handler to query the data
    getUserProjectsHandler({})
  ),
});
