import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// Single-line text field. The field only: the send button belongs to InputBar.
export function InputField({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      type="text"
      className={cn(
        "h-12 w-[300px] max-w-full rounded-pill border border-input bg-surface px-4 font-sans text-body text-foreground transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 focus-visible:outline-none",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
