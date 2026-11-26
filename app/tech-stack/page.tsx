import type { Metadata } from "next";
import { Chips, PageHero } from "@/components/codtk/primitives";
import { CtaBanner } from "@/components/codtk/CtaBanner";
import { pageMetadata } from "@/lib/seo";
import { TECH_STACK } from "@/lib/tech-stack";

export const metadata: Metadata = pageMetadata("/tech-stack", "Technologies We Use | CodTK", "The frontend, mobile, backend, database, state management and DevOps technologies CodTK builds with, from React and Next.js to Docker and AWS.");

// The one page that shows the full stack up front: it is where the "See the technologies" buttons lead.
export default function TechStackPage() {
  return (
    <div className="sv-page ctk-rise">
      <PageHero
        crumb="Tech Stack"
        path="/tech-stack"
        titleClassName="sv-h1"
        title="The tools we use."
        intro="The same technologies our team used to build this website, grouped by what they do."
      />
      <section className="ctk-sec sv-sec" data-section="stack" aria-label="Technologies by group">
        <div className="ctk-wrap">
          <div className="ab-stack">
            {TECH_STACK.map((g) => (
              <div key={g.category} className="ab-group">
                <h2>
                  {g.category}
                  <span>{g.items.length}</span>
                </h2>
                <Chips items={g.items} brand />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </div>
  );
}
