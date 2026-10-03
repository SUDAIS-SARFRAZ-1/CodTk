import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/projects";
import { Badge } from "@/components/ui/Badge";
import { ProjectLinks } from "@/components/sections/ProjectLinks";

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
    openGraph: { title: project.title, description: project.summary, images: [project.images[0].src] },
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const [cover, ...gallery] = project.images;

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Link href="/portfolio" className="text-sm font-semibold text-brand hover:text-brand-dark">
          ← All projects
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-brand">{project.label}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{project.subtitle}</p>
        <p className="mt-4 text-sm text-muted-foreground">{project.labelNote}</p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          <ProjectLinks project={project} />
        </div>

        <Image
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes="(min-width: 896px) 832px, 100vw"
          priority
          className="mt-10 w-full rounded-xl border border-border"
        />

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground">The problem</h2>
            <p className="mt-2 text-sm text-muted-foreground">{project.problem}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">The solution</h2>
            <p className="mt-2 text-sm text-muted-foreground">{project.solution}</p>
          </div>
        </div>

        <h2 className="mt-12 text-lg font-semibold text-foreground">Key features</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <h2 className="mt-12 text-lg font-semibold text-foreground">Tech used</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <h2 className="mt-12 text-lg font-semibold text-foreground">Outcome</h2>
        <p className="mt-2 text-sm text-muted-foreground">{project.outcome}</p>

        {gallery.length > 0 && (
          <>
            <h2 className="mt-12 text-lg font-semibold text-foreground">Screenshots</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {gallery.map((image) => (
                <figure key={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 896px) 404px, (min-width: 640px) 50vw, 100vw"
                    className="w-full rounded-lg border border-border"
                  />
                  <figcaption className="mt-2 text-xs text-muted-foreground">{image.alt}</figcaption>
                </figure>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight">Want something like this built?</h2>
          <p className="mt-3 text-background/80">Tell us about your project — we reply within 24 hours.</p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors duration-150 hover:bg-brand-dark"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
