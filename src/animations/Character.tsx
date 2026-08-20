import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";
import useContainerDimensions from "@/hooks/useContainerDimensions";

interface ParagraphProps {
  paragraph: string;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function Paragraph({ paragraph, containerRef }: ParagraphProps) {
  const scrollRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    container: containerRef,
    // offset: ["start 0.9", "start 0.25"],
    offset: ["start end", "end center"],
    layoutEffect: false,
  });

  const words = paragraph.split(" ");
  const dimensions = useContainerDimensions(containerRef);

  const getResponsiveConfig = (width: number) => {
    if (width < 380) {
      return {
        textSize: "text-xl",
      };
    } else if (width < 470) {
      return {
        textSize: "text-2xl",
      };
    } else if (width < 550) {
      return {
        textSize: "text-3xl",
      };
    } else if (width < 830) {
      return {
        textSize: "text-4xl",
      };
    } else if (width < 1173) {
      return {
        textSize: "text-5xl",
      };
    } else {
      return {
        textSize: "text-6xl",
      };
    }
  };

  const config = dimensions?.width
    ? getResponsiveConfig(dimensions.width)
    : getResponsiveConfig(1000);

  return (
    <motion.p
      ref={scrollRef}
      className={` relative flex ${config.textSize} leader-1 text-[#EEE9CC] flex-wrap justify-center p-4`}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </motion.p>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;

  const springConfig = { stiffness: 1000, damping: 100 };
  const opacity = useSpring(
    useTransform(progress, range, [0, 1]),
    springConfig,
  );
  const skewX = useSpring(
    useTransform(progress, range, [-20, 0]),
    springConfig,
  );
  const blur = useSpring(useTransform(progress, range, [8, 0]), springConfig);

  return (
    <motion.span
      className="relative mr-[12px] mt-[12px] inline-block"
      style={{
        opacity,
        skewX,
        filter: useTransform(blur, (value) => `blur(${value}px)`),
      }}
    >
      {children.split("").map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </motion.span>
  );
};

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char = ({ children, progress, range }: CharProps) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="inline-block will-change-[filter,transform]">
      <span className="absolute opacity-[20%]">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

//TEST1
