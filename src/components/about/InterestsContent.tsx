import Character from "@/animations/Character";
import OverlayLine from "@/components/OverlayLine";
import useContainerDimensions from "@/hooks/useContainerDimensions";

interface InterestsContentProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const paragraph =
  "I'm passionate about creating seamless digital experiences through Web Development and UI/UX Design. I'm constantly exploring the possibilities of Machine Learning and aim to contribute to the Open Source community. These interests drive my work and fuel my curiosity.";

const InterestsContent = ({ containerRef }: InterestsContentProps) => {
  const dimensions = useContainerDimensions(containerRef);

  const getResponsiveConfig = (width: number) => {
    if (width < 400) {
      return {
        titleSize: "text-7xl",
      };
    } else {
      return {
        titleSize: "text-8xl",
      };
    }
  };

  const config = dimensions?.width
    ? getResponsiveConfig(dimensions.width)
    : getResponsiveConfig(1000);
  return (
    <>
      <div
        className="h-[90vh] md:h-screen border-b border-b-[#EEE9CC] bg-[#1d1915]"
        id="about3"
      >
        <div
          style={{
            height: "100%",
            width: dimensions?.width || "100%",
            position: "relative",
          }}
        >
          {/* <div className="relative "> */}
          <div className="absolute inset-0 -z-1">
            <OverlayLine
              top={{ x: "70%", y: "0%" }}
              bottom={{ x: "70%", y: "100%" }}
              colour="#eee9cc"
              thickness="1px"
            />
            <OverlayLine
              top={{ x: "70%", y: "0%" }}
              bottom={{ x: "0%", y: "100%" }}
              colour="#eee9cc"
              thickness="1px"
            />
            {/* </div> */}
            <div className="">
              <h2
                className={`${config.titleSize} text-[#EEE9CC] ml-4 mt-4 mr-4 mb-12`}
              >
                Interests
              </h2>
              <Character paragraph={paragraph} containerRef={containerRef} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterestsContent;
