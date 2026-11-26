import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BOOKING_URL } from "@/lib/contact";
import { Btn, PageHero } from "@/components/codtk/primitives";
import { CtaBanner } from "@/components/codtk/CtaBanner";
import { TechStrip } from "@/components/codtk/TechStrip";
import { TechReveal } from "@/components/codtk/TechReveal";
import { ServiceCard } from "@/components/codtk/ServiceCard";
import { Tabs } from "@/components/codtk/Tabs";
import { SvIcon } from "@/components/services/icons";
import { EngagementModels } from "@/components/services/EngagementModels";
import { DeliveryStandard } from "@/components/services/DeliveryStandard";
import { MARQUEE_TECH, quoteHref, SERVICE_GROUPS, SERVICE_OFFERINGS, type ServiceTone } from "@/lib/service-offerings";
import { PROJECT_TYPES } from "@/features/contact/schema";

const OTHER = PROJECT_TYPES[PROJECT_TYPES.length - 1];

// The icon shown on each group's tab button.
const GROUP_ICON: Record<(typeof SERVICE_GROUPS)[number], ServiceTone> = { Build: "web", Grow: "seo", "Plan & Run": "consulting" };

export const metadata: Metadata = pageMetadata(
  "/services",
  "Software Development Services | CodTK",
  "Software development and digital growth from CodTK in Lahore: web, mobile, SaaS, custom ERP, APIs, WordPress, SEO, ads, AI automation and cloud.",
);

// Services page (founder's Services brief, 2026-10-22; shortened 2026-11-27): hero, the three
// service groups as tab buttons, each showing its services as cards that open the service's own
// page (the full detail lives there), then engagement models and the delivery standard as tabs,
// the tech strip and the site's closing CTA.
export default function ServicesPage() {
  return (
    <div className="sv-page">
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

      <section className="ctk-sec sv-services" id="services" data-section="disciplines" aria-label="Services">
        <div className="ctk-wrap">
          <Tabs
            label="Service groups"
            tabs={SERVICE_GROUPS.map((g) => {
              const items = SERVICE_OFFERINGS.filter((s) => s.group === g);
              return {
                id: `group-${g.toLowerCase().replace(/[^a-z]+/g, "-")}`,
                label: g,
                icon: <SvIcon name={GROUP_ICON[g]} size="xs" />,
                count: items.length,
                panel: (
                  <ul className="ctk-needs">
                    {items.map((s) => (
                      <li key={s.id}>
                        <ServiceCard service={s} />
                      </li>
                    ))}
                  </ul>
                ),
              };
            })}
          />
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

      <section className="ctk-sec sv-sec" data-section="working with us" aria-label="Working with us">
        <div className="ctk-wrap">
          <Tabs
            label="Working with us"
            tabs={[
              { id: "ways", label: "Ways to work together", icon: <SvIcon name="team" size="xs" />, panel: <EngagementModels /> },
              { id: "quality", label: "Quality checks", icon: <SvIcon name="shield" size="xs" />, panel: <DeliveryStandard /> },
            ]}
          />
        </div>
      </section>
      <div className="ctk-wrap">
        <TechReveal className="ctk-reveal--strip">
          <TechStrip names={MARQUEE_TECH} />
        </TechReveal>
      </div>
      <CtaBanner />
    </div>
  );
}
