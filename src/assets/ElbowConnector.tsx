import React, { useEffect, useState } from "react";

interface ElbowConnectorProps {
  sourceRef: React.RefObject<HTMLElement>;
  targetRef: React.RefObject<HTMLElement>;
  containerWidth: number;
  options?: {
    color?: string;
    strokeWidth?: number;
  };
}

const ElbowConnector: React.FC<ElbowConnectorProps> = ({
  sourceRef,
  targetRef,
  containerWidth,
  options = {},
}) => {
  const { color = "#FF0000", strokeWidth = 5 } = options;
  const [positions, setPositions] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  useEffect(() => {
    const updatePositions = () => {
      if (!sourceRef.current || !targetRef.current) return;

      const sourceRect = sourceRef.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();

      setPositions({
        x1: containerWidth, // Start at container width
        y1: sourceRect.top + sourceRect.height / 2,
        x2: targetRect.left,
        y2: targetRect.top + targetRect.height / 2,
      });
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);

    return () => {
      window.removeEventListener("resize", updatePositions);
    };
  }, [sourceRef, targetRef, containerWidth]);

  const renderElbowPath = () => {
    const { x1, y1, x2, y2 } = positions;
    const midY = y1 + 100; // Adjust vertical drop as needed

    return `
      M${x1},${y1} 
      H${x1 - 50} 
      V${midY}
      H${x2}
      V${y2}
    `;
  };

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      <path
        d={renderElbowPath()}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ElbowConnector;
