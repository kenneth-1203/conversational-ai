import type { Metadata } from "next";
import React from "react";
import { env } from "@/env.mjs";
import { SignUpForm } from "./_components/signup-form";

type Props = {};

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: `${env.NEXT_PUBLIC_APP_NAME} - Login`,
  description: "Login to your account",
};

const Page = (props: Props) => {
  return (
    <form>
      <div className="flex flex-col h-screen w-full justify-center items-center">
        <SignUpForm />
      </div>
    </form>
  );
};

export default Page;
