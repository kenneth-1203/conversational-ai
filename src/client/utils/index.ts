import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { TRPCClientError } from "@trpc/client";
import { AppRouter } from "@/server/trpc/routers/app.router";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isTRPCClientError(
  cause: unknown
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}
