import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PROJECTS } from "@/lib/projects";
import { Btn, Chips, Icon, PageHero, WindowBar } from "@/components/codtk/primitives";
import { CtaBanner } from "@/components/codtk/CtaBanner";

export const metadata: Metadata = pageMetadata("/portfolio", "Work", "Case studies from CodTK, a software company in Lahore. MindMesh, an AI project-planning system, with its full source code public on GitHub.");

// Design system PortfolioPage: the first project spans the full width, the next sits beside an
// invitation card. Its service filters are left out until there is more than one project to filter.
export default function PortfolioPage() {
  return (
    <>
      <PageHero
        crumb="Work"
        title={
          <>
            Selected <span className="ctk-em">work</span>.
          </>
        }
        intro="Real projects, each with public source code or a live demo you can check yourself. Client work is added only with the client's written permission."
        tone="work"
        seed={8}
      />

      <section className="ctk-sec" data-tone="work" data-section="projects" style={{ paddingTop: 48 }}>
        <div className="ctk-wrap">
          <div className="ctk-pgrid">
            {PROJECTS.map((p, i) => {
              const img = p.images[0];
              return (
                <Link key={p.slug} className={`ctk-pcard${i === 0 ? " ctk-pcard--wide" : ""} rv`} href={`/portfolio/${p.slug}`}>
                  <div className="ctk-viz" data-theme="dark">
                    <div className="ctk-viz__win">
                      <WindowBar className="ctk-viz__bar" />
                      <Image
                        className="ctk-viz__img"
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        sizes="(min-width: 1024px) 1100px, 92vw"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                  <div className="ctk-pcard__body">
                    <div className="ctk-tags" style={{ marginBottom: 14 }}>
                      <span className="ctk-tag">{p.label}</span>
                    </div>
                    <p className="ctk-label">{p.subtitle}</p>
                    <h2 className="ctk-h3">{p.title}</h2>
                    <p className="ctk-sm" style={{ maxWidth: "40em" }}>
                      {p.summary}
                    </p>
                    <div style={{ marginTop: 20 }}>
                      <Chips items={p.tech.slice(0, 4)} />
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <span className="ctk-link">
                        Read the case study
                        <Icon name="ur" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            <div className="ctk-invite rv" data-d={1}>
              <div>
                <p className="ctk-label" style={{ color: "var(--blue-400)" }}>
                  {"// next project"}
                </p>
                <h2 className="ctk-h2" style={{ marginTop: 20 }}>
                  Your product, <span className="ctk-em">built next</span>.
                </h2>
                <p className="ctk-sm" style={{ marginTop: 16 }}>
                  We sign an NDA before every project, and you own the code once it is paid in full.
                </p>
              </div>
              <div className="ctk-actions">
                <Btn href="/contact">Start a Project</Btn>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
