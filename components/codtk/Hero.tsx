import Link from "next/link";
import { Btn } from "@/components/codtk/primitives";
import { BOOK_CALL_LINK } from "@/lib/contact";
import { SvIcon } from "@/components/services/icons";
import type { ServiceTone } from "@/lib/service-offerings";
import { serviceHref } from "@/lib/service-seo";

// Visitors pick what they need instead of reading a list of services (founder, 2026-11-26). Each
// choice opens the one page that answers it; "Not sure yet" goes to Contact.
const NEEDS: { label: string; tone: ServiceTone; href: string }[] = [
  { label: "A website", tone: "web", href: serviceHref("web") },
  { label: "A mobile app", tone: "mobile", href: serviceHref("mobile") },
  { label: "Software to run my business", tone: "erp", href: serviceHref("erp") },
  { label: "More customers online", tone: "seo", href: serviceHref("seo") },
  { label: "Less manual work", tone: "ai", href: serviceHref("ai") },
  { label: "Not sure yet? Talk to us", tone: "consulting", href: "/contact" },
];

// Home hero (founder's Option A, 2026-11-26): outcome-led headline, one primary action, a trust line,
// then the "What do you need?" choices.
export function Hero() {
  return (
    <section className="ctk-hero ctk-hero--dots" data-section="intro" aria-labelledby="hero-t">
      <div className="ctk-hero__field" aria-hidden="true">
        <i className="ctk-hero__dots" />
      </div>
      <div className="ctk-wrap ctk-hero__fg">
        <p className="ctk-hero__eyebrow">Software studio · Web · Mobile · ERP</p>
        <h1 id="hero-t">Software that grows your business.</h1>
        <p className="ctk-lead">
          We design and build websites, apps and custom systems that bring in clients and cut the busywork. Built on
          the platform you choose, or the one we recommend.
        </p>
        <div className="ctk-actions">
          <Btn href={BOOK_CALL_LINK} external>
            Book a free consultation
          </Btn>
          <Btn href="/services" variant="secondary">
            See our services
          </Btn>
        </div>
        <p className="ctk-avail">Fixed-price quotes · Clear weekly updates · Support after launch</p>
        <nav className="ctk-need" aria-labelledby="need-t">
          <h2 id="need-t" className="ctk-need__q">
            What do you need?
          </h2>
          <ul>
            {NEEDS.map((n) => (
              <li key={n.label}>
                <Link href={n.href} className={`ctk-svc__card ctk-need__card sv-tone--${n.tone}`}>
                  <SvIcon name={n.tone} />
                  <b>{n.label}</b>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
