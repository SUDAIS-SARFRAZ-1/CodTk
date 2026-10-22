"use client";

import { useEffect, useRef } from "react";

// Lahore first, then the client time zones it overlaps with.
const ZONES = [
  { city: "Lahore", zone: "Asia/Karachi", label: "PKT", home: true },
  { city: "Dubai", zone: "Asia/Dubai", label: "GST" },
  { city: "London", zone: "Europe/London", label: "UK" },
  { city: "New York", zone: "America/New_York", label: "US East" },
];

// Live local time in each city. Times fill in after mount (they would differ between server and
// browser) and refresh every 15 seconds.
export function WorldClocks() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fmts = ZONES.map((z) => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: z.zone }));
    const stamps = [...(root.current?.querySelectorAll("b") ?? [])];
    const tick = () => {
      const now = new Date();
      stamps.forEach((s, i) => (s.textContent = fmts[i].format(now)));
    };
    tick();
    const t = window.setInterval(tick, 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="cf-clocks" ref={root} aria-label="Current time in Lahore, Dubai, London and New York">
      {ZONES.map((z) => (
        <div key={z.city} className={`cf-clock${z.home ? " home" : ""}`}>
          <p>{z.city}</p>
          <b>--:--</b>
          <small>{z.label}</small>
        </div>
      ))}
    </div>
  );
}
