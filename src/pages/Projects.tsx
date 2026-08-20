import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ProjectItem } from "@/components/ProjectItem";
import { projects } from "@/data/projects";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    let observer: ResizeObserver | undefined;

    const measure = () => {
      const desktop = media.matches;
      setIsDesktop(desktop);
      if (!desktop || !trackRef.current) {
        setTravel(0);
        return;
      }

      const trackWidth = trackRef.current.getBoundingClientRect().width;
      const viewportWidth = document.documentElement.clientWidth;
      setTravel(Math.max(0, trackWidth - viewportWidth + 96));
    };

    const observeTrack = () => {
      observer?.disconnect();
      if (trackRef.current) {
        observer = new ResizeObserver(measure);
        observer.observe(trackRef.current);
      }
      measure();
    };

    setIsDesktop(media.matches);
    const frame = window.requestAnimationFrame(observeTrack);
    window.addEventListener("resize", measure);
    media.addEventListener("change", observeTrack);

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", observeTrack);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => setProgress(value * 100));

  const sectionHeight = isDesktop ? Math.max(1, travel + (typeof window !== "undefined" ? window.innerHeight : 0)) : undefined;

  return (
    <section ref={sectionRef} id="projects" className="relative w-full bg-background" style={sectionHeight ? { height: sectionHeight } : undefined}>
      <div className="mx-auto px-5 py-20 md:sticky md:top-0 md:flex md:h-svh md:min-h-[640px] md:flex-col md:justify-between md:overflow-hidden md:px-12 md:py-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 border-b border-foreground/15 pb-7 md:mb-0 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">02 / Selected work</p>
              <h2 className="mt-4 max-w-3xl font-sometimesTimes text-5xl leading-[0.9] tracking-tight text-foreground sm:text-7xl md:text-8xl">Redefining limits through digital work.</h2>
            </div>
            <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">A living archive of products, platforms, and experiments built with intent.</p>
          </div>
        </div>

        {isDesktop ? (
          <div className="relative -mx-12 flex min-h-0 flex-1 items-center overflow-hidden px-12">
            <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-10 py-10 pl-1 pr-[calc(100vw-6rem)] will-change-transform">
              {projects.map((item, index) => (
                <div key={item.id} className={`w-[min(62vw,720px)] shrink-0 ${index % 2 === 0 ? "translate-y-4" : "-translate-y-4"}`}>
                  <div className="mb-4 flex items-center justify-between border-t border-foreground/15 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span>0{index + 1} / {item.title}</span><span>{item.tech[0]}</span>
                  </div>
                  <ProjectItem id={`project${item.id}`} title={item.title} img={item.img} desc={item.desc} link={item.link} tech={item.tech} />
                </div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16">
            {projects.map((item, index) => (
              <div key={item.id}>
                <div className="mb-4 flex items-center justify-between border-t border-foreground/15 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  <span>0{index + 1} / {item.title}</span><span>{item.tech[0]}</span>
                </div>
                <ProjectItem id={`project${item.id}`} title={item.title} img={item.img} desc={item.desc} link={item.link} tech={item.tech} />
              </div>
            ))}
          </div>
        )}

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-foreground/15 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <span>{isDesktop ? "Scroll to move through the archive" : "Scroll to continue through the archive"}</span>
          {isDesktop && <span>{Math.round(progress).toString().padStart(2, "0")}%</span>}
        </div>
      </div>
    </section>
  );
}
