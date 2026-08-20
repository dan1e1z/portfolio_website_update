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
    <div className="fixed inset-x-0 bottom-6 z-[100] flex justify-center px-4 md:hidden">
      <motion.nav initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.2 }} className="max-w-full" aria-label="Primary navigation">
        <div className="flex max-w-full items-center gap-1 rounded-full border border-foreground/10 bg-background/70 px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        {NAV_ITEMS.map((item) => {
          const active = location.hash.slice(1) === item.anchor || (!location.hash && item.anchor === "home");
          const Icon = item.icon;
          return (
            <Magnetic key={item.path}>
            <a href={`#${item.anchor}`} aria-label={item.label} aria-current={active ? "page" : undefined} className="relative flex size-14 flex-col items-center justify-center rounded-full px-2">
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
