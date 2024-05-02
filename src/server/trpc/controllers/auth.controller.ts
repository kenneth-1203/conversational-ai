import { db } from "../../supabase/db";
import { users } from "../../supabase/schema";
import { createClient } from "../../supabase/server";
import { CreateUserInput, SignInInput } from "../schema/auth.schema";

export const loginHandler = async ({ input }: { input: SignInInput }) => {
  const supabase = createClient();
  const response = await supabase.auth.signInWithPassword(input);

  return {
    data: response.data,
    error: response.error,
  };
};

export const signUpHandler = async ({ input }: { input: CreateUserInput }) => {
  const supabase = createClient();
  const response = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
  });

  // create user row in db
  await db.insert(users).values({
    fullName: input.fullName,
    emailAddress: input.email,
  });

  return {
    data: response.data,
    error: response.error,
  };
};
