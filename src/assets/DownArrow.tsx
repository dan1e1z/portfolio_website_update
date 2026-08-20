import * as React from "react";

// By: tabler
// See: https://v0.app/icon/tabler/arrow-narrow-down
// Example: <IconTablerArrowNarrowDown width="24px" height="24px" style={{color: "#eee9cc"}} />

export const DownArrow = ({
  height = "1em",
  strokeWidth = "2",
  fill = "none",
  focusable = "false",
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children">) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height}
    focusable={focusable}
    {...props}
  >
    <path
      fill={fill}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M12 5v14m4-4l-4 4m-4-4l4 4"
    />
  </svg>
);
