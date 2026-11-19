"use client";

import { type ReactNode, useEffect, useRef } from "react";

const PHONE = "(max-width: 767px)";

// A service's deliverables and tech: open on wider screens (summary hidden in CSS), folded behind
// "What's included" on phones so each service stays short. Server-rendered open, so desktop never
// shifts; phones fold it after hydration, and it re-opens if the window grows past phone width.
export function Included({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = matchMedia(PHONE);
    el.open = !mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      if (!e.matches) el.open = true;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <details ref={ref} className="sv-more" open>
      <summary>What&apos;s included</summary>
      {children}
    </details>
  );
}
