import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ArrowLink, Btn, Chips, IconTile, PageHero, SectionHead } from "@/components/codtk/primitives";
import { CtaBanner } from "@/components/codtk/CtaBanner";
import { LahoreCard } from "@/components/about/LahoreCard";
import { TeamDiagram } from "@/components/about/TeamDiagram";
import { TECH_STACK } from "@/lib/tech-stack";

export const metadata: Metadata = pageMetadata("/about", "About", "About CodTK, a new software company in Lahore. Work directly with the engineers who build your product: frontend, backend and DevOps under one roof.");

// `tone` picks a colour from the sv-tone set; `icon` is a 24×24 line icon.
type Tile = { tone: string; icon: ReactNode };

const VALUES: (Tile & { title: string; text: string })[] = [
  { title: "Precision", text: "We specify before we build and test before we claim. Detail is where reliability is made.", tone: "web", icon: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.3" /></> },
  { title: "Ownership", text: "One team is accountable for the outcome, not only for the tasks it was handed.", tone: "mobile", icon: <path d="M5 21V4M5 4h11l-2 4 2 4H5" /> },
  { title: "Candour", text: "Estimates, risks and trade-offs are shared plainly and early, including when the news is unwelcome.", tone: "saas", icon: <path d="M4 5h16v11H9l-5 4zM8 10h8M8 13h5" /> },
  { title: "Craft", text: "Readable code, considered interfaces and documentation the next engineer will thank us for.", tone: "ai", icon: <path d="m4 20 4-1 11-11-3-3L5 16zM14 6l3 3" /> },
  { title: "Continuity", text: "We build for the years after launch: easy to maintain, easy to monitor and cleanly handed over.", tone: "api", icon: <path d="M17 7a6 6 0 1 0 1.5 6M17 3v4h-4" /> },
  { title: "Respect", text: "For our clients' time, budgets and users, and for each other's work.", tone: "consulting", icon: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /> },
];

// prd.md §3: the team is presented by function, with no headcount, profiles or photos.
const FUNCTIONS: (Tile & { name: string; text: string; tech: string[] })[] = [
  { name: "Frontend", text: "Websites, web apps and mobile interfaces, built for speed and accessibility.", tech: ["Next.js", "React", "TypeScript", "React Native"], tone: "web", icon: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></> },
  { name: "Backend", text: "APIs, databases, logins and permissions, payments and real-time features.", tech: ["Node.js", "Express", "Python", "PostgreSQL"], tone: "api", icon: <><rect x="4" y="4" width="16" height="7" rx="1.5" /><rect x="4" y="13" width="16" height="7" rx="1.5" /><path d="M8 7.5h.01M8 16.5h.01" /></> },
  { name: "DevOps", text: "Pipelines, hosting and releases that go out without taking your product down.", tech: ["Docker", "GitHub Actions", "AWS", "Vercel"], tone: "cloud", icon: <path d="M7 19h10a4.2 4.2 0 0 0 .7-8.35A6 6 0 0 0 6 9.4 4.8 4.8 0 0 0 7 19Z" /> },
];

const STORY = [
  "So we keep it direct. You work with the engineers who build your product, scope and cost are agreed in writing before work starts, and we take on any kind of software, from a first website to a full platform with its own app.",
  "We are built for startup founders and small businesses in Pakistan first, and for clients abroad who want a direct line to the people writing their code.",
];

const MISSION_VISION = [
  ["Mission", "To build dependable software that measurably improves how our clients work and grow."],
  ["Vision", "To be the most trusted engineering partner from Pakistan for businesses building their next generation of software."],
];

// Words that blur in one after another (ctk-blurin), for headings and statements.
function Words({ text, blueFrom }: { text: string; blueFrom?: number }) {
  return (
    <span aria-hidden="true">
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className={blueFrom !== undefined && i >= blueFrom ? "w sv-b" : "w"} style={{ "--i": i } as CSSProperties}>
            {w}
          </span>{" "}
        </span>
      ))}
    </span>
  );
}

const pad = (i: number) => String(i + 1).padStart(2, "0");

