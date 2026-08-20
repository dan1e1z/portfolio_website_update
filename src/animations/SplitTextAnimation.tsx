import React from "react";
import { motion } from "framer-motion";

// Define the props type for the SplitTextAnimation component
type SplitTextAnimationProps = {
  text: string; // The text to animate
  direction: "up" | "down"; // The animation direction
  className?: string; // Tailwind CSS classes for styling
  overallDelay?: number; // Additional delay for this entire animation
  scalingFactor?: number; // Scaling factor to adjust the effect
};

const SplitTextAnimation: React.FC<SplitTextAnimationProps> = ({
  text,
  direction,
  className = "",
  overallDelay = 0, // Default overall delay is 0
  scalingFactor = 1, // Default scaling factor
}): JSX.Element => {
  // Split the text into characters and determine the center index
  const chars = text.split("");
  const center = Math.floor(chars.length / 2);

  return (
    <div className={`relative m-0 p-0 ${className}`}>
      {chars.map((char, index) => {
        // Scale distance from center to normalize across text lengths
        const normalizedDistance = Math.abs(center - index) / chars.length;
        const adjustedDistance = normalizedDistance * scalingFactor;
        const delay = overallDelay + adjustedDistance * 0.5; // Adjust the delay with scaling factor

        return (
          <div
            key={index}
            className="inline-block relative overflow-hidden"
            style={{ height: "1em", lineHeight: "1em", margin: "0" }} // Reduce margin for tighter vertical spacing
          >
            <motion.div
              className="inline-block"
              initial={{
                y: direction === "up" ? 100 : -100, // Initial position based on direction
              }}
              animate={{
                y: 0, // Final position
              }}
              transition={{
                type: "tween", // Use tween for smooth and customizable easing
                duration: 1.2, // Duration of the animation
                ease: [0.25, 0.8, 0.25, 1], // Custom easing for a gradual finish
                delay: delay, // Apply calculated delay
              }}
            >
              {char}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default SplitTextAnimation;
