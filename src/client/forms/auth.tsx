"use client";

import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
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
import { login, signUp } from "@/server/actions/auth";

export const LoginForm = () => {
  const router = useRouter();
  const { pending } = useFormStatus();
  return (
    <Card className="w-[32rem]">
      <CardHeader>
        <CardTitle className="font-semibold mb-4">Conversational AI</CardTitle>
        <CardDescription>Login to explore Conversational AI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input type="email" name="email" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => router.push("/signup")}
          type="button"
          variant="outline"
          disabled={pending}
        >
          Sign up
        </Button>
        <Button formAction={login} disabled={pending}>
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export const SignUpForm = () => {
  const { pending } = useFormStatus();
  return (
    <Card className="w-[32rem]">
      <CardHeader>
        <CardTitle className="font-semibold mb-4">Conversational AI</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input type="email" name="email" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input type="password" name="confirmPassword" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button formAction={signUp} disabled={pending}>
          Create account
        </Button>
      </CardFooter>
    </Card>
  );
};
