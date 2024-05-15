import z, { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  fullName: string({ required_error: "Full name is required" }),
  email: string({ required_error: "Email is required" }).email(
    "Invalid email address"
  ),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be 8 characters or more")
    .max(32, "Password must be 32 characters or less"),
  confirmPassword: string({ required_error: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export const signInSchema = object({
  email: string({ required_error: "Email is required" }).email(
    "Invalid email address"
  ),
  password: string({ required_error: "Password is required" }).min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const oauthSchema = object({
  provider: z.enum(["google", "github"]),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type SignInInput = TypeOf<typeof signInSchema>;
export type OAuthInput = TypeOf<typeof oauthSchema>;
