import SplitTextAnimation from "@/animations/SplitTextAnimation";
import OverlayLine from "@/components/OverlayLine";
import AnimatedText from "@/animations/AnimatedText";
import Arrow from "@/animations/Arrow";
import useContainerDimensions from "@/hooks/useContainerDimensions";

interface SkillHeroProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const SkillHero = ({ containerRef }: SkillHeroProps) => {
  const dimensions = useContainerDimensions(containerRef);
  // console.log(dimensions);

  let textSize = "text-8xl";

  if (dimensions?.width !== undefined && dimensions.width < 355) {
    textSize = "text-4xl";
  } else if (dimensions?.width !== undefined && dimensions.width < 424) {
    textSize = "text-5xl";
  } else if (dimensions?.width !== undefined && dimensions.width < 708) {
    textSize = "text-6xl";
  }

  return (
    <>
      <div className="relative w-full h-[90dvh] md:h-screen border-b border-b-[#eee9cc]">
        <div className="relative h-full">
          {/* Arrow */}
          <div className="absolute w-24 top-[10%] right-[30%] rotate-90">
            <Arrow />
          </div>

          {/* Two animated text elements side by side */}
          <div className="flex h-full">
            <div className="h-full w-[30%]">
              <AnimatedText text="M" />
            </div>
            <div className="h-full w-[30%]">
              <AnimatedText text="Y" />
            </div>
          </div>

          {/* Split text animations */}
          <div className="absolute bottom-0 left-[20%]">
            <SplitTextAnimation
              text="SKILL"
              direction="up"
              className={`text-[#eee9cc] ${textSize} font-neueMontreal`}
              scalingFactor={2}
              overallDelay={0}
            />
            <SplitTextAnimation
              text="EXPERTISE"
              direction="down"
              className={`text-[#eee9cc] ${textSize} font-neueMontreal mt-[-0.1em]`}
              overallDelay={0.6}
            />
          </div>

          {/* Overlay lines */}
          <div className="absolute inset-0 -z-1">
            <OverlayLine
              top={{ x: "70%", y: "0%" }}
              bottom={{ x: "70%", y: "100%" }}
              colour="#eee9cc"
              thickness="1px"
            />
            <OverlayLine
              top={{ x: "50%", y: "100%" }}
              bottom={{ x: "90%", y: "0%" }}
              colour="#eee9cc"
              thickness="1px"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillHero;
