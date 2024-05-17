"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { isTRPCClientError } from "@/client/utils";
import { trpc } from "@/client/utils/trpc";
import { Input } from "../ui/input";

export const Search = trpc.withTRPC(() => {
  const [query, setQuery] = useState("");
  const search = trpc.ai.search.useMutation();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await search.mutateAsync({ tableName: "", text: query });
      console.log(response);
    } catch (error) {
      if (isTRPCClientError(error)) {
        toast("Error", {
          description: error.message,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <Input
        placeholder="Ask Conversational AI..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
});
