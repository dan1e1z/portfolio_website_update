import { useRef, lazy, Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { skillSection } from "@/data/skills";
const SkillHero = lazy(() => import("@/components/skills/SkillHero"));
const SkillContent = lazy(() => import("@/components/skills/SkillContent"));
const SkillTransition = lazy(
  () => import("@/components/skills/SkillTransition"),
);

const Skills = () => {
  const containerRef = useRef(null);
  useScrollNavigation(containerRef, skillSection, "skills");

  return (
    <ScrollArea
      viewportRef={containerRef}
      className="w-full h-full bg-[#1c1915] md:rounded-2xl"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <SkillHero containerRef={containerRef} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <SkillTransition containerRef={containerRef} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <SkillContent containerRef={containerRef} />
      </Suspense>
    </ScrollArea>
  );
};

export default Skills;
