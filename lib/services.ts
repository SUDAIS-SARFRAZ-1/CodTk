import type { ServiceTone } from "@/lib/service-offerings";

// One plain line per service for the home page (founder's brief, 2026-11-19), written for visitors
// who are not technical. Full detail lives on /services (lib/service-offerings.ts).
export const SERVICE_LINES: Record<ServiceTone, string> = {
  web: "Business websites and custom web apps.",
  mobile: "Apps for Android and iPhone, or installable web apps.",
  saas: "Online products you sell to many customers, with billing.",
  erp: "One system for your stock, sales, staff and accounts.",
  api: "Logins, permissions, payments and live updates behind your app.",
  wordpress: "Fast WordPress sites your team can update easily.",
  seo: "Get found on Google by the clients you want.",
  marketing: "Paid ads on the platforms that fit your business.",
  transform: "Take your physical business online.",
  ai: "Connect your tools and cut repetitive manual work.",
  cloud: "Reliable hosting, safe releases and room to grow.",
  consulting: "A clear written plan before you build.",
};
