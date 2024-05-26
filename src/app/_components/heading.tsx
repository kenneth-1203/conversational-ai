"use client";

import { motion } from "framer-motion";
import TextReveal from "@/app/_components/text-reveal";

const Heading = () => {
  return (
    <>
      <h3 className="flex gap-2 text-center text-3xl font-thin text-foreground">
        <TextReveal text="Revolutionize search with" />
      </h3>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex gap-4 text-7xl font-bold text-foreground mb-8"
      >
        Spark
        <span className="bg-gradient-to-tr to-blue-300 from-30% from-violet-300 bg-clip-text text-transparent animate-move-bg">
          AI
        </span>
      </motion.h1>
    </>
  );
};

export default Heading;
