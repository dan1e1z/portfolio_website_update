// import { useState, useEffect } from "react";
// import { motion, useAnimationControls } from "framer-motion";
//
// interface FuturisticHoverProps {
//   text: string;
//   className?: string;
// }
//
// const FuturisticHover = ({ text, className = "" }: FuturisticHoverProps) => {
//   const [displayText, setDisplayText] = useState(text);
//   const controls = useAnimationControls();
//   const randomLetters = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
//
//   const scrambleText = async () => {
//     let frame = 0;
//     const interval = setInterval(() => {
//       if (frame < 10) {
//         const randomString = text
//           .split("")
//           .map((char) => {
//             // Preserve spaces to maintain word spacing
//             if (char === " ") return " ";
//             return randomLetters[
//               Math.floor(Math.random() * randomLetters.length)
//             ];
//           })
//           .join("");
//         setDisplayText(randomString);
//         frame++;
//       } else {
//         clearInterval(interval);
//         setDisplayText(text);
//       }
//     }, 50);
//   };
//
//   const handleHoverStart = () => {
//     controls.start({
//       opacity: 1,
//       transition: { duration: 0.3 },
//     });
//     scrambleText();
//   };
//
//   const handleHoverEnd = () => {
//     controls.start({
//       opacity: 0,
//       transition: { duration: 0.3 },
//     });
//     setDisplayText(text);
//   };
//
//   useEffect(() => {
//     setDisplayText(text);
//   }, [text]);
//
//   return (
//     <motion.div
//       className="relative inline-block cursor-pointer"
//       onHoverStart={handleHoverStart}
//       onHoverEnd={handleHoverEnd}
//     >
//       <div className="relative">
//         {/* Hidden reference text to maintain consistent width */}
//         <span
//           className={`invisible absolute font-neueMontreal uppercase ${className}`}
//           aria-hidden="true"
//         >
//           {text}
//         </span>
//         {/* Visible scrambled text */}
//         <span
//           className={`relative z-10 font-neueMontreal uppercase ${className}`}
//         >
//           {displayText}
//         </span>
//       </div>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={controls}
//         className="absolute inset-0 pointer-events-none"
//       />
//     </motion.div>
//   );
// };
//
// export default FuturisticHover;

// TEST1
import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

interface FuturisticHoverProps {
  text: string;
  className?: string;
}

const FuturisticHover = ({ text, className = "" }: FuturisticHoverProps) => {
  const [displayChars, setDisplayChars] = useState(text.split(""));
  const controls = useAnimationControls();
  const randomLetters = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

  const scrambleText = async () => {
    let frame = 0;
    const interval = setInterval(() => {
      if (frame < 10) {
        const randomChars = text.split("").map((char) => {
          if (char === " ") return " ";
          return randomLetters[
            Math.floor(Math.random() * randomLetters.length)
          ];
        });
        setDisplayChars(randomChars);
        frame++;
      } else {
        clearInterval(interval);
        setDisplayChars(text.split(""));
      }
    }, 50);
  };

  const handleHoverStart = () => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.3 },
    });
    scrambleText();
  };

  const handleHoverEnd = () => {
    controls.start({
      opacity: 0,
      transition: { duration: 0.3 },
    });
    setDisplayChars(text.split(""));
  };

  useEffect(() => {
    setDisplayChars(text.split(""));
  }, [text]);

  return (
    <motion.div
      className="relative inline-block cursor-pointer"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <div className="relative flex">
        {/* Container for each character */}
        {text.split("").map((char, index) => (
          <div key={index} className="relative">
            {/* Hidden original character to maintain width */}
            <span
              className={`invisible absolute ${className}`}
              aria-hidden="true"
            >
              {char}
            </span>
            {/* Visible scrambled character */}
            <span className={`relative z-10 ${className}`}>
              {displayChars[index]}
            </span>
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="absolute inset-0 pointer-events-none"
      />
    </motion.div>
  );
};

export default FuturisticHover;
