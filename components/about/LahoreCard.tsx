"use client";

import { useEffect, useRef } from "react";
import { LOCATION } from "@/lib/contact";

const R = 80;
const C = 100;
const TILT = -0.38;
const LAHORE: [number, number] = [31.5, 74.3];

// Orthographic projection of (lat, lon) for a globe turned by `rot` radians.
function project(lat: number, lon: number, rot: number): [number, number, number] {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180 + rot;
  const x = Math.cos(la) * Math.sin(lo);
  const y = Math.sin(la);
  const z = Math.cos(la) * Math.cos(lo);
  const y2 = y * Math.cos(TILT) - z * Math.sin(TILT);
  const z2 = y * Math.sin(TILT) + z * Math.cos(TILT);
  return [C + x * R, C - y2 * R, z2];
}

// Path through the visible (front-facing) points only.
function frontPath(points: [number, number, number][]) {
  let d = "";
  let on = false;
  for (const [x, y, z] of points) {
    if (z < 0) {
      on = false;
      continue;
    }
    d += `${on ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    on = true;
  }
  return d;
}

function globe(rot: number) {
  let h = `<circle class="g-o" cx="${C}" cy="${C}" r="${R}"/>`;
  for (let lon = 0; lon < 360; lon += 30) {
    const pts: [number, number, number][] = [];
    for (let lat = -90; lat <= 90; lat += 6) pts.push(project(lat, lon, rot));
    h += `<path d="${frontPath(pts)}"/>`;
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts: [number, number, number][] = [];
    for (let lon = 0; lon <= 360; lon += 6) pts.push(project(lat, lon, rot));
    h += `<path d="${frontPath(pts)}"/>`;
  }
  const [px, py, pz] = project(LAHORE[0], LAHORE[1], rot);
  if (pz > 0) h += `<circle class="g-ring" cx="${px}" cy="${py}" r="4"/><circle class="g-pin" cx="${px}" cy="${py}" r="3.6"/>`;
  return h;
}

const BASE = (-LAHORE[1] * Math.PI) / 180 + 0.6;

// Hero side card: live local time in Lahore and a slowly swaying wireframe globe pinned on Lahore.
// The time renders after mount (it would differ between server and browser); reduced motion keeps
// the globe still.
export function LahoreCard() {
  const clock = useRef<HTMLSpanElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Karachi" });
    const tickClock = () => {
      if (clock.current) clock.current.textContent = fmt.format(new Date());
    };
    tickClock();
    const timer = window.setInterval(tickClock, 15000);

    const draw = (rot: number) => {
      if (svg.current) svg.current.innerHTML = globe(rot);
    };
    draw(BASE);
    let raf = 0;
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const spin = (t: number) => {
        draw(BASE + Math.sin(t / 4200) * 0.55);
        raf = requestAnimationFrame(spin);
      };
      raf = requestAnimationFrame(spin);
    }
    return () => {
      clearInterval(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <aside className="ab-local" data-theme="dark" aria-label="Where we are">
      <div className="ab-local__globe" aria-hidden="true">
        <svg viewBox="0 0 200 200" ref={svg} />
      </div>
      <p className="ab-local__k">Local time in Lahore</p>
      <p className="ab-local__time">
        <span ref={clock}>--:--</span>
        <small>PKT · UTC+5</small>
      </p>
      <ul className="ab-local__facts">
        <li>
          <span className="ab-dot ab-dot--loc" />
          {LOCATION}
        </li>
        <li>
          <span className="ab-dot" />
          Replies within 24 hours, Monday to Saturday
        </li>
      </ul>
    </aside>
  );
}
