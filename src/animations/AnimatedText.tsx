import React from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  isAnimated?: boolean;
  className?: string;
  text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  isAnimated = true,
  className = "",
  text = "",
}) => {
  const cubicBezier = [0.65, 0, 0.35, 1];

  return (
    <div className={`w-full h-full`}>
      <div
        className={`
          text-[#eee9cc] grid relative z-[4] mix-blend-difference
          w-full h-full
          ${className}
        `}
        style={{ perspective: "1600px" }}
      >
        {[0, 75, 150, 225].map((delay, index) => (
          <motion.svg
            key={index}
            viewBox="0 0 631 1042"
            className="block w-full h-full col-start-1 row-start-1"
            style={{
              opacity: index === 0 ? 1 : 1 - index * 0.25,
              transformStyle: "preserve-3d",
              transformOrigin: "50% 50%",
            }}
            animate={
              isAnimated
                ? {
                    rotateY: [0, 360],
                  }
                : {}
            }
            transition={{
              duration: 5,
              ease: cubicBezier,
              repeat: Infinity,
              delay: delay / 1000,
            }}
            preserveAspectRatio="xMidYMid meet"
          >
            <use href={`#letter-${text}`} />
          </motion.svg>
        ))}

        <svg width="0" height="0" className="absolute">
          <symbol id={`letter-${text}`} viewBox="0 0 631 1042" fill="none">
            <text
              x="50%"
              y="60%"
              fontSize="900"
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
              textAnchor="middle"
              alignmentBaseline="middle"
              stroke="currentColor"
              strokeWidth="16"
            >
              {text}
            </text>
          </symbol>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedText;

// TEST4
