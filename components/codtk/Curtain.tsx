"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Main-page curtain (founder, 2026-11-26): wraps a page header and the section(s) after it. The
// header pins once its bottom is on screen and dims back while the next section slides up over it
// like a card.
// Publishes --c (0 to 1, how far the card has covered the header). Off for reduced motion and
// without JavaScript: the page then scrolls normally.
export function Curtain({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const hero = el?.firstElementChild as HTMLElement | null;
    const card = hero?.nextElementSibling as HTMLElement | null;
    if (!el || !hero || !card || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("is-live");
    let frame = 0;
    const update = () => {
      frame = 0;
      const h = hero.offsetHeight;
      // A header taller than the screen pins only once its bottom is visible, so nothing is hidden.
      hero.style.top = `${Math.min(0, window.innerHeight - h)}px`;
      const span = Math.min(h, window.innerHeight);
      const c = 1 - card.getBoundingClientRect().top / span;
      el.style.setProperty("--c", Math.min(1, Math.max(0, c)).toFixed(4));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      el.classList.remove("is-live");
      hero.style.top = "";
    };
  }, []);

  return (
    <div ref={ref} className="ctk-curtain">
      {children}
    </div>
  );
}
