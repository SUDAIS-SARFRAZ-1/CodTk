import { TechReveal } from "@/components/codtk/TechReveal";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { Btn, Chips, Icon, WindowBar } from "@/components/codtk/primitives";
import { CaseGallery } from "@/components/codtk/CaseGallery";
import { CtaBanner } from "@/components/codtk/CtaBanner";
import { JsonLd } from "@/components/codtk/JsonLd";
import { breadcrumbJsonLd, pageMetadata, SITE_URL } from "@/lib/seo";

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
  return pageMetadata(`/portfolio/${project.slug}`, `${project.title} — ${project.subtitle} — CodTK`, project.summary, {
    type: "article",
    image: project.images[0].src,
  });
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
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url: `${SITE_URL}/portfolio/${project.slug}`,
          image: `${SITE_URL}${project.images[0].src}`,
          creator: { "@id": `${SITE_URL}/#organization` },
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Work", path: "/portfolio" }, { name: project.title, path: `/portfolio/${project.slug}` }])} />
      <section className="ctk-phero" data-section="case study">
        <div className="ctk-wrap">
          <nav className="ctk-crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/portfolio">Work</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>
          <h1 className="ctk-d1 ctk-d1--page" style={{ maxWidth: "16ch" }}>
            {project.title}
          </h1>
          <p className="ctk-lead" style={{ marginTop: 24 }}>
            {project.summary}
          </p>
          <p className="ctk-meta" style={{ marginTop: 12 }}>
            {project.labelNote}
          </p>
          <dl className="ctk-dl" style={{ marginTop: 48 }}>
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="ctk-label">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="ctk-sec" data-section="the project" style={{ paddingTop: 56 }}>
        <div className="ctk-wrap">
          <div>
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
            <div className="ctk-prose">
              <p className="ctk-statement" style={{ marginTop: 0 }}>
                {project.problem}
              </p>
            </div>
          </div>

          <div className="ctk-block">
            <h2 className="ctk-label">02 — the solution</h2>
            <div className="ctk-prose">
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
            <div>
              <TechReveal label="See the technologies">
                <Chips items={project.tech} />
              </TechReveal>
            </div>
          </div>

          {project.images.length > 1 && (
            <div className="ctk-block">
              <h2 className="ctk-label">04 — screens</h2>
              <div>
                <CaseGallery images={project.images} />
              </div>
            </div>
          )}

          <div className="ctk-block">
            <h2 className="ctk-label">{project.images.length > 1 ? "05" : "04"} — the result</h2>
            <div className="ctk-prose">
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
            </Link>
          ) : (
            <Link className="ctk-next" href="/portfolio">
              <div>
                <p className="ctk-label">back to</p>
                <h2 className="ctk-d2" style={{ marginTop: 16 }}>
                  All work
                </h2>
              </div>
            </Link>
          )}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
