"use client";

import { useState } from "react";
import { Btn, Icon, IconTile } from "@/components/codtk/primitives";

// Where the client is starting from: all four confirmed by the founder (2026-10-20). Says what to
// bring to a first call and what it gives them; kept clear of the delivery timeline, Why and the
// services so the home page doesn't repeat itself. `have` fills the Idea/Designs/Code/Users meter.
const STARTS = [
  {
    t: "Just an idea",
    line: "You know what you want and who it's for. Nothing is designed or built yet.",
    have: 1,
    where: "We start from a blank page",
    icon: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z",
    bring: ["A short description of the idea", "Who will use it and why", "Apps or sites you like, or want to compete with", "A budget range and an ideal launch date, if you have them"],
    leave: ["An honest view of what the first version needs, and what can wait", "A suggested approach: web, mobile or both", "A clear next step toward a quote"],
    cta: "Talk to us about your idea",
  },
  {
    t: "Designs ready",
    line: "You have screens in Figma or mockups and need them turned into a working product.",
    have: 2,
    where: "We start from your designs",
    icon: "M4 20l4-1 11-11-3-3L5 16zM14 6l3 3",
    bring: ["Your design files, or a link to them", "Which screens matter most", "Your logo, fonts and brand colours"],
    leave: ["Our questions on anything the designs don't cover yet", "Which parts will take the most work", "A recommendation on how to build it"],
    cta: "Talk to us about your designs",
  },
  {
    t: "Existing app needs work",
    line: "Something is already built, but it's slow, buggy or missing features, or the last developer moved on.",
    have: 3,
    where: "We start from your current code",
    icon: "M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z",
    bring: ["What's broken, slow or missing", "Where the code lives and how it's hosted", "Any notes or documents from the last team"],
    leave: ["A plain-language read on the code's condition", "What to fix first", "Whether to improve it or rebuild parts of it"],
    cta: "Talk to us about your app",
  },
  {
    t: "Live, needs support",
    line: "Your product is running and people rely on it. You need it kept secure, fixed and up to date.",
    have: 4,
    where: "We start from your live product",
    icon: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6zM9 12l2 2 4-4",
    bring: ["What the product does and who uses it", "Where it's hosted today", "Recent problems, and how urgent they are"],
    leave: ["What regular maintenance would cover", "How urgent issues would be handled", "A monthly support option to consider"],
    cta: "Talk to us about support",
  },
];

const METER = ["Idea", "Designs", "Code", "Users"];

export function StartingPoint() {
  const [active, setActive] = useState(0);
  const s = STARTS[active];

  return (
    <section className="ctk-sec" data-tone="services" data-section="where you're starting from" aria-labelledby="start-t">
      <div className="ctk-wrap">
        <div className="ctk-head ctk-head--split">
          <p className="ctk-kicker rv">Where you&apos;re starting from</p>
          <h2 id="start-t" className="ctk-h2 rv" data-d={1}>
            Every project starts somewhere. <span className="ctk-em">Tell us where.</span>
          </h2>
          <p className="ctk-p rv" data-d={2}>
            Pick the one that sounds like you to see what to bring to a first call and what you&apos;ll leave it with.
          </p>
        </div>

        <div className="ctk-start__cards rv">
          {STARTS.map((x, i) => (
            <button
              key={x.t}
              type="button"
              className="ctk-start__card"
              aria-pressed={i === active}
              aria-controls="start-panel"
              onClick={() => setActive(i)}
            >
              <IconTile className="ctk-start__ico">
                <path d={x.icon} />
              </IconTile>
              <b>{x.t}</b>
              <span className="ctk-start__line">{x.line}</span>
              <span className="ctk-start__meter">
                <span className="ctk-start__label">What you already have</span>
                <span className="ctk-start__segs" aria-label={`Already have: ${METER.slice(0, x.have).join(", ")}`}>
                  {METER.map((m, k) => (
                    <i key={m} className={k < x.have ? "on" : undefined} style={{ transitionDelay: `${k * 90}ms` }} />
                  ))}
                </span>
                <span className="ctk-start__names" aria-hidden="true">
                  {METER.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div key={active} id="start-panel" className="ctk-start__panel" aria-live="polite">
          <div className="ctk-start__head">
            <h3 className="ctk-h2">{s.t}</h3>
            <span className="ctk-start__where">
              <i />
              {s.where}
            </span>
          </div>
          <div className="ctk-start__cols">
            <div className="ctk-start__bring">
              <p className="ctk-start__label">Bring to the first call</p>
              <ol>
                {s.bring.map((b, k) => (
                  <li key={b} style={{ animationDelay: `${100 + k * 80}ms` }}>
                    {b}
                  </li>
                ))}
              </ol>
            </div>
            <div className="ctk-start__leave" data-theme="dark">
              <p className="ctk-start__label">You leave with</p>
              <ul>
                {s.leave.map((l, k) => (
                  <li key={l} style={{ animationDelay: `${180 + k * 80}ms` }}>
                    <Icon name="check" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="ctk-start__foot">
            <Btn href="/contact">{s.cta}</Btn>
            <span>Not sure which fits? Describe it in your own words and we will work it out together.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
