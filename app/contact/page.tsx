import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/sections/ContactForm";
import { CopyButton } from "@/components/contact/CopyButton";
import { WorldClocks } from "@/components/contact/WorldClocks";
import { Providers } from "@/app/providers";
import { ArrowLink, Btn, IconTile, SectionHead } from "@/components/codtk/primitives";
import {
  BOOK_CALL_LINK,
  BUSINESS_EMAIL,
  LOCATION,
  SOCIAL_LINKS,
  WHATSAPP_LINK,
  WHATSAPP_NUMBER_DISPLAY,
  WHATSAPP_NUMBER_E164,
} from "@/lib/contact";

export const metadata: Metadata = pageMetadata("/contact", "Contact", "Request a quote from CodTK, a software company in Lahore working with businesses across Pakistan and abroad. Tell us about your project and we reply within 24 hours, Monday to Saturday.");

const WORDS: [string, boolean][] = [
  ["Let’s", false],
  ["talk", false],
  ["about", false],
  ["your", true],
  ["project.", true],
];

// What working with CodTK looks like from Pakistan and from abroad. Every point restates a fact
// already on the site (prd.md §3, §6.6), so nothing here is new or unconfirmed.
const PAKISTAN: [string, string][] = [
  ["Lahore-based team", `working with businesses anywhere in Pakistan.`],
  ["Pakistan time", "Monday to Saturday, with replies within 24 hours."],
  ["WhatsApp and calls", `on a Pakistani number, ${WHATSAPP_NUMBER_DISPLAY}.`],
  ["Pay locally", "by JazzCash or Easypaisa, in milestones such as 30% / 40% / 30%."],
  ["Quotes in PKR", "on request. Mention it in your message."],
];
const ABROAD: [string, string][] = [
  ["Calls booked", "at a time that suits your time zone."],
  ["International payments", "through Payoneer."],
  ["Contract and NDA", "signed before any work begins."],
];

function Way({ tone, icon, label, children, action }: { tone: string; icon: ReactNode; label: string; children: ReactNode; action?: ReactNode }) {
  return (
    <li className={`cf-way sv-tone--${tone}`}>
      <IconTile className="sv-ic">{icon}</IconTile>
      <div>
        <p className="cf-way__k">{label}</p>
        {children}
      </div>
      {action}
    </li>
  );
}

