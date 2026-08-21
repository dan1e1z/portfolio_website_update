import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ParticleCanvas from "@/components/home/ParticalCanvas";
import HomeContent from "@/components/home/HomeContent";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 0.72], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.58, 0.9], [1, 0.78, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.9], [0, -72]);

  return (
    <div className="w-full bg-background">
      <motion.section ref={heroRef} style={{ scale: heroScale, opacity: heroOpacity, y: heroY }} className="relative flex min-h-[calc(100svh-5rem)] w-full snap-start items-end overflow-hidden px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-20">
        <ParticleCanvas containerRef={containerRef} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 flex w-full items-end justify-between gap-8 border-t border-foreground/20 pt-6">
          <div>
            <p className="eyebrow mb-3">Independent digital portfolio</p>
            <h1 className="max-w-3xl font-sometimesTimes text-5xl leading-[0.9] tracking-tight text-foreground sm:text-7xl md:text-9xl">Designing momentum for the web.</h1>
          </div>
          <div className="hidden max-w-48 pb-1 text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground md:block">Selected work, systems, and experiments by Daniel.</div>
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-6 right-6 z-10 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:flex">
          <span className="h-8 w-px bg-foreground/30" /> Scroll to explore
        </motion.div>
      </motion.section>
      <section className="min-h-[calc(100svh-5rem)] w-full snap-start px-6 py-16 md:px-12 md:py-28">
        <HomeContent />
      </section>
    </div>
  );
}
