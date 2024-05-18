"use client";

import { useRouter } from "next/navigation";
import { trpc } from "../utils/trpc";
import { Button } from "./ui/button";

const LogoutButtonComponent = () => {
  const router = useRouter();
  const logout = trpc.auth.signOut.useMutation();

  const handleLogout = async () => {
    await logout.mutateAsync();
    router.replace("/login");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default trpc.withTRPC(LogoutButtonComponent);
