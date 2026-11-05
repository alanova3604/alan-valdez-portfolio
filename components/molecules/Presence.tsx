"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { typingSeconds, useChat } from "@/components/molecules/ChatProvider";

// Phrases shown next to the orb while the answer is being prepared.
const PHRASES = ["Thinking...", "Searching Alan's work...", "Writing the answer..."];
// Seconds each phrase stays on screen.
const PHRASE_INTERVAL_MS = 1200;
const FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 },
};

// The orb with a status line beside it. The line changes while the answer is being prepared,
// and the orb pulses while the answer is typed out.
export function Presence() {
  const { answer, loading, hasAsked, delivered } = useChat();
  // After a question is sent the orb fades out, then comes back smaller once the message has landed.
  const visible = !hasAsked || delivered;
  const [index, setIndex] = useState(0);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    if (!loading) return;
    setIndex(0);
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % PHRASES.length);
    }, PHRASE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    if (!answer) return;
    // The answer appears as soon as it arrives, so the orb pulses from that same moment.
    setPulsing(true);
    const stop = setTimeout(() => setPulsing(false), typingSeconds(answer) * 1000);
    return () => {
      clearTimeout(stop);
      setPulsing(false);
    };
  }, [answer]);

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: visible ? 1.5 : 0.3 }}
      aria-hidden={!visible}
      className="flex items-center gap-4"
    >
      <div className="animate-rise motion-reduce:animate-none" style={{ animationDelay: "0.2s" }}>
        <Avatar name="Alan Valdez" active={loading} pulsing={pulsing} small={delivered} />
      </div>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.p
            key={PHRASES[index]}
            {...FADE}
            aria-live="polite"
            className="font-sans text-subtitle text-muted-foreground"
          >
            {PHRASES[index]}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
