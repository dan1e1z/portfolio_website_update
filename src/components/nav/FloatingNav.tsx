import { useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Briefcase, Home, Layers, Mail, Terminal, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/navigation";

const NAV_ITEMS: (NavItem & { anchor: string })[] = [
  { label: "Home", shortLabel: "00", path: "/", anchor: "home", icon: Home },
  { label: "About", shortLabel: "01", path: "/about", anchor: "about", icon: User },
  { label: "Work", shortLabel: "02", path: "/projects", anchor: "projects", icon: Briefcase },
  { label: "Skills", shortLabel: "03", path: "/skills", anchor: "skills", icon: Layers },
  { label: "Contact", shortLabel: "04", path: "/contacts", anchor: "contacts", icon: Mail },
];

export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((event.clientX - rect.left - rect.width / 2) * 0.35);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.35);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

export function FloatingNav({ onTerminal }: { onTerminal: () => void }) {
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const activePath = hoveredPath ?? NAV_ITEMS.find((item) => item.anchor === location.hash.slice(1))?.anchor ?? "home";

  return (
    <div className="fixed inset-x-0 top-6 z-[100] hidden justify-center px-4 md:flex">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.15 }}
        className="flex w-fit max-w-full items-center gap-1 rounded-none border border-foreground/15 bg-background/90 px-2 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
        aria-label="Primary navigation"
        onMouseLeave={() => setHoveredPath(null)}
      >
        {NAV_ITEMS.map((item) => {
          const active = item.anchor === activePath;
          const Icon = item.icon;
          return (
            <Magnetic key={item.path}>
              <a href={`#${item.anchor}`} onMouseEnter={() => setHoveredPath(item.anchor)} aria-current={active ? "page" : undefined} className="relative flex select-none items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium">
                {active && <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-none bg-accent" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
                <span className={cn("relative z-10 font-mono text-[9px] tracking-widest transition-colors duration-300", active ? "text-primary-foreground/55" : "text-foreground/35")}>{item.shortLabel}</span>
                <Icon className={cn("relative z-10 size-4 transition-colors duration-300", active ? "text-primary-foreground" : "text-foreground/40")} aria-hidden="true" />
                <span className={cn("relative z-10 tracking-tight transition-colors duration-300", active ? "text-primary-foreground" : "text-foreground/80")}>{item.label}</span>
              </a>
            </Magnetic>
          );
        })}
        <Magnetic>
          <button type="button" onClick={onTerminal} aria-label="Open terminal" className="relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
            <Terminal className="size-4" aria-hidden="true" />
            <span className="font-mono text-[10px] tracking-widest">CLI</span>
          </button>
        </Magnetic>
      </motion.nav>
    </div>
  );
}