// About page: hero with the live Lahore card, story, mission and vision, values, the team as a
// connected diagram, technical expertise and the site's closing CTA.
export default function AboutPage() {
  return (
    <div className="sv-page ab-page">
      <PageHero
        crumb="About"
        plainCrumb
        seed={9}
        titleClassName="sv-h1 ctk-blurin"
        titleLabel="A focused team, engineering with discipline."
        title={<Words text="A focused team, engineering with discipline." blueFrom={5} />}
        intro="CodTK is a new software company in Lahore. We design, build and run software for startups and businesses in Pakistan and abroad."
        actions={
          <>
            <Btn href="/contact" magnetic>
              Start a Project
            </Btn>
            <a className="ctk-link" href="#team">
              Meet the team
            </a>
          </>
        }
        aside={<LahoreCard />}
      />

      <section className="ctk-sec sv-sec" data-tone="quiet" data-section="story" aria-labelledby="ab-story-h">
        <div className="ctk-wrap ab-story">
          <div className="ab-story__head">
            <p className="ctk-kicker rv">Our story</p>
            <h2 id="ab-story-h" className="sv-h2 rv" data-d={1}>
              Founded to close the gap between <span className="sv-b">ambition and execution.</span>
            </h2>
          </div>
          <div className="ab-story__body">
            <p className="ab-story__lead rv" data-d={1}>
              CodTK started from a simple observation: many businesses know exactly what they need their software to
              do, yet struggle to find a partner who will build it properly and stay accountable once it is live.
            </p>
            {STORY.map((t, i) => (
              <p key={t} className="sv-body rv" data-d={i + 2}>
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="ab-mv" data-theme="dark" data-tone="services" data-section="mission" aria-label="Mission and vision">
        <span className="ab-mv__glow" aria-hidden="true" />
        <div className="ctk-wrap ab-mv__g">
          {MISSION_VISION.map(([k, t], i) => (
            <article key={k} className="ab-mv__item">
              <p className="ctk-kicker rv">{k}</p>
              <p className="ab-mv__s ctk-blurin rv" data-d={i + 1} aria-label={t}>
                <Words text={t} />
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="ctk-sec sv-sec" data-tone="quiet" data-section="values" aria-labelledby="ab-values-h">
        <div className="ctk-wrap">
          <SectionHead
            kicker
            eyebrow="Values"
            id="ab-values-h"
            titleClassName="sv-h2"
            title={
              <>
                Principles we are <span className="sv-b">held to.</span>
              </>
            }
          />
          <ul className="ab-values">
            {VALUES.map((v, i) => (
              <li key={v.title} className={`ctk-card ctk-glow ab-card sv-tone--${v.tone} rv`} data-d={i % 3}>
                <span className="ab-card__n">{pad(i)}</span>
                <IconTile className="sv-ic sv-ic--lg">{v.icon}</IconTile>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ctk-sec sv-sec ab-team" id="team" data-tone="work" data-section="team" aria-labelledby="ab-team-h">
        <div className="ctk-wrap">
          <SectionHead
            kicker
            eyebrow="Team"
            id="ab-team-h"
            titleClassName="sv-h2"
            title={
              <>
                The people behind <span className="sv-b">your product.</span>
              </>
            }
            intro="The CodTK team in Lahore covers the whole build. You talk directly to the engineers working on your product, from the first call to launch and after."
          />
          <TeamDiagram>
            {FUNCTIONS.map((f, i) => (
              <article key={f.name} data-fn className={`ctk-card ctk-glow ab-card sv-tone--${f.tone} rv`} data-d={i}>
                <IconTile className="sv-ic sv-ic--lg">{f.icon}</IconTile>
                <h3>{f.name}</h3>
                <p>{f.text}</p>
                <div className="ab-card__chips">
                  <Chips items={f.tech} brand />
                </div>
              </article>
            ))}
          </TeamDiagram>
          <div className="ab-founder rv">
            <span className="ab-founder__mark" aria-hidden="true">
              SS
            </span>
            <p>
              Founded by <b>Sudais Sarfraz</b>, Software Engineering, UCP (2026).
            </p>
            <div className="ab-founder__links">
              <ArrowLink href="https://sudaissarfraz.vercel.app/">Portfolio</ArrowLink>
              <ArrowLink href="https://github.com/SUDAIS-SARFRAZ-1">GitHub</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="ctk-sec sv-sec" data-tone="services" data-section="expertise" aria-labelledby="ab-ex-h">
        <div className="ctk-wrap">
          <SectionHead
            kicker
            eyebrow="Technical expertise"
            id="ab-ex-h"
            titleClassName="sv-h2"
            title={
              <>
                A modern, <span className="sv-b">focused stack.</span>
              </>
            }
          />
          <div className="ab-stack">
            {TECH_STACK.map((g, i) => (
              <div key={g.category} className="ab-group rv" data-d={i % 3}>
                <h3>
                  {g.category}
                  <span>{g.items.length}</span>
                </h3>
                <Chips items={g.items} brand />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
