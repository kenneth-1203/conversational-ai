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
import { Separator } from "@/client/components/ui/separator";
import { isTRPCClientError } from "@/client/utils";
import { trpc } from "@/client/utils/trpc";

export const LoginForm = trpc.withTRPC(() => {
  const router = useRouter();
  const login = trpc.auth.signInWithPassword.useMutation();
  const oauth = trpc.auth.signInWithOAuth.useMutation();

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
        console.log(error);
        toast("Error", {
          description: error.message,
        });
      }
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    try {
      const response = await oauth.mutateAsync({ provider });
      if (response.data.url) {
        router.push(response.data.url);
      }
    } catch (error) {
      if (isTRPCClientError(error)) {
        console.log(error.message);
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
            <Input
              type="password"
              name="password"
              autoComplete="current-password"
            />
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
