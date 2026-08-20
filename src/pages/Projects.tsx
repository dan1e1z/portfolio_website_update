import { useRef } from "react";
import { ProjectItem } from "@/components/ProjectItem";
import { projects } from "@/data/projects";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";
import { useEffect } from "react";

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollProgress } = useScrollNavigation(
    scrollRef,
    projects,
    "project",
  );

  useEffect(() => {
    const adjustHeight = () => {
      if (containerRef.current) {
        containerRef.current.style.height = `${window.innerHeight}px`;
      }
    };
    adjustHeight();
    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[90dvh] md:h-screen overflow-hidden relative"
    >
      <ScrollArea
        className="bg-[#1c1915] md:rounded-2xl h-full"
        viewportRef={scrollRef}
      >
        <div className="sticky top-0 z-10 shadow-md p-4 bg-[#1c1915]/60 backdrop-blur-2xl rounded-lg">
          <div className="w-full h-2 bg-[#1c1915] rounded-lg overflow-hidden">
            <div
              className="h-full bg-[#eee9cc] rounded-lg transition-all duration-200"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-6 p-6">
          {projects.map((item) => (
            <ProjectItem
              key={item.id}
              id={`project${item.id}`}
              title={item.title}
              img={item.img}
              desc={item.desc}
              link={item.link}
              tech={item.tech}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="absolute bottom-4 right-4 z-50">
        <Button
          onClick={() =>
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="p-2"
          size="icon"
          variant="outline"
        >
          <ArrowUp className="h-4 w-4" />
          <span className="sr-only">Scroll to top</span>
        </Button>
      </div>
    </div>
  );
}
