import { useRef } from "react";
import ParticleCanvas from "@/components/home/ParticalCanvas";
import HomeContent from "@/components/home/HomeContent";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollArea
      viewportRef={containerRef}
      className="w-full h-full bg-[#1c1915] md:rounded-2xl"
    >
      <div className="relative w-full h-[40%]">
        <ParticleCanvas containerRef={containerRef} />
      </div>
      <div className="w-full h-[85%]">
        <HomeContent containerRef={containerRef} />
      </div>
    </ScrollArea>
  );
}
