import { createCallerFactory, publicProcedure, router } from "..";
import { aiRouter } from "./ai.router";
import { authRouter } from "./auth.router";
import { userRouter } from "./user.router";

export const appRouter = router({
  ping: publicProcedure.query(() => "Hello world!"),
  auth: authRouter,
  ai: aiRouter,
  user: userRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
