"use client";

import { useEffect, useRef } from "react";
import { Icon, TechIcon } from "@/components/codtk/primitives";
import { PROCESS_STEPS } from "@/lib/process";

const pad = (i: number) => String(i + 1).padStart(2, "0");
const TOTAL = pad(PROCESS_STEPS.length - 1);

// Camera path: [scroll position s, camera position c]. Travel to each stage, then hold it in focus.
const KEYS: [number, number][] = [[0, -0.6], [0.4, 0]];
for (let i = 1; i < PROCESS_STEPS.length; i++) KEYS.push([KEYS[KEYS.length - 1][0] + 0.35, i - 1], [KEYS[KEYS.length - 1][0] + 0.85, i]);
KEYS.push([KEYS[KEYS.length - 1][0] + 0.35, PROCESS_STEPS.length - 1]);
const S = KEYS[KEYS.length - 1][0];
const smooth = (t: number) => t * t * (3 - 2 * t);
const camAt = (s: number) => {
  for (let k = 1; k < KEYS.length; k++) {
    const [a, ca] = KEYS[k - 1];
    const [b, cb] = KEYS[k];
    if (s <= b) return ca + (cb - ca) * smooth(Math.min(1, Math.max(0, (s - a) / (b - a))));
  }
  return KEYS[KEYS.length - 1][1];
};
// Middle of each stage's hold, as a share of the scroll length (for the stage buttons).
const HOLD = PROCESS_STEPS.map((_, i) => (KEYS[1 + 2 * i][0] + KEYS[2 + 2 * i][0]) / 2 / S);

const D = 1700; // depth between stages, px
const F = 70; // focused stage's distance from the camera, px

