"use client";

import { AnimationProps, motion } from "framer-motion";

const AnimatedGaps = () => {
  const animateProps: AnimationProps = {
    initial: {
      height: 0,
    },
    animate: {
      height: 100,
    },
    transition: {
      duration: 1,
      delay: 0.2,
      damping: 100,
      stiffness: 0,
      type: "tween",
    },
  };
  return (
    <>
      <motion.div
        {...animateProps}
        className="absolute top-0 bg-background flex justify-center items-center w-full border-foreground/50"
      />
      <motion.div
        {...animateProps}
        className="absolute bottom-0 bg-background flex justify-center items-center w-full border-foreground/50"
      />
    </>
  );
};

export default AnimatedGaps;
