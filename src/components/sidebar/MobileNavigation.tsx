import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { items } from "@/data/menu";
import { useTheme } from "@/components/theme-provider";

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-background/70 backdrop-blur-md" onClick={() => setOpen(false)} aria-hidden="true" />}
      {open && <div className="fixed inset-x-5 bottom-24 z-50 rounded-3xl border border-foreground/10 bg-background/95 p-3 shadow-2xl backdrop-blur-xl" role="dialog" aria-label="Navigation menu">
        <div className="flex items-center justify-between px-3 pb-3 pt-2"><span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Navigate</span><button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-full p-2 hover:bg-foreground/10"><X className="size-4" /></button></div>
        <div className="grid grid-cols-2 gap-2">{items.map((item) => <Link key={item.title} to={item.url} className={`flex items-center gap-3 rounded-2xl px-4 py-4 text-sm font-medium ${location.pathname === item.url ? "bg-foreground text-background" : "bg-foreground/5 text-muted-foreground"}`}><item.icon className="size-4" />{item.title}</Link>)}</div>
      </div>}
      <nav className="fixed inset-x-4 bottom-4 z-50 md:hidden" aria-label="Mobile navigation">
        <div className="mx-auto flex max-w-md items-center justify-between rounded-2xl border border-foreground/10 bg-background/85 p-2 shadow-2xl shadow-foreground/10 backdrop-blur-xl">
          {items.slice(0, 4).map((item) => <Link key={item.title} to={item.url} aria-label={item.title} className={`flex size-11 items-center justify-center rounded-full transition-colors ${location.pathname === item.url ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}><item.icon className="size-4" /></Link>)}
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme" className="flex size-11 items-center justify-center rounded-full text-muted-foreground hover:text-foreground">{theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}</button>
          <button onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className={`flex size-11 items-center justify-center rounded-full ${open ? "bg-foreground text-background" : "text-muted-foreground"}`}><Menu className="size-4" /></button>
        </div>
      </nav>
    </>
  );
};

export default MobileNavigation;
