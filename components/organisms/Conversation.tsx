"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useChat } from "@/components/molecules/ChatProvider";

// The main column under the profile. Once a question is sent, it starts lower so the message at the top has room above the answer.
export function Conversation({ children }: { children: ReactNode }) {
  const { hasAsked } = useChat();

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[1248px] flex-1 px-4 md:px-6",
        hasAsked ? "pt-32" : "pt-16",
      )}
    >
      {children}
    </div>
  );
}
