import Link from "next/link";
import type { ReactNode } from "react";

// Every answer reflects a policy confirmed by the founder (2026-10-03) — rules.md §1, §4.
const FAQS: { question: string; answer: ReactNode }[] = [
  {
    question: "How much does a project cost?",
    answer:
      "Every project is priced on its scope. Tell us what you need and we'll send a quote — clearly scoped projects can be done at a fixed price, so there are no surprise bills.",
  },
  {
    question: "How long does a project take?",
    answer:
      "It depends on scope. After discovery, we agree the timeline in the proposal, and you get a weekly update and demo of the latest build so you always know where things stand.",
  },
  {
    question: "How do payments work?",
    answer:
      "An upfront deposit, then milestone payments, as set out in the contract. We accept bank transfer (Pakistan), Wise, and card payments via Stripe.",
  },
  {
    question: "Will you sign an NDA?",
    answer: "Yes. A contract and NDA are signed before any work starts, so your idea stays confidential.",
  },
  {
    question: "Who owns the code?",
    answer: "You do. The full source code and intellectual property are handed over to you on payment.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You get one month of free bug fixes after delivery. After that, optional paid maintenance keeps your product secure and up to date.",
  },
  {
    question: "How will we communicate during the project?",
    answer:
      "Through a shared channel on WhatsApp or Slack, with tasks tracked in Jira, Trello, ClickUp, or GitHub Projects. We reply within 24 hours.",
  },
  {
    question: "Which technologies do you use?",
    answer: (
      <>
        Mainly Next.js, React, Node.js, Python, PostgreSQL, and MongoDB, with React Native and Kotlin for
        mobile and Docker, GitHub Actions, AWS, and Vercel for deployment.{" "}
        <Link href="/tech-stack" className="font-semibold text-brand hover:text-brand-dark">
          See our full stack →
        </Link>
      </>
    ),
  },
];

export function Faq() {
  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-background">
      {FAQS.map((faq) => (
        <details key={faq.question} className="group p-5 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
            {faq.question}
            <svg
              className="h-5 w-5 flex-none text-brand transition-transform duration-150 group-open:rotate-45 motion-reduce:transition-none"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </summary>
          <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
