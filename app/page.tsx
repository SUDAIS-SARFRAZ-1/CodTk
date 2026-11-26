import type { Metadata } from "next";
import { BUSINESS_EMAIL, SOCIAL_LINKS } from "@/lib/contact";
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

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Organization + ProfessionalService entity (brief 2026-11-19; prd.md FR-16). URLs follow SITE_URL,
// so they match the canonical host. Only facts stated on the site.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: "CodTK",
  url: SITE_URL,
  logo: `${SITE_URL}/icons/icon-512.png`,
  image: `${SITE_URL}/opengraph-image`,
  email: BUSINESS_EMAIL,
  telephone: "+92-314-6397321",
  foundingDate: "2026",
  slogan: "Building Next Generation Software",
  description: SITE_DESCRIPTION,
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  areaServed: "Worldwide",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: BUSINESS_EMAIL,
    telephone: "+92-314-6397321",
    areaServed: "Worldwide",
  },
  knowsAbout: SERVICE_OFFERINGS.map((s) => s.title),
  sameAs: SOCIAL_LINKS.filter((s) => s.url).map((s) => s.url),
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "CodTK",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// Home keeps only what a first-time visitor needs (founder, 2026-11-19): who we are, what we do,
// why us, proof, answers and the next step. Detail lives on the inner pages.
export default function Home() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={webSiteSchema} />
      <Hero />
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
      <CtaBanner />
    </>
  );
}
