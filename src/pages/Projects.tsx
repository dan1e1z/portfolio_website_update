import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { ProjectItem } from "@/components/ProjectItem";
import { projects } from "@/data/projects";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => setProgress(value * 100));

  return (
    <section ref={sectionRef} id="projects" className="relative w-full bg-background">
      <div className="mx-auto w-full max-w-7xl px-5 py-28 md:px-12 md:py-40">
        <header className="mb-20 grid gap-8 border-b border-foreground/15 pb-10 md:mb-32 md:grid-cols-[1fr_20rem] md:items-end md:gap-16">
          <div>
            <p className="eyebrow">02 / Selected work</p>
            <h2 className="mt-5 max-w-4xl font-neueMontreal text-6xl font-medium leading-[0.84] tracking-[-0.055em] text-foreground sm:text-8xl md:text-9xl">Redefining limits through digital work.</h2>
          </div>
          <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">A living archive of products, platforms, and experiments built with intent.</p>
        </header>

        <div className="divide-y divide-foreground/15">
          {projects.map((item, index) => (
            <ProjectItem key={item.id} id={`project${item.id}`} title={item.title} img={item.img} desc={item.desc} link={item.link} tech={item.tech} index={index} total={projects.length} />
          ))}
        </div>

        <footer className="mt-20 flex items-center justify-between border-t border-foreground/15 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:mt-32">
          <span>Scroll to continue through the archive</span>
          <span>{Math.round(Math.max(0, Math.min(100, progress))).toString().padStart(2, "0")}%</span>
        </footer>
      </div>
    </section>
  );
}
