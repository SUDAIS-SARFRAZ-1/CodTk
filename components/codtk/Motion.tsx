"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// The site's only scripted motion (founder, 2026-11-19: light animation only): `.rv` elements fade
// up once as they scroll into view. Only elements the observer reports as off-screen are hidden
// (`rv-wait`), so content already visible never blinks out, and positions come from the observer's
// own asynchronous geometry, never a forced layout in this script. Re-runs on every route change.
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const c = document.querySelector<HTMLElement>(".ctk");
    if (!c) return;
    c.classList.add("ctk-js");
    const els = [...c.querySelectorAll<HTMLElement>(".rv:not(.in)")];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const show = (el: Element) => {
      el.classList.remove("rv-wait");
      el.classList.add("in");
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          // First report: anything with its top inside the viewport is already seen, so it stays put.
          const onScreen = e.isIntersecting || (!el.classList.contains("rv-wait") && e.boundingClientRect.top < window.innerHeight);
          if (onScreen) {
            show(el);
            io.unobserve(el);
          } else if (!el.classList.contains("rv-wait")) {
            el.style.transitionDelay = `${Number(el.dataset.d || 0) * 80}ms`;
            el.classList.add("rv-wait");
          }
        }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
