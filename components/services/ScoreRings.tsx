"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import type { ServiceTone } from "@/lib/service-offerings";

// Lighthouse target rings: arcs and numbers count up once when the rings scroll into view.
// Server render, reduced motion and rings already on screen show the final values.
export function ScoreRings({ targets }: { targets: { label: string; value: number; tone: ServiceTone }[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (list.getBoundingClientRect().top < window.innerHeight) return;
    const rings = [...list.querySelectorAll<HTMLElement>(".sv-ring")];
    const set = (p: number) =>
      rings.forEach((r, i) => {
        const v = targets[i].value * p;
        r.style.setProperty("--v", v.toFixed(2));
        r.querySelector("b")!.textContent = String(Math.round(v));
      });
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const run = (t: number) => {
          const k = Math.min((t - t0) / 1600, 1);
          set(1 - Math.pow(1 - k, 3));
          if (k < 1) raf = requestAnimationFrame(run);
        };
        raf = requestAnimationFrame(run);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    set(0);
    io.observe(list);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      set(1);
    };
  }, [targets]);

  return (
    <ul className="sv-rings" ref={ref}>
      {targets.map((t) => (
        <li key={t.label}>
          <span className={`sv-ring sv-tone--${t.tone}`} style={{ "--v": t.value } as CSSProperties}>
            <svg viewBox="0 0 36 36" aria-hidden="true">
              <circle className="bg" cx="18" cy="18" r="15.9155" />
              <circle className="fg" cx="18" cy="18" r="15.9155" pathLength={100} />
            </svg>
            <b aria-hidden="true">{t.value}</b>
          </span>
          {t.label}
          <span className="ctk-sr">: target {t.value}</span>
        </li>
      ))}
    </ul>
  );
}
