import { useTheme } from "@/components/theme-provider";
import { Square } from "lucide-react";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const { state } = useSidebar();

  return (
    <SidebarMenuItem>
      <div
        className={`flex ${state === "expanded" ? "flex-row justify-between w-full pl-1 pr-1 pt-2" : " pt-4 flex-col items-center justify-center w-full space-y-6 "}`}
      >
        {/* Light Mode Toggle */}
        <div className="flex flex-col items-center space-y-1">
          <span
            className={`text-xs transform ${state === "expanded" ? "" : "-rotate-90"}`}
          >
            Light
          </span>
          <div className="flex items-center">
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
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex flex-col items-center space-y-1">
          <span
            className={`text-xs transform ${state === "expanded" ? "" : "-rotate-90"}`}
          >
            Dark
          </span>
          <div className="flex items-center">
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
      </div>
    </SidebarMenuItem>
  );
}
