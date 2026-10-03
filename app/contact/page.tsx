import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/sections/ContactForm";
import { BUSINESS_EMAIL, WHATSAPP_LINK, WHATSAPP_NUMBER_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get a quote from AptiScript Technologies — tell us about your project.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Contact Us</h1>
      <p className="mt-4 text-muted-foreground">
        Tell us about your project and we&apos;ll get back to you — or reach us directly:
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={`mailto:${BUSINESS_EMAIL}`}
          className="rounded-full border border-border px-5 py-2 text-center text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
        >
          {BUSINESS_EMAIL}
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-border px-5 py-2 text-center text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
        >
          WhatsApp {WHATSAPP_NUMBER_DISPLAY}
        </a>
      </div>

      <div className="mt-10 max-w-xl">
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </div>
    </section>
  );
}
