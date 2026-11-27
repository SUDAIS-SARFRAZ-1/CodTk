"use client";

import { useEffect, useRef } from "react";

// Home hero background (founder, 2026-11-27): Pexels clip 3129576, free for commercial use with no
// credit required, cut to a 15.5 s seamless 720p loop (public/video). The still shows first; the clip
// loads and plays only while the hero is on screen, and never with reduced motion or data saver.
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!v || saveData || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="ctk-dive__video"
      src="/video/hero-network.mp4"
      poster="/video/hero-network.webp"
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}
