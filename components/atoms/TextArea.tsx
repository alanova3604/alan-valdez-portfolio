import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// Multi-line text field. It starts one line tall; the parent sets its height as the text grows.
export function TextArea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      rows={1}
      className={cn(
        "block w-full resize-none rounded-card border border-input bg-surface px-4 py-3 font-sans text-body text-foreground transition-colors [scrollbar-width:none]",
        "placeholder:text-muted-foreground",
        "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 focus-visible:outline-none",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
