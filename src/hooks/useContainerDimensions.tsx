import { useState, useEffect, useCallback, RefObject } from "react";

type Dimensions = {
  width: number;
  height: number;
};

const useContainerDimensions = (
  ref: RefObject<HTMLDivElement>,
): Dimensions | null => {
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

  const measure = useCallback(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const nextDimensions = {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };

    setDimensions((previous) =>
      previous?.width === nextDimensions.width &&
      previous.height === nextDimensions.height
        ? previous
        : nextDimensions,
    );
  }, [ref]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(() => {
      measure();
    });

    observer.observe(ref.current);

    // Initial measurement
    measure();

    return () => {
      observer.disconnect();
    };
  }, [ref, measure]);

  return dimensions;
};

export default useContainerDimensions;
