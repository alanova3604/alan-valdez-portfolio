import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Typewriter } from "@/components/atoms/Typewriter";

type HeaderProps = {
  // Optional small line above the title.
  eyebrow?: string;
  title: string;
  // Optional text under the title.
  children?: ReactNode;
  className?: string;
};

// Top of every screen. Default on first load. The eyebrow and title type in one after the other.
export function Header({ eyebrow, title, children, className }: HeaderProps) {
  return (
    <header className={cn("flex flex-col gap-3 text-left", className)}>
      {eyebrow && (
        <p className="font-sans text-label tracking-[0.08em] text-muted-foreground uppercase">
          <Typewriter text={eyebrow} duration={0.6} />
        </p>
      )}
      <h1 className="max-w-[960px] font-display text-title text-balance text-foreground">
        <Typewriter text={title} delay={0.3} duration={0.9} />
      </h1>
      {children}
    </header>
  );
}
