import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ChipProps = ComponentProps<"button"> & {
  // Selected = the prompt currently shown in the response area.
  selected?: boolean;
};

// Suggested prompt.
export function Chip({ className, selected = false, type = "button", children, ...props }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-11 shrink-0 items-center justify-center rounded-pill border border-border bg-surface px-4 font-sans text-caption whitespace-nowrap text-foreground transition-colors",
        "hover:bg-surface-hover",
        "aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-accent-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
