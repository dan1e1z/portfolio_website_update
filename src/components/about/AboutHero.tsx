import { useState, useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
// import Lenis from "lenis";
import ImageSlider from "@/components/about/ImageSlider";
import TextOverlay from "@/components/about/TextOverlay";
import { sliderItems } from "@/constants/aboutData";

interface AboutHeroProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const AboutHero = ({ containerRef }: AboutHeroProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: scrollRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === sliderItems.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   const initLenis = async () => {
  //     if (!containerRef.current) return;
  //     const lenis = new Lenis({
  //       wrapper: containerRef.current!,
  //       lerp: 0.1,
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
  return (
    <>
      <div ref={scrollRef} className="h-[90.5dvh] md:h-screen relative">
        <div className="relative h-full overflow-hidden">
          <ImageSlider currentImageIndex={currentImageIndex} />
        </div>
        <div className="absolute inset-0 z-10 flex flex-col divide-y divide-[#eee9cc]">
          <TextOverlay
            scrollYProgress={scrollYProgress}
            containerRef={containerRef}
          />
        </div>
      </div>
    </>
  );
};

export default AboutHero;
