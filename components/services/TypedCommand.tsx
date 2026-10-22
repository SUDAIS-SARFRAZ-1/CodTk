"use client";

import { type ReactNode, useEffect, useRef } from "react";

// Flags (`--x`) take the accent colour.
function marked(text: string): ReactNode[] {
  return text.split(/(\s+)/).map((w, i) => (w.startsWith("--") ? <em key={i}>{w}</em> : w));
}

// Mono CLI line that types itself out once when it scrolls into view. The full command renders
// first (no JS, reduced motion, already on screen), so nothing is hidden at rest. Typing happens in
// a second span React leaves empty, so React's own nodes are never rewritten.
export function TypedCommand({ cmd }: { cmd: string }) {
  const full = useRef<HTMLSpanElement>(null);
  const live = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const a = full.current;
    const b = live.current;
    if (!a || !b || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (a.getBoundingClientRect().top < window.innerHeight) return;
    const draw = (k: number) =>
      b.replaceChildren(
        ...cmd
          .slice(0, k)
          .split(/(\s+)/)
          .map((w) => {
            if (!w.startsWith("--")) return document.createTextNode(w);
            const em = document.createElement("em");
            em.textContent = w;
            return em;
          }),
      );
    const show = (typing: boolean) => {
      a.hidden = typing;
      b.hidden = !typing;
    };
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        let k = 0;
        const step = () => {
          draw(++k);
          if (k < cmd.length) timer = window.setTimeout(step, 32);
          else show(false);
        };
        timer = window.setTimeout(step, 450);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    draw(0);
    show(true);
    io.observe(a.parentElement!);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      show(false);
    };
  }, [cmd]);

  return (
    <p className="sv-cmd" aria-label={`$ ${cmd}`}>
      <b aria-hidden="true">$</b>
      <span className="t" aria-hidden="true">
        <span ref={full}>{marked(cmd)}</span>
        <span ref={live} hidden />
      </span>
      <i className="sv-caret" aria-hidden="true" />
    </p>
  );
}
