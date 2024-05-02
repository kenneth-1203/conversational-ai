import superjson from "superjson";
import { createTRPCNext } from "@trpc/next";
import { getFetch, httpBatchLink } from "@trpc/client";
import { env } from "../../env.mjs";
import type { AppRouter } from "../../server/trpc/routers/app.router";

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    if (typeof window !== "undefined") {
      // Client requests
      return {
        transformer: superjson,
        links: [
          httpBatchLink({
            url: "/api/trpc",
          }),
        ],
      };
    }

    // Server requests
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      },
      headers() {
        if (ctx?.req?.headers) {
          return {
            ...ctx.req.headers,
          };
        }
        return {};
      },
      links: [
        httpBatchLink({
          url: `${env.NEXT_PUBLIC_APP_URL}/api/trpc`,
          fetch: async (url, options?) => {
            const fetch = getFetch();
            return fetch(url, {
              ...options,
              credentials: "include",
            });
          },
        }),
      ],
      transformer: superjson,
    };
  },
  ssr: false,
});
