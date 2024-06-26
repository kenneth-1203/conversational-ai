import superjson from "superjson";
import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./utils/context";
import { ZodError } from "zod";

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const router = t.router;
export const merge = t.mergeRouters;
export const createCallerFactory = t.createCallerFactory;

export const protectedProcedure = t.procedure.use(isAuthed);
export const publicProcedure = t.procedure;
