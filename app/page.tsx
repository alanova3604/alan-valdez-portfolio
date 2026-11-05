import { Presence } from "@/components/molecules/Presence";
import { BottomBar } from "@/components/organisms/BottomBar";
import { Intro } from "@/components/organisms/Intro";
import { Profile } from "@/components/organisms/Profile";
import { Conversation } from "@/components/organisms/Conversation";
import { ChatProvider } from "@/components/molecules/ChatProvider";
import { SentMessage } from "@/components/molecules/SentMessage";
import type { Suggestion } from "@/components/molecules/SuggestionCards";

const suggestions: Suggestion[] = [
  { label: "Projects", icon: "folder-open" },
  { label: "Who are you?", icon: "user" },
  { label: "Tell me about Terravento", icon: "building" },
];

export default function Home() {
  return (
    <ChatProvider>
      <div className="relative isolate flex min-h-dvh flex-col overflow-hidden">
        {/* The glow is faded with opacity, because a color mix inside a gradient is not kept by the build. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[50%] -z-10 animate-glow bg-brand-gradient opacity-[0.35] will-change-transform motion-reduce:animate-none"
        />
        <div className="absolute inset-x-0 top-6 z-10 mx-auto flex w-full max-w-[1248px] justify-end px-4 pointer-events-none md:px-6">
          <SentMessage />
        </div>
        <div className="flex flex-1 flex-col">
          <Profile />
          <Conversation>
            <div className="flex w-full flex-col gap-8">
              <Presence />
              <Intro />
            </div>
          </Conversation>
        </div>
        <BottomBar suggestions={suggestions} />
      </div>
    </ChatProvider>
  );
}