// The delivery process as a camera flight: on wide screens the section pins and scrolling flies
// through the five stages (each drifts in from the distance, holds in focus, then passes the
// camera) over light-speed streaks that stretch with scroll speed. Phones and reduced motion get a
// stacked list (CSS only). Everything is server-rendered; this effect only moves it.
export function ProcessTunnel() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const tn = root.current;
    if (!tn) return;
    const stage = tn.querySelector<HTMLElement>(".tn__stage")!;
    const world = tn.querySelector<HTMLElement>(".tn__world")!;
    const light = tn.querySelector<HTMLElement>(".tn__light")!;
    const fill = tn.querySelector<HTMLElement>(".tn__line i")!;
    const nowN = tn.querySelector<HTMLElement>("[data-now-n]")!;
    const nowT = tn.querySelector<HTMLElement>("[data-now-t]")!;
    const gates = [...tn.querySelectorAll<HTMLElement>(".gate")];
    const railItems = [...tn.querySelectorAll<HTMLElement>(".tn__rail li")];
    const cv = tn.querySelector<HTMLCanvasElement>(".tn__fx")!;
    const ctx = cv.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const page = document.querySelector<HTMLElement>(".ctk") ?? document.body;

    let wide = false;
    let cam = -0.6;
    let vel = 0;
    let warp = 0;
    let active = -1;
    let inView = true;
    let raf = 0;
    let last = performance.now();
    let W = 0;
    let H = 0;
    let dpr = 1;
    const P = Array.from({ length: 220 }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 1800 + 20, c: Math.random() }));

    const sizeCanvas = () => {
      dpr = Math.min(devicePixelRatio || 1, 1.25);
      W = stage.clientWidth;
      H = stage.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
    };
    const setMode = () => {
      wide = !reduce && page.clientWidth >= 1024;
      tn.classList.toggle("tn--live", wide);
      if (!wide) gates.forEach((g) => g.removeAttribute("style"));
      sizeCanvas();
    };
    const target = () => {
      const len = tn.offsetHeight - innerHeight;
      const p = Math.min(1, Math.max(0, -tn.getBoundingClientRect().top / Math.max(len, 1)));
      return camAt(p * S);
    };
    const setActive = (i: number) => {
      if (i === active) return;
      active = i;
      nowN.textContent = pad(i);
      nowT.textContent = PROCESS_STEPS[i].title;
      railItems.forEach((li, k) => {
        li.classList.toggle("on", k === i);
        li.classList.toggle("done", k < i);
      });
    };
    const place = () => {
      gates.forEach((g, i) => {
        const z = (cam - i) * D - F;
        const ahead = (-F - z) / D;
        let o: number;
        let x = 0;
        let ry = 0;
        let s = 1;
        if (z > -F) {
          const t = (z + F) / (F + 380);
          o = 1 - t * t;
          s = 1 + t * 0.12;
        } else {
          o = Math.max(0, 1 - ahead * 0.62);
          const side = i % 2 ? 1 : -1;
          x = side * Math.min(ahead, 1.6) * 260;
          ry = -side * Math.min(ahead, 1) * 14;
        }
        if (o <= 0.01 || z > 700) {
          g.style.visibility = "hidden";
          g.classList.remove("on");
          return;
        }
        g.style.visibility = "visible";
        g.style.opacity = o.toFixed(3);
        g.style.transform = `translate(-50%,-50%) translate3d(${x.toFixed(1)}px,0,${z.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) scale(${s.toFixed(3)})`;
        g.classList.toggle("on", Math.abs(ahead) < 0.35 && z <= -F + 60);
      });
      setActive(Math.max(0, Math.min(PROCESS_STEPS.length - 1, Math.round(cam))));
      fill.style.transform = `scaleX(${Math.max(0, cam / (PROCESS_STEPS.length - 1)).toFixed(4)})`;
      const depth = Math.max(0, (cam + 1) / PROCESS_STEPS.length);
      light.style.transform = `translate(-50%,-50%) scale(${(1 + depth * 0.35).toFixed(3)})`;
    };
    const streaks = () => {
      const v = Math.abs(vel) < 0.5 ? 0 : Math.min(30, Math.abs(vel));
      warp += (v - warp) * 0.1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const f = 420;
      const sp = 0.5 + warp * 1.1;
      const trail = 1 + warp * 5;
      ctx.lineCap = "round";
      for (const p of P) {
        p.z -= sp;
        if (p.z < 20) {
          p.z = 1800 + Math.random() * 200;
          p.x = Math.random() * 2 - 1;
          p.y = Math.random() * 2 - 1;
        }
        const X = p.x * W * 0.75;
        const Y = p.y * H * 0.75;
        const tz = p.z + trail;
        const a = Math.min(1, (1800 - p.z) / 500) * (0.3 + Math.min(0.35, warp / 45));
        ctx.strokeStyle = p.c < 0.55 ? `rgba(242,243,245,${a})` : p.c < 0.85 ? `rgba(110,170,255,${a})` : `rgba(60,203,255,${a})`;
        ctx.lineWidth = Math.min(2, Math.max(0.5, (f / p.z) * 0.9));
        ctx.beginPath();
        ctx.moveTo(cx + (X * f) / tz, cy + (Y * f) / tz);
        ctx.lineTo(cx + (X * f) / p.z + 0.01, cy + (Y * f) / p.z);
        ctx.stroke();
      }
    };
    const loop = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (inView && wide) {
        const prev = cam;
        cam += (target() - cam) * (1 - Math.exp(-dt / 140)); // time-based easing: same feel at any frame rate
        vel = ((cam - prev) * D * 16) / Math.max(dt, 1);
        place();
        streaks();
      }
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting));
    io.observe(tn);
    setMode();
    if (wide) {
      cam = target();
      place();
    }
    raf = requestAnimationFrame(loop);

    const onResize = () => setMode();
    const onRail = (e: Event) => {
      const b = (e.target as Element).closest<HTMLButtonElement>("button[data-i]");
      if (!b || !wide) return;
      const len = tn.offsetHeight - innerHeight;
      scrollTo({ top: tn.offsetTop + len * HOLD[Number(b.dataset.i)], behavior: "smooth" });
    };
    const onTilt = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      world.style.setProperty("--wy", `${(((e.clientX - r.left) / r.width - 0.5) * 6).toFixed(2)}deg`);
      world.style.setProperty("--wx", `${(((e.clientY - r.top) / r.height - 0.5) * -4).toFixed(2)}deg`);
    };
    const rail = tn.querySelector(".tn__rail")!;
    addEventListener("resize", onResize);
    rail.addEventListener("click", onRail);
    if (fine && !reduce) stage.addEventListener("pointermove", onTilt);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener("resize", onResize);
      rail.removeEventListener("click", onRail);
      stage.removeEventListener("pointermove", onTilt);
    };
  }, []);

  return (
    <section
      ref={root}
      className="tn"
      id="stages"
      data-theme="dark"
      data-tone="process"
      data-section="stages"
      aria-label="Our delivery process, stage by stage"
    >
      <div className="tn__stage">
        <div className="tn__light" aria-hidden="true" />
        <canvas className="tn__fx" aria-hidden="true" />
        <div className="tn__vignette" aria-hidden="true" />
        <div className="tn__world">
          {PROCESS_STEPS.map((s, i) => (
            <article key={s.title} className="gate rv" aria-labelledby={`stage-${i}`}>
              <span className="gate__frame" aria-hidden="true" />
              <div className="gate__card">
                <span className="gate__num" aria-hidden="true">
                  {pad(i)}
                </span>
                <div>
                  <p className="gate__label">
                    Stage {pad(i)} of {TOTAL}
                  </p>
                  <h2 id={`stage-${i}`} className="gate__title">
                    {s.title}
                  </h2>
                  <p className="gate__d">{s.description}</p>
                </div>
                <div className="gate__side">
                  <div>
                    <h3 className="gate__h">What you receive</h3>
                    <ul className="gate__gets">
                      {s.gets.map((g) => (
                        <li key={g}>
                          <Icon name="check" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="gate__h">Tools we use</h3>
                    <ul className="gate__tools">
                      {s.tools.length ? (
                        s.tools.map((t) => (
                          <li key={t}>
                            <TechIcon name={t} />
                            {t}
                          </li>
                        ))
                      ) : (
                        <li className="none">Ongoing support after launch</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="tn__now" aria-hidden="true">
          <b data-now-n>01</b>
          <span>/ {TOTAL}</span>
          <em data-now-t>{PROCESS_STEPS[0].title}</em>
        </p>
        <nav className="tn__rail" aria-label="Go to a stage">
          <span className="tn__line" aria-hidden="true">
            <i />
          </span>
          <ol>
            {PROCESS_STEPS.map((s, i) => (
              <li key={s.title} className={i ? undefined : "on"}>
                <button type="button" data-i={i} aria-label={`Go to stage ${i + 1}: ${s.title}`}>
                  <span>{pad(i)}</span>
                  {s.short}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
