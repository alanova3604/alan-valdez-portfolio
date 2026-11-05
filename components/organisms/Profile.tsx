"use client";

import { AnimatePresence, motion } from "motion/react";
import { useChat } from "@/components/molecules/ChatProvider";

const profile = [
  { label: "Name", value: "Alan Valdez" },
  { label: "Role", value: "Product Designer & Front End" },
  { label: "Experience", value: "5+ years of experience" },
  { label: "Company", value: "Nubir" },
  { label: "Location", value: "Mexico" },
];

// The profile line at the top of the page. It fades out once the visitor sends their first question.
export function Profile() {
  const { hasAsked } = useChat();

  return (
    <AnimatePresence>
      {!hasAsked && (
        <motion.nav
          key="profile"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          aria-label="Profile"
          className="mx-auto w-full max-w-[1248px] px-4 pt-6 md:px-6"
        >
          {/* On small screens each item sits on its own line. 11px is a one-off size for this line. */}
          <div className="flex flex-col font-sans text-[11px] leading-4 text-foreground md:hidden">
            <span>Alan Valdez</span>
            <span>Product Designer & Front End</span>
            <span>5+ years</span>
          </div>
          <ul className="hidden flex-wrap justify-between gap-x-4 gap-y-4 md:flex">
            {profile.map((item, index) => (
              <li
                key={item.label}
                className="flex animate-rise flex-col gap-1 motion-reduce:animate-none"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <span className="font-sans text-label tracking-[0.08em] text-muted-foreground uppercase">
                  {item.label}
                </span>
                <span className="font-sans text-caption text-foreground">{item.value}</span>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
