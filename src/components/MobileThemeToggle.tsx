import React from "react";
import { useTheme } from "@/components/theme-provider";
import { Square } from "lucide-react";

interface MobileThemeToggleProps {
  className?: string;
}

export const MobileThemeToggle: React.FC<MobileThemeToggleProps> = ({
  className = "",
}) => {
  const { theme, setTheme } = useTheme();

  return (
    // <div className={`flex items-center justify-center space-x-4 ${className}`}>
    <div className={`${className}`}>
      {/* Light Mode Toggle */}
      <div className="flex items-center space-x-2">
        <span className="text-xs">Light</span>
        <button
          onClick={() => setTheme("light")}
          className="text-lg leading-none h-6 w-6 flex items-center justify-center"
        >
          <Square
            className={`h-4 w-4 ${theme === "light" ? "fill-current" : "fill-foreground"}`}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center space-x-[9px]">
        <span className="text-xs">Dark</span>
        <button
          onClick={() => setTheme("dark")}
          className="text-lg leading-none h-6 w-6 flex items-center justify-center"
        >
          <Square
            className={`h-4 w-4 ${theme === "dark" ? "fill-background" : ""}`}
            strokeWidth={2}
          />
        </button>
      </div>
    </div>
  );
};
