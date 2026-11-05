import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/atoms/FadeIn";
import { InputBar } from "@/components/molecules/InputBar";
import { SuggestionCards, type Suggestion } from "@/components/molecules/SuggestionCards";

// The header finishes typing at 3.4s. The cards come in first, then the input.
const CARDS_DELAY = 2.2;
const INPUT_DELAY = 2.7;

type BottomBarProps = {
  suggestions: Suggestion[];
  className?: string;
};

// Where the visitor acts: suggested prompts above, free question below.
export function BottomBar({ suggestions, className }: BottomBarProps) {
  return (
    <footer className={cn("pt-6 pb-4 md:pb-6", className)}>
      <div className="mx-auto flex w-full max-w-[1248px] flex-col gap-4 px-4 md:px-6">
        <SuggestionCards suggestions={suggestions} delay={CARDS_DELAY} />
        <FadeIn delay={INPUT_DELAY}>
          <InputBar />
        </FadeIn>
      </div>
    </footer>
  );
}
