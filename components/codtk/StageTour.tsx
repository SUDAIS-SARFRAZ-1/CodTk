"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/codtk/primitives";
import { PROCESS_STEPS } from "@/lib/process";

const STEP_MS = 4200;
const REDUCE = "(prefers-reduced-motion: reduce)";
const onReduceChange = (cb: () => void) => {
  const m = matchMedia(REDUCE);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

// The delivery timeline inside DeliveryStage: advances one step every STEP_MS, a click jumps to a
// step and restarts the clock, Pause stops it. Reduced motion starts paused.
export function StageTour() {
  const [active, setActive] = useState(0);
  // null until the visitor presses Pause/Play; until then reduced motion decides
  const [paused, setPaused] = useState<boolean | null>(null);
  // bumping `tick` on a click restarts the interval (and the timer bar) from zero
  const [tick, setTick] = useState(0);
  const reduce = useSyncExternalStore(onReduceChange, () => matchMedia(REDUCE).matches, () => false);
  const playing = paused === null ? !reduce : !paused;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % PROCESS_STEPS.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [playing, tick]);

  const step = PROCESS_STEPS[active];
  const fill = `${(active / (PROCESS_STEPS.length - 1)) * 100}%`;

  return (
    <div className="ctk-tour__main">
      <div className="ctk-tour__top">
        <p className="ctk-tour__label">Your project, stage by stage</p>
        <button
          type="button"
          className="ctk-tour__ctl"
          onClick={() => setPaused(playing)}
          aria-label={playing ? "Pause the stage tour" : "Play the stage tour"}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {playing ? <path d="M7 5h3v14H7zM14 5h3v14h-3z" /> : <path d="M7 5l12 7-12 7z" />}
          </svg>
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      <div className="ctk-tour__track">
        <div className="ctk-tour__line" aria-hidden="true">
          <i style={{ width: fill }} />
          <b style={{ left: fill }} />
        </div>
        <ol className="ctk-tour__nodes">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className={i === active ? "on" : i < active ? "done" : undefined}>
              <button
                type="button"
                aria-pressed={i === active}
                aria-label={`Stage ${i + 1}: ${s.title}`}
                onClick={() => {
                  setActive(i);
                  setTick((t) => t + 1);
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
              <span>{s.short}</span>
            </li>
          ))}
        </ol>
      </div>

      <div key={`${active}-${tick}`} className="ctk-tour__panel" aria-live="polite">
        {playing && <i className="ctk-tour__timer" aria-hidden="true" style={{ animationDuration: `${STEP_MS}ms` }} />}
        <div className="ctk-tour__head">
          <h3 className="ctk-h3">{step.title}</h3>
          <span className="ctk-tour__label">
            Stage {String(active + 1).padStart(2, "0")} / {String(PROCESS_STEPS.length).padStart(2, "0")}
          </span>
        </div>
        <p className="ctk-p">{step.homeDescription ?? step.description}</p>
        <div className="ctk-tour__cols">
          <div>
            <p className="ctk-tour__label">What you get</p>
            <ul className="ctk-tour__gets">
              {step.gets.map((g, k) => (
                <li key={g} style={{ animationDelay: `${120 + k * 90}ms` }}>
                  <Icon name="check" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
          {step.tools.length > 0 && (
            <div>
              <p className="ctk-tour__label">Tools we use</p>
              <div className="ctk-tour__tools">
                {step.tools.map((t) => (
                  <span key={t} className="ctk-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