// Contact page: contact routes and the enquiry form, where we work (Pakistan and abroad, with live
// clocks), and a call card. Social links render only once their URLs exist (prd.md FR-7).
export default function ContactPage() {
  const social = SOCIAL_LINKS.filter((s) => s.url);
  return (
    <div className="sv-page cf-page">
      <section className="cf-hero" data-tone="contact" data-section="contact" aria-labelledby="cf-h1">
        <div className="ctk-wrap cf-hero__g">
          <div className="cf-intro">
            <nav className="ctk-crumb ctk-crumb--plain rv" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Contact</span>
            </nav>
            <p className="cf-badge rv" data-d={1}>
              <i aria-hidden="true" />
              Working with businesses across Pakistan and abroad
            </p>
            <h1 id="cf-h1" className="sv-h1 ctk-blurin rv" data-d={1} aria-label="Let’s talk about your project.">
              <span aria-hidden="true">
                {WORDS.map(([w, blue], i) => (
                  <span key={w}>
                    <span className={blue ? "w sv-b" : "w"} style={{ "--i": i } as CSSProperties}>
                      {w}
                    </span>{" "}
                  </span>
                ))}
              </span>
            </h1>
            <p className="sv-lead cf-lead rv" data-d={2}>
              Tell us what you want to build. An engineer reads every message and replies with questions, an approach
              and a quote.
            </p>
            <ul className="cf-ways rv" data-d={3}>
              <Way
                tone="web"
                label="Email"
                icon={
                  <>
                    <rect x="3" y="5" width="18" height="14" rx="2.5" />
                    <path d="m4 7 8 6 8-6" />
                  </>
                }
                action={<CopyButton value={BUSINESS_EMAIL} label="Copy email address" />}
              >
                <a className="cf-way__v" href={`mailto:${BUSINESS_EMAIL}`}>
                  {BUSINESS_EMAIL}
                </a>
              </Way>
              <Way
                tone="api"
                label="WhatsApp and phone"
                icon={<path d="M4 20l1.5-4.5A8 8 0 1 1 9 19zM9.5 9.5c.5 2 2 3.5 4 4" />}
                action={
                  <a className="cf-pill" href={`tel:+${WHATSAPP_NUMBER_E164}`}>
                    Call us
                  </a>
                }
              >
                <a className="cf-way__v" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  {WHATSAPP_NUMBER_DISPLAY}
                </a>
              </Way>
              <Way
                tone="mobile"
                label="Reply time"
                icon={
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </>
                }
              >
                <p className="cf-way__v">Within 24 hours, Monday to Saturday (PKT)</p>
              </Way>
            </ul>
            {social.length > 0 && (
              <div className="cf-social rv">
                {social.map((s) => (
                  <ArrowLink key={s.name} href={s.url}>
                    {s.name}
                  </ArrowLink>
                ))}
              </div>
            )}
          </div>

          <div className="rv" data-d={2}>
            {/* React Query is only used by this form, so its provider lives here, not in the root layout. */}
            <Providers>
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </Providers>
          </div>
        </div>
      </section>

      <section className="ctk-sec sv-sec cf-where" data-tone="quiet" data-section="where we work" aria-labelledby="cf-where-h">
        <div className="ctk-wrap">
          <SectionHead
            kicker
            eyebrow="Where we work"
            id="cf-where-h"
            titleClassName="sv-h2"
            title={
              <>
                Based in Lahore. <span className="sv-b">Working across Pakistan</span> and abroad.
              </>
            }
          />
          <div className="cf-where__g">
            <article className="cf-card rv">
              <div className="cf-card__top">
                <span className="cf-flag" aria-hidden="true">
                  <i />
                </span>
                <div>
                  <p className="cf-card__k">For clients in Pakistan</p>
                  <h3>Local team, local payments</h3>
                </div>
              </div>
              <ul className="cf-list">
                {PAKISTAN.map(([b, t]) => (
                  <li key={b}>
                    <b>{b}</b>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="cf-card__base">Based in {LOCATION}.</p>
            </article>
            <article className="cf-card cf-card--intl rv" data-d={1} data-theme="dark">
              <div className="cf-card__top">
                <IconTile className="cf-globe">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.6 2.6 4 5.6 4 9s-1.4 6.4-4 9c-2.6-2.6-4-5.6-4-9s1.4-6.4 4-9z" />
                </IconTile>
                <div>
                  <p className="cf-card__k">For clients abroad</p>
                  <h3>A direct line, in your time zone</h3>
                </div>
              </div>
              <ul className="cf-list">
                {ABROAD.map(([b, t]) => (
                  <li key={b}>
                    <b>{b}</b>
                    {t}
                  </li>
                ))}
              </ul>
              <WorldClocks />
            </article>
          </div>
        </div>
      </section>

      <section className="cf-call" data-tone="quiet" aria-labelledby="cf-call-h">
        <div className="ctk-wrap">
          <div className="cf-callcard sv-tone--web rv">
            <IconTile className="sv-ic sv-ic--lg">
              <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
              <path d="M3.5 9.5h17M8 3v3M16 3v3M8 14h3" />
            </IconTile>
            <div>
              <h2 id="cf-call-h" className="ctk-panel__h">
                Prefer to talk it through?
              </h2>
              <p className="sv-body cf-call__t">Message us on WhatsApp to book a call at a time that suits your time zone.</p>
            </div>
            <Btn href={BOOK_CALL_LINK} external variant="secondary">
              Book a Call
            </Btn>
          </div>
        </div>
      </section>
    </div>
  );
}
