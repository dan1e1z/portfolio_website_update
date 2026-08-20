import { motion } from "framer-motion";

const RectangleAnimation = ({ rotate = 0, width = 0, height = 0 }) => {
  console.log("width rectangle:", width);
  console.log("height rectangle:", height);

  // Adjust the container dimensions by subtracting padding and gaps

  // Calculate the size of each square by dividing the available space by 2
  // const squareWidth = availableWidth / 2;
  // const squareHeight = availableHeight / 2;

  return (
    <motion.div
      className="border-2 border-[#ede9cb] p-2"
      style={{
        rotate: rotate,
        width: `${256}px`,
        height: `${256}px`,
      }} // Dynamically set width and height
    >
      <motion.div
        className="relative w-full bg-[#ede9cb]"
        initial={{ height: "30%", bottom: "0%" }} // Adjust the initial bottom margin
        animate={{
          height: ["30%", "0%", "100%", "30%"],
          bottom: ["0%", "0%", "0%", "0%"], // Ensure the bottom margin stays at 2px throughout
        }}
        transition={{
          duration: 6,
          times: [0, 0.33, 0.66, 1],
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
};

export default RectangleAnimation;

// import { motion } from "framer-motion";
//
// const RectangleAnimation = ({ rotate = 0, id = "rect" }) => {
//   // Default rotation value is 0
//   return (
//     <motion.svg
//       width="256"
//       height="256"
//       viewBox="0 0 256 256"
//       // style={{ rotate: rotate }} // Apply rotation to the whole SVG element
//       style={{
//         transform: `rotate(${rotate}deg)`,
//       }}
//       className="border-2 border-[#ede9cb]"
//     >
//       <motion.rect
//         id={id}
//         x="10"
//         y="10"
//         width="236"
//         height="30"
//         fill="#ede9cb"
//         initial={{ height: 30 }} // Start with a height of 30
//         animate={{
//           height: ["30%", "0%", "93%", "30%"],
//         }}
//         transition={{
//           duration: 6,
//           times: [0, 0.33, 0.66, 1],
//           ease: "easeInOut",
//           repeat: Infinity,
//         }}
//       />
//     </motion.svg>
//   );
// };
//
// export default RectangleAnimation;
