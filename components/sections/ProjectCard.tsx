import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Card } from "@/components/ui/Card";
import { ProjectLinks } from "@/components/sections/ProjectLinks";

export function ProjectCard({ project, headingLevel: Heading = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const cover = project.images[0];

  return (
    <Card as="article" interactive className="flex flex-col overflow-hidden">
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
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{project.label}</p>
        <Heading className="mt-2 text-xl font-semibold tracking-tight">
          <Link href={`/portfolio/${project.slug}`} className="hover:text-accent">
            {project.title}
          </Link>
        </Heading>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{project.subtitle}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <ArrowLink href={`/portfolio/${project.slug}`}>
            Read case study<span className="sr-only"> for {project.title}</span>
          </ArrowLink>
          <ProjectLinks project={project} />
        </div>
      </div>
    </Card>
  );
}
