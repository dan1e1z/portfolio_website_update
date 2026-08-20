// import { motion } from "framer-motion";
//
// export const sentenceVariants = {
//   hidden: {},
//   // change staggerChildren variable to speed up or slow down typing.
//   visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
// };
//
// export const letterVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
// };
//
// const TypingText = ({ text, ...rest }) => (
//   <motion.p
//     key={text}
//     variants={sentenceVariants}
//     initial="hidden"
//     animate="visible"
//     {...rest}
//   >
//     {text.split("").map((char, i) => (
//       <motion.span
//         key={`${char}-${i}`}
//         variants={letterVariants}
//         className="font-mono"
//       >
//         {char}
//       </motion.span>
//     ))}
//   </motion.p>
// );
//
// export default TypingText;

import { motion, HTMLMotionProps } from "framer-motion";

interface TypingTextProps extends HTMLMotionProps<"p"> {
  text: string;
}

// Define variants within the component to comply with fast refresh
const TypingText = ({ text, ...rest }: TypingTextProps): JSX.Element => {
  const sentenceVariants = {
    hidden: {},
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
  };

  return (
    <motion.p
      key={text}
      variants={sentenceVariants}
      initial="hidden"
      animate="visible"
      {...rest}
    >
      {text.split("").map((char: string, i: number) => (
        <motion.span
          key={`${char}-${i}`}
          variants={letterVariants}
          className="font-mono"
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default TypingText;
