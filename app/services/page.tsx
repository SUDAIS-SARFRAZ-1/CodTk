import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Btn, Chips, Icon, Net, PageHero, SectionHead } from "@/components/codtk/primitives";
import { Faq } from "@/components/codtk/Faq";
import { CtaBanner } from "@/components/codtk/CtaBanner";
import { SERVICE_PAGE, SERVICES } from "@/lib/services";
import { PROJECT_TYPES } from "@/features/contact/schema";

export const metadata: Metadata = pageMetadata("/services", "Services", "Custom software development in Pakistan: web, mobile, backend and API, cloud and DevOps, automation and consulting from CodTK in Lahore.");

const quote = (type: string) => `/contact?service=${encodeURIComponent(type)}`;
const OTHER = PROJECT_TYPES[PROJECT_TYPES.length - 1];

// prd.md §6.6 engagement model; the free month of fixes is lib/process.ts' Support step.
const MODELS = [
  {
    title: "Fixed-scope project",
    text: "A defined outcome with scope, timeline and cost agreed in writing before work starts, paid in milestones such as 30% / 40% / 30%.",
    fit: "best for new builds and MVPs",
  },
  {
    title: "Support and maintenance",
    text: "Fixes, security updates and planned improvements on a monthly retainer. The first month of bug fixes after launch is free.",
    fit: "best for live products",
  },
  {
    title: "Technical consulting",
    text: "An outside engineer's view before you commit: what to build first, how to build it and what could go wrong, as a written plan.",
    fit: "best before a big build",
  },
];

// Flags in the CLI line take the accent, as in the design system's `<b>--flag</b>`.
function Cmd({ cmd }: { cmd: string }) {
  return (
    <p className="ctk-scard__cmd" style={{ marginTop: 24 }}>
      <b>$</b>{" "}
      {cmd.split(" ").map((w, i) => (
        <span key={i}>{w.startsWith("--") ? <b>{w}</b> : w} </span>
      ))}
    </p>
  );
}

// Design system ServicesPage: page hero, anchor chips, one detailed block per service, engagement
// models, FAQ, CTA. Its Delivery Standard section is left out until there are real scores (rules.md §1).
export default function ServicesPage() {
  const n = (i: number) => String(i + 1).padStart(2, "0");
  return (
    <>
      <PageHero
        crumb="Services"
        title={
          <>
            Engineering capability, <span className="ctk-em">end to end</span>.
          </>
        }
        intro="Six services from one team. Each project is scoped to your goals, agreed in writing and delivered against milestones. Timeline and cost depend on scope; we confirm both before work starts."
        tone="services"
        seed={5}
      />

      <section className="ctk-sec" data-tone="services" data-section="disciplines" style={{ paddingTop: 48 }}>
        <div className="ctk-wrap">
          <nav className="ctk-anchors" aria-label="Services">
            {SERVICES.map((s, i) => (
              <a key={s.slug} className="ctk-chip" style={{ height: 40, padding: "0 16px" }} href={`#${s.slug}`}>
                {n(i)} {s.title.toLowerCase()}
              </a>
            ))}
          </nav>

          <div style={{ marginTop: 48 }}>
            {SERVICES.map((s, i) => {
              const p = SERVICE_PAGE[s.slug];
              return (
                <article key={s.slug} className="ctk-svd" id={s.slug}>
                  {i % 2 ? null : <Net seed={30 + i} n={3} />}
                  <div className="rv">
                    <p className="ctk-svd__n">
                      {n(i)} / 0{SERVICES.length} · {p.tag}
                    </p>
                    <h2 className="ctk-h2">{s.title}</h2>
                    <p className="ctk-p">{s.description}</p>
                    <Cmd cmd={p.cmd} />
                    <div style={{ marginTop: 28 }}>
                      <Btn href={quote(s.title)} variant="secondary" size="sm">
                        Get a Quote<span className="ctk-sr"> for {s.title}</span>
                      </Btn>
                    </div>
                  </div>
                  <div className="rv" data-d={1}>
                    <p className="ctk-label">{"// key deliverables"}</p>
                    <ul className="ctk-ticks ctk-ticks--2" style={{ marginTop: 20 }}>
                      {p.deliverables.map((d) => (
                        <li key={d}>
                          <Icon name="check" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <p className="ctk-label" style={{ marginTop: 40 }}>
                      {"// technologies"}
                    </p>
                    <div style={{ marginTop: 16 }}>
                      <Chips items={p.tech} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="ctk-invite rv" style={{ minHeight: 0 }}>
            <div>
              <p className="ctk-label" style={{ color: "var(--blue-400)" }}>
                {"// something else?"}
              </p>
              <h2 className="ctk-h2" style={{ marginTop: 20 }}>
                Not on the list? <span className="ctk-em">Tell us</span>.
              </h2>
              <p className="ctk-sm" style={{ marginTop: 16, maxWidth: "40em" }}>
                We take on any kind of software development. Describe what you need and we will tell you how we would
                build it.
              </p>
            </div>
            <div className="ctk-actions">
              <Btn href={quote(OTHER)}>Get a Quote</Btn>
            </div>
          </div>
        </div>
      </section>

      <section className="ctk-sec ctk-rule" data-tone="quiet" data-section="engagement">
        <div className="ctk-wrap">
          <SectionHead
            eyebrow="engagement models"
            title={
              <>
                Structured to suit <span className="ctk-em">how you work</span>.
              </>
            }
          />
          <div className="ctk-cards ctk-cards--3">
            {MODELS.map((m, i) => (
              <div key={m.title} className="ctk-card ctk-card--lift ctk-glow rv" data-d={i}>
                <p className="ctk-mono" style={{ color: "var(--blue-400)" }}>
                  model.0{i + 1}
                </p>
                <h3 className="ctk-h3" style={{ margin: "48px 0 12px" }}>
                  {m.title}
                </h3>
                <p className="ctk-sm">{m.text}</p>
                <p className="ctk-mono" style={{ marginTop: "auto", paddingTop: 32, color: "var(--ink-300)" }}>
                  {m.fit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq />
      <CtaBanner />
    </>
  );
}
