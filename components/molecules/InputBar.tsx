"use client";

import { useEffect, useRef, useState, type ChangeEvent, type ComponentProps, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/atoms/IconButton";
import { TextArea } from "@/components/atoms/TextArea";
import { useChat } from "@/components/molecules/ChatProvider";

// Longest question the chat accepts. Keeps each request small and cheap.
const MAX_LENGTH = 300;
// Tallest the field grows before it scrolls, about six lines of text.
const MAX_HEIGHT = 160;

type InputBarProps = Omit<ComponentProps<"form">, "children"> & {
  name?: string;
  placeholder?: string;
};

// The chat prompt: a growing TextArea with its character counter inside, and one IconButton (send).
// The answer is shown by Intro, not here. Enter sends, Shift+Enter starts a new line.
export function InputBar({
  className,
  name = "message",
  placeholder = "Ask me anything...",
  onSubmit,
  ...props
}: InputBarProps) {
  const { ask } = useChat();
  const [value, setValue] = useState("");
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  const nearLimit = value.length >= MAX_LENGTH * 0.9;

  // Resize the field whenever its text changes, including when it is cleared after sending.
  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    field.style.height = "auto";
    field.style.height = `${Math.min(field.scrollHeight, MAX_HEIGHT)}px`;
  }, [value]);

  async function send(question: string) {
    // The field clears at once and the question travels up from here. On an error it comes back so it can be fixed.
    const from = fieldRef.current?.getBoundingClientRect() ?? null;
    setValue("");
    const ok = await ask(question, from);
    if (!ok) setValue(question);
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (value.trim() !== "") event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <form
      role="search"
      className={cn("flex w-full items-end gap-2", className)}
      {...props}
      onSubmit={(event) => {
        // Keep the page in place. The answer appears in the main text.
        event.preventDefault();
        const question = value.trim();
        if (question === "") return;
        send(question);
        onSubmit?.(event);
      }}
    >
      <div className="relative flex min-w-0 flex-1">
        <TextArea
          ref={fieldRef}
          name={name}
          placeholder={placeholder}
          value={value}
          maxLength={MAX_LENGTH}
          aria-describedby="message-counter"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="pr-16!"
        />
        <span
          id="message-counter"
          className={cn(
            "pointer-events-none absolute right-4 bottom-3 font-sans text-caption",
            nearLimit ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {value.length}/{MAX_LENGTH}
        </span>
      </div>
      <IconButton type="submit" aria-label="Send" disabled={value.trim() === ""} />
    </form>
  );
}
