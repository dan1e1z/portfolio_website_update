import React, { useRef, lazy, Suspense } from "react";
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
    <div className="w-full border-t border-b border-foreground/15 bg-background px-5 py-12 md:px-12 md:py-20"><div className="mx-auto w-full max-w-7xl">
      <Suspense fallback={<LoadingSpinner />}>
        <AboutHero containerRef={containerRef} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <AboutSectionTitle containerRef={containerRef} />
      </Suspense>
      <div className="relative font-neueMontreal text-[#EEE9CC]">
        <Suspense fallback={<LoadingSpinner />}>
          <AboutContent />
        </Suspense>
        <EducationContent containerRef={containerRef} />
        <Suspense fallback={<LoadingSpinner />}>
          <InterestsContent containerRef={containerRef} />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <HobbiesContent />
        </Suspense>
      </div>
    </div>
  </div>
  );
};

export default About;
