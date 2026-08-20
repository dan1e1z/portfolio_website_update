import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Instagram, Linkedin, Moon, Sun, Terminal } from "lucide-react";
import { items } from "@/data/menu";
import { useTheme } from "@/components/theme-provider";

interface DesktopSidebarProps {
  isTerminalVisible: boolean;
  toggleTerminal: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  isTerminalVisible,
  toggleTerminal,
}) => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-24 border-r border-foreground/10 bg-background/55 px-3 py-6 backdrop-blur-2xl md:flex md:flex-col lg:w-28 lg:px-4" aria-label="Primary navigation">
      <div className="flex flex-col items-center gap-5">
        <Link to="/" aria-label="Daniel Lindsay Shad home" className="group flex flex-col items-center gap-2">
          <span className="flex size-11 items-center justify-center rounded-2xl border border-foreground/15 bg-foreground text-sm font-bold tracking-tight text-background shadow-lg shadow-foreground/10 transition-transform duration-300 group-hover:-rotate-6">DL</span>
          <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Portfolio</span>
        </Link>
        <div className="h-px w-8 bg-foreground/15" />
      </div>

      <nav className="mt-8 flex flex-1 flex-col items-center gap-2" aria-label="Pages">
        {items.map((item, index) => {
          const active = location.pathname === item.url;
          return (
            <Link key={item.title} to={item.url} aria-current={active ? "page" : undefined} className={`group relative flex w-full flex-col items-center gap-1 rounded-2xl px-2 py-3 transition-all duration-300 ${active ? "bg-foreground text-background shadow-lg shadow-foreground/10" : "text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"}`}>
              <span className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full transition-all ${active ? "bg-foreground" : "bg-transparent group-hover:bg-foreground/40"}`} />
              <item.icon className="size-4" aria-hidden="true" />
              <span className="text-[10px] font-medium tracking-wide">{String(index + 1).padStart(2, "0")}</span>
              <span className="sr-only">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-2 border-t border-foreground/10 pt-4">
        <button onClick={toggleTerminal} aria-label="Open terminal" aria-pressed={isTerminalVisible} className="flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"><Terminal className="size-4" /></button>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme" className="flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground">{theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}</button>
        <div className="mt-2 flex flex-col items-center gap-2 text-muted-foreground">
          <a href="https://github.com/dan1e1z" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-foreground"><Github className="size-3.5" /></a>
          <a href="https://www.linkedin.com/in/daniel-lindsay-shad-148073224/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-foreground"><Linkedin className="size-3.5" /></a>
          <a href="https://www.instagram.com/daniel_lindsayshad/" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-colors hover:text-foreground"><Instagram className="size-3.5" /></a>
        </div>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
