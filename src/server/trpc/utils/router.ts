import superjson from "superjson";
import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const router = t.router;

export const merge = t.mergeRouters;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(isAuthed);

export const createCallerFactory = t.createCallerFactory;
