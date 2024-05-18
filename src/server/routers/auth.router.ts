import {
  createUserSchema,
  oauthSchema,
  signInSchema,
} from "../schema/auth.schema";
import {
  loginOAuthHandler,
  loginHandler,
  signUpHandler,
  signOutHandler,
} from "../controllers/auth.controller";
import { publicProcedure, router } from "..";

export const authRouter = router({
  signInWithPassword: publicProcedure
    .input(signInSchema)
    .mutation(({ input }) => loginHandler({ input })),
  signInWithOAuth: publicProcedure
    .input(oauthSchema)
    .mutation(({ input }) => loginOAuthHandler({ input })),
  signUp: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }) => signUpHandler({ input })),
  signOut: publicProcedure.mutation(() => signOutHandler()),
});
