import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero, SectionHead } from "@/components/codtk/primitives";
import { CtaBanner } from "@/components/codtk/CtaBanner";
import { PROCESS_STEPS } from "@/lib/process";

export const metadata: Metadata = pageMetadata("/process", "Our Process", "How CodTK delivers custom software: discovery, design, development, deployment and support, with an NDA and milestone payments on every project.");

// prd.md §6.6 / FR-13.
const TERMS = [
  ["Contract and NDA", "A contract and NDA are signed before every project starts."],
  ["Milestone payments", "Fixed-scope work is paid in milestones, for example 30% / 40% / 30%, as set out in the contract. Support and maintenance is a monthly retainer."],
  ["Payment methods", "JazzCash, Easypaisa or Payoneer."],
  ["You own it", "You own the code and IP once the project is paid in full."],
];

// Design system ProcessScrolly: on desktop the section pins while scrolling advances the stages and
// the pipeline window (components/codtk/Motion.tsx); phones get a stacked timeline. Each terminal
// lists that step's real tools and what the client receives, never invented figures.
export default function ProcessPage() {
  const steps = PROCESS_STEPS;
  return (
    <>
      <PageHero
        crumb="Process"
        title={
          <>
            A delivery pipeline built for <span className="ctk-em">predictable</span> outcomes.
          </>
        }
        intro="Five stages from the first conversation to launch and beyond, each with clear deliverables and your sign-off."
        tone="process"
        seed={12}
      />

      <section className="ctk-sec" data-tone="process" data-section="pipeline" style={{ paddingBottom: 0 }}>
        <div className="ctk-scrolly" data-scrolly>
          <div className="ctk-wrap ctk-scrolly__pin">
            <div>
              <ol className="ctk-scrolly__idx" aria-hidden="true">
                {steps.map((s, i) => (
                  <li key={s.title} data-idx={i} className={i ? undefined : "on"}>
                    stage 0{i + 1} · {s.short.toLowerCase()}
                  </li>
                ))}
              </ol>
              <ol className="ctk-stages">
                {steps.map((s, i) => (
                  <li key={s.title} className={`ctk-stage${i ? "" : " on"}`} data-stage={i}>
                    <span className="ctk-label" style={{ color: "var(--blue-400)" }}>
                      stage 0{i + 1} / 0{steps.length}
                    </span>
                    <h2 className="ctk-h3">{s.title}</h2>
                    <p className="ctk-p">{s.description}</p>
                    <span className="ctk-chip">{s.tools.length ? s.tools.join(" · ") : "after launch"}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="ctk-code ctk-pipe" data-theme="dark" aria-hidden="true">
              <div className="ctk-code__bar ctk-mono">
                <i />
                <i />
                <i />
                <span>pipeline · codtk/delivery</span>
                <em data-pipe-status>running ● stage 1/{steps.length}</em>
              </div>
              <div className="ctk-pipe__nodes">
                <div className="ctk-pipe__rail">
                  <div className="ctk-pipe__fill" data-pipe-fill />
                </div>
                {steps.map((s, i) => (
                  <div key={s.title} className={`ctk-pipe__node${i ? "" : " on"}`} data-node={i}>
                    <i />
                    {s.short.toLowerCase()}
                  </div>
                ))}
              </div>
              <div className="ctk-term">
                {steps.map((s, i) => (
                  <div key={s.title} data-panel={i} className={i ? undefined : "on"}>
                    <p>
                      <b>$</b> codtk {s.short.toLowerCase()}
                    </p>
                    {s.tools.length > 0 && <p className="dim">tools › {s.tools.join(", ")}</p>}
                    {s.gets.map((g) => (
                      <p key={g} className="ok">
                        ✓ {g}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ctk-sec ctk-rule" data-tone="quiet" data-section="engagement">
        <div className="ctk-wrap">
          <SectionHead
            eyebrow="engagement model"
            title={
              <>
                Clear terms <span className="ctk-em">before we start</span>.
              </>
            }
          />
          <ul className="ctk-values">
            {TERMS.map(([t, d], i) => (
              <li key={t} className="rv" data-d={i % 3}>
                <p className="ctk-mono" style={{ color: "var(--blue-400)", marginBottom: 16 }}>
                  terms.0{i + 1}
                </p>
                <h3>{t}</h3>
                <p className="ctk-sm">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
