// Single source of truth for real business contact details (rules.md §1 —
// no placeholder contact info anywhere; every usage reads from here).
export const BUSINESS_EMAIL = "aptiscripttechnologies@gmail.com";

export const WHATSAPP_NUMBER_DISPLAY = "+92 301 9492010";
export const WHATSAPP_NUMBER_E164 = "923019492010";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER_E164}`;

export const LOCATION = "Lahore, Pakistan";

// Paste each real profile URL when the account is live — an empty url hides that icon,
// so no dead social link ever ships (rules.md §1, prd.md FR-7).
export const SOCIAL_LINKS: { name: "LinkedIn" | "Instagram" | "Facebook"; url: string }[] = [
  { name: "LinkedIn", url: "" },
  { name: "Instagram", url: "" },
  { name: "Facebook", url: "" },
];
