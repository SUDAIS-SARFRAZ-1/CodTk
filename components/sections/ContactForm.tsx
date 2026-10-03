"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { contactFormSchema, PROJECT_TYPES, type ContactFormInput } from "@/features/contact/schema";
import { useSubmitContactForm } from "@/features/contact/useSubmitContactForm";

export function ContactForm() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get("service");
  const defaultProjectType = useMemo(
    () =>
      PROJECT_TYPES.find((type) => type === prefilledService) ?? PROJECT_TYPES[PROJECT_TYPES.length - 1],
    [prefilledService],
  );

  const renderedAtRef = useRef(0);
  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);
  const { mutate, isPending, isSuccess, error } = useSubmitContactForm();
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-border bg-muted p-6 text-center">
        <p className="font-semibold text-foreground">Thanks — your message is on its way.</p>
        <p className="mt-2 text-sm text-muted-foreground">We&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const input = {
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          projectType: String(formData.get("projectType") ?? ""),
          message: String(formData.get("message") ?? ""),
          company: String(formData.get("company") ?? ""),
          renderedAt: renderedAtRef.current,
        };
        const parsed = contactFormSchema.safeParse(input);
        if (!parsed.success) {
          const errors: Partial<Record<keyof ContactFormInput, string>> = {};
          for (const issue of parsed.error.issues) {
            const key = issue.path[0] as keyof ContactFormInput;
            errors[key] = issue.message;
          }
          setFieldErrors(errors);
          return;
        }
        setFieldErrors({});
        mutate(parsed.data);
      }}
    >
      {/* Honeypot — hidden from real visitors via CSS, not just visually offscreen */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
        {fieldErrors.name && <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
        {fieldErrors.email && <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-foreground">
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          defaultValue={defaultProjectType}
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none"
        >
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
        {fieldErrors.message && <p className="mt-1 text-sm text-red-600">{fieldErrors.message}</p>}
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-dark disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
