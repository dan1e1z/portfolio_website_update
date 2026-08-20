import { useRef } from "react";
// import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// import Lenis from "lenis";

interface SkillTransitionProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const SkillTransition = ({ containerRef }: SkillTransitionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "75% start"],
    container: containerRef,
    layoutEffect: false,
  });

  // useEffect(() => {
  //   const initLenis = async () => {
  //     const lenis = new Lenis({
  //       wrapper: containerRef.current!,
  //       lerp: 0.15,
  //       duration: 1.5,
  //       smoothWheel: true,
  //       syncTouch: true,
  //     });
  //
  //     function raf(time: number) {
  //       lenis.raf(time);
  //       requestAnimationFrame(raf);
  //     }
  //
  //     requestAnimationFrame(raf);
  //   };
  //
  //   initLenis();
  // }, [containerRef]);

  // Transform scroll progress to fill height (for animation)
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <div ref={scrollRef} className="h-screen w-full bg-[#eee9cc]">
      {/* Grid overlay */}
      <div className="h-full w-full grid grid-rows-6 relative">
        {/* Ensure text is above the animated grid */}
        <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 text-6xl text-[#eee9cc] mix-blend-exclusion font-neueMontreal">
          hello hello hello hello
        </div>

        {/* Animated grid rows under the text */}
        {[...Array(6)].map((_, index) => (
          <div key={index} className="relative w-full h-full">
            <motion.div
              className="absolute inset-x-0"
              style={{
                height: fillHeight, // Height grows with scroll
                backgroundColor: "#1c1915", // Grid row colour
              }}
              initial={{ height: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            ></motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillTransition;
