import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ArrowLink, Chips, Eyebrow, PageHero, SectionHead, TechIcon, rv } from "@/components/codtk/primitives";
import { CtaBanner } from "@/components/codtk/CtaBanner";
import { TECH_STACK } from "@/lib/tech-stack";

export const metadata: Metadata = pageMetadata("/about", "About", "About CodTK, a new software company in Lahore. Work directly with the engineers who build your product: frontend, backend and DevOps under one roof.");

const VALUES = [
  ["Precision", "We specify before we build and test before we claim. Detail is where reliability is made."],
  ["Ownership", "One team is accountable for the outcome, not only for the tasks it was handed."],
  ["Candour", "Estimates, risks and trade-offs are shared plainly and early, including when the news is unwelcome."],
  ["Craft", "Readable code, considered interfaces and documentation the next engineer will thank us for."],
  ["Continuity", "We build for the years after launch: easy to maintain, easy to monitor and cleanly handed over."],
  ["Respect", "For our clients' time, budgets and users, and for each other's work."],
];

// prd.md §3: the team is presented by function, with no headcount, profiles or photos.
const FUNCTIONS = [
  { name: "Frontend", text: "Websites, web apps and mobile interfaces, built for speed and accessibility.", tech: ["Next.js", "React", "TypeScript", "React Native"] },
  { name: "Backend", text: "APIs, databases, logins and permissions, payments and real-time features.", tech: ["Node.js", "Express", "Python", "PostgreSQL"] },
  { name: "DevOps", text: "Pipelines, hosting and releases that go out without taking your product down.", tech: ["Docker", "GitHub Actions", "AWS", "Vercel"] },
];

// Design system AboutPage: story, mission and vision, values, team, expertise matrix. Its team of
// portrait placeholders is replaced by the team by function, and the founder appears only as a line.
export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        title={
          <>
            A focused team, engineering with <span className="ctk-em">discipline</span>.
          </>
        }
        intro="CodTK is a new software company in Lahore. We design, build and run software for startups and businesses in Pakistan and abroad."
        seed={9}
      />

      <section className="ctk-sec" data-tone="quiet" data-section="story">
        <div className="ctk-wrap">
          <div className="ctk-g">
            <div className="l-5">
              <div {...rv(0)}>
                <Eyebrow>our story</Eyebrow>
              </div>
              <h2 className="ctk-h2 rv" data-d={1} style={{ marginTop: 24 }}>
                Founded to close the gap between ambition and execution.
              </h2>
            </div>
            <div className="l-s7 ctk-prose rv" data-d={2}>
              <p className="ctk-lead">
                CodTK started from a simple observation: many businesses know exactly what they need their software to
                do, yet struggle to find a partner who will build it properly and stay accountable once it is live.
              </p>
              <p className="ctk-p">
                So we keep it direct. You work with the engineers who build your product, scope and cost are agreed in
                writing before work starts, and we take on any kind of software, from a first website to a full
                platform with its own app.
              </p>
              <p className="ctk-p">
                We are built for startup founders and small businesses in Pakistan first, and for clients abroad who
                want a direct line to the people writing their code.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ctk-sec ctk-rule" data-tone="services" data-section="mission">
        <div className="ctk-wrap">
          <div className="ctk-cards">
            <div className="ctk-card ctk-glow rv" style={{ padding: "48px 40px" }}>
              <Eyebrow>mission</Eyebrow>
              <p className="ctk-statement">
                To build dependable software that measurably improves how our clients work and grow.
              </p>
            </div>
            <div className="ctk-card ctk-glow rv" data-d={1} style={{ padding: "48px 40px" }}>
              <Eyebrow>vision</Eyebrow>
              <p className="ctk-statement">
                To be the most trusted engineering partner from Pakistan for businesses building their next generation
                of software.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ctk-sec ctk-rule" data-tone="quiet" data-section="values">
        <div className="ctk-wrap">
          <SectionHead
            eyebrow="values"
            title={
              <>
                Principles we are <span className="ctk-em">held to</span>.
              </>
            }
          />
          <ul className="ctk-values">
            {VALUES.map(([t, d], i) => (
              <li key={t} className="rv" data-d={i % 3}>
                <p className="ctk-mono" style={{ color: "var(--blue-400)", marginBottom: 16 }}>
                  value.0{i + 1}
                </p>
                <h3>{t}</h3>
                <p className="ctk-sm">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ctk-sec ctk-rule" data-tone="work" data-section="team">
        <div className="ctk-wrap">
          <SectionHead
            eyebrow="team"
            title={
              <>
                One team, <span className="ctk-em">every layer</span>.
              </>
            }
            intro="The CodTK team in Lahore covers the whole build. You talk directly to the engineers working on your product, from the first call to launch and after."
          />
          <div className="ctk-cards ctk-cards--3">
            {FUNCTIONS.map((f, i) => (
              <div key={f.name} className="ctk-card ctk-card--lift ctk-glow rv" data-d={i}>
                <p className="ctk-mono" style={{ color: "var(--blue-400)" }}>
                  team.0{i + 1}
                </p>
                <h3 className="ctk-h3" style={{ margin: "48px 0 12px" }}>
                  {f.name}
                </h3>
                <p className="ctk-sm">{f.text}</p>
                <div style={{ marginTop: "auto", paddingTop: 32 }}>
                  <Chips items={f.tech} />
                </div>
              </div>
            ))}
          </div>
          <div className="rv" style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: "12px 32px", alignItems: "baseline" }}>
            <p className="ctk-p">
              Founded by <b style={{ color: "var(--ink-100)", fontWeight: 500 }}>Sudais Sarfraz</b>, Software
              Engineering, UCP (2026).
            </p>
            <ArrowLink href="https://sudaissarfraz.vercel.app/">Portfolio</ArrowLink>
            <ArrowLink href="https://github.com/SUDAIS-SARFRAZ-1">GitHub</ArrowLink>
          </div>
        </div>
      </section>

      <section className="ctk-sec ctk-rule" data-tone="services" data-section="expertise">
        <div className="ctk-wrap">
          <SectionHead
            eyebrow="technical expertise"
            title={
              <>
                A modern, <span className="ctk-em">focused</span> stack.
              </>
            }
          />
          <div className="ctk-expert">
            {TECH_STACK.map((g, i) => (
              <div key={g.category} className="rv" data-d={i % 3}>
                <p className="ctk-label" style={{ color: "var(--blue-400)" }}>
                  {g.category}
                </p>
                <ul>
                  {g.items.map((t) => (
                    <li key={t}>
                      <TechIcon name={t} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
