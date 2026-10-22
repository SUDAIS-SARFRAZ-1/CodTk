import type { Metadata } from "next";
import { Hero } from "@/components/codtk/Hero";
import { Architecture } from "@/components/codtk/Architecture";
import { DeliveryStage } from "@/components/codtk/DeliveryStage";
import { Marquee, Statement } from "@/components/codtk/ScrollType";
import { TechStrip } from "@/components/codtk/TechStrip";
import { ServiceStack } from "@/components/codtk/ServiceStack";
import { StartingPoint } from "@/components/codtk/StartingPoint";
import { Why } from "@/components/codtk/Why";
import { CaseShowcase } from "@/components/codtk/CaseShowcase";
import { Faq } from "@/components/codtk/Faq";
import { CtaBanner } from "@/components/codtk/CtaBanner";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "CodTK",
  url: "https://codtk.com",
  email: "codtk.official@gmail.com",
  description:
    "CodTK is a software company in Lahore building custom web, mobile, backend and cloud software. Work directly with the engineers who build your product.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  areaServed: ["PK", "GB", "US", "AE"],
  knowsAbout: ["Web Development", "Mobile App Development", "React", "Next.js", "Node.js"],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CodTK",
  url: "https://codtk.com",
};

// Section order from the CodTK design system's Home page. Its Delivery Standard, Stats and
// Testimonials sections are left out until the PRD supplies real figures and quotes (rules.md §1).
export default function Home() {
  return (
    <>
      {/* Structured data — LocalBusiness and WebSite entity */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <Hero />
      <TechStrip />
      <Architecture />
      <DeliveryStage />
      <Marquee />
      <Statement />
      <ServiceStack />
      <StartingPoint />
      <Why />
      <CaseShowcase />
      <Faq />
      <CtaBanner />
    </>
  );
}
