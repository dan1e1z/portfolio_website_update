import { useRef } from "react";
import ParticleCanvas from "@/components/home/ParticalCanvas";
import HomeContent from "@/components/home/HomeContent";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full bg-background">
      <section className="relative flex min-h-[calc(100svh-5rem)] w-full snap-start items-end overflow-hidden px-6 pb-12 md:px-12 md:pb-16">
        <ParticleCanvas containerRef={containerRef} />
        <div className="relative z-10 flex w-full items-end justify-between gap-8 border-t border-foreground/20 pt-6">
          <div>
            <p className="eyebrow mb-3">Independent digital portfolio</p>
            <h1 className="max-w-3xl font-sometimesTimes text-5xl leading-[0.9] tracking-tight text-foreground sm:text-7xl md:text-9xl">Designing momentum for the web.</h1>
          </div>
          <div className="hidden max-w-48 pb-1 text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground md:block">Selected work, systems, and experiments by Daniel.</div>
        </div>
      </section>
      <section className="min-h-[calc(100svh-5rem)] w-full snap-start">
        <HomeContent />
      </section>
    </div>
  );
}
