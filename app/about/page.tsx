import { TechReveal } from "@/components/codtk/TechReveal";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ArrowLink, Btn, Chips, IconTile, PageHero, SectionHead } from "@/components/codtk/primitives";
import { CtaBanner } from "@/components/codtk/CtaBanner";
import { LahoreCard } from "@/components/about/LahoreCard";
import { TeamDiagram } from "@/components/about/TeamDiagram";
import { TECH_STACK } from "@/lib/tech-stack";
import { Curtain } from "@/components/codtk/Curtain";

export const metadata: Metadata = pageMetadata("/about", "About CodTK | Software & Digital Growth Partner", "CodTK is a software and digital growth company in Lahore, Pakistan, founded in 2026: a remote team of engineers serving startups and businesses worldwide.");

// `tone` picks a colour from the sv-tone set; `icon` is a 24×24 line icon.
type Tile = { tone: string; icon: ReactNode };

const VALUES: (Tile & { title: string; text: string })[] = [
  { title: "Care", text: "We plan before we build and test before we promise.", tone: "web", icon: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.3" /></> },
  { title: "Ownership", text: "We take responsibility for the result, not just our own tasks.", tone: "mobile", icon: <path d="M5 21V4M5 4h11l-2 4 2 4H5" /> },
  { title: "Honesty", text: "We tell you about costs, risks and problems early and plainly, even when the news isn't good.", tone: "saas", icon: <path d="M4 5h16v11H9l-5 4zM8 10h8M8 13h5" /> },
  { title: "Quality", text: "Well-made work that's easy to use, with clear notes for whoever works on it next.", tone: "ai", icon: <path d="m4 20 4-1 11-11-3-3L5 16zM14 6l3 3" /> },
  { title: "Built to last", text: "We build for the years after launch: easy to look after and properly handed over.", tone: "api", icon: <path d="M17 7a6 6 0 1 0 1.5 6M17 3v4h-4" /> },
  { title: "Respect", text: "For our clients' time, budgets and users, and for each other's work.", tone: "consulting", icon: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /> },
];

// prd.md §3: the team is presented by function, with no headcount, profiles or photos.
const FUNCTIONS: (Tile & { name: string; text: string })[] = [
  { name: "Design & screens", text: "Websites, apps and everything people see and tap, fast and easy for everyone to use.", tone: "web", icon: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></> },
  { name: "Behind the scenes", text: "Logins, payments, stored information and live updates: the parts that make it work.", tone: "api", icon: <><rect x="4" y="4" width="16" height="7" rx="1.5" /><rect x="4" y="13" width="16" height="7" rx="1.5" /><path d="M8 7.5h.01M8 16.5h.01" /></> },
  { name: "Hosting & launch", text: "Hosting and updates that go live without taking your product down.", tone: "cloud", icon: <path d="M7 19h10a4.2 4.2 0 0 0 .7-8.35A6 6 0 0 0 6 9.4 4.8 4.8 0 0 0 7 19Z" /> },
];

const STORY = [
  "So we keep it direct. You work with the engineers who build your product, the price and plan are agreed in writing before work starts, and we take on any kind of software, from a first website to a full platform with its own app.",
  "We are built for startup founders and small businesses in Pakistan first, and for clients abroad who want to talk directly to the people building their product.",
];

// Same copy as the LinkedIn page (founder's brief, 2026-11-19), so every channel tells one story.
const HOW_WE_WORK: [string, string][] = [
  ["Discovery", "we understand your goals and requirements."],
  ["Design", "screens that are easy to use, and a solid plan for how it's built."],
  ["Building", "careful, tested work that's easy to update later."],
  ["Testing & Launch", "we test it, put it live, and keep an eye on it."],
  ["Support", "ongoing maintenance and improvements."],
];
const WHY: [string, string][] = [
  ["One team", "to build and grow your product."],
  ["Clear updates,", "and work delivered in agreed stages."],
  ["Your privacy:", "we never share your data or project details without permission."],
  ["Built to grow", "as your business grows."],
  ["Direct and fixed:", "you talk to the people building it, get a fixed price and own what we build."],
];

const MISSION_VISION = [
  ["Mission", "To build reliable software that makes our clients' work easier and helps them grow."],
  ["Vision", "To be the software team from Pakistan that businesses trust most."],
];


// About page: hero with the live Lahore card, story, mission and vision, values, the team as a
// connected diagram, technical expertise and the site's closing CTA.
export default function AboutPage() {
  return (
    <div className="sv-page ab-page">
      <Curtain>
      <PageHero
        crumb="About"
        path="/about"
        titleClassName="sv-h1"
        title={<>A small team that does it properly.</>}
        intro="CodTK is a software and digital growth company based in Lahore, Pakistan, working with startups and businesses worldwide. We build websites, apps and business software, and help businesses move online and grow. Founded in 2026, we're a remote team covering design, building, AI and hosting."
        actions={
          <>
            <Btn href="/contact">
              Start a Project
            </Btn>
            <a className="ctk-link" href="#team">
              Meet the team
            </a>
          </>
        }
        aside={<LahoreCard />}
      />

      <section className="ctk-sec sv-sec" data-section="story" aria-labelledby="ab-story-h">
        <div className="ctk-wrap ab-story">
          <div className="ab-story__head">
            <h2 id="ab-story-h" className="sv-h2">
              Started because good ideas deserve good builders.
            </h2>
          </div>
          <div className="ab-story__body">
            <p className="ab-story__lead">
              CodTK started from a simple observation: many businesses know exactly what they need their software to
              do, yet struggle to find a partner who will build it properly and stay accountable once it is live.
            </p>
            {STORY.map((t) => (
              <p key={t} className="sv-body">
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>
      </Curtain>

      <section className="ab-mv" data-theme="dark" data-section="mission" aria-label="Mission and vision">
        <span className="ab-mv__glow" aria-hidden="true" />
        <div className="ctk-wrap ab-mv__g">
          {MISSION_VISION.map(([k, t]) => (
            <article key={k} className="ab-mv__item">
              <p className="ctk-kicker">{k}</p>
              <p className="ab-mv__s">
                {t}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="ctk-sec sv-sec cf-where" data-section="how we work" aria-labelledby="ab-how-h">
        <div className="ctk-wrap">
          <SectionHead
            id="ab-how-h"
            titleClassName="sv-h2"
            title={
              <>
                Five steps, and one team through all of them.
              </>
            }
          />
          <div className="cf-where__g">
            <article className="cf-card">
              <h3>How we work</h3>
              <ol className="cf-list">
                {HOW_WE_WORK.map(([b, t]) => (
                  <li key={b}>
                    <b>{b}:</b>
                    {t}
                  </li>
                ))}
              </ol>
              <ArrowLink href="/process">The process in detail</ArrowLink>
            </article>
            <article className="cf-card">
              <h3>Why CodTK</h3>
              <ul className="cf-list">
                {WHY.map(([b, t]) => (
                  <li key={b}>
                    <b>{b}</b>
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="ctk-sec sv-sec" data-section="values" aria-labelledby="ab-values-h">
        <div className="ctk-wrap">
          <SectionHead
            id="ab-values-h"
            titleClassName="sv-h2"
            title={
              <>
                What we stand for.
              </>
            }
          />
          <ul className="ctk-rules">
            {VALUES.map((v) => (
              <li key={v.title} className="ctk-rule">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ctk-sec sv-sec ab-team" id="team" data-section="team" aria-labelledby="ab-team-h">
        <div className="ctk-wrap">
          <SectionHead
            id="ab-team-h"
            titleClassName="sv-h2"
            title={
              <>
                The people behind your product.
              </>
            }
            intro="The CodTK team in Lahore covers the whole build. You talk directly to the engineers working on your product, from the first call to launch and after."
          />
          <TeamDiagram>
            {FUNCTIONS.map((f) => (
              <article key={f.name} data-fn className={`ctk-card ctk-glow ab-card sv-tone--${f.tone}`}>
                <IconTile className="sv-ic sv-ic--lg">{f.icon}</IconTile>
                <h3>{f.name}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </TeamDiagram>
          <div className="ab-founder">
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

      <section className="ctk-sec sv-sec" data-section="expertise" aria-labelledby="ab-ex-h">
        <div className="ctk-wrap">
          <SectionHead
            id="ab-ex-h"
            titleClassName="sv-h2"
            title={
              <>
                The tools we use.
              </>
            }
          />
          <TechReveal>
          <div className="ab-stack">
            {TECH_STACK.map((g) => (
              <div key={g.category} className="ab-group">
                <h3>
                  {g.category}
                  <span>{g.items.length}</span>
                </h3>
                <Chips items={g.items} brand />
              </div>
            ))}
          </div>
          </TechReveal>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
