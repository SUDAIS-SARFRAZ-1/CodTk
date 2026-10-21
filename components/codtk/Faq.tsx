import Link from "next/link";
import type { ReactNode } from "react";
import { BUSINESS_EMAIL } from "@/lib/contact";

// Every answer reflects a policy confirmed by the founder (2026-10-03; payments per prd.md §6.6).
// NDA, code ownership, after-launch support, fixed pricing and reply times are answered in Why and
// the hero, so they aren't repeated here.
const FAQS: { question: string; answer: ReactNode }[] = [
  {
    question: "How much does a project cost?",
    answer: "Every project is priced on its scope. Tell us what you need and we'll send you a quote.",
  },
  {
    question: "How long does a project take?",
    answer: "It depends on scope. After discovery, we agree the timeline in the proposal before any work starts.",
  },
  {
    question: "How do payments work?",
    answer:
      "Fixed-scope projects are paid in milestones, for example 30% to start, 40% midway and 30% on delivery. Ongoing support and maintenance is a monthly retainer. We accept JazzCash, Easypaisa and Payoneer.",
  },
  {
    question: "How will we communicate during the project?",
    answer:
      "Through a shared channel on WhatsApp or Slack, with tasks tracked in Jira, Trello, ClickUp, or GitHub Projects.",
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
  },
];

// FAQ (design system FAQ): native details, first one open.
export function Faq() {
  return (
    <section className="ctk-sec" data-tone="quiet" data-section="faq" aria-labelledby="faq-t">
      <div className="ctk-wrap">
        <div className="ctk-g">
          <div className="l-4">
            <p className="ctk-kicker">Questions</p>
            <h2 id="faq-t" className="ctk-d2" style={{ marginTop: 24 }}>
              Answers before you <span className="ctk-em">ask</span>.
            </h2>
            <p className="ctk-p" style={{ marginTop: 20 }}>
              Anything else, write to us at{" "}
              <a className="ctk-link" href={`mailto:${BUSINESS_EMAIL}`}>
                {BUSINESS_EMAIL}
              </a>
            </p>
          </div>
          <div className="l-s6 ctk-faq rv">
            {FAQS.map((f, i) => (
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
