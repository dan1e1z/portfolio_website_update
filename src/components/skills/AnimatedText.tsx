import React from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  reverse?: boolean;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  reverse = false,
  delay = 0,
}) => {
  const characters = text.split("");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const characterVariants = {
    hidden: {
      y: reverse ? "-100%" : "100%",
      opacity: 1,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: {
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 0.5,
        },
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={characterVariants}
          style={{
            display: "inline-block",
            transformOrigin: "center bottom",
          }}
          className={`inline-block ${char === " " ? "mr-2" : ""}`}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
