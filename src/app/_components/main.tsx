"use client";

import { motion } from "framer-motion";
import { useRouteTransition } from "@/client/hooks/use-route-transition";
import { ROUTES } from "@/client/types/enums";

import Heading from "./heading";
import AnimatedButton from "./animated-button";
import AnimatedGaps from "./animated-gaps";

const Main = () => {
  const { animateProps, handleRouteChange } = useRouteTransition();
  return (
    <>
      <AnimatedGaps />
      <motion.div
        {...animateProps}
        className="flex flex-col justify-center items-center h-full"
      >
        <Heading />
        <AnimatedButton onClick={() => handleRouteChange(ROUTES.chat)}>
          Start a chat
        </AnimatedButton>
      </motion.div>
    </>
  );
};

export default Main;
