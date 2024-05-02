import React from "react";
import type { Metadata } from "next";
import { env } from "@/env.mjs";
import { LoginForm } from "@/client/forms/auth";

type Props = {};

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: `${env.NEXT_PUBLIC_APP_NAME} - Login`,
  description: "Login to your account",
};

const Page = async (props: Props) => {
  return (
    <form>
      <div className="flex flex-col h-screen w-full justify-center items-center">
        <LoginForm />
      </div>
    </form>
  );
};

export default Page;
