import type { Metadata } from "next";
import { BUSINESS_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Terms of Use",
};

// DRAFT — covers use of this marketing website only, not client engagements
// (those are governed by a separate signed contract, per the Process page).
// Not legal advice; have this reviewed once the business is formally
// registered (see prd.md §12) and before relying on it.
const LAST_UPDATED = "September 25, 2026";

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <div>
          <h2 className="text-base font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By using this website, you agree to these Terms of Use. These terms cover this
            website only — any actual project work with AptiScript Technologies is governed by a
            separate signed contract (and NDA, where applicable), as described on our{" "}
            <a href="/process" className="font-semibold text-brand hover:text-brand-dark">
              Process
            </a>{" "}
            page.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">2. Use of This Website</h2>
          <p className="mt-2">
            This site is provided for informational purposes — to describe our services, share
            our work, and let you contact us. You agree not to misuse the site, including
            attempting unauthorized access, scraping content at scale, or disrupting its normal
            operation.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">3. Intellectual Property</h2>
          <p className="mt-2">
            The content on this site — including our logo, branding, copy, and design — belongs
            to AptiScript Technologies unless otherwise noted, and may not be reproduced without
            permission.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">4. External Links</h2>
          <p className="mt-2">
            Our Portfolio pages may link to live demos or repositories hosted outside this site.
            We aren&apos;t responsible for the content or availability of external sites we link
            to.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">5. No Warranty</h2>
          <p className="mt-2">
            This website is provided &quot;as is.&quot; While we aim to keep it accurate and
            available, we don&apos;t guarantee it will be error-free or uninterrupted.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">6. Limitation of Liability</h2>
          <p className="mt-2">
            To the extent permitted by law, AptiScript Technologies is not liable for any
            indirect or consequential loss arising from your use of this website.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">7. Changes to These Terms</h2>
          <p className="mt-2">
            We may update these terms from time to time. The &quot;Last updated&quot; date above
            reflects the most recent revision.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">8. Contact Us</h2>
          <p className="mt-2">
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${BUSINESS_EMAIL}`} className="font-semibold text-brand hover:text-brand-dark">
              {BUSINESS_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
