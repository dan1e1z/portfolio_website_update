import React from "react";
import VerticalSwiper from "@/components/about/VerticalSwiper";
import useContainerDimensions from "@/hooks/useContainerDimensions";

interface EducationContentProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const EducationContent: React.FC<EducationContentProps> = ({
  containerRef,
}) => {
  const dimensions = useContainerDimensions(containerRef);

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
      <div className="border-b border-b-[#EEE9CC] bg-[#1d1915]" id="about2">
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
          <VerticalSwiper containerRef={containerRef} />
        </div>
      </div>
    </>
  );
};

export default EducationContent;
