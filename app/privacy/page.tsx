import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BUSINESS_EMAIL, LOCATION } from "@/lib/contact";
import { LegalPage, type LegalSection } from "@/components/codtk/LegalPage";

export const metadata: Metadata = pageMetadata("/privacy", "Privacy Policy", "How CodTK collects, uses and protects the information you share through this website, and which services process it.");

// Drafted for founder review (prd.md §6.8); not legal advice. Flip `active` when a service goes live
// so the policy only ever names processors actually in use.
const LAST_UPDATED = "October 20, 2026";

const PROCESSORS = [
  { name: "Vercel", purpose: "Hosts this website; processes your IP address and browser details to serve pages.", active: true },
  { name: "Cloudflare Turnstile", purpose: "Checks that a form submission comes from a person, not a bot.", active: true },
  { name: "Resend", purpose: "Delivers your contact-form message to our inbox by email.", active: true },
  { name: "Google (Gmail)", purpose: "Our business inbox, where your message and our replies are stored.", active: true },
  { name: "Google Sheets", purpose: "Keeps a record of enquiries (name, email, project type, message, time).", active: false },
  { name: "Slack", purpose: "Notifies our team that a new enquiry has arrived.", active: false },
  { name: "Vercel Analytics", purpose: "Counts page visits without cookies or personal profiles.", active: true },
  { name: "Vercel Speed Insights", purpose: "Measures how fast pages load for visitors, without cookies or personal profiles.", active: true },
  { name: "Calendly", purpose: "Books a call with us, if you choose to use the booking link.", active: false },
].filter((p) => p.active);

const email = <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>;

const SECTIONS: LegalSection[] = [
  {
    title: "Who we are",
    body: (
      <p>
        CodTK (&quot;we&quot;, &quot;us&quot;) is a software company based in {LOCATION}. We are responsible for the
        personal data you share through this website. You can reach us at {email}.
      </p>
    ),
  },
  {
    title: "What we collect",
    body: (
      <>
        <ul>
          <li>
            <b>What you send us:</b> the name, email address, project type, budget range and message you enter in the
            contact form, plus anything you include in it.
          </li>
          <li>
            <b>Direct contact:</b> if you email, call or message us on WhatsApp, we receive your contact details and
            what you send.
          </li>
          <li>
            <b>Technical data:</b> your IP address and browser details, processed by our hosting and spam-check
            providers so the site works and stays free of bots.
          </li>
        </ul>
        <p>
          We don&apos;t use advertising or tracking cookies, we don&apos;t require an account, and we don&apos;t take
          payments on this website.
        </p>
      </>
    ),
  },
  {
    title: "Why we use it",
    body: (
      <>
        <ul>
          <li>To reply to your enquiry and prepare a quote, at your request before any contract.</li>
          <li>To keep a record of our conversations with prospective and current clients.</li>
          <li>To protect the website and the contact form from spam and abuse.</li>
        </ul>
        <p>
          If you are in the EU or UK, our legal bases under the GDPR are taking steps at your request before entering
          into a contract, and our legitimate interests in running and protecting our business. We never sell your
          data or use it for advertising.
        </p>
      </>
    ),
  },
  {
    title: "Services that process your data",
    body: (
      <>
        <p>We use these providers, and they only process your data to provide their service to us:</p>
        <ul>
          {PROCESSORS.map((p) => (
            <li key={p.name}>
              <b>{p.name}:</b> {p.purpose}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    title: "International transfers",
    body: (
      <p>
        Some of these providers store data outside Pakistan, mainly in the United States. Where the GDPR applies, they
        rely on recognised safeguards such as the European Commission&apos;s Standard Contractual Clauses.
      </p>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        If your enquiry doesn&apos;t become a project, we delete it within two years of our last contact. If it does,
        we keep project correspondence for as long as the contract and our legal and tax obligations require. You can
        ask us to delete your enquiry sooner.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <p>
        You can ask to see the data we hold about you, correct it, delete it, restrict or object to how we use it, or
        receive a copy in a portable format. Email {email} and we will reply within 30 days. If you are in the EU or
        UK, you can also complain to your local data protection authority.
      </p>
    ),
  },
  {
    title: "Security",
    body: (
      <p>
        The site is served over HTTPS, every form submission is validated on our server, and only our team can read
        enquiries. No method of sending data over the internet is completely secure, but we take reasonable steps to
        protect what you share.
      </p>
    ),
  },
  {
    title: "Applicable law",
    body: (
      <p>
        We handle personal data in line with the laws of Pakistan, including the Prevention of Electronic Crimes Act
        2016, and with the GDPR where it applies to visitors in the EU or UK.
      </p>
    ),
  },
  {
    title: "Children",
    body: (
      <p>
        This website is for businesses and is not directed at children under 16. We don&apos;t knowingly collect their
        data.
      </p>
    ),
  },
  {
    title: "Changes",
    body: (
      <p>
        We update this policy when our services or practices change, for example when we add a new provider. The date
        at the top shows the latest version.
      </p>
    ),
  },
  { title: "Contact", body: <p>Questions about this policy or your data: {email}.</p> },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      crumb="Privacy"
      title={
        <>
          Privacy <span className="ctk-em">policy</span>.
        </>
      }
      intro="How CodTK collects, uses and protects what you share through this website, and which services process it."
      updated={LAST_UPDATED}
      sections={SECTIONS}
    />
  );
}
