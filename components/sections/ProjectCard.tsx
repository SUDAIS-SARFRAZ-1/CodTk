import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import { ProjectLinks } from "@/components/sections/ProjectLinks";

export function ProjectCard({ project }: { project: Project }) {
  const cover = project.images[0];

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-colors duration-150 hover:border-brand">
      <Link href={`/portfolio/${project.slug}`} tabIndex={-1} aria-hidden="true">
        <Image
          src={cover.src}
          alt=""
          width={cover.width}
          height={cover.height}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="aspect-video w-full border-b border-border object-cover object-top"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">{project.label}</p>
        <h3 className="mt-2 text-lg font-semibold text-foreground">
          <Link href={`/portfolio/${project.slug}`} className="hover:text-brand">
            {project.title}
          </Link>
        </h3>
        <p className="text-sm font-medium text-muted-foreground">{project.subtitle}</p>
        <p className="mt-3 flex-1 text-sm text-muted-foreground">{project.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href={`/portfolio/${project.slug}`}
            className="text-sm font-semibold text-brand hover:text-brand-dark"
          >
            Read case study<span className="sr-only"> for {project.title}</span> →
          </Link>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
