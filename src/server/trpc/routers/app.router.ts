import { createCallerFactory, publicProcedure, router } from "..";
import { authRouter } from "./auth.router";

export const appRouter = router({
  ping: publicProcedure.query(() => "Hello world!"),
  auth: authRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
