"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { LOCATION } from "@/lib/contact";

// The team as a connected diagram: a hub above the function cards, with curved lines drawn from the
// hub to each card (redrawn on resize only; no animation loop). The cards are server-rendered
// children marked `data-fn`; lines hide when the cards stack (phones).
export function TeamDiagram({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const org = root.current;
    const lines = svg.current;
    if (!org || !lines) return;
    const hub = org.querySelector<HTMLElement>(".ab-org__hub")!;

    const draw = () => {
      // Layout offsets, not bounding boxes, so the reveal transforms don't shift the end points.
      const row = org.querySelector<HTMLElement>(".ab-org__row")!;
      const cards = [...row.querySelectorAll<HTMLElement>("[data-fn]")];
      const stacked = cards.length > 1 && Math.abs(cards[0].offsetTop - cards[1].offsetTop) > 10;
      lines.setAttribute("viewBox", `0 0 ${org.offsetWidth} ${org.offsetHeight}`);
      lines.replaceChildren();
      if (stacked) return;
      const hx = hub.offsetLeft + hub.offsetWidth / 2;
      const hy = hub.offsetTop + hub.offsetHeight;
      const ns = "http://www.w3.org/2000/svg";
      cards.forEach((c) => {
        const cx = row.offsetLeft + c.offsetLeft + c.offsetWidth / 2;
        const cy = row.offsetTop + c.offsetTop;
        const my = hy + (cy - hy) * 0.5;
        const path = document.createElementNS(ns, "path");
        path.setAttribute("d", `M${hx} ${hy} C ${hx} ${my}, ${cx} ${my}, ${cx} ${cy}`);
        lines.append(path);
        path.style.setProperty("--len", String(path.getTotalLength()));
      });
    };
    draw();


    // Lines draw in once the diagram is on screen.
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        lines.classList.add("in");
        io.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(org);
    const ro = new ResizeObserver(draw);
    ro.observe(org);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div className="ab-org" ref={root}>
      <svg className="ab-org__lines" ref={svg} aria-hidden="true" />
      <div className="ab-org__hub rv" data-theme="dark">
        <b>CodTK team</b>
        <small>{LOCATION}</small>
      </div>
      <div className="ab-org__row">{children}</div>
    </div>
  );
}
