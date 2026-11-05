import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type SuggestionCardProps = ComponentProps<"button"> & {
  icon: IconName;
  label: string;
  // One short line with a small icon. Used once the visitor has asked a question.
  compact?: boolean;
};

// Suggested prompt shown as a tile: the icon sits on top, the label below. Compact turns it into one line.
export function SuggestionCard({
  className,
  icon,
  label,
  compact = false,
  type = "button",
  ...props
}: SuggestionCardProps) {
  return (
    <button
      type={type}
      className={cn(
        "rounded-card bg-surface text-left font-sans text-foreground transition-all",
        compact
          ? "flex h-11 shrink-0 items-center gap-2 px-4 text-caption whitespace-nowrap"
          : "flex h-40 w-[200px] shrink-0 flex-col justify-between p-4 text-body",
        "hover:bg-surface-hover",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {compact ? (
        <Icon name={icon} />
      ) : (
        <span className="flex size-12 items-center justify-center rounded-pill bg-surface-hover">
          <Icon name={icon} />
        </span>
      )}
      <span>{label}</span>
    </button>
  );
}
