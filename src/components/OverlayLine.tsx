// import React from "react";
//
// interface Point {
//   x: string; // Percentage value (e.g., '70%')
//   y: string; // Percentage value (e.g., '0%')
// }
//
// interface DiagonalLineProps {
//   top: Point;
//   bottom: Point;
//   colour?: string;
//   thickness?: string;
//   style?: React.CSSProperties;
// }
//
// const OverlayLine: React.FC<DiagonalLineProps> = ({
//   top = 0,
//   bottom = 0,
//   colour = "#eee9cc",
//   thickness = "1px",
// }) => {
//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         overflow: "hidden",
//       }}
//     >
//       <svg
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         <line
//           x1={top.x}
//           y1={top.y}
//           x2={bottom.x}
//           y2={bottom.y}
//           stroke={colour}
//           strokeWidth={thickness}
//         />
//       </svg>
//     </div>
//   );
// };
//
// export default OverlayLine;

import React from "react";

interface Point {
  x: string; // Percentage value (e.g., '70%')
  y: string; // Percentage value (e.g., '0%')
}

interface DiagonalLineProps {
  top: Point;
  bottom: Point;
  colour?: string;
  thickness?: string;
  style?: React.CSSProperties;
}

const defaultProps: Partial<DiagonalLineProps> = {
  colour: "#eee9cc",
  thickness: "1px",
};

const OverlayLine: React.FC<DiagonalLineProps> = ({
  top,
  bottom,
  colour = defaultProps.colour,
  thickness = defaultProps.thickness,
  style,
}) => {
  const baseStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    ...style,
  };

  const svgStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  return (
    <div style={baseStyle}>
      <svg style={svgStyle}>
        <line
          x1={top.x}
          y1={top.y}
          x2={bottom.x}
          y2={bottom.y}
          stroke={colour}
          strokeWidth={thickness}
        />
      </svg>
    </div>
  );
};

export type { Point, DiagonalLineProps };
export default OverlayLine;
