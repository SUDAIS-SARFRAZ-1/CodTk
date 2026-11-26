import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink, Btn, PageHero } from "@/components/codtk/primitives";
import { CtaBanner } from "@/components/codtk/CtaBanner";
import { Faq, HOME_FAQS, type FaqItem } from "@/components/codtk/Faq";
import { BUSINESS_EMAIL, ONE_LINER, WHATSAPP_NUMBER_DISPLAY } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import { SERVICE_SEO } from "@/lib/service-seo";

export const metadata: Metadata = pageMetadata(
  "/faq",
  "FAQ: Working With a Software Company | CodTK",
  "Straight answers about CodTK: what we do, where we are based, how pricing and payments work, code ownership, confidentiality and support.",
);

// Answers questions people ask before hiring a software company (AEO). Each answer opens with the
// direct answer and only restates facts already on the site: the home FAQ (reused word for word),
// Why CodTK, About, Contact and the service pages. No prices, timelines or results are promised.
const plain = (question: string, text: string): FaqItem => ({ question, answer: text, plainText: text });
const home = (question: string) => HOME_FAQS.find((f) => f.question === question)!;

const FAQS: FaqItem[] = [
  plain(
    "What does CodTK do?",
    `${ONE_LINER} We build websites, apps and business software, and help businesses move online and grow: websites, mobile apps, subscription software, business management software (ERP), app backends, WordPress, Google search (SEO), online ads, taking businesses online, AI automation, hosting and technical advice.`,
  ),
  plain(
    "Where is CodTK based, and do you work with international clients?",
    "Lahore, Pakistan, with a remote team serving clients worldwide. Pakistan time overlaps the Gulf workday and Europe's mornings, calls are booked at a time that suits your time zone, and international payments go through Payoneer.",
  ),
  home("How much does a project cost?"),
  home("How long does a project take?"),
  plain("Do I own the source code?", "Yes. Once it's paid for, the code and everything we built are yours."),
  plain(
    "How do you keep my project confidential?",
    "We both sign a contract and a privacy agreement (NDA) before any work begins, and we never share your data or project details without permission.",
  ),
  plain("What is a custom ERP?", SERVICE_SEO.erp.faqs[0].answer),
  plain("What is digital transformation for a small business?", SERVICE_SEO.transform.faqs[0].answer),
  plain(
    "Do you offer support after launch?",
    "Yes. One month of free bug fixes after launch, then optional paid maintenance to keep your product secure and up to date.",
  ),
  home("How do payments work?"),
  home("How will we communicate during the project?"),
  {
    question: "How do I start a project?",
    answer: (
      <>
        Send us a message through the <Link className="ctk-link" href="/contact">contact form</Link>, WhatsApp ({WHATSAPP_NUMBER_DISPLAY}) or
        email ({BUSINESS_EMAIL}). An engineer reads every message and replies within 24 hours, Monday to Saturday, with
        questions, an approach and a quote.
      </>
    ),
    plainText: `Send us a message through the contact form at codtk.com/contact, WhatsApp (${WHATSAPP_NUMBER_DISPLAY}) or email (${BUSINESS_EMAIL}). An engineer reads every message and replies within 24 hours, Monday to Saturday, with questions, an approach and a quote.`,
  },
];

export default function FaqPage() {
  return (
    <div className="sv-page">
      <PageHero
        crumb="FAQ"
        path="/faq"
        plainCrumb
        titleClassName="sv-h1"
        title={
          <>
            Frequently asked questions.
          </>
        }
        intro="Straight answers about working with CodTK, before you get in touch."
        actions={
          <>
            <Btn href="/contact">Get a Quote</Btn>
            <ArrowLink href="/services">All services</ArrowLink>
          </>
        }
      />
      <Faq items={FAQS} />
      <CtaBanner />
    </div>
  );
}
