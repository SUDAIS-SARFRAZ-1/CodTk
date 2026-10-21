import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

// Closing call to action for the bottom of a page (rules.md §22 — no dead ends).
export function CtaBand({ title, description }: { title: string; description: string }) {
  return (
    <Section tone="dark">
      <SectionHeader title={title} description={description} align="center" />
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/contact">Get a Quote</ButtonLink>
      </div>
    </Section>
  );
}
