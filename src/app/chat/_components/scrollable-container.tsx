"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/client/components/ui/button";
import { appearAnimationProps } from "@/client/utils/animations";

interface Props {
  children: React.ReactNode;
}

const ScrollableContainer = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);

      return () => {
        currentRef.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop } = containerRef.current;
      if (scrollTop === 0) {
        setShowScrollButton(false);
      } else {
        setShowScrollButton(true);
      }
    }
  };

  const renderButton = useMemo(() => {
    const handleScrollToBottom = () => {
      if (containerRef.current) {
        containerRef.current.scroll({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    if (showScrollButton) {
      return (
        <motion.div
          {...appearAnimationProps}
          className="fixed z-[100] bottom-30 right-10"
        >
          <Button
            type="button"
            className="rounded-full"
            variant={"outline"}
            size={"icon"}
            onClick={handleScrollToBottom}
          >
            <ArrowDown />
          </Button>
        </motion.div>
      );
    }
    return null;
  }, [showScrollButton, containerRef]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="relative flex flex-grow h-1 pt-4 flex-col-reverse overflow-y-scroll"
    >
      {children}
      <AnimatePresence>{renderButton}</AnimatePresence>
    </div>
  );
};

export default ScrollableContainer;
