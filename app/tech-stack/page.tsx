import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { TECH_STACK } from "@/lib/tech-stack";

export const metadata: Metadata = {
  title: "Tech Stack",
  description:
    "The frontend, backend, database, state management, and DevOps technologies AptiScript Technologies builds with.",
};

export default function TechStackPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Tech Stack</h1>
        <p className="mt-4 text-muted-foreground">
          Full-cycle capability — the same technologies our own team uses to build this site.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {TECH_STACK.map((group) => (
          <div key={group.category}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {group.category}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
