import { createRouter, publicProcedure } from "../create-router";

export const authRouter = createRouter({
  getUser: publicProcedure.query(() => ""),
});
