import type { Metadata } from "next";
import { Btn, PageHero } from "@/components/codtk/primitives";
import { WHATSAPP_LINK } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

// Where the contact form lands after a successful send: a clean conversion URL for analytics.
// The wording is the form's existing success message. Not indexed and not in the sitemap.
export const metadata: Metadata = {
  ...pageMetadata("/thank-you", "Message received, we reply within 24 hours — CodTK", "Your message reached CodTK. We reply within 24 hours, Monday to Saturday."),
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <div className="sv-page">
      <PageHero
        crumb="Message received"
        path="/thank-you"
        titleClassName="sv-h1"
        title={<>Message received.</>}
        intro="Thank you. We will reply within 24 hours, Monday to Saturday."
        actions={
          <>
            <Btn href="/">Go to Home</Btn>
            <Btn href={WHATSAPP_LINK} variant="secondary" external>
              WhatsApp Us
            </Btn>
          </>
        }
      />
    </div>
  );
}
