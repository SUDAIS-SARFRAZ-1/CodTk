import Link from "next/link";
import { Btn, Icon, SectionHead } from "@/components/codtk/primitives";
import { SvIcon } from "@/components/services/icons";
import { CONSULTING_MODEL, ENGAGEMENT_MODELS } from "@/lib/service-offerings";

// Three engagement tiers (the featured one in a black scope) plus the consulting option as a row.
// Card borders glow under the cursor via `.ctk-glow` (Motion.tsx sets --mx/--my).
export function EngagementModels() {
  return (
    <section className="ctk-sec sv-sec" id="engagement" aria-labelledby="sv-models-h">
      <div className="ctk-wrap">
        <SectionHead
          kicker
          eyebrow="Engagement models"
          id="sv-models-h"
          titleClassName="sv-h2"
          title={
            <>
              Structured to suit <span className="sv-b">how you work.</span>
            </>
          }
        />
        <div className="sv-tiers">
          {ENGAGEMENT_MODELS.map((m, i) => (
            <article
              key={m.title}
              className={`ctk-card ctk-glow sv-tier rv${m.featured ? " sv-tier--f" : ""}`}
              data-d={i}
              data-theme={m.featured ? "dark" : undefined}
            >
              {m.featured && (
                <span className="sv-badge">
                  <i aria-hidden="true" />
                  Most flexible
                </span>
              )}
              <SvIcon name={m.icon} size="lg" />
              <h3>{m.title}</h3>
              <p className="sv-tier__d">{m.text}</p>
              <p className="sv-tier__fit">{m.fit}</p>
              <div>
                <Btn href="/contact" variant={m.featured ? "primary" : "secondary"} size="sm" magnetic={m.featured}>
                  {m.cta}
                </Btn>
              </div>
            </article>
          ))}
        </div>
        <div className="sv-consult rv">
          <SvIcon name="consulting" size="lg" />
          <div>
            <h3>{CONSULTING_MODEL.title}</h3>
            <p>{CONSULTING_MODEL.text}</p>
          </div>
          <p className="sv-tier__fit">{CONSULTING_MODEL.fit}</p>
          <Link className="ctk-link" href="#consulting">
            See consulting
            <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
