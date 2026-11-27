"use client";

import { useEffect } from "react";

// The big type rows run faster while the page scrolls and ease back to their normal pace when it stops
// (founder, 2026-11-27, from the home motion prototype). Speeds up the rows' own CSS animations, so
// nothing runs when the rows are off or motion is reduced.
export function MarqueeBoost() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anims = [...document.querySelectorAll(".ctk-marq__row")].flatMap((row) => row.getAnimations());
    if (!anims.length) return;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let rate = 1;
    let frame = 0;

    const step = () => {
      frame = 0;
      const now = performance.now();
      const speed = (Math.abs(window.scrollY - lastY) / Math.max(now - lastT, 1)) * 1000; // px per second
      lastY = window.scrollY;
      lastT = now;
      rate += (1 + Math.min(speed, 1500) / 200 - rate) * 0.12;
      if (rate < 1.01) rate = 1;
      anims.forEach((a) => (a.playbackRate = rate));
      if (rate > 1) frame = requestAnimationFrame(step);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };
    window.addEventListener("scroll", kick, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", kick);
      anims.forEach((a) => (a.playbackRate = 1));
    };
  }, []);
  return null;
}
