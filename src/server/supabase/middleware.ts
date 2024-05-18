import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { env } from "../../env.mjs";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const { data } = await supabase.auth.getUser();
  const isAuthenticated = !!data.user;

  if (!isAuthenticated) {
    switch (request.nextUrl.pathname) {
      case "/login":
      case "/signup":
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        break;
      default:
        if (request.nextUrl.pathname.includes("/api")) return;
        if (request.nextUrl.pathname.includes("/auth")) return;
        response = NextResponse.redirect(new URL("/login", request.url));
        break;
    }
  }

  if (isAuthenticated) {
    switch (request.nextUrl.pathname) {
      case "/login":
      case "/signup":
        response = NextResponse.redirect(new URL("/", request.url));
        break;
      default:
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        break;
    }
  }

  return response;
}
