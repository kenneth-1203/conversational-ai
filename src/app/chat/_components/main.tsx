"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Sidebar from "./sidebar";

type Props = {};

const Main = (props: Props) => {
  const renderConversation = useMemo(() => {
    return null;
  }, []);

  return (
    <motion.div>
      <Sidebar />
      <div className="flex flex-col relative max-h-screen w-full overflow-hidden">
        <div className="flex flex-col-reverse flex-grow">
          {renderConversation}
        </div>
      </div>
    </motion.div>
  );
};

export default Main;
