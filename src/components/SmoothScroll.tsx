import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";

type LenisInstance = Lenis | null;
const LenisContext = createContext<LenisInstance>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisInstance>(null);
  const reducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.15,
      easing: (time) => 1 - Math.pow(1 - time, 4),
      smoothWheel: true,
      syncTouch: true,
      wrapper: window,
      content: document.documentElement,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const handleResize = () => lenis.resize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>;
}
