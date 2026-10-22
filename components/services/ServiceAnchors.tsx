"use client";

import { useEffect, useRef, useState } from "react";
import { SvIcon } from "@/components/services/icons";
import type { ServiceOffering } from "@/lib/service-offerings";

// Sticky row of anchor chips; the chip for the service crossing 40% of the viewport is active and
// scrolled into view inside the row (it scrolls sideways on phones).
export function ServiceAnchors({ services }: { services: Pick<ServiceOffering, "id" | "title">[] }) {
  const [active, setActive] = useState(-1);
  const row = useRef<HTMLElement>(null);

  useEffect(() => {
    const blocks = services.map((s) => document.getElementById(s.id)).filter((b): b is HTMLElement => !!b);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(blocks.indexOf(e.target as HTMLElement));
        }),
      { rootMargin: "-40% 0px -59% 0px" },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, [services]);

  useEffect(() => {
    const chip = row.current?.children[active] as HTMLElement | undefined;
    if (!chip || !row.current) return;
    const r = row.current;
    r.scrollTo({ left: chip.offsetLeft - (r.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <div className="sv-index">
      <div className="ctk-wrap">
        <nav className="sv-chips" aria-label="Services on this page" ref={row}>
          {services.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`sv-chip${i === active ? " on" : ""}`}
              aria-current={i === active ? "true" : undefined}
            >
              <SvIcon name={s.id} size="xs" />
              <b>{String(i + 1).padStart(2, "0")}</b>
              {s.title}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
