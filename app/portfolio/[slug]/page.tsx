import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { Btn, Chips, Icon, Net, WindowBar } from "@/components/codtk/primitives";
import { CaseGallery } from "@/components/codtk/CaseGallery";
import { CtaBanner } from "@/components/codtk/CtaBanner";

type PortfolioDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project" };
  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.summary,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      type: "article",
      siteName: "CodTK",
      url: `/portfolio/${project.slug}`,
      title: project.title,
      description: project.summary,
      images: [project.images[0].src],
    },
  };
}

// Design system CaseStudyPage: meta row, wide visual, numbered blocks, next case. The result block
// states the real outcome in words; there are no measured figures to count up (rules.md §1).
export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const cover = project.images[0];

  const meta = [
    ["project", project.label],
    ["product", project.subtitle],
    ["role", project.role],
    ["source", project.repoUrl ? "Public on GitHub" : "Private"],
    ["live demo", project.demoUrl ? "Available" : "Not yet"],
  ];

  return (
    <>
      <section className="ctk-phero" data-tone="work" data-section="case study">
        <Net seed={14} n={5} />
        <div className="ctk-wrap">
          <p className="ctk-crumb rv">
            <Link href="/">~/codtk</Link>
            <span aria-hidden="true">/</span>
            <Link href="/portfolio">work</Link>
            <span aria-hidden="true">/</span>
            <span>{project.slug}</span>
          </p>
          <h1 className="ctk-d1 ctk-d1--page rv" data-d={1} style={{ maxWidth: "16ch" }}>
            {project.title}
          </h1>
          <p className="ctk-lead rv" data-d={2} style={{ marginTop: 24 }}>
            {project.summary}
          </p>
          <p className="ctk-meta rv" data-d={2} style={{ marginTop: 12 }}>
            {project.labelNote}
          </p>
          <dl className="ctk-dl rv" data-d={3} style={{ marginTop: 48 }}>
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="ctk-label">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="ctk-sec" data-tone="quiet" data-section="the project" style={{ paddingTop: 56 }}>
        <div className="ctk-wrap">
          <div className="rv">
            <div className="ctk-viz" data-theme="dark" style={{ aspectRatio: "21 / 9" }}>
              <div className="ctk-viz__win">
                <WindowBar className="ctk-viz__bar" />
                <Image
                  className="ctk-viz__img"
                  src={cover.src}
                  alt={cover.alt}
                  width={cover.width}
                  height={cover.height}
                  sizes="(min-width: 1280px) 1100px, 92vw"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="ctk-block" style={{ marginTop: 72 }}>
            <h2 className="ctk-label">01 — the challenge</h2>
            <div className="ctk-prose rv">
              <p className="ctk-statement" style={{ marginTop: 0 }}>
                {project.problem}
              </p>
            </div>
          </div>

          <div className="ctk-block">
            <h2 className="ctk-label">02 — the solution</h2>
            <div className="ctk-prose rv">
              <p className="ctk-lead" style={{ maxWidth: "none" }}>
                {project.solution}
              </p>
              <ul className="ctk-ticks ctk-ticks--2" style={{ marginTop: 32 }}>
                {project.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ctk-block">
            <h2 className="ctk-label">03 — stack</h2>
            <div className="rv">
              <Chips items={project.tech} />
            </div>
          </div>

          {project.images.length > 1 && (
            <div className="ctk-block">
              <h2 className="ctk-label">04 — screens</h2>
              <div className="rv">
                <CaseGallery images={project.images} />
              </div>
            </div>
          )}

          <div className="ctk-block">
            <h2 className="ctk-label">{project.images.length > 1 ? "05" : "04"} — the result</h2>
            <div className="ctk-prose rv">
              <p className="ctk-lead" style={{ maxWidth: "none" }}>
                {project.outcome}
              </p>
              <div className="ctk-actions" style={{ marginTop: 28 }}>
                {project.demoUrl && (
                  <Btn href={project.demoUrl} external>
                    View Live Demo
                  </Btn>
                )}
                {project.repoUrl && (
                  <Btn href={project.repoUrl} external variant={project.demoUrl ? "secondary" : "primary"}>
                    View Source on GitHub
                  </Btn>
                )}
              </div>
            </div>
          </div>

          {next.slug !== project.slug ? (
            <Link className="ctk-next" href={`/portfolio/${next.slug}`}>
              <div>
                <p className="ctk-label">next case study</p>
                <h2 className="ctk-d2" style={{ marginTop: 16 }}>
                  {next.title}
                </h2>
              </div>
              <span className="ctk-btn ctk-btn--secondary" aria-hidden="true">
                <Icon name="arrow" />
              </span>
            </Link>
          ) : (
            <Link className="ctk-next" href="/portfolio">
              <div>
                <p className="ctk-label">back to</p>
                <h2 className="ctk-d2" style={{ marginTop: 16 }}>
                  All work
                </h2>
              </div>
              <span className="ctk-btn ctk-btn--secondary" aria-hidden="true">
                <Icon name="arrow" />
              </span>
            </Link>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
