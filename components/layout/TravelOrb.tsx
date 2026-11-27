"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// The travelling drop from the home motion prototype artifact (founder, 2026-11-27): a glossy blue
// bubble follows the reader down the page and lands on the full stop of the heading nearest the upper
// third of the screen, with a ring splash on arrival. Between headings it waits on the right edge and
// marks how far down the page you are. Hidden while the Home hero dive is on screen (the dive has its
// own bubble) and for reduced motion. Decorative only: aria-hidden and no pointer events.
const SIZE = 200;

type Anchor = { h: HTMLElement; range: Range; dark: boolean };
type Spring = { p: number; v: number };

function findAnchors(): Anchor[] {
  const out: Anchor[] = [];
  for (const h of document.querySelectorAll<HTMLElement>("main h1, main h2")) {
    if (h.closest(".ctk-dive")) continue;
    const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
    let last: Text | null = null;
    while (walker.nextNode()) if (walker.currentNode.textContent?.trim()) last = walker.currentNode as Text;
    const text = last?.textContent ?? "";
    const at = text.trimEnd().length - 1;
    if (!last || text[at] !== ".") continue;
    const range = document.createRange();
    range.setStart(last, at);
    range.setEnd(last, at + 1);
    out.push({ h, range, dark: !!h.closest('[data-theme="dark"]') });
  }
  return out;
}

export function TravelOrb() {
  const pathname = usePathname();
  const orbRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    const splash = splashRef.current;
    if (!orb || !splash || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const anchors = findAnchors();
    const dive = document.querySelector<HTMLElement>(".ctk-dive");
    const x: Spring = { p: window.innerWidth - 16, v: 0 };
    const y: Spring = { p: -40, v: 0 };
    const r: Spring = { p: 5, v: 0 };
    let current: Anchor | null = null;
    let arrived = false;
    let angle = 0;
    let frame = 0;
    let last = performance.now();

    const spring = (s: Spring, to: number, k: number, d: number, dt: number) => {
      s.v += ((to - s.p) * k - s.v * d) * dt;
      s.p += s.v * dt;
    };

    const pick = (vh: number) => {
      let best: Anchor | null = null;
      let bestD = Infinity;
      for (const a of anchors) {
        const b = a.range.getBoundingClientRect();
        if (!b.width || b.top < vh * 0.06 || b.top > vh * 0.8) continue;
        const d = Math.abs(b.top - vh * 0.38);
        if (d < bestD) [best, bestD] = [a, d];
      }
      return best;
    };

    const step = (now: number) => {
      frame = 0;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const vh = window.innerHeight;
      const hidden = !!dive && dive.getBoundingClientRect().bottom > vh * 1.05;
      orb.classList.toggle("is-on", !hidden);

      const a = hidden ? null : pick(vh);
      let tx: number, ty: number, tr: number;
      let k = 120;
      let d = 16;
      if (a) {
        const b = a.range.getBoundingClientRect();
        const em = parseFloat(getComputedStyle(a.h).fontSize);
        // the full stop sits on the baseline, about a quarter em above the bottom of the glyph box
        tx = b.left + b.width / 2;
        ty = b.bottom - em * 0.33;
        tr = em * 0.1;
        if (a !== current) [current, arrived] = [a, false];
        if (!arrived) [k, d] = [95, 14];
      } else {
        const doc = document.documentElement.scrollHeight - vh;
        tx = window.innerWidth - 16;
        ty = vh * (0.14 + 0.72 * (window.scrollY / Math.max(1, doc)));
        tr = 5;
        current = null;
      }
      spring(x, tx, k, d, dt);
      spring(y, ty, k, d, dt);
      spring(r, tr, 160, 15, dt);

      if (current && !arrived && Math.hypot(x.p - tx, y.p - ty) < 3) {
        arrived = true;
        splash.style.borderColor = current.dark ? "rgba(255,255,255,.8)" : "var(--blue-500)";
        splash.animate(
          [
            { transform: `translate(${tx}px,${ty}px) scale(.6)`, opacity: 0.9 },
            { transform: `translate(${tx}px,${ty}px) scale(4.2)`, opacity: 0 },
          ],
          { duration: 750, easing: "cubic-bezier(.16,1,.3,1)" },
        );
      }

      // stretch along the direction of travel, like a drop
      const speed = Math.hypot(x.v, y.v);
      if (speed > 40) angle = Math.atan2(y.v, x.v);
      const st = Math.min(speed / 2400, 0.45);
      const sc = Math.max(r.p, 0.5) / (SIZE / 2);
      orb.style.transform = `translate(${x.p - SIZE / 2}px,${y.p - SIZE / 2}px) rotate(${angle}rad) scale(${sc * (1 + st)},${sc * (1 - st * 0.55)})`;
      orb.classList.toggle("is-dark", !!current?.dark);

      const settled = speed < 2 && Math.abs(r.v) < 1 && Math.hypot(x.p - tx, y.p - ty) < 0.5;
      if (!settled) frame = requestAnimationFrame(step);
    };

    const kick = () => {
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    };
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, [pathname]);

  return (
    <>
      <div ref={splashRef} className="ctk-orb-splash" aria-hidden="true" />
      <div ref={orbRef} className="ctk-orb" aria-hidden="true" />
    </>
  );
}
