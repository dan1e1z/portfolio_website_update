import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CHAPTERS } from "@/components/PortfolioCanvas";

const chapterNotes: Record<string, string> = {
  about: "A little context, the practice, and the thinking behind the work.",
  projects: "Selected projects, experiments, and systems built with intent.",
  skills: "The tools, disciplines, and technical instincts behind each release.",
  contacts: "Start a conversation, commission a project, or say hello.",
};

const HomeContent: React.FC = () => {
  return (
    <section aria-labelledby="chapter-index-title" className="relative flex min-h-[calc(100svh-5rem)] w-full flex-col justify-center px-6 py-20 md:px-12 md:py-28">
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-foreground/15 pb-5 md:mb-14">
        <div>
          <p className="eyebrow mb-3">The portfolio / in motion</p>
          <h2 id="chapter-index-title" className="font-sometimesTimes text-4xl leading-none tracking-tight text-foreground md:text-7xl">Explore the practice.</h2>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:block">Scroll to continue</span>
      </div>

      <div className="divide-y divide-foreground/15 border-y border-foreground/15">
        {CHAPTERS.slice(1).map((chapter) => (
          <motion.a
            key={chapter.id}
            href={`#${chapter.id}`}
            className="group grid min-h-32 grid-cols-[auto_1fr_auto] items-center gap-5 py-6 transition-colors duration-500 hover:bg-foreground/[0.04] md:min-h-40 md:grid-cols-[5rem_1fr_minmax(18rem,30rem)_auto] md:gap-8 md:py-8"
            whileHover={{ x: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">{chapter.number}</span>
            <h3 className="font-sometimesTimes text-3xl tracking-tight text-foreground md:text-6xl">{chapter.label}</h3>
            <p className="hidden text-sm leading-relaxed text-muted-foreground md:block">{chapterNotes[chapter.id]}</p>
            <ArrowUpRight className="size-5 text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" aria-hidden="true" />
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default HomeContent;
