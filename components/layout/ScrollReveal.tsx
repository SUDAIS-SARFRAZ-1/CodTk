"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

// Scroll motion from the home motion prototype artifact (founder, 2026-11-27): headings rise out of a
// mask and blocks rise in one after another with a slight spring as they reach the screen, on every page.
// Marks are data attributes (React never resets those) and are removed once the reveal ends, so each
// element gets its own hover transitions back. Skipped: the scenes that already move on their own.
const ITEMS =
  "h1,h2,h3,p,li,img,form,details,pre,table,.ctk-actions,.ctk-chips,a[class*='card']";
const SKIP = ".ctk-dive,.ctk-cdive,.tn,.ctk-marq,.ctk-feat__view,[aria-hidden='true']";
const STEP = 70;
const DONE = 1100;

let firstPage = true;

export function ScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const main = document.querySelector("main");
    const initial = firstPage;
    firstPage = false;
    if (!main || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const vh = window.innerHeight;
    const marked: HTMLElement[] = [];
    for (const el of main.querySelectorAll<HTMLElement>(ITEMS)) {
      if (el.closest(SKIP) || el.parentElement?.closest("[data-rv]")) continue;
      // On the first page load, what is already on screen stays put: it has been painted, and hiding
      // it would flash and delay the largest paint. After a client-side navigation it animates in.
      if (initial && el.getBoundingClientRect().top < vh) continue;
      el.dataset.rv = el.matches("h1,h2") ? "mask" : "rise";
      marked.push(el);
    }

    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        let i = 0;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          const delay = Math.min(i++, 8) * STEP;
          el.style.setProperty("--rv-d", `${delay}ms`);
          el.dataset.in = "";
          timers.push(
            window.setTimeout(() => {
              delete el.dataset.rv;
              delete el.dataset.in;
              el.style.removeProperty("--rv-d");
            }, delay + DONE),
          );
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    marked.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      marked.forEach((el) => {
        delete el.dataset.rv;
        delete el.dataset.in;
      });
    };
  }, [pathname]);

  return null;
}
