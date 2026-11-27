import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/codtk/Navbar";
import { Footer } from "@/components/codtk/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { TabBar } from "@/components/layout/TabBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Intro, INTRO_SEEN_SCRIPT } from "@/components/codtk/Intro";
import { ClickTracking } from "@/components/layout/ClickTracking";
import { MagneticButtons } from "@/components/layout/MagneticButtons";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { TravelOrb } from "@/components/layout/TravelOrb";
import { Curtain } from "@/components/layout/Curtain";
import { EXTENDED_TAGLINE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/seo";
import "./globals.css";
import "./codtk.css";

// One type family (Instrument Sans) for headlines and body; JetBrains Mono for labels and code.
const body = Instrument_Sans({ variable: "--font-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s — CodTK" },
  description: SITE_DESCRIPTION,
  // Search Console / Bing Webmaster verification: set the values in Vercel (TODO(owner)); unset = no tag.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: EXTENDED_TAGLINE,
    images: "/opengraph-image",
  },
  openGraph: {
    type: "website",
    siteName: "CodTK",
    url: "/",
    title: SITE_TITLE,
    description: EXTENDED_TAGLINE,
  },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${body.variable} ${mono.variable}`}>
      <body>
        {/* Before first paint: marks a repeat view so the Home intro plays once per visit. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SEEN_SCRIPT }} />
        <Intro />
        <div className="ctk">
          <Navbar />
          <main className="ctk-main">{children}</main>
          <Footer />
          <WhatsAppButton />
          <TabBar />
        </div>
        {/* Cookieless page views and real-visitor Core Web Vitals (prd.md FR-8, G4); both named as
            processors in the Privacy Policy. */}
        <Analytics />
        <SpeedInsights />
        {/* GA4 — loaded only after cookie consent (CookieBanner handles the gtag script injection) */}
        <CookieBanner />
        <SmoothScroll />
        <ClickTracking />
        <MagneticButtons />
        <ScrollReveal />
        <TravelOrb />
        <Curtain />
      </body>
    </html>
  );
}
