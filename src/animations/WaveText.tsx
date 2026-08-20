// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
//
// const SplitTextAnimation = ({ text }) => {
//   const [chars, setChars] = useState([]);
//
//   // Split the text into characters
//   useEffect(() => {
//     setChars(text.split(""));
//   }, [text]);
//
//   // Function to calculate stagger order starting from the center
//   const getStaggerOrder = (length) => {
//     const center = Math.floor(length / 2);
//     return Array.from({ length }, (_, i) => {
//       if (i === center) return i;
//       return i < center ? center - (i + 1) : center + (i - center);
//     });
//   };
//
//   const staggerOrder = getStaggerOrder(chars.length);
//
//   // Define animation variants
//   const container = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.05,
//       },
//     },
//   };
//
//   const charVariants = {
//     hidden: { y: "100%", opacity: 0 },
//     visible: { y: "0%", opacity: 1 },
//   };
//
//   return (
//     <motion.div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexWrap: "wrap",
//       }}
//       variants={container}
//       initial="hidden"
//       animate="visible"
//     >
//       {chars.map((char, index) => (
//         <motion.span
//           key={index}
//           variants={charVariants}
//           custom={staggerOrder[index]} // Custom stagger order for center-out
//           style={{
//             display: "inline-block",
//             margin: "0 2px",
//             fontSize: "2rem",
//             overflow: "hidden",
//           }}
//         >
//           {char === " " ? "\u00A0" : char}
//         </motion.span>
//       ))}
//     </motion.div>
//   );
// };
//
// export default SplitTextAnimation;
//
// // <SplitTextAnimation text="Animate Me!" />;

import React, { useEffect, useState } from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";

interface SplitTextAnimationProps
  extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "variants"> {
  text: string;
}

const SplitTextAnimation: React.FC<SplitTextAnimationProps> = ({
  text,
  ...props
}) => {
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    setChars(text.split(""));
  }, [text]);

  // Function to calculate stagger order starting from the center
  const getStaggerOrder = (length: number): number[] => {
    const center = Math.floor(length / 2);
    return Array.from({ length }, (_, i) => {
      if (i === center) return i;
      return i < center ? center - (i + 1) : center + (i - center);
    });
  };

  const staggerOrder = getStaggerOrder(chars.length);

  // Define animation variants
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
  };

  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
      variants={container}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {chars.map((char: string, index: number) => (
        <motion.span
          key={index}
          variants={charVariants}
          custom={staggerOrder[index]}
          style={{
            display: "inline-block",
            margin: "0 2px",
            fontSize: "2rem",
            overflow: "hidden",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default SplitTextAnimation;
