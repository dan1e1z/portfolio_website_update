import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { motion } from "framer-motion";

interface ProjectItemProps {
  id: string;
  title: string;
  img: string;
  desc: string;
  link: string;
  tech: string[];
}

export function ProjectItem({ id, title, img, desc, link, tech }: ProjectItemProps) {
  return (
    <RevealOnScroll id={id} className="w-full">
      <GlassCard className="group flex flex-col overflow-hidden rounded-none border-foreground/15 bg-card/40 shadow-none transition-colors duration-500 hover:bg-card/70">
        <div className="w-full overflow-hidden">
          <a href={link} target="_blank" rel="noopener noreferrer" className="block" aria-label={`View ${title}`}>
            <motion.div whileHover={{ scale: 0.985, rotate: 0.35 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative w-full bg-muted/20 pt-[62%]">
              <motion.img src={img} alt={title} className="absolute left-0 top-0 size-full object-cover" whileHover={{ scale: 1.045 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
            </motion.div>
          </a>
        </div>
        <div className="w-full p-5 sm:p-7">
          <CardHeader className="mb-4 p-0">
            <CardTitle className="heading-section flex flex-wrap items-center gap-4 text-2xl text-[#eee9cc]">
              <span>{title}</span>
              <div className="flex flex-wrap gap-2">
                {tech.map((item) => <Badge key={item} variant="secondary" className="body-mono border-0 bg-[#eee9cc]/10 text-[#eee9cc]">{item}</Badge>)}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0"><p className="leading-relaxed text-[#eee9cc]/70">{desc}</p></CardContent>
        </div>
      </GlassCard>
    </RevealOnScroll>
  );
}
