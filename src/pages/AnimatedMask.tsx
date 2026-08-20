import { motion } from "framer-motion";

const AnimatedMask = ({ rotate = 0, id = "rect" }) => {
  // Default rotation value is 0
  return (
    <motion.svg
      width="256"
      height="256"
      viewBox="0 0 256 256"
      // style={{ rotate: rotate }} // Apply rotation to the whole SVG element
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
      className="border-2 border-[#ede9cb]"
    >
      <motion.rect
        id={id}
        x="10"
        y="10"
        width="236"
        height="30"
        fill="#ede9cb"
        initial={{ height: 30 }} // Start with a height of 30
        animate={{
          height: ["30%", "0%", "93%", "30%"],
        }}
        transition={{
          duration: 6,
          times: [0, 0.33, 0.66, 1],
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </motion.svg>
  );
};

export default AnimatedMask;
