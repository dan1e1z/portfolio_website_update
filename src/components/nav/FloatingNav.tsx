import { useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Briefcase, Home, Layers, Mail, Terminal, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/navigation";

const NAV_ITEMS: NavItem[] = [
  { label: "Home", shortLabel: "00", path: "/", icon: Home },
  { label: "About", shortLabel: "01", path: "/about", icon: User },
  { label: "Projects", shortLabel: "02", path: "/projects", icon: Briefcase },
  { label: "Skills", shortLabel: "03", path: "/skills", icon: Layers },
  { label: "Contact", shortLabel: "04", path: "/contacts", icon: Mail },
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

  const activePath = hoveredPath ?? NAV_ITEMS.find((item) => item.path === location.pathname)?.path ?? "/";

  return (
    <div className="fixed inset-x-0 top-6 z-[100] hidden justify-center px-4 md:flex">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.15 }}
        className="flex w-fit max-w-full items-center gap-1 rounded-full border border-[#eee9cc]/10 bg-[#1c1915]/70 px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
        aria-label="Primary navigation"
        onMouseLeave={() => setHoveredPath(null)}
      >
        {NAV_ITEMS.map((item) => {
          const active = item.path === activePath;
          const Icon = item.icon;
          return (
            <Magnetic key={item.path}>
              <Link to={item.path} onMouseEnter={() => setHoveredPath(item.path)} aria-current={active ? "page" : undefined} className="relative flex select-none items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium">
                {active && <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-full bg-[#eee9cc]" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
                <span className={cn("relative z-10 font-mono text-[9px] tracking-widest transition-colors duration-300", active ? "text-[#1c1915]/55" : "text-[#eee9cc]/35")}>{item.shortLabel}</span>
                <Icon className={cn("relative z-10 size-4 transition-colors duration-300", active ? "text-[#1c1915]" : "text-[#eee9cc]/40")} aria-hidden="true" />
                <span className={cn("relative z-10 tracking-tight transition-colors duration-300", active ? "text-[#1c1915]" : "text-[#eee9cc]/80")}>{item.label}</span>
              </Link>
            </Magnetic>
          );
        })}
        <Magnetic>
          <button type="button" onClick={onTerminal} aria-label="Open terminal" className="relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-[#eee9cc]/80 transition-colors hover:text-[#eee9cc]">
            <Terminal className="size-4" aria-hidden="true" />
            <span className="font-mono text-[10px] tracking-widest">CLI</span>
          </button>
        </Magnetic>
      </motion.nav>
    </div>
  );
}
