import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/sections/ContactForm";
import { Providers } from "@/app/providers";
import { ArrowLink, Btn, Icon, Net } from "@/components/codtk/primitives";
import {
  BOOK_CALL_LINK,
  BUSINESS_EMAIL,
  LOCATION,
  SOCIAL_LINKS,
  WHATSAPP_LINK,
  WHATSAPP_NUMBER_DISPLAY,
  WHATSAPP_NUMBER_E164,
} from "@/lib/contact";

export const metadata: Metadata = pageMetadata("/contact", "Contact", "Request a quote from CodTK, a software company in Lahore. Tell us about your project and we reply within 24 hours, Monday to Saturday.");

// Design system ContactPage: details, reply time and a call card on the left, the enquiry panel on
// the right. Social links render only once their URLs exist (prd.md FR-7).
export default function ContactPage() {
  const social = SOCIAL_LINKS.filter((s) => s.url);
  return (
    <section
      className="ctk-sec"
      data-tone="contact"
      data-section="contact"
      style={{ paddingTop: "calc(var(--nav) + 64px)" }}
    >
      <Net seed={17} n={5} />
      <div className="ctk-wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="ctk-g">
          <div className="l-5">
            <p className="ctk-crumb rv">
              <Link href="/">~/codtk</Link>
              <span aria-hidden="true">/</span>
              <span>contact</span>
            </p>
            <h1 className="ctk-d1 ctk-d1--page rv" data-d={1} style={{ marginTop: 24 }}>
              Let&apos;s talk about your <span className="ctk-em">project</span>.
            </h1>
            <p className="ctk-lead rv" data-d={2} style={{ marginTop: 24 }}>
              Tell us what you want to build. An engineer reads every message and replies with questions, an approach
              and a quote.
            </p>

            <dl className="ctk-contact-list rv" data-d={3}>
              <div>
                <dt className="ctk-label">email</dt>
                <dd>
                  <a className="ctk-big" href={`mailto:${BUSINESS_EMAIL}`}>
                    {BUSINESS_EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="ctk-label">whatsapp · phone</dt>
                <dd className="ctk-social">
                  <a className="ctk-link" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    WhatsApp {WHATSAPP_NUMBER_DISPLAY}
                    <Icon name="ur" />
                  </a>
                  <a className="ctk-link" href={`tel:+${WHATSAPP_NUMBER_E164}`}>
                    Call us
                    <Icon name="ur" />
                  </a>
                </dd>
              </div>
              <div>
                <dt className="ctk-label">reply time</dt>
                <dd>Within 24 hours, Monday to Saturday (PKT)</dd>
                <p className="ctk-meta" style={{ marginTop: 4 }}>
                  Based in {LOCATION}, working with clients in Pakistan and abroad.
                </p>
              </div>
              {social.length > 0 && (
                <div>
                  <dt className="ctk-label">follow codtk</dt>
                  <dd className="ctk-social">
                    {social.map((s) => (
                      <ArrowLink key={s.name} href={s.url}>
                        {s.name}
                      </ArrowLink>
                    ))}
                  </dd>
                </div>
              )}
            </dl>

            <div className="ctk-card ctk-glow rv" data-d={4} style={{ marginTop: 32 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ color: "var(--blue-400)", fontSize: 22, lineHeight: 1 }}>
                  <Icon name="cal" />
                </span>
                <div>
                  <h2 className="ctk-h4">Prefer to talk it through?</h2>
                  <p className="ctk-sm" style={{ marginTop: 6 }}>
                    Message us on WhatsApp to book a call at a time that suits your time zone.
                  </p>
                  <div style={{ marginTop: 20 }}>
                    <Btn href={BOOK_CALL_LINK} external variant="secondary" size="sm">
                      Book a Call
                    </Btn>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="l-s7 rv" data-d={2}>
            {/* React Query is only used by this form, so its provider lives here, not in the root layout. */}
            <Providers>
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </Providers>
          </div>
        </div>
      </div>
    </section>
  );
}
