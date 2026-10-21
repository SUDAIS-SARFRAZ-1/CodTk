import type { ReactNode } from "react";
import { Btn, PageHero } from "@/components/codtk/primitives";

export type LegalSection = { title: string; body: ReactNode };

// Privacy Policy and Terms of Use in the design system's page language: page hero, then numbered
// blocks laid out like the case study's (heading left, text right), ending on a quiet next action.
export function LegalPage({
  crumb,
  title,
  intro,
  updated,
  sections,
}: {
  crumb: string;
  title: ReactNode;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero crumb={crumb} title={title} intro={`${intro} Last updated: ${updated}.`} tone="quiet" seed={23} />
      <section className="ctk-sec ctk-legal" data-tone="quiet" data-section={crumb.toLowerCase()} style={{ paddingTop: 24 }}>
        <div className="ctk-wrap">
          {sections.map((s, i) => (
            <div key={s.title} className="ctk-block">
              <div>
                <p className="ctk-mono" style={{ color: "var(--blue-400)" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="ctk-h4" style={{ marginTop: 12 }}>
                  {s.title}
                </h2>
              </div>
              <div className="ctk-prose ctk-p">{s.body}</div>
            </div>
          ))}
          <div className="ctk-block">
            <p className="ctk-label">questions</p>
            <div className="ctk-actions">
              <Btn href="/contact">Contact Us</Btn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
