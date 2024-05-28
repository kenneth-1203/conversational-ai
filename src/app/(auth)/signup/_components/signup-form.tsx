"use client";

import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/client/components/ui/card";
import { Label } from "@/client/components/ui/label";
import { Input } from "@/client/components/ui/input";
import { Button } from "@/client/components/ui/button";
import { trpc } from "@/client/utils/trpc";
import { isTRPCClientError } from "@/client/utils";

export const SignUpForm = trpc.withTRPC(() => {
  const signup = trpc.auth.signUp.useMutation();

  const handleSignup = async (formData: FormData) => {
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    try {
      const response = await signup.mutateAsync({
        fullName,
        email,
        password,
        confirmPassword,
      });
      if (response.data.user) {
        toast("Success", {
          description: "Your account has been created!",
        });
      }
    } catch (error) {
      if (isTRPCClientError(error)) {
        toast("Error", {
          description: error.message,
        });
      }
    }
  };

  return (
    <Card className="w-[32rem]">
      <CardHeader>
        <CardTitle className="font-semibold mb-4">Conversational AI</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="fullName">Full name</Label>
            <Input type="text" name="fullName" autoComplete="name" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input type="email" name="email" autoComplete="email" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              autoComplete="new-password"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button formAction={handleSignup}>Create account</Button>
      </CardFooter>
    </Card>
  );
});
