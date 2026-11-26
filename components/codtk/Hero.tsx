import Link from "next/link";
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

// Home hero: one large plain headline on a faint dot field, then the "What do you need?" choices.
export function Hero() {
  return (
    <section className="ctk-hero ctk-hero--dots" data-section="intro" aria-labelledby="hero-t">
      <div className="ctk-hero__field" aria-hidden="true">
        <i className="ctk-hero__dots" />
      </div>
      <div className="ctk-wrap ctk-hero__fg">
        <h1 id="hero-t">
          Have an idea? We&apos;ll build it.
        </h1>
        <p className="ctk-lead">
          Websites, apps and business software, built by a small Lahore team you talk to directly. Clear quotes and
          honest timelines.
        </p>
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
        <p className="ctk-avail">
          Fixed quotes, and the source code is yours. We reply within 24 hours, Monday to Saturday.
        </p>
      </div>
    </section>
  );
}
