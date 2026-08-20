// WORKING
// import { useState, useEffect, RefObject } from "react";
//
// interface MousePosition {
//   mouseX: number;
//   mouseY: number;
// }
//
// // Changed from interface to type since we're just aliasing a RefObject
// type UseMousePositionProps = RefObject<HTMLDivElement>;
//
// const useMousePosition = (
//   containerRef: UseMousePositionProps,
// ): MousePosition => {
//   const [mousePosition, setMousePosition] = useState<MousePosition>({
//     mouseX: 0,
//     mouseY: 0,
//   });
//
//   const updateMousePosition = (e: MouseEvent): void => {
//     if (!containerRef.current) return;
//
//     // Get the container's bounding rectangle
//     const rect = containerRef.current.getBoundingClientRect();
//
//     // Calculate position relative to the container
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;
//
//     setMousePosition({ mouseX, mouseY });
//   };
//
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
//
//     container.addEventListener("mousemove", updateMousePosition);
//
//     return () => {
//       container.removeEventListener("mousemove", updateMousePosition);
//     };
//   }, [containerRef]); // Added containerRef to dependency array
//
//   return mousePosition;
// };
//
// export default useMousePosition;

// TEST1
import { useState, useEffect, RefObject } from "react";

interface MousePosition {
  mouseX: number;
  mouseY: number;
}

type UseMousePositionProps = RefObject<HTMLDivElement>;

const useMousePosition = (
  containerRef: UseMousePositionProps,
): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    mouseX: 0,
    mouseY: 0,
  });

  const updatePosition = (clientX: number, clientY: number): void => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    setMousePosition({ mouseX, mouseY });
  };

  const handleMouseMove = (e: MouseEvent): void => {
    updatePosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent): void => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return mousePosition;
};

export default useMousePosition;
