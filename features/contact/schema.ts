import { z } from "zod";
import { SERVICES } from "@/lib/services";

const PROJECT_TYPES = [...SERVICES.map((s) => s.title), "Something else"] as const;

// contactFormSchema is what the client sends and validates for instant
// feedback. The server (app/contact/api/route.ts) re-validates the same
// shape independently — client validation is a courtesy only (rules.md §5).
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().trim().email("Enter a valid email address"),
  projectType: z.enum(PROJECT_TYPES),
  message: z.string().trim().min(10, "Tell us a bit more about your project"),
  // Honeypot: real visitors never see or fill this field. Must accept any
  // string (including bot-filled garbage) — the route checks non-emptiness,
  // not the schema, or a filled honeypot would just fail as INVALID_INPUT
  // instead of being silently discarded (rules.md §7).
  company: z.string().optional().default(""),
  // Time-trap: timestamp (ms) of when the form was rendered, set client-side.
  // A submission arriving implausibly fast is almost certainly scripted.
  renderedAt: z.number(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export { PROJECT_TYPES };
