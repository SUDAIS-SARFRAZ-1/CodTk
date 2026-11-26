import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/codtk/JsonLd";
import { ContactForm } from "@/components/sections/ContactForm";
import { CopyButton } from "@/components/contact/CopyButton";
import { WorldClocks } from "@/components/contact/WorldClocks";
import { Providers } from "@/app/providers";
import { Btn, IconTile, SectionHead } from "@/components/codtk/primitives";
import { SocialIcons } from "@/components/codtk/SocialIcons";
import { Curtain } from "@/components/codtk/Curtain";
import {
  BOOKING_URL,
  BUSINESS_EMAIL,
  LOCATION,
  REACH,
  WHATSAPP_LINK,
  WHATSAPP_NUMBER_DISPLAY,
  WHATSAPP_NUMBER_E164,
} from "@/lib/contact";

export const metadata: Metadata = pageMetadata("/contact", "Contact CodTK | Get a Fixed Quote", "Request a fixed quote from CodTK in Lahore. Tell us about your project by form, WhatsApp or email; we reply within 24 hours, Monday to Saturday.");

// What working with CodTK looks like from Pakistan and from abroad. Every point restates a fact
// already on the site (prd.md §3, §6.6), so nothing here is new or unconfirmed.
const PAKISTAN: [string, string][] = [
  ["Lahore-based team", `working with businesses anywhere in Pakistan.`],
  ["Pakistan time", "Monday to Saturday, with replies within 24 hours."],
  ["WhatsApp and calls", `on a Pakistani number, ${WHATSAPP_NUMBER_DISPLAY}.`],
  ["Pay locally", "by JazzCash or Easypaisa, in stages such as 30% / 40% / 30%."],
  ["Quotes in PKR", "on request. Mention it in your message."],
];
const ABROAD: [string, string][] = [
  ["Calls booked", "at a time that suits your time zone."],
  ["Working hours", "Pakistan time overlaps the Gulf workday and Europe's mornings."],
  ["International payments", "through Payoneer."],
  ["Contract and privacy agreement", "signed before any work begins."],
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
// clocks), and a call card.
export default function ContactPage() {
  return (
    <div className="sv-page cf-page">
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <Curtain>
      <section className="cf-hero" data-section="contact" aria-labelledby="cf-h1">
        <div className="ctk-wrap cf-hero__g">
          <div className="cf-intro">
            <nav className="ctk-crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Contact</span>
            </nav>
            <h1 id="cf-h1" className="sv-h1">
              <>Let’s talk about your project.</>
            </h1>
            <p className="sv-lead cf-lead">
              Tell us what you want to build. An engineer reads every message and replies with questions, an approach
              and a quote.
            </p>
            <ul className="cf-ways">
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
            <SocialIcons className="cf-social" />
          </div>

          <div>
            {/* React Query is only used by this form, so its provider lives here, not in the root layout. */}
            <Providers>
              <ContactForm />
            </Providers>
          </div>
        </div>
      </section>

      <section className="ctk-sec sv-sec cf-where" data-section="where we work" aria-labelledby="cf-where-h">
        <div className="ctk-wrap">
          <SectionHead
            id="cf-where-h"
            titleClassName="sv-h2"
            title={
              <>
                Based in Lahore. Working across Pakistan and abroad.
              </>
            }
          />
          <div className="cf-where__g">
            <article className="cf-card">
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
              <p className="cf-card__base">
                Based in {LOCATION}. {REACH}.
              </p>
            </article>
            <article className="cf-card cf-card--intl" data-theme="dark">
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
      </Curtain>

      <section className="cf-call" aria-labelledby="cf-call-h">
        <div className="ctk-wrap">
          <div className="cf-callcard sv-tone--web">
            <IconTile className="sv-ic sv-ic--lg">
              <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
              <path d="M3.5 9.5h17M8 3v3M16 3v3M8 14h3" />
            </IconTile>
            <div>
              <h2 id="cf-call-h" className="ctk-panel__h">
                Prefer to talk it through?
              </h2>
              <p className="sv-body cf-call__t">Pick a time that suits your time zone.</p>
            </div>
            <div>
              <div className="ctk-actions">
                <Btn href={BOOKING_URL} external>
                  Book a free consultation
                </Btn>
              </div>
              <p className="ctk-hint cf-call__when">30-minute Google Meet call, Monday to Saturday, 9am to 5pm PKT.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
