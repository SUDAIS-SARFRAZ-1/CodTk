import Image from "next/image";
import Link from "next/link";
import { ArrowLink, Btn, Chips, Icon } from "@/components/codtk/primitives";
import { CaseGallery } from "@/components/codtk/CaseGallery";
import { PROJECTS, type Project } from "@/lib/projects";

// Real screenshot inside the system's window frame (CaseShowcase visual), clip-revealed on scroll.
function Visual({ p }: { p: Project }) {
  const img = p.images[0];
  return (
    <div className="ctk-viz ctk-clip" data-theme="dark">
      <div className="ctk-viz__win">
        <div className="ctk-viz__bar">
          <i />
          <i />
          <i />
        </div>
        <Image
          className="ctk-viz__img"
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes="(min-width: 1024px) 560px, 86vw"
        />
      </div>
    </div>
  );
}

// One project: a full case study laid out flat (problem, solution, features, links).
function Featured({ p }: { p: Project }) {
  return (
    <article className="ctk-feat rv">
      <CaseGallery images={p.images} />
      <div className="ctk-feat__copy">
        <div className="ctk-tags">
          <span className="ctk-tag">{p.label}</span>
        </div>
        <p className="ctk-feat__sub">{p.subtitle}</p>
        <h3 className="ctk-h2">{p.title}</h3>
        <p className="ctk-p">{p.summary}</p>
        <dl className="ctk-feat__ps">
          <div>
            <dt>The problem</dt>
            <dd>{p.problem}</dd>
          </div>
          <div>
            <dt>What was built</dt>
            <dd>
              <ul>
                {p.features.slice(0, 4).map((f) => (
                  <li key={f}>
                    <Icon name="check" />
                    {f}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        <Chips items={p.tech.slice(0, 6)} />
        <div className="ctk-feat__links">
          <Btn href={`/portfolio/${p.slug}`}>Read the case study</Btn>
          {p.repoUrl && (
            <a className="ctk-link" href={p.repoUrl} target="_blank" rel="noopener noreferrer">
              View the source on GitHub
              <Icon name="ur" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// Several projects: pins and scrolls sideways on desktop, swipes on phones (design system CaseShowcase).
function Slider() {
  return (
    <div className="ctk-hscroll" data-hscroll>
      <div className="ctk-hscroll__pin">
        <div className="ctk-hscroll__track" data-track>
          <div className="ctk-hpanel ctk-hpanel--intro">
            <p className="ctk-lead">Projects built by our founder, each with a live demo or public source code you can check.</p>
            <div>
              <ArrowLink href="/portfolio">View all work</ArrowLink>
            </div>
          </div>
          {PROJECTS.map((p) => (
            <article key={p.slug} className="ctk-hpanel">
              <Link className="ctk-casecard ctk-glow rv" href={`/portfolio/${p.slug}`}>
                <Visual p={p} />
                <div>
                  <div className="ctk-tags">
                    <span className="ctk-tag">{p.label}</span>
                  </div>
                  <p className="ctk-feat__sub">{p.subtitle}</p>
                  <h3 className="ctk-h2">{p.title}</h3>
                  <p className="ctk-sm">{p.summary}</p>
                  <div style={{ marginTop: 20 }}>
                    <Chips items={p.tech.slice(0, 3)} />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <span className="ctk-link">
                      Read the case study
                      <Icon name="ur" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        <div className="ctk-hscroll__bar">
          <i data-hbar />
        </div>
      </div>
    </div>
  );
}

// Home selected work. Only real projects with their honest provenance label; no result figures
// until confirmed. One project shows as a flat feature; the sideways slider returns from two.
export function CaseShowcase() {
  const several = PROJECTS.length > 1;
  return (
    <section
      className="ctk-sec"
      data-tone="work"
      data-section="selected work"
      aria-labelledby="work-t"
      style={several ? { paddingBottom: 0 } : undefined}
    >
      <div className="ctk-wrap">
        <div className="ctk-head ctk-head--split">
          <p className="ctk-kicker rv">Selected work</p>
          <h2 id="work-t" className="ctk-d2 rv" data-d={1}>
            Working software, <span className="ctk-em">open to inspect</span>.
          </h2>
          {!several && (
            <p className="ctk-p rv" data-d={2}>
              Built by our founder, with the full source code public so you can check the work yourself.
            </p>
          )}
        </div>
        {!several && PROJECTS[0] && <Featured p={PROJECTS[0]} />}
      </div>
      {several && <Slider />}
    </section>
  );
}
