"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./sidebar";
import UserConversation from "./user-conversation";

interface Props {
  userDetails: any;
  userProjects: any[];
  conversationsHistory: any[];
  selectedConversation: any | null;
}

const Main = ({
  userDetails,
  userProjects,
  conversationsHistory,
  selectedConversation,
}: Props) => {
  const [isAsking, setIsAsking] = useState(false);
  const [conversation, setConversation] = useState<any | null>(
    selectedConversation ? { ...selectedConversation, type: "old" } : null
  );

  const renderConversation = useMemo(() => {
    return (
      <UserConversation
        isAsking={isAsking}
        conversation={conversation}
        userDetails={userDetails}
      />
    );
  }, [conversation, isAsking, userDetails]);

  return (
    <motion.div>
      <Sidebar />
      <div className="flex flex-col relative max-h-screen w-full overflow-hidden">
        <div className="flex flex-col-reverse flex-grow">
          {/* {renderConversation} */}
        </div>
      </div>
    </motion.div>
  );
};

export default Main;
