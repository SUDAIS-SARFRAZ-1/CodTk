"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// The site's only scripted motion (founder, 2026-11-19: light animation only): `.rv` elements fade
// up once as they enter the viewport. No scroll loop, so scrolling stays smooth on any phone.
// Re-runs on every route change so new pages get wired.
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const c = document.querySelector<HTMLElement>(".ctk");
    if (!c) return;
    c.classList.add("ctk-js");
    const els = [...c.querySelectorAll<HTMLElement>(".rv:not(.in)")];
    els.forEach((el) => (el.style.transitionDelay = `${Number(el.dataset.d || 0) * 80}ms`));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
