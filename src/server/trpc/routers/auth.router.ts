import {
  createUserSchema,
  oauthSchema,
  signInSchema,
} from "../schema/auth.schema";
import {
  loginGoogleHandler,
  loginHandler,
  signUpHandler,
} from "../controllers/auth.controller";
import { publicProcedure, router } from "..";

export const authRouter = router({
  signInWithPassword: publicProcedure
    .input(signInSchema)
    .mutation(({ input }) => loginHandler({ input })),
  signInWithGoogle: publicProcedure
    .input(oauthSchema)
    .mutation(({ input }) => loginGoogleHandler({ input })),
  signUp: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }) => signUpHandler({ input })),
});
