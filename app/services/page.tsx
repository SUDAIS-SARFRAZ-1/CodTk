import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BOOKING_URL } from "@/lib/contact";
import { Btn, PageHero } from "@/components/codtk/primitives";
import { CtaBanner } from "@/components/codtk/CtaBanner";
import { TechStrip } from "@/components/codtk/TechStrip";
import { TechReveal } from "@/components/codtk/TechReveal";
import { ServiceAnchors } from "@/components/services/ServiceAnchors";
import { ServiceBlock } from "@/components/services/ServiceBlock";
import { EngagementModels } from "@/components/services/EngagementModels";
import { DeliveryStandard } from "@/components/services/DeliveryStandard";
import { MARQUEE_TECH, quoteHref, SERVICE_GROUPS, SERVICE_OFFERINGS } from "@/lib/service-offerings";
import { PROJECT_TYPES } from "@/features/contact/schema";
import { Curtain } from "@/components/codtk/Curtain";

const OTHER = PROJECT_TYPES[PROJECT_TYPES.length - 1];

export const metadata: Metadata = pageMetadata(
  "/services",
  "Software Development Services | CodTK",
  "Software development and digital growth from CodTK in Lahore: web, mobile, SaaS, custom ERP, APIs, WordPress, SEO, ads, AI automation and cloud.",
);

// Services page (founder's Services brief, 2026-10-22): hero, sticky service index, one block per
// service, engagement models, delivery standard, tech strip and the site's closing CTA.
export default function ServicesPage() {
  return (
    <div className="sv-page">
      <Curtain>
      <PageHero
        crumb="Services"
        path="/services"
        titleClassName="sv-h1"
        title={
          <>Everything you need, from idea to launch.</>
        }
        intro="Twelve services in three groups. Start with one or combine several. We agree the price and timeline with you before any work starts."
        actions={
          <>
            <Btn href={BOOKING_URL} external>
              Book a free consultation
            </Btn>
            <a className="ctk-link" href="#services">
              Browse the services
            </a>
          </>
        }
      />

      <section className="sv-services" id="services" data-section="disciplines" aria-label="Services">
        <ServiceAnchors services={SERVICE_OFFERINGS.map(({ id, title }) => ({ id, title }))} />
        <div className="ctk-wrap">
          {SERVICE_GROUPS.map((g) => (
            <div key={g} className="sv-group" role="group" aria-label={g}>
              <p className="ctk-kicker">{g}</p>
              {SERVICE_OFFERINGS.map((s) =>
                s.group === g ? (
                  <ServiceBlock key={s.id} service={s} />
                ) : null,
              )}
            </div>
          ))}
          <div className="sv-other">
            <div>
              <h2 className="sv-h3">
                Not on the list? Tell us.
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
      </Curtain>

      <EngagementModels />
      <DeliveryStandard />
      <div className="ctk-wrap">
        <TechReveal className="ctk-reveal--strip">
          <TechStrip names={MARQUEE_TECH} />
        </TechReveal>
      </div>
      <CtaBanner />
    </div>
  );
}
