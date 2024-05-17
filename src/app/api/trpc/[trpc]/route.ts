import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/routers/app.router";
import { env } from "@/env.mjs";
import { createClient } from "@/server/supabase/server";
import { isTRPCClientError } from "@/client/utils";
import { TRPCClientError } from "@trpc/client";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async ({ req }) => {
      try {
        // Get the "cookie" header from the request
        const cookieHeader = req.headers.get("cookie") || "";
        // Parse the cookie header into an object
        const cookieList = Object.fromEntries(
          cookieHeader.split("; ").map((cookie) => {
            const [name, value] = cookie.split("=");
            return [name, decodeURIComponent(value)];
          })
        );
        // Extract the "supabase-auth-token" cookie
        const supabaseAuthToken =
          cookieList && cookieList[`sb-${env.PROJECT_ID}-auth-token.0`];
        const jwtToken = supabaseAuthToken
          .split("access_token")[1]
          .split('"')[2];

        const supabase = createClient();
        const { data } = await supabase.auth.getUser(jwtToken);

        return { user: data.user };
      } catch (error) {
        if (isTRPCClientError(error)) {
          throw new TRPCClientError(error.message);
        }
        return { user: null };
      }
    },
  });

export { handler as GET, handler as POST };
