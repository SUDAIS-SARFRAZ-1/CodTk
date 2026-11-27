"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Inner-page curtain (founder, 2026-11-27, rebuilt after the 2026-11-26 version was removed): the page
// hero (PageHero) stays put and sinks back while the rest of the page slides up over it as a white sheet,
// like Home. Only when the whole hero fits on screen, so nothing in it is covered unread; a taller hero
// scrolls normally. --c (0 to 1) is how far the sheet has covered it. Off for reduced motion.
export function Curtain() {
  const pathname = usePathname();

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("main .ctk-phero");
    const sheet = hero?.nextElementSibling;
    if (!hero || !sheet || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const h = hero.offsetHeight;
      if (h > window.innerHeight * 0.92) {
        delete hero.dataset.curtain;
        return;
      }
      hero.dataset.curtain = "";
      const c = 1 - sheet.getBoundingClientRect().top / h;
      hero.style.setProperty("--c", Math.min(1, Math.max(0, c)).toFixed(4));
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
      delete hero.dataset.curtain;
      hero.style.removeProperty("--c");
    };
  }, [pathname]);

  return null;
}
