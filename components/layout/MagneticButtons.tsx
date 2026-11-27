"use client";

import { useEffect } from "react";

// Buttons lean toward the pointer and the primary's dark fill grows from where it entered (founder,
// 2026-11-27, from the hero prototype artifact). One delegated listener for every .ctk-btn; mouse and
// trackpad only, off for reduced motion. The CSS transition on `translate` makes the follow springy.
export function MagneticButtons() {
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let active: HTMLElement | null = null;
    let tx = 0;
    let ty = 0;
    const release = () => {
      active?.style.removeProperty("--tx");
      active?.style.removeProperty("--ty");
      active = null;
      tx = ty = 0;
    };
    const onMove = (e: PointerEvent) => {
      const btn = (e.target as Element | null)?.closest?.<HTMLElement>(".ctk-btn");
      if (btn !== active) release();
      if (!btn || btn.matches("[disabled]")) return;
      active = btn;
      const b = btn.getBoundingClientRect();
      // measure from the resting position, not the already-shifted one
      const x = e.clientX - (b.left - tx);
      const y = e.clientY - (b.top - ty);
      tx = (x - b.width / 2) * 0.32;
      ty = (y - b.height / 2) * 0.42;
      btn.style.setProperty("--tx", `${tx.toFixed(1)}px`);
      btn.style.setProperty("--ty", `${ty.toFixed(1)}px`);
      btn.style.setProperty("--mx", `${x.toFixed(0)}px`);
      btn.style.setProperty("--my", `${y.toFixed(0)}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", release);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", release);
    };
  }, []);
  return null;
}
