import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BOOK_CALL_LINK } from "@/lib/contact";
import { Btn, PageHero } from "@/components/codtk/primitives";
import { CtaBanner } from "@/components/codtk/CtaBanner";
import { TechStrip } from "@/components/codtk/TechStrip";
import { ServiceAnchors } from "@/components/services/ServiceAnchors";
import { ServiceBlock } from "@/components/services/ServiceBlock";
import { EngagementModels } from "@/components/services/EngagementModels";
import { DeliveryStandard } from "@/components/services/DeliveryStandard";
import { MARQUEE_TECH, quoteHref, SERVICE_OFFERINGS } from "@/lib/service-offerings";
import { PROJECT_TYPES } from "@/features/contact/schema";

const OTHER = PROJECT_TYPES[PROJECT_TYPES.length - 1];

export const metadata: Metadata = pageMetadata(
  "/services",
  "Services",
  "Custom software development in Pakistan: web and mobile apps, SaaS products, AI and automation, backend systems and APIs, DevOps and cloud, and consulting from CodTK in Lahore.",
);

const WORDS: [string, boolean][] = [
  ["Engineering", false],
  ["capability,", false],
  ["end", true],
  ["to", true],
  ["end.", true],
];

// Services page (founder's Services brief, 2026-10-22): hero, sticky service index, one block per
// service, engagement models, delivery standard, tech strip and the site's closing CTA.
export default function ServicesPage() {
  return (
    <div className="sv-page">
      <PageHero
        crumb="Services"
        plainCrumb
        tone="services"
        seed={5}
        titleClassName="sv-h1 ctk-blurin"
        titleLabel="Engineering capability, end to end."
        title={
          <span aria-hidden="true">
            {WORDS.map(([w, blue], i) => (
              <span key={w}>
                <span className={blue ? "w sv-b" : "w"} style={{ "--i": i } as CSSProperties}>
                  {w}
                </span>{" "}
              </span>
            ))}
          </span>
        }
        intro="Seven disciplines, each scoped to your objectives, documented in writing and delivered against agreed milestones. Timeline and cost depend on scope; we confirm both before work starts."
        actions={
          <>
            <Btn href={BOOK_CALL_LINK} external magnetic>
              Book Your Discovery Call
            </Btn>
            <a className="ctk-link" href="#services">
              Browse the services
            </a>
          </>
        }
      />

      <section className="sv-services" id="services" data-tone="services" data-section="disciplines" aria-label="Services">
        <ServiceAnchors services={SERVICE_OFFERINGS.map(({ id, title }) => ({ id, title }))} />
        <div className="ctk-wrap">
          {SERVICE_OFFERINGS.map((s, i) => (
            <ServiceBlock key={s.id} service={s} index={i} total={SERVICE_OFFERINGS.length} />
          ))}
          <div className="sv-other rv">
            <div>
              <h2 className="sv-h3">
                Not on the list? <span className="sv-b">Tell us.</span>
              </h2>
              <p className="sv-body">
                We take on any kind of software development. Describe what you need and we will tell you how we would
                build it.
              </p>
            </div>
            <Btn href={quoteHref(OTHER)}>Get a Quote</Btn>
          </div>
        </div>
      </section>

      <EngagementModels />
      <DeliveryStandard />
      <TechStrip names={MARQUEE_TECH} />
      <CtaBanner />
    </div>
  );
}
