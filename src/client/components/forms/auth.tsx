"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaGithub, FaGoogle } from "react-icons/fa";
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
import { Separator } from "../ui/separator";

export const LoginForm = trpc.withTRPC(() => {
  const router = useRouter();
  const login = trpc.auth.signInWithPassword.useMutation();
  const googleLogin = trpc.auth.signInWithGoogle.useMutation();

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await login.mutateAsync({ email, password });
      if (response.data.user) {
        toast("Success", {
          description: `Welcome, ${response.data.user.email}!`,
        });
      }
      router.push("/");
    } catch (error) {
      if (isTRPCClientError(error)) {
        console.log(error)
        toast("Error", {
          description: error.message,
        });
      }
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    try {
      const response = await googleLogin.mutateAsync({ provider });
      if (response.data.url) {
        router.push(response.data.url);
      }
    } catch (error) {
      if (isTRPCClientError(error)) {
        console.log(error.message)
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
        <CardDescription>Login to explore Conversational AI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <Button
            className="w-full"
            variant={"outline"}
            formAction={() => handleOAuthLogin("google")}
          >
            <FaGoogle />
          </Button>
          <Button
            className="w-full"
            variant={"outline"}
            formAction={() => handleOAuthLogin("github")}
          >
            <FaGithub />
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input type="email" name="email" autoComplete="email" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" autoComplete="current-password" />
          </div>
          {login.error && <p>Something went wrong! {login.error.message}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => router.push("/signup")}
          type="button"
          variant="outline"
        >
          Sign up
        </Button>
        <Button formAction={handleLogin}>Login</Button>
      </CardFooter>
    </Card>
  );
});

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
            <Input type="password" name="password" autoComplete="new-password" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input type="password" name="confirmPassword" autoComplete="new-password" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button formAction={handleSignup}>Create account</Button>
      </CardFooter>
    </Card>
  );
});
