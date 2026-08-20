import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useMousePosition from "@/hooks/useMousePosition";
import useContainerDimensions from "@/hooks/useContainerDimensions";

const colors = [
  "bg-[#9C8779]",
  "bg-[#3E2B1A]",
  "bg-[#311908]",
  "bg-[#7D614C]",
  "bg-[#847E7C]",
  "bg-[#5B402B]",
  "bg-[#B8B5B7]",
  "bg-[#A8A19E]",
  "bg-[#4A4948]",
  "bg-[#462421]",
  "bg-[#4F2F2B]",
  "bg-[#8E5A59]",
  "bg-[#6B4943]",
  "bg-[#6B423A]",
  "bg-[#643B36]",
  "bg-[#453F33]",
  "bg-[#32322D]",
];

interface HobbiesContentProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

type PositionMap = {
  [key: number]: string;
};

const HobbiesContent = ({ containerRef }: HobbiesContentProps) => {
  const dimensions = useContainerDimensions(containerRef);

  const getResponsiveConfig = (width: number) => {
    if (width < 454) {
      return {
        titleTextSize: "text-5xl",
      };
    }
    if (width < 615) {
      return {
        textSize: "text-xl",
      };
    } else {
      return {
        titleTextSize: "text-6xl",
        textSize: "text-2xl",
      };
    }
  };

  const config = dimensions?.width
    ? getResponsiveConfig(dimensions.width)
    : getResponsiveConfig(1000);

  const positions: PositionMap = {
    1: "row-start-1 col-start-1",
    2: "row-start-1 col-start-3",
    3: "row-start-1 col-start-4",
    4: "row-start-1 col-start-5",
    5: "row-start-1 col-start-7",
    6: "row-start-2 col-start-1",
    7: "row-start-2 col-start-3",
    8: "row-start-2 col-start-4",
    9: "row-start-2 col-start-6",
    10: "row-start-2 col-start-7",
    11: "row-start-2 col-start-8",
    12: "row-start-3 col-start-1",
    13: "row-start-3 col-start-2",
    14: "row-start-3 col-start-4",
    15: "row-start-3 col-start-5",
    16: "row-start-3 col-start-7",
    17: "row-start-3 col-start-8",
  };

  const getPositionStyles = (pos: number): string => {
    return positions[pos] || "";
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    container: containerRef,
    offset: ["start end", "end end"],
    layoutEffect: false,
  });

  const titleOpacity = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);

  const overlayOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 0.5]);

  const squares = colors.map((color, index) => {
    const totalSquares = colors.length;
    const stagger = 0.7 / totalSquares;
    const start = index * stagger;
    const end = Math.min(start + stagger + 0.1, 0.95);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const y = useTransform(scrollYProgress, [start, end], ["100vh", "0vh"], {
      clamp: true,
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const opacity = useTransform(
      scrollYProgress,
      [start, Math.min(start + 0.1, 0.95)],
      [0, 1],
      {
        clamp: true,
      },
    );

    return { color, y, opacity };
  });

  const { mouseX, mouseY } = useMousePosition(gridRef);
  const size = isHovered ? 200 : 60;

  const activities = [
    { activity: "Reading", rowStart: 1, colStart: 3 },
    { activity: "Hiking", rowStart: 2, colStart: 3 },
    { activity: "Photography", rowStart: 2, colStart: 7 },
    { activity: "Chess", rowStart: 3, colStart: 2 },
    { activity: "Gaming", rowStart: 3, colStart: 8 },
  ];

  return (
    <>
      <div className="" id="about4">
        <div ref={scrollRef} className="h-[300vh]">
          <div
            ref={gridRef}
            className="h-[90dvh] md:h-screen sticky top-0 grid place-items-center overflow-hidden"
          >
            <div className="grid w-full h-full grid-cols-8 grid-rows-3 gap-2">
              {squares.map((square, index) => (
                <motion.div
                  key={index + 1}
                  className={`aspect-square w-full h-full ${square.color} ${getPositionStyles(index + 1)}`}
                  style={{
                    y: square.y,
                    opacity: square.opacity,
                    position: "relative",
                  }}
                  initial={{ y: "100vh", opacity: 0 }}
                />
              ))}
            </div>
            <motion.div
              className="absolute grid-area-[main] flex flex-col"
              initial={{ y: "100%", opacity: 0 }}
              style={{
                y: useTransform(scrollYProgress, [0.4, 0.6], ["100%", "0%"]),
                opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]),
              }}
            >
              <h2 className="text-[clamp(2rem,7vw,4.5rem)] leading-none mt-2 mb-0 font-medium tracking-tight">
                Hobbies
              </h2>
              <p className="text-[11px] uppercase font-normal text-right self-end m-0 max-w-[100px]">
                Captured in happy moments
              </p>
            </motion.div>

            {/* Mask Layer */}
            <motion.div
              className="absolute grid w-full h-full grid-cols-8 grid-rows-3 gap-2"
              style={{
                opacity: overlayOpacity,
                maskImage: "url(/Circle.svg)",
                WebkitMaskImage: "url(/Circle.svg)",
                backgroundColor: "#f9f871",
                maskRepeat: "no-repeat",
                maskSize: `${size}px`,
                WebkitMaskSize: `${size}px`,
                maskPosition: `${mouseX - size / 2}px ${mouseY - size / 2}px`,
                WebkitMaskPosition: `${mouseX - size / 2}px ${mouseY - size / 2}px`,
              }}
            >
              {activities.map(({ activity, rowStart, colStart }, index) => (
                <div
                  key={`activity-${index}`}
                  className={`row-start-${rowStart} col-start-${colStart} flex justify-center items-center text-[#eee9cc] ${config.textSize} uppercase mix-blend-exclusion`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {activity}
                </div>
              ))}
            </motion.div>

            {/* Title with scroll-based opacity */}
            <motion.h2
              className={`absolute top-0 left-0 mt-8 ml-4 text-[#eee9cc] font-pacifico uppercase ${config?.titleTextSize} font-medium tracking-tight`}
              style={{ opacity: titleOpacity, pointerEvents: "none" }}
            >
              Look for my <br />
              hobbies
            </motion.h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default HobbiesContent;
