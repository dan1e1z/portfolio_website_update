import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import useContainerDimensions from "@/hooks/useContainerDimensions";

const SLIDE_INTERVAL = 2500;

const slideVariants = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

const CERTIFICATIONS = [
  {
    firstWord: "FullStack",
    secondWord: "Certification",
  },
  {
    firstWord: "TypeScript",
    secondWord: "Certification",
  },
] as const;

interface VerticalSwiperProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const VerticalSwiper = ({ containerRef }: VerticalSwiperProps) => {
  const dimensions = useContainerDimensions(containerRef);
  // console.log("dimensions", dimensions);

  // let positionStyle: string = "";
  // let firstWordTextSize: string = "text-4xl";
  // let secondWordTextSize: string = "text-2xl";
  //
  // if (dimensions?.width !== undefined && dimensions.width < 600) {
  //   positionStyle = "flex flex-col items-end";
  //   firstWordTextSize = "hidden";
  //   secondWordTextSize = "hidden";
  // } else if (dimensions?.width !== undefined && dimensions.width < 641) {
  //   positionStyle = "flex flex-col items-end";
  //   firstWordTextSize = "text-2xl";
  //   secondWordTextSize = "text-xl";
  // } else if (dimensions?.width !== undefined && dimensions.width < 641) {
  //   positionStyle = "flex flex-col items-end";
  //   firstWordTextSize = "text-3xl";
  // } else if (dimensions?.width !== undefined && dimensions.width < 775) {
  //   positionStyle = "flex flex-col items-end";
  // }

  const getResponsiveConfig = (width: number) => {
    if (width < 600) {
      return {
        positionStyle: "flex flex-col items-end",
        firstWordTextSize: "hidden",
        secondWordTextSize: "hidden",
      };
    } else if (width < 641) {
      return {
        positionStyle: "flex flex-col items-end pr-8",
        firstWordTextSize: "text-2xl",
        secondWordTextSize: "text-xl",
      };
    }
    //     else if (width < 641) {
    //   return {
    //     positionStyle: "flex flex-col items-end",
    //     firstWordTextSize: "text-2xl",
    //     secondWordTextSize: "text-xl",
    //   };
    // }
    else if (width < 775) {
      return {
        positionStyle: "flex flex-col items-end pr-8",
        firstWordTextSize: "text-3xl",
        secondWordTextSize: "text-2xl",
      };
    } else {
      return {
        positionStyle: "pr-8",
        firstWordTextSize: "text-4xl",
        secondWordTextSize: "text-2xl",
      };
    }
  };

  const config = dimensions?.width
    ? getResponsiveConfig(dimensions.width)
    : getResponsiveConfig(1000);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CERTIFICATIONS.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[#EEE9CC] absolute top-0 right-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1, ease: "easeInOut" }}
          className={`${config.positionStyle}`}
        >
          <span className={`${config.firstWordTextSize} font-bold`}>
            {CERTIFICATIONS[currentIndex].firstWord}{" "}
          </span>
          <span className={`${config.secondWordTextSize} font-normal`}>
            {CERTIFICATIONS[currentIndex].secondWord}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default VerticalSwiper;
