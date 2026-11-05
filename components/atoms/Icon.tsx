import { ArrowUp, ArrowUpRight, Building2, FolderOpen, type LucideIcon, Send, UserRound } from "lucide-react";
import { cn } from "@/lib/cn";

const icons = {
  "arrow-up": ArrowUp,
  "arrow-up-right": ArrowUpRight,
  building: Building2,
  "folder-open": FolderOpen,
  send: Send,
  user: UserRound,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  className?: string;
};

// 20px stroke icon. Its colour follows the text colour of its parent.
export function Icon({ name, className }: IconProps) {
  const LucideComponent = icons[name];

  return <LucideComponent size={20} strokeWidth={1.75} className={cn("shrink-0", className)} />;
}
