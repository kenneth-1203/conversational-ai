import { createUserSchema, signInSchema } from "../schema/auth.schema";
import { loginHandler, signUpHandler } from "../controllers/auth.controller";
import { publicProcedure, router } from "..";

export const authRouter = router({
  signInWithPassword: publicProcedure
    .input(signInSchema)
    .mutation(({ input }) => loginHandler({ input })),
  signUp: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }) => signUpHandler({ input })),
});
