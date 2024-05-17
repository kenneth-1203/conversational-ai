import { createCallerFactory, publicProcedure, router } from "..";
import { aiRouter } from "./ai.router";
import { authRouter } from "./auth.router";

export const appRouter = router({
  ping: publicProcedure.query(() => "Hello world!"),
  auth: authRouter,
  ai: aiRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
