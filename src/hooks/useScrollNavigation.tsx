import { useState, useEffect, RefObject } from "react";
import { useLocation } from "react-router-dom";

export const useScrollNavigation = (
  scrollRef: RefObject<HTMLDivElement>,
  projects: { id: string | number }[],
  searchPrefix: string = "",
) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = scrollRef.current;
        const scrollableHeight = scrollHeight - clientHeight;
        const progress =
          scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
        setScrollProgress(Math.min(100, Math.max(0, progress)));

        for (const item of projects) {
          const element = document.getElementById(`${searchPrefix}${item.id}`);
          if (
            element &&
            element.getBoundingClientRect().top >= 0 &&
            element.getBoundingClientRect().top <= window.innerHeight
          ) {
            // Only update URL if current location matches
            const currentPath = location.pathname;
            window.history.replaceState(
              {},
              "",
              currentPath + `?${searchPrefix}=${searchPrefix}${item.id}`,
            );
            break;
          }
        }
      }
    };

    const currentRef = scrollRef.current;
    currentRef?.addEventListener("scroll", handleScroll);
    return () => currentRef?.removeEventListener("scroll", handleScroll);
  }, [projects, searchPrefix, location.pathname]);

  useEffect(() => {
    const projectId = new URLSearchParams(location.search).get(searchPrefix);
    if (projectId && scrollRef.current) {
      const targetElement = document.getElementById(projectId);
      targetElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [location.search, searchPrefix]);

  return { scrollProgress };
};
