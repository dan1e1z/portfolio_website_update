import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { RevealOnScroll } from "@/components/RevealOnScroll";

interface ProjectItemProps {
  id: string;
  title: string;
  img: string;
  desc: string;
  link: string;
  tech: string[];
  index: number;
  total: number;
}

export function ProjectItem({ id, title, img, desc, link, tech, index, total }: ProjectItemProps) {
  const reversed = index % 2 === 1;

  return (
    <RevealOnScroll id={id} className="w-full">
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group grid items-center gap-8 border-t border-foreground/15 py-12 md:grid-cols-12 md:gap-12 md:py-24 ${reversed ? "md:[&>*:first-child]:order-2" : ""}`}
        whileHover="hover"
      >
        <div className="md:col-span-7">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted/20">
            <motion.img
              src={img}
              alt={`${title} project preview`}
              className="size-full object-cover"
              variants={{ hover: { scale: 1.04 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-8 md:col-span-5 md:min-h-56">
          <div>
            <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
              <span>{tech[0]}</span>
            </div>
            <h3 className="font-neueMontreal text-4xl font-medium leading-[0.9] tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl">{title}</h3>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">{desc}</p>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {tech.map((item) => <Badge key={item} variant="secondary" className="font-mono text-[10px] uppercase tracking-[0.08em]">{item}</Badge>)}
            </div>
            <motion.span variants={{ hover: { x: 5, y: -5 } }} className="shrink-0 text-foreground" aria-hidden="true"><ArrowUpRight className="size-6" /></motion.span>
          </div>
        </div>
      </motion.a>
    </RevealOnScroll>
  );
}
