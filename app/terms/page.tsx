import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { BUSINESS_EMAIL } from "@/lib/contact";

export const metadata: Metadata = pageMetadata("/terms", "Terms of Use", "The terms that govern use of the CodTK website.");

// Drafted for founder review (prd.md §6.8); not legal advice. Covers this website only. Client work
// is governed by the signed contract and NDA described on the Process page.
const LAST_UPDATED = "October 20, 2026";

const linkClass = "font-semibold text-accent underline-offset-4 hover:underline";

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <div>
          <h2 className="text-base font-semibold text-foreground">1. About these terms</h2>
          <p className="mt-2">
            These terms apply when you use codtk.com. By using the site you accept them. Project work
            with CodTK is governed by a separate signed contract and NDA, as described on our{" "}
            <Link href="/process" className={linkClass}>
              Process
            </Link>{" "}
            page. If that contract and these terms differ, the contract wins.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">2. Quotes and enquiries</h2>
          <p className="mt-2">
            Sending an enquiry doesn&apos;t create a contract. Any quote or timeline we give is an
            estimate until we both sign a contract that confirms scope, cost and payment milestones.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">3. Using the website</h2>
          <p className="mt-2">
            Please don&apos;t misuse the site: no attempts to gain unauthorised access, no automated
            or bulk form submissions, no scraping at scale and nothing that disrupts its normal
            operation.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">4. Our content</h2>
          <p className="mt-2">
            The CodTK name, logo, copy and design on this site belong to CodTK and may not be reused
            without permission. Projects shown in our Portfolio remain the property of their owners;
            linked source code is covered by the licence in its repository.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">5. Links to other sites</h2>
          <p className="mt-2">
            We link to demos, repositories and services hosted elsewhere. We aren&apos;t responsible
            for their content or availability.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">6. No warranty</h2>
          <p className="mt-2">
            The website is provided &quot;as is&quot;. We work to keep it accurate and available but
            can&apos;t guarantee it will always be error-free or online.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">7. Limitation of liability</h2>
          <p className="mt-2">
            To the extent the law allows, CodTK is not liable for indirect or consequential loss
            arising from your use of this website. Nothing here limits rights you have that cannot be
            excluded by law, including consumer rights in your country.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">8. Governing law</h2>
          <p className="mt-2">
            These terms are governed by the laws of Pakistan, and the courts of Lahore have
            jurisdiction over any dispute about them.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">9. Changes</h2>
          <p className="mt-2">
            We may update these terms. The date at the top shows the latest version.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">10. Contact</h2>
          <p className="mt-2">
            Questions about these terms:{" "}
            <a href={`mailto:${BUSINESS_EMAIL}`} className={linkClass}>
              {BUSINESS_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
