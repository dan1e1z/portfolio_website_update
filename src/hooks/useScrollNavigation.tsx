import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "@/components/SmoothScroll";

export const useScrollNavigation = (
  _scrollRef: unknown,
  projects: { id: string | number }[],
  searchPrefix: string = "",
) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      for (const item of projects) {
        const element = document.getElementById(`${searchPrefix}${item.id}`);
        if (element && element.getBoundingClientRect().top >= 0 && element.getBoundingClientRect().top <= window.innerHeight) {
          window.history.replaceState({}, "", `${location.pathname}?${searchPrefix}=${searchPrefix}${item.id}`);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [projects, searchPrefix, location.pathname]);

  useEffect(() => {
    const projectId = new URLSearchParams(location.search).get(searchPrefix);
    const targetElement = projectId ? document.getElementById(projectId) : null;
    if (!targetElement) return;

    const top = targetElement.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2;
    if (lenis) {
      lenis.scrollTo(top, { offset: 0 });
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [location.search, searchPrefix, lenis]);

  return { scrollProgress };
};
