import Link from "next/link";
import { WHATSAPP_LINK } from "@/lib/contact";

const FACTS = ["Based in Lahore, Pakistan", "We reply within 24 hours", "Design → Deploy → Support"];

// Copied verbatim from features/contact/schema.ts — keep in sync if that schema changes,
// since the caption claims this is real source from this site.
const CODE_LINES = [
  "export const contactFormSchema = z.object({",
  '  name: z.string().trim().min(2, "Enter your name"),',
  '  email: z.string().trim().email("Enter a valid email address"),',
  "  projectType: z.enum(PROJECT_TYPES),",
  '  message: z.string().trim().min(10, "Tell us a bit more about your project"),',
  "  // ...spam protection fields",
  "});",
];

export function Hero() {
  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-tint">
            AptiScript Technologies
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Building Next Generation Software
          </h1>
          <p className="mt-6 text-lg text-background/80">
            A full-service software house in Lahore delivering custom web and mobile applications,
            backend systems, and cloud solutions — end to end.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-brand px-6 py-3 text-center text-sm font-semibold text-brand-foreground transition-colors duration-150 hover:bg-brand-dark"
            >
              Get a Quote
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-background/40 px-6 py-3 text-center text-sm font-semibold transition-colors duration-150 hover:border-background hover:bg-background hover:text-foreground"
            >
              WhatsApp Us
            </a>
          </div>
          <ul className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {FACTS.map((fact) => (
              <li key={fact} className="flex items-center gap-2 text-sm text-background/80">
                <svg className="h-4 w-4 text-brand-tint" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.58l7.3-7.3a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <figure className="hidden overflow-hidden rounded-xl border border-background/15 bg-background/5 lg:block">
          <div className="flex items-center gap-2 border-b border-background/15 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-background/20" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-background/20" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-background/20" aria-hidden="true" />
            <span className="ml-2 text-xs text-background/60">features/contact/schema.ts</span>
          </div>
          <pre className="whitespace-pre-wrap break-words p-5 text-xs leading-relaxed text-background/90">
            <code>{CODE_LINES.join("\n")}</code>
          </pre>
          <figcaption className="border-t border-background/15 px-4 py-3 text-xs text-brand-tint">
            Real code from this website&apos;s source — the form you&apos;ll use to contact us.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
