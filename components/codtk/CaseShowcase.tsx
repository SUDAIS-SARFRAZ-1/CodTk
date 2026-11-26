import { Btn, Icon } from "@/components/codtk/primitives";
import { CaseGallery } from "@/components/codtk/CaseGallery";
import { PROJECTS, type Project } from "@/lib/projects";

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

// Home selected work: the first real project, with its honest provenance label. No result figures
// until confirmed (rules.md §1); more projects are listed on /portfolio.
export function CaseShowcase() {
  const p = PROJECTS[0];
  if (!p) return null;
  return (
    <section className="ctk-sec" data-section="selected work" aria-labelledby="work-t">
      <div className="ctk-wrap">
        <div className="ctk-head ctk-head--split">
          <p className="ctk-kicker rv">Selected work</p>
          <h2 id="work-t" className="ctk-h2 rv" data-d={1}>
            Working software, <span className="ctk-em">open to inspect</span>.
          </h2>
          <p className="ctk-p rv" data-d={2}>
            Built by our founder, with the full source code public so you can check the work yourself.
          </p>
        </div>
        <Featured p={p} />
      </div>
    </section>
  );
}
