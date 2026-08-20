import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#eee9cc]/10 bg-[#eee9cc]/[0.04] backdrop-blur-xl",
        "transition-all duration-500 hover:border-[#eee9cc]/25 hover:bg-[#eee9cc]/[0.07]",
        "hover:shadow-[0_0_40px_rgba(238,233,204,0.06)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
