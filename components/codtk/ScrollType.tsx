import type { CSSProperties } from "react";

// Row styles: "" solid, "o" outline, "s b" blue serif italic.
const ROW_A: [string, string][] = [["Web apps", ""], ["Mobile", "o"], ["APIs", "s b"], ["Cloud", "o"], ["DevOps", ""], ["Automation", "o"], ["Web apps", "s b"], ["Mobile", "o"]];
const ROW_B: [string, string][] = [["Discover", "o"], ["Design", ""], ["Build", "s b"], ["Deploy", "o"], ["Support", ""], ["Discover", "o"], ["Design", ""], ["Build", "s b"]];

// Two type rows looping continuously in opposite directions. Each row is doubled so the loop is seamless.
export function Marquee() {
  return (
    <section className="ctk-marq" data-tone="quiet" aria-label="Web apps, mobile, APIs, cloud, DevOps, automation">
      {[ROW_A, ROW_B].map((row, r) => (
        <div key={r} className="ctk-marq__row" aria-hidden="true">
          {[...row, ...row].map(([t, c], i) => (
            <span key={i} className={c || undefined}>
              {t}
            </span>
          ))}
        </div>
      ))}
    </section>
  );
}

const PLAIN = "We build for people who want straight answers and".split(" ");
const EM = "software that does the job.".split(" ");

// Who CodTK is for, in prd.md §2's priority order. Kept clear of the starting points in StartingPoint and the
// promises in Why, so the home page doesn't repeat itself.
const AUDIENCE = [
  {
    tag: "Startup founders",
    t: "You have an idea and a deadline.",
    p: "You get engineers who question scope as well as write code, so the first release stays small, sharp and ready to grow.",
  },
  {
    tag: "Small and local businesses",
    t: "You run a business, not an IT department.",
    p: "We explain every choice in plain language and build tools your staff find easy to use from day one.",
  },
  {
    tag: "International clients",
    t: "You want a dependable team abroad.",
    p: "Pakistan time overlaps the Gulf workday and Europe's mornings, and international payments run through Payoneer.",
  },
];

// Who we work with: a statement whose words fill from faint to solid with scroll progress, then
// the three kinds of client CodTK is built for.
export function Statement() {
  const n = PLAIN.length + EM.length;
  const word = (w: string, i: number) => (
    <span key={i} style={{ "--i": i } as CSSProperties}>
      {w}{" "}
    </span>
  );
  return (
    <section className="ctk-sec" data-tone="quiet" data-section="who we work with" aria-labelledby="aud-t">
      <div className="ctk-wrap">
        <p className="ctk-kicker">Who we work with</p>
        <h2 id="aud-t" className="ctk-scrubtext" data-scrub style={{ "--n": n, marginTop: 28 } as CSSProperties}>
          {PLAIN.map(word)}
          <span className="ctk-em">{EM.map((w, i) => word(w, PLAIN.length + i))}</span>
        </h2>
        <ul className="ctk-aud">
          {AUDIENCE.map((a, i) => (
            <li key={a.tag} className="rv" data-d={i + 1}>
              <span className="ctk-aud__tag">{a.tag}</span>
              <h3 className="ctk-h3">{a.t}</h3>
              <p className="ctk-p">{a.p}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
