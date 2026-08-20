import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import FuturisticHover from "@/animations/FuturisticHover";
import useContainerDimensions from "@/hooks/useContainerDimensions";
import { skills, path } from "@/data/skills";

interface SkillContentProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const SkillContent = ({ containerRef }: SkillContentProps) => {
  const [selectedSkill, setSelectedSkill] = useState<number>(0);
  const [renderKey, setRenderKey] = useState<number>(0);
  const circles = useRef<SVGCircleElement[]>([]);
  const paths = useRef<SVGPathElement[]>([]);
  const nbOfCircles = 30;
  const dimensions = useContainerDimensions(containerRef);

  const getResponsiveConfig = (width: number) => {
    if (width < 220) {
      return {
        fontSize: "text-xs",
        radius: 8,
        ratingSize: "text-sm",
        ratingPosition: "relative",
        gap: "gap-1",
        containerDirection: "flex-col",
        svgContainerClass: "w-[100px] h-[100px]",
        mainPadding: "p-1",
        viewBox: "0 0 256 256",
        blur: "4",
        textContainerClass: "max-w-[120px] text-center",
        skillNameClass: "truncate hover:text-clip",
      };
    } else if (width < 375) {
      return {
        fontSize: "text-base",
        radius: 12,
        ratingSize: "text-lg",
        ratingPosition: "relative",
        gap: "gap-2",
        containerDirection: "flex-col",
        svgContainerClass: "w-[150px] h-[150px]",
        mainPadding: "p-2",
        viewBox: "0 0 256 256",
        blur: "6",
        textContainerClass: "",
        skillNameClass: "",
      };
    } else if (width < 564) {
      return {
        fontSize: "text-2xl",
        radius: 16,
        ratingSize: "text-3xl",
        ratingPosition: "relative",
        gap: "gap-2",
        containerDirection: "flex-col",
        svgContainerClass: "w-[250px] h-[250px]",
        mainPadding: "p-3",
        viewBox: "0 0 256 256",
        blur: "10",
        textContainerClass: "",
        skillNameClass: "",
      };
    } else if (width < 708) {
      return {
        fontSize: "text-3xl",
        radius: 18,
        ratingSize: "text-4xl",
        ratingPosition: "absolute -right-4",
        gap: "gap-2",
        containerDirection: "flex-row",
        svgContainerClass: "w-[400px] h-[400px]",
        mainPadding: "p-4",
        viewBox: "0 0 256 256",
        blur: "20",
        textContainerClass: "",
        skillNameClass: "",
      };
    } else {
      return {
        fontSize: "text-3xl",
        radius: 20,
        ratingSize: "text-5xl",
        ratingPosition: "absolute -right-6",
        gap: "gap-2",
        containerDirection: "flex-row",
        svgContainerClass: "w-[500px] h-[500px]",
        mainPadding: "p-4",
        viewBox: "0 0 256 256",
        blur: "20",
        textContainerClass: "",
        skillNameClass: "",
      };
    }
  };

  const config = dimensions?.width
    ? getResponsiveConfig(dimensions.width)
    : getResponsiveConfig(1000);

  useEffect(() => {
    const length = paths.current[selectedSkill].getTotalLength();
    const step = length / nbOfCircles;

    circles.current.forEach((circle, i) => {
      const { x, y } = paths.current[selectedSkill].getPointAtLength(i * step);
      animate(circle, { cx: x, cy: y }, { delay: i * 0.025, ease: "easeOut" });
    });
  }, [selectedSkill, renderKey]);

  const handleClick = (index: number) => {
    if (index === selectedSkill) {
      setRenderKey((prev) => prev + 1);
    } else {
      setSelectedSkill(index);
    }
  };

  return (
    <>
      <div
        className="h-[90dvh] md:h-screen w-full border-t border-t-[#eee9cc] bg-[#eee9cc]"
        id="skills1"
      >
        <div
          className={`h-full w-full flex items-center justify-center ${config.gap} ${config.containerDirection} ${config.mainPadding}`}
        >
          <div
            className={`cursor-pointer ${config.fontSize} ${config.textContainerClass}`}
          >
            {skills.map((skill, i) => (
              <div onClick={() => handleClick(i)} key={i}>
                <FuturisticHover
                  text={skill.name}
                  className={`text-[#1c1915] tracking-wide font-mono ${config.skillNameClass}`}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center relative">
            <div className={`relative ${config.svgContainerClass}`}>
              <svg
                viewBox={config.viewBox}
                className="w-full h-full"
                style={{ filter: "url(#filter)" }}
                key={renderKey}
              >
                <defs>
                  <filter id="filter">
                    <feGaussianBlur
                      in="SourceAlpha"
                      stdDeviation={config.blur}
                      result="blur"
                    />
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -15"
                      result="filter"
                    />
                  </filter>
                </defs>
                <g>
                  {skills.map((skill, i) => (
                    <path
                      key={`p_${i}`}
                      ref={(ref) => (paths.current[i] = ref!)}
                      d={path[skill.level - 1]}
                      style={{ display: "none" }}
                    />
                  ))}
                </g>
                <g>
                  {Array.from({ length: nbOfCircles }).map((_, i) => (
                    <circle
                      key={`c_${i}`}
                      ref={(ref) => (circles.current[i] = ref!)}
                      cx="128"
                      cy="128"
                      r={config.radius}
                    />
                  ))}
                </g>
              </svg>
            </div>
            <div
              className={`font-mono text-black ${config.ratingSize} ${config.ratingPosition}`}
            >
              /5
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillContent;
