import type { Metadata } from "next";
import { BUSINESS_EMAIL, SOCIAL_LINKS, WHATSAPP_NUMBER_E164 } from "@/lib/contact";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";
import { SERVICE_OFFERINGS } from "@/lib/service-offerings";
import { JsonLd } from "@/components/codtk/JsonLd";
import { Hero } from "@/components/codtk/Hero";
import { Needs } from "@/components/codtk/Needs";
import { TechStrip } from "@/components/codtk/TechStrip";
import { TechReveal } from "@/components/codtk/TechReveal";
import { Marquee } from "@/components/codtk/Marquee";
import { Why } from "@/components/codtk/Why";
import { CaseShowcase } from "@/components/codtk/CaseShowcase";
import { Faq } from "@/components/codtk/Faq";
import { CtaBanner } from "@/components/codtk/CtaBanner";

// Main keyword "software development company Lahore" (SEO pass, 2026-11-27); the visible H1 stays the
// brand line, so the keyword sits in the title, description and the hero's first sentence.
const HOME_TITLE = "Software Development Company in Lahore | CodTK";
const HOME_DESCRIPTION =
  "Software development company in Lahore building websites, apps and custom systems that bring in clients and cut busywork. Book a free consultation.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "CodTK", url: "/", title: HOME_TITLE, description: HOME_DESCRIPTION, images: "/opengraph-image" },
  twitter: { card: "summary_large_image", title: HOME_TITLE, description: HOME_DESCRIPTION, images: "/opengraph-image" },
};

// Organization + ProfessionalService and the WebSite in one @graph (brief 2026-11-19; prd.md FR-16;
// SEO pass 2026-11-27). URLs follow SITE_URL, so they match the canonical host. Contact details come
// from lib/contact.ts and only facts stated on the site are used: no ratings, prices or awards.
const TELEPHONE = `+${WHATSAPP_NUMBER_E164}`;
const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: "CodTK",
      url: SITE_URL,
      logo: `${SITE_URL}/icons/icon-512.png`,
      image: `${SITE_URL}/opengraph-image`,
      description: SITE_DESCRIPTION,
      slogan: "Building Next Generation Software",
      email: BUSINESS_EMAIL,
      telephone: TELEPHONE,
      foundingDate: "2026",
      address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
      areaServed: "Worldwide",
      sameAs: SOCIAL_LINKS.filter((s) => s.url).map((s) => s.url),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: BUSINESS_EMAIL,
        telephone: TELEPHONE,
        areaServed: "Worldwide",
        availableLanguage: "English",
      },
      knowsAbout: SERVICE_OFFERINGS.map((s) => s.title),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "CodTK",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

// Home keeps only what a first-time visitor needs (founder, 2026-11-19): who we are, what we do,
// why us, proof, answers and the next step. Detail lives on the inner pages.
export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema} />
      <Hero />
      {/* the rest of Home slides up over the end of the hero dive like a sheet (founder, 2026-11-27) */}
      <div className="ctk-sheet">
      <Needs />
      <div className="ctk-wrap">
        <TechReveal className="ctk-reveal--strip">
          <TechStrip />
        </TechReveal>
      </div>
      <Marquee />
      <Why />
      <CaseShowcase />
      <Faq />
      <CtaBanner dive />
      </div>
    </>
  );
}
