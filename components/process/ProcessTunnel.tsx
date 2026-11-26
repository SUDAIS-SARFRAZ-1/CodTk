import { Icon, TechIcon } from "@/components/codtk/primitives";
import { TechReveal } from "@/components/codtk/TechReveal";
import { PROCESS_STEPS } from "@/lib/process";

const pad = (i: number) => String(i + 1).padStart(2, "0");
const TOTAL = pad(PROCESS_STEPS.length - 1);

// The delivery process, stage by stage: one card per stage with what the client receives, and the
// tools used behind a button. Static (founder, 2026-11-19: no pinned or scroll-driven sections).
export function ProcessTunnel() {
  return (
    <section
      className="tn"
      id="stages"
      data-theme="dark"
      data-section="stages"
      aria-label="Our delivery process, stage by stage"
    >
      <div className="tn__stage">
        <div className="tn__world">
          {PROCESS_STEPS.map((s, i) => (
            <article key={s.title} className="gate" aria-labelledby={`stage-${i}`}>
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
                  {s.tools.length > 0 && (
                    <TechReveal label="See the tools we use" hideLabel="Hide tools">
                      <ul className="gate__tools">
                        {s.tools.map((t) => (
                          <li key={t}>
                            <TechIcon name={t} />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </TechReveal>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
