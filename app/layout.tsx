import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/codtk/Navbar";
import { Footer } from "@/components/codtk/Footer";
import { Motion } from "@/components/codtk/Motion";
import { Background } from "@/components/codtk/Background";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SITE_URL } from "@/lib/seo";
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
  title: {
    default: "CodTK — Software Company in Lahore | Building Next Generation Software",
    template: "%s — CodTK",
  },
  description:
    "CodTK is a software company in Lahore building custom web, mobile, backend and cloud software. Work directly with the engineers who build your product. Get a quote.",
  twitter: { card: "summary_large_image" },
  openGraph: {
    type: "website",
    siteName: "CodTK",
    url: "/",
    title: "CodTK — Building Next Generation Software",
    description:
      "Custom web, mobile, backend and cloud software from a Lahore team that answers fast.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${serif.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <div className="ctk">
          <Background />
          <Navbar />
          <main className="ctk-main">{children}</main>
          <Footer />
          <WhatsAppButton />
          <div className="ctk-cursor" aria-hidden="true" />
        </div>
        <Motion />
      </body>
    </html>
  );
}
