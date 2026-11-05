"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  // Seconds before typing starts.
  delay?: number;
  // Seconds to type the whole text.
  duration?: number;
  className?: string;
};

// Types the text in on load. The full text stays in the DOM, hidden past the
// typed part, so the layout does not shift and screen readers get the whole text.
export function Typewriter({ text, delay = 0, duration = 1, className }: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const controls = animate(0, text.length, {
      duration,
      delay,
      ease: "linear",
      onUpdate: (latest) => setCount(Math.round(latest)),
    });

    return () => controls.stop();
  }, [text, delay, duration, reduceMotion]);

  const shown = reduceMotion ? text.length : count;

  return (
    <span className={className}>
      {text.slice(0, shown)}
      <span className="invisible">{text.slice(shown)}</span>
    </span>
  );
}
