"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Footer background: the CodTK logo sits faint behind the content and a soft spotlight follows the
// pointer, lighting up the part of the logo under it. Writes --sx/--sy straight onto the layers (no
// re-render); with no pointer over the footer, or on touch screens, the light rests on the centre.
export function FooterSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const foot = root?.parentElement;
    if (!root || !foot || !matchMedia("(pointer: fine)").matches) return;
    const lit = root.querySelector<HTMLElement>("[data-lit]");
    const halo = root.querySelector<HTMLElement>("[data-halo]");
    if (!lit || !halo) return;

    let raf = 0;
    const place = (x: number | null, y: number | null) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const l = lit.getBoundingClientRect();
        const f = foot.getBoundingClientRect();
        const cx = x ?? f.left + f.width / 2;
        const cy = y ?? f.top + f.height / 2;
        lit.style.setProperty("--sx", `${cx - l.left}px`);
        lit.style.setProperty("--sy", `${cy - l.top}px`);
        // the halo is centred in CSS; move it by the pointer's offset from the footer's centre
        halo.style.translate = `${cx - f.left - f.width / 2}px ${cy - f.top - f.height / 2}px`;
      });
    };
    const move = (e: PointerEvent) => place(e.clientX, e.clientY);
    const leave = () => place(null, null);
    foot.addEventListener("pointermove", move);
    foot.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      foot.removeEventListener("pointermove", move);
      foot.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className="ctk-foot__bg" aria-hidden="true">
      <span className="ctk-foot__halo" data-halo />
      <span className="ctk-foot__logo">
        <Image src="/brand/lockup.png" alt="" width={720} height={486} sizes="(min-width: 1024px) 1000px, 90vw" />
      </span>
      <span className="ctk-foot__logo ctk-foot__lit" data-lit>
        <Image src="/brand/lockup.png" alt="" width={720} height={486} sizes="(min-width: 1024px) 1000px, 90vw" />
      </span>
    </div>
  );
}
