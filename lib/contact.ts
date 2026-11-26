// Single source of truth for real business contact details (rules.md §1 —
// no placeholder contact info anywhere; every usage reads from here).
// Address shown to visitors, and the inbox contact-form leads go to (founder, 2026-11-26). Cloudflare
// Email Routing forwards both to Gmail.
export const BUSINESS_EMAIL = "info@codtk.com";
export const LEAD_EMAIL = "contact@codtk.com";

export const WHATSAPP_NUMBER_DISPLAY = "+92 314 6397321";
export const WHATSAPP_NUMBER_E164 = "923146397321";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER_E164}`;

// Free consultation booking page: a Google Calendar appointment schedule (founder, 2026-11-26; prd.md FR-10).
export const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0w9YR3PwNBTcY2NJRd2-Y7-pHjOfKtKNBdwCPBMdrVCUyIwr9LB3xcVe3rX81CqXTq9onuKg_f";

export const LOCATION = "Lahore, Pakistan";
export const REACH = "Remote team, serving clients worldwide";

export const SIGN_OFF = "Code. Design. Deliver.";
export const ONE_LINER =
  "CodTK is a software and digital growth company based in Lahore, Pakistan, working with startups and businesses worldwide.";

// Official profiles (founder's brief, 2026-11-19). An empty url hides that icon, so no dead social
// link ever ships (rules.md §1, prd.md FR-7). `icon` is the file name in public/social/; `color` is
// the network's own brand colour (any CSS background, so Instagram keeps its gradient).
export const SOCIAL_LINKS: { name: string; icon: string; url: string; color: string }[] = [
  { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/company/codtk/", color: "#0a66c2" },
  {
    name: "Instagram",
    icon: "instagram",
    url: "https://www.instagram.com/codtk_official/",
    color: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285aeb 90%)",
  },
  { name: "Facebook", icon: "facebook", url: "https://www.facebook.com/codtk.official", color: "#0866ff" },
  { name: "X", icon: "x", url: "", color: "currentColor" },
];
