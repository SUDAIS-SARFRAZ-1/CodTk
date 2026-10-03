import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";
import { ProjectCard } from "@/components/sections/ProjectCard";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Case studies from AptiScript Technologies — MindMesh, an AI project-planning system, and Organic Store, a full-stack e-commerce platform — with live demos and public source code.",
};

export default function PortfolioPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Portfolio</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Real projects with live demos or public source code you can check yourself.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
