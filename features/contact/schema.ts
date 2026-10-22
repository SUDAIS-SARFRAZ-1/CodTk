import { z } from "zod";
import { SERVICE_OFFERINGS } from "@/lib/service-offerings";

const PROJECT_TYPES = [...SERVICE_OFFERINGS.map((s) => s.title), "Something else"] as const;

// Older links (home service cards) carry the previous service titles; map them to the current ones.
const PROJECT_TYPE_ALIASES: Record<string, string> = Object.fromEntries(
  SERVICE_OFFERINGS.filter((s) => s.legacyTitle).map((s) => [s.legacyTitle, s.title]),
);
// Optional budget range (prd.md FR-20); the last is the default when the visitor doesn't pick one.
const BUDGETS = ["Under $5k", "$5k – 15k", "$15k – 40k", "$40k +", "Not sure yet"] as const;

// contactFormSchema is what the client sends and validates for instant
// feedback. The server (app/contact/api/route.ts) re-validates the same
// shape independently — client validation is a courtesy only (rules.md §5).
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().trim().email("Enter a valid email address"),
  projectType: z.enum(PROJECT_TYPES),
  budget: z.enum(BUDGETS).default("Not sure yet"),
  message: z.string().trim().min(10, "Tell us a bit more about your project"),
  // Honeypot: real visitors never see or fill this field. Must accept any
  // string (including bot-filled garbage) — the route checks non-emptiness,
  // not the schema, or a filled honeypot would just fail as INVALID_INPUT
  // instead of being silently discarded (rules.md §7).
  company: z.string().optional().default(""),
  // Time-trap: timestamp (ms) of when the form was rendered, set client-side.
  // A submission arriving implausibly fast is almost certainly scripted.
  renderedAt: z.number(),
  // Cloudflare Turnstile token; the server verifies it with Cloudflare (prd.md FR-14).
  turnstileToken: z.string().max(2048).optional().default(""),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export { BUDGETS, PROJECT_TYPE_ALIASES, PROJECT_TYPES };
