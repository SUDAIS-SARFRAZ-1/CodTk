import type { Project } from "@/lib/projects";

// Outbound proof links — shown on cards and detail pages (ui-ux-design.md §6).
export function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-accent"
        >
          Live demo<span className="sr-only"> of {project.title} (opens in new tab)</span>
        </a>
      )}
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-accent"
        >
          Source code<span className="sr-only"> of {project.title} on GitHub (opens in new tab)</span>
        </a>
      )}
    </>
  );
}
