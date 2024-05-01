import React from "react";
import type { Metadata } from "next";
import { env } from "@/env.mjs";

type Props = {};

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: `${env.NEXT_PUBLIC_APP_NAME} - Login`,
  description: "Login to your account",
};

const Page = (props: Props) => {
  return <div></div>;
};

export default Page;
