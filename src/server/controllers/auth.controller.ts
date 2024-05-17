import { env } from "@/env.mjs";
import { db } from "../supabase/db";
import { users } from "../supabase/schema";
import { createClient } from "../supabase/server";
import {
  CreateUserInput,
  OAuthInput,
  SignInInput,
} from "../schema/auth.schema";

export const loginHandler = async ({ input }: { input: SignInInput }) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword(input);

  return { data, error };
};

export const loginGoogleHandler = async ({ input }: { input: OAuthInput }) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: input.provider,
    options: {
      redirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  return { data, error };
};

export const signUpHandler = async ({ input }: { input: CreateUserInput }) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
  });

  // create user row in db
  await db.insert(users).values({
    fullName: input.fullName,
    emailAddress: input.email,
  });

  return { data, error };
};
