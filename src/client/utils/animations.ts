export const fadeAnimationProps = {
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
  variants: {
    visible: { opacity: 1, height: "auto" },
    hidden: { opacity: 0, height: 0 },
  },
};

export const appearAnimationProps = {
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
  variants: {
    visible: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: -10,
    },
  },
};
