"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    const message = "Could not authenticated user";
    redirect(`/login?error=${message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUp(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    const message = "Passwords do not match";
    redirect(`/signup?error=${message}`);
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    const message = "Something went wrong";
    redirect(`/signup?error=${message}`);
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
