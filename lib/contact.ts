// Single source of truth for real business contact details (rules.md §1 —
// no placeholder contact info anywhere; every usage reads from here).
export const BUSINESS_EMAIL = "codtk.official@gmail.com";

export const WHATSAPP_NUMBER_DISPLAY = "+92 301 9492010";
export const WHATSAPP_NUMBER_E164 = "923019492010";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER_E164}`;

// "Book a Call" opens WhatsApp until the Calendly link exists (prd.md FR-10).
export const BOOK_CALL_LINK = `${WHATSAPP_LINK}?text=${encodeURIComponent("Hi CodTK, I'd like to book a call.")}`;

export const LOCATION = "Lahore, Pakistan";

// Paste each real profile URL when the account is live — an empty url hides that icon,
// so no dead social link ever ships (rules.md §1, prd.md FR-7).
// `icon` is the file name in public/social/.
export const SOCIAL_LINKS: { name: string; icon: string; url: string }[] = [
  { name: "LinkedIn", icon: "linkedin", url: "" },
  { name: "Instagram", icon: "instagram", url: "" },
  { name: "Facebook", icon: "facebook", url: "" },
  { name: "X", icon: "x", url: "" },
];
