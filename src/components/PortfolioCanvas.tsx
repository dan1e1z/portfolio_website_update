import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Projects = lazy(() => import("@/pages/Projects"));
const Contacts = lazy(() => import("@/pages/Contacts"));
const Skills = lazy(() => import("@/pages/Skills"));

const CHAPTERS = [
  { id: "home", label: "Home", number: "00", Page: Home },
  { id: "about", label: "About", number: "01", Page: About },
  { id: "projects", label: "Projects", number: "02", Page: Projects },
  { id: "skills", label: "Skills", number: "03", Page: Skills },
  { id: "contacts", label: "Contact", number: "04", Page: Contacts },
] as const;

export default function PortfolioCanvas() {
  const location = useLocation();
  const [active, setActive] = useState(location.hash.slice(1) || "home");

  useEffect(() => {
    const update = () => setActive(location.hash.slice(1) || "home");
    window.addEventListener("hashchange", update);
    update();
    return () => window.removeEventListener("hashchange", update);
  }, [location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-35% 0px -55%", threshold: 0 },
    );
    const sections = CHAPTERS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = location.hash.slice(1);
    if (target) document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  return (
    <div className="relative w-full scroll-smooth">
      <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex" aria-label="Page progress">
        {CHAPTERS.map(({ id }) => <span key={id} className={`h-8 w-px transition-colors ${active === id ? "bg-primary" : "bg-foreground/20"}`} />)}
      </div>
      {CHAPTERS.map(({ id, Page }) => (
        <section key={id} id={id} className="relative min-h-svh scroll-mt-6 border-b border-foreground/10 py-10 md:py-16 last:border-b-0">
          <Suspense fallback={<LoadingSpinner />}><Page /></Suspense>
        </section>
      ))}
    </div>
  );
}

export { CHAPTERS };
