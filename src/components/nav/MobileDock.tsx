import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Home, Layers, Mail, User } from "lucide-react";
import { Magnetic } from "@/components/nav/FloatingNav";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/navigation";

const NAV_ITEMS: (NavItem & { anchor: string })[] = [
  { label: "Home", shortLabel: "00", path: "/", anchor: "home", icon: Home },
  { label: "About", shortLabel: "01", path: "/about", anchor: "about", icon: User },
  { label: "Work", shortLabel: "02", path: "/projects", anchor: "projects", icon: Briefcase },
  { label: "Skills", shortLabel: "03", path: "/skills", anchor: "skills", icon: Layers },
  { label: "Contact", shortLabel: "04", path: "/contacts", anchor: "contacts", icon: Mail },
];

export function MobileDock() {
  const location = useLocation();
  return (
    <div className="fixed inset-x-0 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[100] flex justify-center px-[clamp(0.5rem,4vw,1rem)] md:hidden">
      <motion.nav initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.2 }} className="max-w-full" aria-label="Primary navigation">
        <div className="flex max-w-full items-center gap-[clamp(0.125rem,1vw,0.3rem)] rounded-full border border-foreground/10 bg-background/70 p-[clamp(0.3rem,1.5vw,0.5rem)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        {NAV_ITEMS.map((item) => {
          const active = location.hash.slice(1) === item.anchor || (!location.hash && item.anchor === "home");
          const Icon = item.icon;
          return (
            <Magnetic key={item.path}>
            <a href={`#${item.anchor}`} aria-label={item.label} aria-current={active ? "page" : undefined} className="relative flex size-[clamp(2.75rem,15vw,3.5rem)] shrink-0 flex-col items-center justify-center rounded-full px-1">
              {active && <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
              <Icon className={cn("relative z-10 size-[18px] transition-colors duration-300", active ? "text-primary-foreground" : "text-foreground/40")} aria-hidden="true" />
              <span className={cn("relative z-10 mt-1 font-mono text-[9px] tracking-wide transition-colors duration-300", active ? "text-primary-foreground" : "text-foreground/40")}>{item.label}</span>
            </a>
            </Magnetic>
          );
        })}
        </div>
      </motion.nav>
    </div>
  );
}
