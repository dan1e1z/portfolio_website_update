import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import useContainerDimensions from "@/hooks/useContainerDimensions";

interface AboutSectionTitleProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const AboutSectionTitle = ({ containerRef }: AboutSectionTitleProps) => {
  const dimensions = useContainerDimensions(containerRef);

  const getResponsiveConfig = (width: number) => {
    if (width < 380) {
      return {
        textSize: "text-[9rem]",
      };
    } else if (width < 454) {
      return {
        textSize: "text-[10rem]",
      };
    } else if (width < 536) {
      return {
        textSize: "text-[11.5rem]",
      };
    } else if (width < 665) {
      return {
        textSize: "text-[13rem]",
      };
    } else if (width < 862) {
      return {
        textSize: "text-[15rem]",
      };
    } else {
      return {
        textSize: "text-[20rem]",
      };
    }
  };

  const config = dimensions?.width
    ? getResponsiveConfig(dimensions.width)
    : getResponsiveConfig(1000);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    container: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });

  const yPercent = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const brightness = useTransform(
    scrollYProgress,
    [0, 1],
    ["brightness(100%)", "brightness(30%)"],
  );
  const xPercent = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <motion.div
      className="relative h-[90dvh] md:h-screen w-full overflow-hidden flex flex-col justify-end bg-[#eee9cc] "
      style={{
        y: yPercent,
        scale,
        filter: brightness,
      }}
      ref={scrollRef}
    >
      <motion.h2
        className={`absolute w-full ${config.textSize} leading-none text-center whitespace-nowrap text-[#1c1915]`}
        style={{
          x: xPercent,
        }}
      >
        About Me About Me
      </motion.h2>
    </motion.div>
  );
};

export default AboutSectionTitle;
