"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

type ChatResponse = { text?: string; error?: string };

export type SentQuestion = {
  id: number;
  text: string;
  // Where the input was when the question was sent, so the message can travel up from there.
  from: DOMRect | null;
};

type ChatContextValue = {
  // The answer to the last question, once it has arrived.
  answer: string | null;
  // A message to show when the last question failed.
  error: string | null;
  // True while the question is on its way to the server.
  loading: boolean;
  // True once the visitor has sent at least one question.
  hasAsked: boolean;
  // The last question, shown as a message at the top until the next one is sent.
  sent: SentQuestion | null;
  // True once the first question has reached the top. From then on the orb stays beside the answer.
  delivered: boolean;
  // Called by the message when it lands at the top.
  markDelivered: () => void;
  // Sends a question. Resolves to true when an answer arrived.
  ask: (question: string, from?: DOMRect | null) => Promise<boolean>;
};

const ChatContext = createContext<ChatContextValue | null>(null);

// The loading state stays on screen at least this long, so the visitor sees it even when the answer is quick.
const MIN_LOADING_MS = 2500;

// Seconds the answer takes to type out. Longer answers take longer, with a minimum.
export function typingSeconds(text: string) {
  return Math.max(1, text.length * 0.022);
}

// Holds the conversation so the input and the screen can both read it.
export function ChatProvider({ children }: { children: ReactNode }) {
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);
  const [sent, setSent] = useState<SentQuestion | null>(null);
  const [delivered, setDelivered] = useState(false);
  const markDelivered = useCallback(() => setDelivered(true), []);
  // Counts the questions sent. Only the newest one may change the screen, so an older answer that arrives late is dropped.
  const latest = useRef(0);

  async function ask(question: string, from: DOMRect | null = null) {
    const request = ++latest.current;
    setHasAsked(true);
    setSent({ id: Date.now(), text: question, from });
    setLoading(true);
    setAnswer(null);
    setError(null);

    const minimumWait = new Promise((resolve) => setTimeout(resolve, MIN_LOADING_MS));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data: ChatResponse = await response.json();
      await minimumWait;
      // A newer question was sent meanwhile. Its answer is the one to show.
      if (request !== latest.current) return true;

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSent(null);
        return false;
      }

      setAnswer(data.text ?? null);
      return true;
    } catch {
      await minimumWait;
      if (request !== latest.current) return true;
      setError("Couldn't connect. Please try again.");
      setSent(null);
      return false;
    } finally {
      if (request === latest.current) setLoading(false);
    }
  }

  return (
    <ChatContext.Provider value={{ answer, error, loading, hasAsked, sent, delivered, markDelivered, ask }}>{children}</ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used inside ChatProvider");
  return context;
}
