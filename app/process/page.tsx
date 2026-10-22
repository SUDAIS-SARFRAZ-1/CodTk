import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Btn, IconTile, PageHero, SectionHead } from "@/components/codtk/primitives";
import { CtaBanner } from "@/components/codtk/CtaBanner";
import { ProcessTunnel } from "@/components/process/ProcessTunnel";
import { PROCESS_STEPS } from "@/lib/process";

export const metadata: Metadata = pageMetadata("/process", "Our Process", "How CodTK delivers custom software: discovery, design, development, deployment and support, with an NDA and milestone payments on every project.");

const WORDS: [string, boolean][] = [
  ["A", false],
  ["delivery", false],
  ["process", false],
  ["built", false],
  ["for", false],
  ["predictable", true],
  ["outcomes.", true],
];

// prd.md §6.6 / FR-13. `icon` is a 24×24 line icon, `tone` one of the sv-tone colours.
const TERMS: { title: string; text: string; tone: string; icon: ReactNode }[] = [
  {
    title: "Contract and NDA",
    text: "A contract and NDA are signed before every project starts.",
    tone: "web",
    icon: <path d="M6 3h9l3 3v15H6zM9 11h6M9 15h6" />,
  },
  {
    title: "Milestone payments",
    text: "Fixed-scope work is paid in milestones, for example 30% / 40% / 30%, as set out in the contract. Support and maintenance is a monthly retainer.",
    tone: "mobile",
    icon: <path d="M3 18h5v-4h5v-4h5V6h3" />,
  },
  {
    title: "Payment methods",
    text: "JazzCash, Easypaisa or Payoneer.",
    tone: "saas",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2.5" />
        <path d="M3 10.5h18M7 15h4" />
      </>
    ),
  },
  {
    title: "You own it",
    text: "You own the code and IP once the project is paid in full.",
    tone: "ai",
    icon: (
      <>
        <circle cx="8" cy="15" r="4" />
        <path d="m11 12 8-8M16 7l2 2M14 9l2 2" />
      </>
    ),
  },
];

// Process page: hero with the five stages at a glance, the stage-by-stage camera flight
// (ProcessTunnel), the engagement terms and the site's closing CTA.
export default function ProcessPage() {
  return (
    <div className="sv-page pr-page">
      <PageHero
        crumb="Process"
        plainCrumb
        tone="process"
        seed={12}
        titleClassName="sv-h1 ctk-blurin"
        titleLabel="A delivery process built for predictable outcomes."
        title={
          <span aria-hidden="true">
            {WORDS.map(([w, blue], i) => (
              <span key={w}>
                <span className={blue ? "w sv-b" : "w"} style={{ "--i": i } as CSSProperties}>
                  {w}
                </span>{" "}
              </span>
            ))}
          </span>
        }
        intro="Five stages from the first conversation to launch and beyond, each with clear deliverables and your sign-off."
        actions={
          <>
            <Btn href="/contact" magnetic>
              Start a Project
            </Btn>
            <a className="ctk-link" href="#stages">
              See the five stages
            </a>
          </>
        }
      />

      <div className="ctk-wrap">
        <ol className="pr-overview rv" aria-label="The five stages">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} style={{ "--k": i } as CSSProperties}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              {s.title}
            </li>
          ))}
        </ol>
      </div>

      <ProcessTunnel />

      <section className="ctk-sec sv-sec" data-tone="quiet" data-section="engagement" aria-labelledby="pr-terms-h">
        <div className="ctk-wrap">
          <SectionHead
            kicker
            eyebrow="Engagement model"
            id="pr-terms-h"
            titleClassName="sv-h2"
            title={
              <>
                Clear terms <span className="sv-b">before we start.</span>
              </>
            }
          />
          <ul className="pr-terms">
            {TERMS.map((t, i) => (
              <li key={t.title} className={`ctk-card ctk-glow pr-term sv-tone--${t.tone} rv`} data-d={i}>
                <span className="pr-term__n">{String(i + 1).padStart(2, "0")}</span>
                <IconTile className="sv-ic sv-ic--lg">{t.icon}</IconTile>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
