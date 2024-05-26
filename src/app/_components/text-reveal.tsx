"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STAGGER = 0.02;
const DELAY = 0;

const TextReveal = ({
  text,
  delay = DELAY,
  stagger = STAGGER,
}: {
  text: string;
  delay?: number;
  stagger?: number;
}) => {
  const countRef = useRef(0);

  return (
    <AnimatePresence mode="popLayout">
      {text.split(" ").map((word, wordIndex) => {
        if (wordIndex === 0) {
          countRef.current = 0;
        }

        return (
          <motion.div
            key={word}
            className="whitespace-nowrap"
            style={{ perspective: "1000px" }}
          >
            {word.split("").map((letter, letterIndex) => {
              const content = (
                <motion.span
                  initial={{
                    opacity: 0,
                    rotateX: -90,
                    y: -40,
                  }}
                  animate={{
                    opacity: 1,
                    rotateX: 0,
                    y: 0,
                  }}
                  transition={{
                    delay: delay + countRef.current * stagger,
                    damping: 40,
                    stiffness: 400,
                    type: "spring",
                    duration: 0.5,
                  }}
                  className="inline-block origin-bottom"
                  key={letterIndex}
                >
                  {letter}
                </motion.span>
              );

              countRef.current++;
              return content;
            })}
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export default TextReveal;
