import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ProjectItem } from "@/components/ProjectItem";
import { projects } from "@/data/projects";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isCompact, setIsCompact] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const update = () => setIsCompact(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const updateTravel = () => {
      if (!trackRef.current) return;
      setTravel(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 96));
    };
    updateTravel();
    const observer = new ResizeObserver(updateTravel);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", updateTravel);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateTravel);
    };
  }, [isCompact]);

  useMotionValueEvent(scrollYProgress, "change", () => undefined);

  if (isCompact) {
    return (
      <section ref={sectionRef} className="relative w-full bg-background px-5 py-16">
        <div className="mb-8 flex items-end justify-between border-b border-foreground/15 pb-4">
          <div><p className="eyebrow">02 / Selected work</p><h2 className="mt-3 font-sometimesTimes text-5xl tracking-tight">Projects</h2></div>
          <span className="font-mono text-xs text-muted-foreground">{projects.length} pieces</span>
        </div>
        <div className="flex flex-col gap-8">
          {projects.map((item) => <ProjectItem key={item.id} id={`project${item.id}`} title={item.title} img={item.img} desc={item.desc} link={item.link} tech={item.tech} />)}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative w-full bg-background" style={{ height: `calc(${Math.max(1, travel)}px + 100svh)` }}>
      <div className="sticky top-0 flex h-[calc(100svh-5rem)] min-h-[640px] flex-col justify-between overflow-hidden px-12 py-10">
        <div className="flex items-end justify-between border-b border-foreground/15 pb-5">
          <div><p className="eyebrow">02 / Selected work</p><h2 className="mt-3 font-sometimesTimes text-6xl tracking-tight">Projects</h2></div>
          <p className="max-w-xs text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">Scroll down to move through the archive from left to right.</p>
        </div>
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-10 py-10 pl-1 pr-[calc(100vw-6rem)]">
          {projects.map((item, index) => (
            <motion.div key={item.id} className="flex w-[min(68vw,720px)] shrink-0 flex-col justify-center" style={{ opacity: useTransform(scrollYProgress, [index / projects.length, Math.min((index + 1) / projects.length, 1)], [0.45, 1]) }}>
              <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"><span>0{index + 1}</span><span>{item.tech.join(" / ")}</span></div>
              <ProjectItem id={`project${item.id}`} title={item.title} img={item.img} desc={item.desc} link={item.link} tech={item.tech} />
            </motion.div>
          ))}
        </motion.div>
        <div className="flex items-center gap-5"><div className="h-px flex-1 bg-foreground/15"><motion.div className="h-full origin-left bg-primary" style={{ scaleX: useTransform(progress, [0, 100], [0, 1]) }} /></div><span className="font-mono text-[10px] tracking-widest text-muted-foreground">SCROLL / {projects.length}</span></div>
      </div>
    </section>
  );
}
