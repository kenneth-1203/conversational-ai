import { db } from "../supabase/db";
import { UserInput } from "../schema/user.schema";
import { users } from "../supabase/schema";

export const createUserHandler = async ({ input }: { input: UserInput }) => {
  await db.insert(users).values({
    fullName: input.fullName,
    emailAddress: input.email,
  });
};

export const getUserProjectsHandler = async ({}) => {};
