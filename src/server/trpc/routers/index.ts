import {
  createCallerFactory,
  publicProcedure,
  merge,
  router,
} from "../utils/router";
import { authRouter } from "./auth";

const publicRouter = router({
  getHello: publicProcedure.query(() => {
    return "Hello from tRPC router!";
  }),
});

export const appRouter = merge(publicRouter, authRouter);

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
