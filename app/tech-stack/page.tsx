import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/Badge";
import { Section, SectionHeader } from "@/components/ui/Section";
import { TECH_STACK } from "@/lib/tech-stack";

export const metadata: Metadata = pageMetadata("/tech-stack", "Tech Stack", "The frontend, mobile, backend, database, state management and DevOps technologies CodTK builds with, from React and Next.js to Docker and AWS.");

export default function TechStackPage() {
  return (
    <Section>
      <SectionHeader
        as="h1"
        title="Tech Stack"
        description="Full-cycle capability — the same technologies our team used to build this website."
      />

      <div className="mt-12 space-y-10">
        {TECH_STACK.map((group) => (
          <div key={group.category}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {group.category}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
