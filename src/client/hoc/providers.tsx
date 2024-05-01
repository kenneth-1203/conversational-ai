"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/server/trpc";
import { env } from "@/env.mjs";

const getBaseUrl = () => {
  if (env.NEXT_PUBLIC_SERVER_URL) {
    return env.NEXT_PUBLIC_SERVER_URL;
  }
  return "http://localhost:3000";
};

const Providers = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getBaseUrl(),
        }),
      ],
    })
  );
};

export default Providers;
