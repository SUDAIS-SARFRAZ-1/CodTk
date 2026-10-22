import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { BUSINESS_EMAIL } from "@/lib/contact";
import { LegalPage, type LegalSection } from "@/components/codtk/LegalPage";

export const metadata: Metadata = pageMetadata("/terms", "Terms of Use", "The terms that govern use of the CodTK website.");

// Drafted for founder review (prd.md §6.8); not legal advice. Covers this website only. Client work
// is governed by the signed contract and NDA described on the Process page.
const LAST_UPDATED = "October 20, 2026";

const SECTIONS: LegalSection[] = [
  {
    title: "About these terms",
    body: (
      <p>
        These terms apply when you use codtk.com. By using the site you accept them. Project work with CodTK is
        governed by a separate signed contract and NDA, as described on our <Link href="/process">Process</Link> page.
        If that contract and these terms differ, the contract wins.
      </p>
    ),
  },
  {
    title: "Quotes and enquiries",
    body: (
      <p>
        Sending an enquiry doesn&apos;t create a contract. Any quote or timeline we give is an estimate until we both
        sign a contract that confirms scope, cost and payment milestones.
      </p>
    ),
  },
  {
    title: "Using the website",
    body: (
      <p>
        Please don&apos;t misuse the site: no attempts to gain unauthorised access, no automated or bulk form
        submissions, no scraping at scale and nothing that disrupts its normal operation.
      </p>
    ),
  },
  {
    title: "Our content",
    body: (
      <p>
        The CodTK name, logo, copy and design on this site belong to CodTK and may not be reused without permission.
        Projects shown in our Portfolio remain the property of their owners; linked source code is covered by the
        licence in its repository.
      </p>
    ),
  },
  {
    title: "Links to other sites",
    body: (
      <p>
        We link to demos, repositories and services hosted elsewhere. We aren&apos;t responsible for their content or
        availability.
      </p>
    ),
  },
  {
    title: "No warranty",
    body: (
      <p>
        The website is provided &quot;as is&quot;. We work to keep it accurate and available but can&apos;t guarantee
        it will always be error-free or online.
      </p>
    ),
  },
  {
    title: "Limitation of liability",
    body: (
      <p>
        To the extent the law allows, CodTK is not liable for indirect or consequential loss arising from your use of
        this website. Nothing here limits rights you have that cannot be excluded by law, including consumer rights in
        your country.
      </p>
    ),
  },
  {
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of Pakistan, and the courts of Lahore have jurisdiction over any dispute
        about them.
      </p>
    ),
  },
  { title: "Changes", body: <p>We may update these terms. The date at the top shows the latest version.</p> },
  {
    title: "Contact",
    body: (
      <p>
        Questions about these terms: <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      crumb="Terms"
      title={
        <>
          Terms of <span className="ctk-em">use</span>.
        </>
      }
      intro="The terms that apply when you use this website."
      updated={LAST_UPDATED}
      sections={SECTIONS}
    />
  );
}
