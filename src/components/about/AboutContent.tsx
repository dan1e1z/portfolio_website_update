import { useRef } from "react";
import { motion } from "framer-motion";
import useContainerDimensions from "@/hooks/useContainerDimensions";

interface AboutContentTitleProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const AboutContent = ({ containerRef }: AboutContentTitleProps) => {
  const scrollRef = useRef(null);
  const dimensions = useContainerDimensions(containerRef);

  const getResponsiveConfig = (width: number) => {
    if (width < 374) {
      return {
        fontSize: "text-xs",
      };
    } else if (width < 420) {
      return {
        fontSize: "text-sm",
      };
    } else if (width < 484) {
      return {
        fontSize: "text-base",
      };
    } else if (width < 530) {
      return {
        fontSize: "text-lg",
      };
    } else {
      return {
        fontSize: "text-xl",
      };
    }
  };

  const config = dimensions?.width
    ? getResponsiveConfig(dimensions.width)
    : getResponsiveConfig(1000);

  return (
    <>
      <div
        className="h-[90dvh] md:h-screen border-b border-b-[#EEE9CC] bg-[#1d1915]"
        id="about1"
      >
        <div
          ref={scrollRef}
          style={{
            height: "100%",
            width: dimensions?.width || "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="pl-4">
            <motion.h2 className="text-8xl font-neueMontreal text-[#EEE9CC] pb-12">
              About
              <br />
              Me
            </motion.h2>

            <p
              className={`text-muted-foreground font-neueMontreal text-wrap ${config.fontSize}`}
            >
              A passionate{" "}
              <strong className="text-[#EEE9CC]">web developer</strong>{" "}
              specialising in creating <br />
              <strong className="text-[#EEE9CC]">
                {" "}
                intuitive and visually appealing interfaces
              </strong>
              .<br />
              Proficient in
              <strong className="text-[#EEE9CC]">
                {" "}
                full-stack development
              </strong>{" "}
              with expertise <br />
              in
              <strong className="text-[#EEE9CC]">
                {" "}
                Python, TypeScript, React
              </strong>
              , and modern web technologies.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutContent;
