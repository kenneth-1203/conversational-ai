"use client";

import { useRouter } from "next/navigation";
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

export const LoginForm = trpc.withTRPC(() => {
  const router = useRouter();
  const login = trpc.auth.signInWithPassword.useMutation();

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await login.mutateAsync({ email, password });

    if (response.data) {
      toast("Success", {
        description: `Welcome, ${response.data.user?.email}`,
      });
    }
  };

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

export const SignUpForm = () => {
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
        <Button>Create account</Button>
      </CardFooter>
    </Card>
  );
};
