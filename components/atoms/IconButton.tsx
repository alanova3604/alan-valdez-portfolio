import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type IconButtonProps = ComponentProps<"button"> & {
  // Icon-only buttons need an accessible name.
  "aria-label": string;
};

// Round action with an icon only (send).
export function IconButton({ className, type = "button", children, ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-pill bg-accent text-accent-foreground transition-colors",
        "hover:bg-accent-hover",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children ?? <Icon name="send" />}
    </button>
  );
}
