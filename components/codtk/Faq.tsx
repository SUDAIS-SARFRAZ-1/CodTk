import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/codtk/JsonLd";
import { BUSINESS_EMAIL } from "@/lib/contact";

// Every answer reflects a policy confirmed by the founder (2026-10-03; payments per prd.md §6.6).
// NDA, code ownership, after-launch support, fixed pricing and reply times are answered in Why and
// the hero, so they aren't repeated here.
export const HOME_FAQS: FaqItem[] = [
  {
    question: "How much does a project cost?",
    answer: "Every project is priced on its scope. Tell us what you need and we'll send you a quote.",
    plainText: "Every project is priced on its scope. Tell us what you need and we'll send you a quote.",
  },
  {
    question: "How long does a project take?",
    answer: "It depends on scope. After our first call, we agree the timeline in writing before any work starts.",
    plainText: "It depends on scope. After our first call, we agree the timeline in writing before any work starts.",
  },
  {
    question: "How do payments work?",
    answer:
      "You pay in stages, for example 30% to start, 40% halfway and 30% on delivery. Ongoing support is a monthly fee. We accept JazzCash, Easypaisa and Payoneer.",
    plainText:
      "You pay in stages, for example 30% to start, 40% halfway and 30% on delivery. Ongoing support is a monthly fee. We accept JazzCash, Easypaisa and Payoneer.",
  },
  {
    question: "How will we communicate during the project?",
    answer: "Through a shared WhatsApp or Slack group, with every task tracked on an online task board.",
    plainText: "Through a shared WhatsApp or Slack group, with every task tracked on an online task board.",
  },
  {
    question: "Which technologies do you use?",
    answer: (
      <>
        Mainly Next.js, React, Node.js and Python, with React Native and Kotlin for mobile.{" "}
        <Link href="/tech-stack" className="ctk-link">
          See our full stack
        </Link>
      </>
    ),
    plainText:
      "Mainly Next.js, React, Node.js and Python, with React Native and Kotlin for mobile. See our full stack at codtk.com/tech-stack",
  },
];

export type FaqItem = { question: string; answer: ReactNode; plainText: string };

// FAQ (design system FAQ): native details, first one open, plus FAQPage JSON-LD built from the same
// items, so the markup only ever names questions visible on the page. Home uses its five defaults;
// service pages and /faq pass their own.
export function Faq({ items = HOME_FAQS }: { items?: FaqItem[] }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.plainText },
    })),
  };
  return (
    <section className="ctk-sec" data-section="faq" aria-labelledby="faq-t">
      <JsonLd data={faqSchema} />
      <div className="ctk-wrap">
        <div className="ctk-g">
          <div className="l-4">
            <h2 id="faq-t" className="ctk-h2" style={{ marginTop: 24 }}>
              Answers before you ask.
            </h2>
            <p className="ctk-p" style={{ marginTop: 20 }}>
              Anything else, write to us at{" "}
              <a className="ctk-link" href={`mailto:${BUSINESS_EMAIL}`}>
                {BUSINESS_EMAIL}
              </a>
            </p>
          </div>
          <div className="l-s6 ctk-faq">
            {items.map((f, i) => (
              <details key={f.question} open={i === 0}>
                <summary>
                  {f.question}
                  <i aria-hidden="true" />
                </summary>
                <p className="a">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
