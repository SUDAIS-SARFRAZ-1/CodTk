import type { Metadata } from "next";
import { BUSINESS_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

// DRAFT — written to cover this site's actual data practices (contact form
// + planned analytics). Not legal advice; have this reviewed once the
// business is formally registered (see prd.md §12) and before relying on it.
const LAST_UPDATED = "September 25, 2026";

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <div>
          <h2 className="text-base font-semibold text-foreground">1. Who We Are</h2>
          <p className="mt-2">
            This Privacy Policy explains how AptiScript Technologies (&quot;we,&quot; &quot;us,&quot;
            or &quot;our&quot;) collects, uses, and protects information when you visit this
            website or contact us through it.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">2. Information We Collect</h2>
          <p className="mt-2">When you use our contact form, we collect the information you submit: your name, email address, project type, and message. We do not require an account, and we do not collect payment information on this website.</p>
          <p className="mt-2">
            We may also collect standard technical information automatically, such as your
            browser type and pages visited, and we may use analytics tools in the future to
            understand how visitors use the site. This policy will be updated to name any
            specific analytics or anti-spam service once one is in use.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">3. How We Use Your Information</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>To respond to your inquiry or quote request</li>
            <li>To keep a record of client communications</li>
            <li>To improve this website and our services</li>
          </ul>
          <p className="mt-2">
            We do not sell your information to third parties.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">4. How We Protect Your Information</h2>
          <p className="mt-2">
            This site is served over HTTPS, and all form submissions are validated on our server
            before being processed. Access to submitted inquiries is limited to our team.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">5. Data Retention</h2>
          <p className="mt-2">
            We retain contact-form submissions for as long as reasonably necessary to respond to
            your inquiry and maintain business records, unless you ask us to delete it sooner.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">6. Your Rights</h2>
          <p className="mt-2">
            You can ask us what information we hold about you, request a correction, or request
            deletion, by emailing{" "}
            <a href={`mailto:${BUSINESS_EMAIL}`} className="font-semibold text-brand hover:text-brand-dark">
              {BUSINESS_EMAIL}
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">7. Children&apos;s Privacy</h2>
          <p className="mt-2">
            This website is intended for business use and is not directed at children. We do not
            knowingly collect information from children.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">8. Changes to This Policy</h2>
          <p className="mt-2">
            We may update this policy as the site and our practices evolve. The &quot;Last
            updated&quot; date above will reflect the most recent revision.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">9. Contact Us</h2>
          <p className="mt-2">
            Questions about this policy can be sent to{" "}
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
