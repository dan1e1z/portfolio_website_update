import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Home, Layers, Mail, User } from "lucide-react";
import { Magnetic } from "@/components/nav/FloatingNav";
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
    <div className="fixed inset-x-0 bottom-6 z-[100] flex justify-center px-4 md:hidden">
      <motion.nav initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.2 }} className="max-w-full" aria-label="Primary navigation">
        <div className="flex max-w-full items-center gap-1 rounded-full border border-[#eee9cc]/10 bg-[#1c1915]/70 px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Magnetic key={item.path}>
            <Link to={item.path} aria-label={item.label} aria-current={active ? "page" : undefined} className="relative flex size-14 flex-col items-center justify-center rounded-full px-2">
              {active && <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-full bg-[#eee9cc]" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
              <Icon className={cn("relative z-10 size-[18px] transition-colors duration-300", active ? "text-[#1c1915]" : "text-[#eee9cc]/40")} aria-hidden="true" />
              <span className={cn("relative z-10 mt-1 font-mono text-[9px] tracking-wide transition-colors duration-300", active ? "text-[#1c1915]" : "text-[#eee9cc]/40")}>{item.label}</span>
            </Link>
            </Magnetic>
          );
        })}
        </div>
      </motion.nav>
    </div>
  );
}
