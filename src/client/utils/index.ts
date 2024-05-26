import { type ClassValue, clsx } from "clsx";
import { v4 as uuidv4 } from "uuid";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import { TRPCClientError } from "@trpc/client";
import { AppRouter } from "@/server/routers/app.router";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isTRPCClientError(
  cause: unknown
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}

export function decodeJwt(token: string) {
  return jwtDecode(token);
}

export function generateUuid() {
  return uuidv4();
}

export function generateRandomId() {
  return Math.random().toString(36).substring(2, 8);
}
