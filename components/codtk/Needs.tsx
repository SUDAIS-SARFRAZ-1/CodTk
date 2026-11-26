import Link from "next/link";
import { ServiceCard } from "@/components/codtk/ServiceCard";
import { SvIcon } from "@/components/services/icons";
import { SERVICE_OFFERINGS, quoteHref, type ServiceTone } from "@/lib/service-offerings";

// The six services most visitors come for (founder, 2026-11-26); the full list of twelve lives on
// /services, one card away.
const HOME_SERVICES: ServiceTone[] = ["web", "mobile", "erp", "seo", "marketing", "ai"];

// "What do you need?": rounded cards, each turning its own service colour on hover.
export function Needs() {
  const services = HOME_SERVICES.map((id) => SERVICE_OFFERINGS.find((s) => s.id === id)!);
  return (
    <section className="ctk-sec" data-section="needs" aria-labelledby="need-t">
      <div className="ctk-wrap">
        <h2 id="need-t" className="ctk-h2 ctk-needs__h">
          What do you need?
        </h2>
        <ul className="ctk-needs">
          {/* Startup founders are the first audience (prd.md §2); MVPs span several services, so this goes straight to the quote form. */}
          <li className="ctk-needs__other">
            <Link href={quoteHref("Something else")} className="ctk-svc__card sv-tone--web">
              <SvIcon name="saas" />
              <span className="ctk-svc__text">
                <b>Have a startup idea?</b>
                <small>We build the first version of your product (an MVP) so you can launch and test it with real users.</small>
              </span>
            </Link>
          </li>
          {services.map((s) => (
            <li key={s.id}>
              <ServiceCard service={s} />
            </li>
          ))}
          <li className="ctk-needs__other">
            <Link href="/services" className="ctk-svc__card sv-tone--saas">
              <SvIcon name="saas" />
              <span className="ctk-svc__text">
                <b>See all {SERVICE_OFFERINGS.length} services</b>
                <small>Subscription software, WordPress, hosting, technical advice and more.</small>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
