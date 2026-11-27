"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Pins its children for a few screens and publishes scroll progress as --p (0 to 1), so CSS can
// drive a dive (founder, 2026-11-26): the Home hero and the closing CTA on Home. Off for reduced
// motion: the section then stays static. `tail` adds that many screens at the end where the scene
// holds still and --q (0 to 1) tracks them, so the next section can slide over it like a curtain.
export function DiveStage({
  children,
  className = "ctk-dive",
  stageClassName = "ctk-dive__stage",
  section = "intro",
  labelledBy,
  tail = 0,
}: {
  children: ReactNode;
  className?: string;
  stageClassName?: string;
  section?: string;
  labelledBy: string;
  tail?: number;
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
      const hold = tail * window.innerHeight;
      const travel = r.height - window.innerHeight - hold;
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 1;
      const q = hold > 0 ? Math.min(1, Math.max(0, (-r.top - travel) / hold)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--q", q.toFixed(4));
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
  }, [tail]);

  return (
    <section ref={ref} className={className} data-section={section} aria-labelledby={labelledBy}>
      <div className={stageClassName}>{children}</div>
    </section>
  );
}
