"use client";

import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/atoms/FadeIn";
import { SuggestionCard } from "@/components/atoms/SuggestionCard";
import type { IconName } from "@/components/atoms/Icon";
import { useChat } from "@/components/molecules/ChatProvider";

// Seconds between one card appearing and the next.
const STAGGER = 0.15;

export type Suggestion = {
  label: string;
  icon: IconName;
};

type SuggestionCardsProps = {
  suggestions: Suggestion[];
  // Seconds before the first card appears.
  delay?: number;
  className?: string;
};

// A horizontal row of SuggestionCards. It bleeds to the screen edge so the last card is cut off, which signals scrolling.
// Clicking a card sends its label as the question. After the first question the cards shrink to one line each.
export function SuggestionCards({ suggestions, delay = 0, className }: SuggestionCardsProps) {
  const { hasAsked, ask } = useChat();

  return (
    <div
      className={cn(
        "-mx-4 flex snap-x items-start gap-3 overflow-x-auto px-4 scroll-px-4 md:-mx-6 md:px-6 md:scroll-px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {suggestions.map((suggestion, index) => (
        <FadeIn key={suggestion.label} delay={delay + index * STAGGER} className="shrink-0 snap-start">
          <SuggestionCard
            icon={suggestion.icon}
            label={suggestion.label}
            compact={hasAsked}
            onClick={(event) => ask(suggestion.label, event.currentTarget.getBoundingClientRect())}
          />
        </FadeIn>
      ))}
    </div>
  );
}
