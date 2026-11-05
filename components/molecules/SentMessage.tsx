"use client";

import { useLayoutEffect, useRef } from "react";
import { useChat, type SentQuestion } from "@/components/molecules/ChatProvider";

// Seconds the message takes to rise from the input to the top.
const RISE_SECONDS = 0.5;
// Smooth start and end. A sharp ease-out would make it look like it jumps to the top.
const RISE = "cubic-bezier(0.4, 0, 0.2, 1)";

// The last question as a chat bubble at the top. It rises from the input, the way a sent message does in a chat.
export function SentMessage() {
  const { sent } = useChat();

  return sent ? <Message key={sent.id} sent={sent} /> : null;
}

function Message({ sent }: { sent: SentQuestion }) {
  const { markDelivered } = useChat();
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const message = ref.current;
    if (!message) return;
    if (!sent.from) {
      markDelivered();
      return;
    }

    // The message sits at its place at the top. Start it over the input and let it rise from there.
    const rect = message.getBoundingClientRect();
    // Its bottom-left corner starts on the input's bottom-left corner, and it ends at the top right.
    const x = sent.from.left - rect.left;
    const y = sent.from.bottom - rect.bottom;

    const flight = message.animate(
      [
        { transform: `translate(${x}px, ${y}px)`, opacity: 0 },
        { transform: "translate(0, 0)", opacity: 1 },
      ],
      { duration: RISE_SECONDS * 1000, easing: RISE, fill: "both" },
    );
    // The orb comes back beside the answer once the message has landed.
    flight.onfinish = markDelivered;
    return () => flight.cancel();
  }, [sent, markDelivered]);

  return (
    <p ref={ref} className="max-w-[80%] rounded-card bg-foreground px-4 py-3 font-sans text-body text-background">
      {sent.text}
    </p>
  );
}
