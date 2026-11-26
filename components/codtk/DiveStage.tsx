"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Pins its children for a few screens and publishes scroll progress as --p (0 to 1), so CSS can
// drive a dive (founder, 2026-11-26): the Home hero and the closing CTA on Home. Off for reduced
// motion: the section then stays static.
export function DiveStage({
  children,
  className = "ctk-dive",
  stageClassName = "ctk-dive__stage",
  section = "intro",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  stageClassName?: string;
  section?: string;
  labelledBy: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("is-live");
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 1;
      el.style.setProperty("--p", p.toFixed(4));
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
    };
  }, []);

  return (
    <section ref={ref} className={className} data-section={section} aria-labelledby={labelledBy}>
      <div className={stageClassName}>{children}</div>
    </section>
  );
}
