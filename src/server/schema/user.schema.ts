import { TypeOf, date, literal, number, object, string, union } from "zod";

export const userSchema = object({
  fullName: string({ required_error: "Full name is required" }),
  email: string({ required_error: "Email is required" }).email(
    "Invalid email address"
  ),
  role: union([literal("user"), literal("admin")]).default("user"),
  createdAt: date().optional(),
  updatedAt: date().optional(),
});

export type UserInput = TypeOf<typeof userSchema>;
