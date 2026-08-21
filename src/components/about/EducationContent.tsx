import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useContainerDimensions from "@/hooks/useContainerDimensions";

interface EducationContentProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const EducationContent: React.FC<EducationContentProps> = ({
  containerRef,
}) => {
  const dimensions = useContainerDimensions(containerRef);
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const certificationY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const certificationOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.75]);

  const getResponsiveConfig = (width: number) => {
    if (width < 468) {
      return {
        titleFontSize: "text-6xl",
        spanOneFontSize: "text-1xl font-bold",
        spanTwoFontSize: "",
        spanThreeFontSize: "text-1xl font-bold",
      };
    } else if (width < 568) {
      return {
        titleFontSize: "text-8xl",
        spanOneFontSize: "text-4xl",
        spanTwoFontSize: "",
        spanThreeFontSize: "text-2xl",
      };
    } else {
      return {
        titleFontSize: "text-8xl",
        spanOneFontSize: "text-5xl",
        spanTwoFontSize: "",
        spanThreeFontSize: "text-3xl",
      };
    }
  };

  const config = dimensions?.width
    ? getResponsiveConfig(dimensions.width)
    : getResponsiveConfig(1000);

  return (
    <>
      <div ref={sectionRef} className="border-b border-b-[#EEE9CC] bg-[#1d1915] px-4 py-12 md:px-8 md:py-20" id="about2">
        <div
          style={{
            width: dimensions?.width || "100%",
            position: "relative",
          }}
        >
          <h2 className={`${config.titleFontSize} text-[#EEE9CC] mb-4`}>
            Education
          </h2>
          <p className="text-[#EEE9CC]">
            <span className={`${config.spanOneFontSize}`}>Bachelor</span> of{" "}
            <span className={`${config.spanTwoFontSize}`}>Science</span> in{" "}
            <span className={`${config.spanThreeFontSize}`}>
              Computer Science
            </span>
          </p>
          <motion.span
            style={{ y: certificationY, opacity: certificationOpacity }}
            className="absolute right-0 top-0 max-w-[45%] text-right text-[clamp(0.65rem,1.2vw,0.875rem)] uppercase tracking-[0.14em] text-[#EEE9CC]/70"
          >
            TypeScript Certification
          </motion.span>
        </div>
      </div>
    </>
  );
};

export default EducationContent;
