import { cn } from "@/lib/cn";

type AvatarProps = {
  // Announced to screen readers. The orb itself is decorative.
  name: string;
  // Turns faster while the assistant is preparing an answer.
  active?: boolean;
  // Grows and shrinks while the answer is being typed out.
  pulsing?: boolean;
  // A smaller orb, used beside the answer.
  small?: boolean;
  className?: string;
};

// Round profile mark: a gradient orb that turns slowly, like a voice assistant's idle state. It turns faster while active and pulses while pulsing. It stops when reduced motion is on.
export function Avatar({ name, active = false, pulsing = false, small = false, className }: AvatarProps) {
  return (
    <span
      role="img"
      aria-label={name}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-pill bg-background",
        small ? "size-8 md:size-10" : "size-14 md:size-20",
        pulsing && "animate-orb-pulse motion-reduce:animate-none",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-[-50%] bg-orb blur-[6px] motion-reduce:animate-none",
          active ? "animate-orb-fast" : "animate-orb",
        )}
      />
    </span>
  );
}
