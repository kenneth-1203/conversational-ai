import { createRouter } from "./create-router";
import { authRouter } from "./routers";

export const appRouter = createRouter({
  auth: authRouter,
});

export type AppRouter = typeof appRouter;