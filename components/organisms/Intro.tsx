"use client";

import { AnimatePresence, motion } from "motion/react";
import { Typewriter } from "@/components/atoms/Typewriter";
import { typingSeconds, useChat } from "@/components/molecules/ChatProvider";
import { Header } from "@/components/organisms/Header";

// Each view fades in and out. The title and greeting leave first, then the answer types in.
const FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6 },
};

// The main text of the screen: the greeting before a question, then loading, the answer, or an error.
export function Intro() {
  const { answer, error, loading } = useChat();
  // While loading, the orb and its status line take over, so the text area stays empty.
  const view = loading ? "waiting" : error ? "error" : answer ? "answer" : "intro";

  return (
    <AnimatePresence mode="wait">
      {view === "intro" && (
        <motion.div key="intro" {...FADE}>
          <Header title="Hi! I’m Nova">
            <p className="font-sans text-subtitle text-muted-foreground">
              <Typewriter
                text="Ask me anything about Alan’s work, or where to start."
                delay={1}
                duration={1.2}
              />
            </p>
          </Header>
        </motion.div>
      )}
      {view === "error" && (
        <motion.p
          key="error"
          {...FADE}
          role="alert"
          className="font-sans text-subtitle text-foreground"
        >
          {error}
        </motion.p>
      )}
      {view === "answer" && answer && (
        <motion.p
          key={answer}
          {...FADE}
          aria-live="polite"
          className="font-sans text-subtitle text-foreground"
        >
          <Typewriter text={answer} duration={typingSeconds(answer)} />
        </motion.p>
      )}
    </AnimatePresence>
  );
}
