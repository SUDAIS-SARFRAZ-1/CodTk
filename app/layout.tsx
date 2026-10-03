import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AptiScript Technologies — Building Next Generation Software",
    template: "%s — AptiScript Technologies",
  },
  description:
    "AptiScript Technologies is a full-service software house delivering custom web, mobile, backend, and cloud solutions. Get a quote or book a call with our team.",
  icons: {
    icon: "/logo-mark.png",
  },
  openGraph: {
    type: "website",
    siteName: "AptiScript Technologies",
    title: "AptiScript Technologies — Building Next Generation Software",
    description:
      "A full-service software house delivering custom web, mobile, backend, and cloud solutions.",
    images: ["/logo-full.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
