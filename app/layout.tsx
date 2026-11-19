import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/codtk/Navbar";
import { Footer } from "@/components/codtk/Footer";
import { Motion } from "@/components/codtk/Motion";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { ClickTracking } from "@/components/layout/ClickTracking";
import { EXTENDED_TAGLINE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/seo";
import "./globals.css";
import "./codtk.css";

// CodTK design system type: Instrument Sans (headlines and body), Instrument Serif italic (the one
// emphasised phrase per headline), JetBrains Mono (labels, code).
const serif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});
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
    <html lang="en" data-theme="light" className={`${serif.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <div className="ctk">
          <Navbar />
          <main className="ctk-main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </div>
        <Motion />
        {/* Cookieless page views and real-visitor Core Web Vitals (prd.md FR-8, G4); both named as
            processors in the Privacy Policy. */}
        <Analytics />
        <SpeedInsights />
        {/* GA4 — loaded only after cookie consent (CookieBanner handles the gtag script injection) */}
        <CookieBanner />
        <ClickTracking />
      </body>
    </html>
  );
}
