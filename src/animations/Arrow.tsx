import { motion } from "framer-motion";

const Arrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 94.6 40.79"
      fill="#eee9cc"
    >
      {/* First Group Animation */}
      <motion.g
        className="first-group"
        initial={{ x: -120 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <polygon points="74.2 0 69.61 4.6 82.15 17.14 0 17.14 0 23.64 82.15 23.64 69.61 36.19 74.2 40.79 94.6 20.39 74.2 0"></polygon>
      </motion.g>

      {/* Second Group Animation */}
      <motion.g
        className="second-group"
        initial={{ x: 0 }}
        animate={{ x: 120 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <polygon points="74.2 0 69.61 4.6 82.15 17.14 0 17.14 0 23.64 82.15 23.64 69.61 36.19 74.2 40.79 94.6 20.39 74.2 0"></polygon>
      </motion.g>
    </svg>
  );
};

export default Arrow;
