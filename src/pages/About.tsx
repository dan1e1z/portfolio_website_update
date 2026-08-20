import React, { useRef, lazy, Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
const AboutContent = lazy(() => import("@/components/about/AboutContent"));
import EducationContent from "@/components/about/EducationContent";
const HobbiesContent = lazy(() => import("@/components/about/HobbiesContent"));
import { useScrollNavigation } from "@/hooks/useScrollNavigation";
import { aboutSections } from "@/data/about";
import { LoadingSpinner } from "@/components/LoadingSpinner";
const AboutHero = lazy(() => import("@/components/about/AboutHero"));
const AboutSectionTitle = lazy(
  () => import("@/components/about/AboutSectionTitle"),
);
const InterestsContent = lazy(
  () => import("@/components/about/InterestsContent"),
);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollNavigation(containerRef, aboutSections, "about");

  return (
    <ScrollArea
      className="h-full w-full bg-[#1d1915] md:rounded-2xl"
      viewportRef={containerRef}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <AboutHero containerRef={containerRef} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <AboutSectionTitle containerRef={containerRef} />
      </Suspense>
      <div className="font-neueMontreal text-[#EEE9CC] relative">
        <Suspense fallback={<LoadingSpinner />}>
          <AboutContent containerRef={containerRef} />
        </Suspense>
        <EducationContent containerRef={containerRef} />
        <Suspense fallback={<LoadingSpinner />}>
          <InterestsContent containerRef={containerRef} />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <HobbiesContent containerRef={containerRef} />
        </Suspense>
      </div>
    </ScrollArea>
  );
};

export default About;
