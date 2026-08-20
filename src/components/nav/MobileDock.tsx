import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Home, Layers, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/navigation";

const NAV_ITEMS: NavItem[] = [
  { label: "Home", shortLabel: "00", path: "/", icon: Home },
  { label: "About", shortLabel: "01", path: "/about", icon: User },
  { label: "Work", shortLabel: "02", path: "/projects", icon: Briefcase },
  { label: "Skills", shortLabel: "03", path: "/skills", icon: Layers },
  { label: "Contact", shortLabel: "04", path: "/contacts", icon: Mail },
];

export function MobileDock() {
  const location = useLocation();
  return (
    <motion.nav initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.2 }} className="fixed bottom-4 left-1/2 z-[100] -translate-x-1/2 md:hidden" aria-label="Primary navigation">
      <div className="flex items-center gap-0.5 rounded-full border border-[#eee9cc]/10 bg-[#1c1915]/80 px-1.5 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path} aria-label={item.label} aria-current={active ? "page" : undefined} className="relative flex size-14 flex-col items-center justify-center rounded-full">
              {active && <motion.div layoutId="dock-pill" className="absolute inset-0 rounded-full bg-[#eee9cc]/10" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
              <Icon className={cn("relative z-10 size-[18px] transition-colors duration-300", active ? "text-[#eee9cc]" : "text-[#eee9cc]/40")} aria-hidden="true" />
              <span className={cn("relative z-10 mt-1 font-mono text-[9px] tracking-wide transition-colors duration-300", active ? "text-[#eee9cc]" : "text-[#eee9cc]/40")}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
