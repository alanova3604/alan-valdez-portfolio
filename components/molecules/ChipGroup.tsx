"use client";

import { cn } from "@/lib/cn";
import { Chip } from "@/components/atoms/Chip";
import { FadeIn } from "@/components/atoms/FadeIn";

// Seconds between one chip appearing and the next.
const STAGGER = 0.15;

type ChipGroupProps = {
  labels: string[];
  // The label currently shown in the response area, if any.
  selected?: string;
  onSelect?: (label: string) => void;
  // Seconds before the first chip appears.
  delay?: number;
  className?: string;
};

// A wrapping row of Chips. Each chip dissolves in one after another.
export function ChipGroup({ labels, selected, onSelect, delay = 0, className }: ChipGroupProps) {
  return (
    <div className={cn("flex w-full flex-wrap items-start gap-2", className)}>
      {labels.map((label, index) => (
        <FadeIn key={label} delay={delay + index * STAGGER}>
          <Chip selected={label === selected} onClick={() => onSelect?.(label)}>
            {label}
          </Chip>
        </FadeIn>
      ))}
    </div>
  );
}
