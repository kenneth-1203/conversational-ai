import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/trpc/routers/app.router";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({ session: null }),
    onError: ({ error }) => {
      console.error(error)
    }
  });

export { handler as GET, handler as POST };
