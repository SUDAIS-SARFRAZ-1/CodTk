"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// CodTK motion system, ported from the design system's bundle.js (init + tick): reveals, keyword
// rotor, background parallax and tone, --p scrubs and pins,
// stacked-card shrink, horizontal showcase, card glow, magnetic CTAs,
// and the custom cursor. One rAF-throttled scroll loop that writes
// transforms and --p only. Re-runs on every route change so new sections get wired.
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const c = document.querySelector<HTMLElement>(".ctk");
    if (!c) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];
    c.classList.add("ctk-js");

    /* reveals */
    const reveal = (t: Element) => t.classList.add("in");
    const els = [...c.querySelectorAll<HTMLElement>(".rv:not(.in)")];
    els.forEach((el) => (el.style.transitionDelay = `${Number(el.dataset.d || 0) * 80}ms`));
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(reveal);
    } else {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            reveal(e.target);
            io.unobserve(e.target);
          }),
        { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
      );
      els.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    /* keyword rotor: 85ms type, 45ms delete, 1.8s hold */
    if (!reduce)
      c.querySelectorAll<HTMLElement>("[data-rotor]").forEach((el) => {
        const words = (el.dataset.rotor || "").split("|");
        let wi = 0;
        let ci = words[0].length;
        let del = true;
        let timer = 0;
        const tick = () => {
          if (del) {
            ci--;
            if (ci <= 0) {
              del = false;
              wi = (wi + 1) % words.length;
            }
          } else {
            ci++;
            if (ci >= words[wi].length) {
              del = true;
              el.textContent = words[wi];
              timer = window.setTimeout(tick, 1800);
              return;
            }
          }
          el.textContent = words[wi].slice(0, Math.max(ci, 0)) || "​";
          timer = window.setTimeout(tick, del ? 45 : 85);
        };
        timer = window.setTimeout(tick, 1800);
        cleanups.push(() => clearTimeout(timer));
      });

    /* scroll loop */
    const q = <T extends HTMLElement = HTMLElement>(s: string) => [...c.querySelectorAll<T>(s)];
    const bg = c.querySelector<HTMLElement>("[data-bg]");
    const grid = c.querySelector<HTMLElement>("[data-grid]");
    const frags = q(".ctk-bg__code span");
    const tones = q("[data-tone]").filter((el) => el !== bg);
    const stacks = q("[data-stack]");
    const scrubs = q("[data-scrub]");
    const pxs = q("[data-px]");
    const hs = c.querySelector<HTMLElement>("[data-hscroll]");
    const motion = !reduce;
    let ticking = false;

    const tick = () => {
      ticking = false;
      const y = window.scrollY;
      const h = window.innerHeight;
      const wide = c.clientWidth >= 1024;
      if (motion && grid) grid.style.transform = `translate3d(0,${(-(y * 0.15) % 24).toFixed(1)}px,0)`;
      if (motion && wide)
        frags.forEach((s) => {
          const d = Number(s.dataset.depth);
          const span = h + 120;
          let yy = ((Number(s.dataset.y) / 100) * span - y * d) % span;
          if (yy < 0) yy += span;
          s.style.transform = `translate3d(${s.dataset.x}cqw,${(yy - 60).toFixed(0)}px,0)`;
        });

      /* background tone + section indicator: the section crossing 45% of the viewport */
      const mid = h * 0.45;
      const crosses = (s: HTMLElement) => {
        const t = s.getBoundingClientRect().top;
        return t <= mid && t + s.offsetHeight > mid;
      };
      const tone = tones.filter(crosses).pop()?.dataset.tone;
      if (bg && tone && bg.dataset.tone !== tone) bg.dataset.tone = tone;

      /* stacked cards: shrink + shade the card being covered */
      if (motion && wide)
        stacks.forEach((card, k) => {
          const next = stacks[k + 1];
          let p = 0;
          if (next) {
            const a = next.getBoundingClientRect().top;
            const b = card.getBoundingClientRect().top;
            p = Math.min(Math.max(1 - (a - b) / card.offsetHeight, 0), 1);
          }
          card.style.transform = `scale(${(1 - p * 0.05).toFixed(4)})`;
          const sh = card.querySelector<HTMLElement>("[data-shade]");
          if (sh) sh.style.opacity = (p * 0.5).toFixed(3);
        });

      /* horizontal showcase */
      if (hs) {
        const tr = hs.querySelector<HTMLElement>("[data-track]");
        const bar = hs.querySelector<HTMLElement>("[data-hbar]");
        if (tr && wide && motion) {
          const hl = hs.offsetHeight - h;
          const hp = Math.min(Math.max(-hs.getBoundingClientRect().top / Math.max(hl, 1), 0), 1);
          const dist = Math.max(tr.scrollWidth - c.clientWidth, 0);
          tr.style.transform = `translate3d(${(-hp * dist).toFixed(1)}px,0,0)`;
          if (bar) bar.style.transform = `scaleX(${hp.toFixed(4)})`;
        } else if (tr) tr.style.transform = "";
      }

      /* generic scrub: --p = progress through the viewport, or through a pinned section */
      scrubs.forEach((el) => {
        const t = el.getBoundingClientRect().top;
        const hh = el.offsetHeight;
        const pin = el.dataset.scrub === "pin";
        let p: number;
        if (!motion || (pin && !wide)) p = 1;
        else if (pin) p = -t / Math.max(hh - h, 1);
        else p = (h - t) / (h + hh);
        el.style.setProperty("--p", Math.min(Math.max(p, 0), 1).toFixed(4));
      });

      if (motion && wide)
        pxs.forEach((el) => {
          const b = el.getBoundingClientRect();
          el.style.translate = `0 ${((b.top + b.height / 2 - h / 2) * Number(el.dataset.px)).toFixed(1)}px`;
        });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    };
    const onResize = () => {
      c.style.setProperty("--vh", `${window.innerHeight}px`);
      onScroll();
    };
    onResize();
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    });

    /* pointer effects: card glow tracking, magnetic CTA (fine pointers) */
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const g = target?.closest<HTMLElement>(".ctk-glow");
      if (g) {
        const r = g.getBoundingClientRect();
        g.style.setProperty("--mx", `${e.clientX - r.left}px`);
        g.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      if (reduce || !fine) return;
      c.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((m) => {
        const r = m.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const near = Math.abs(dx) < r.width / 2 + 40 && Math.abs(dy) < r.height / 2 + 40;
        m.style.transform = near ? `translate(${(dx * 0.18).toFixed(1)}px,${(dy * 0.25).toFixed(1)}px)` : "";
      });
    };
    c.addEventListener("pointermove", onPointer);
    cleanups.push(() => c.removeEventListener("pointermove", onPointer));

    /* cursor follower: blue ring trailing the normal arrow (fine pointers, motion allowed) */
    const cur = c.querySelector<HTMLElement>(".ctk-cursor");
    if (cur && fine && !reduce) {
      let x = 0;
      let y = 0;
      let tx = 0;
      let ty = 0;
      let run = false;
      const loop = () => {
        x += (tx - x) * 0.16;
        y += (ty - y) * 0.16;
        cur.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
        if (Math.abs(tx - x) + Math.abs(ty - y) > 0.3) requestAnimationFrame(loop);
        else run = false;
      };
      const move = (e: PointerEvent) => {
        tx = e.clientX;
        ty = e.clientY;
        cur.classList.add("on");
        cur.classList.toggle("hot", !!(e.target as Element | null)?.closest("a,button,label,[data-magnetic]"));
        if (!run) {
          run = true;
          requestAnimationFrame(loop);
        }
      };
      const leave = () => cur.classList.remove("on");
      c.addEventListener("pointermove", move);
      c.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        c.removeEventListener("pointermove", move);
        c.removeEventListener("pointerleave", leave);
      });
    }

    return () => cleanups.forEach((f) => f());
  }, [pathname]);

  return null;
}
