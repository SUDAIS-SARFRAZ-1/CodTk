import Link from "next/link";
import { Icon } from "@/components/codtk/primitives";
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

// Home hero: white dot field with three soft blue light patches drifting slowly behind the headline
// (CSS transform/opacity loops only; founder, 2026-11-19).
export function Hero() {
  return (
    <section className="ctk-hero ctk-hero--dots" data-section="intro" aria-labelledby="hero-t">
      <div className="ctk-hero__field" aria-hidden="true">
        <i className="ctk-hero__dots" />
      </div>
      <div className="ctk-hero__glows" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="ctk-wrap ctk-hero__fg">
        <p className="ctk-hero__trust rv">
          <i aria-hidden="true" />
          Fixed quotes · Source code yours · Lahore, Pakistan
        </p>
        <h1 id="hero-t" className="rv">
          Got an idea? We&apos;ll <span className="ctk-em">make it real</span>.
        </h1>
        <p className="ctk-lead rv" data-d={3}>
          Websites, apps and business software, built by a small Lahore team you talk to directly. Clear quotes and
          honest timelines.
        </p>
        <nav className="ctk-need rv" data-d={4} aria-labelledby="need-t">
          <h2 id="need-t" className="ctk-need__q">
            What do you need?
          </h2>
          <ul>
            {NEEDS.map((n) => (
              <li key={n.label}>
                <Link href={n.href} className={`ctk-svc__card ctk-need__card sv-tone--${n.tone}`}>
                  <SvIcon name={n.tone} />
                  <b>{n.label}</b>
                  <span className="ctk-svc__go" aria-hidden="true">
                    <Icon name="ur" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="ctk-avail rv" data-d={5}>
          <i aria-hidden="true" />
          Replies within 24 hours, Monday to Saturday
        </p>
      </div>
    </section>
  );
}
