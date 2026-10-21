"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { BUDGETS, contactFormSchema, PROJECT_TYPES, type ContactFormInput } from "@/features/contact/schema";
import { useSubmitContactForm } from "@/features/contact/useSubmitContactForm";
import { Icon } from "@/components/codtk/primitives";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: { sitekey: string }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

type Errors = Partial<Record<keyof ContactFormInput, string>>;

// Design system FormField: mono label, input, and an error line that CSS reveals next to an
// aria-invalid control.
function Field({
  id,
  label,
  required,
  error,
  full,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`ctk-field${full ? " ctk-full" : ""}`}>
      <label htmlFor={id}>
        {label} {required && <em aria-hidden="true">*</em>}
      </label>
      {children}
      {error && (
        <p className="ctk-err" id={`${id}-e`}>
          <Icon name="alert" />
          {error}
        </p>
      )}
    </div>
  );
}

// The quote form inside the design system's enquiry panel. Validates with the shared Zod schema
// for instant feedback; the server re-validates everything (rules.md §5).
export function ContactForm() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get("service");
  const defaultProjectType = useMemo(
    () =>
      PROJECT_TYPES.find((type) => type === prefilledService) ?? PROJECT_TYPES[PROJECT_TYPES.length - 1],
    [prefilledService],
  );

  const renderedAtRef = useRef(0);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);

  // Explicit render: the script may already be loaded from an earlier visit to this page.
  function renderTurnstile() {
    if (!TURNSTILE_SITE_KEY || !window.turnstile || !turnstileRef.current || widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, { sitekey: TURNSTILE_SITE_KEY });
  }

  useEffect(() => {
    renderedAtRef.current = Date.now();
    renderTurnstile();
    return () => {
      if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current);
      widgetIdRef.current = undefined;
    };
  }, []);
  const { mutate, isPending, isSuccess, error } = useSubmitContactForm();
  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const invalid = (k: keyof ContactFormInput, id: string) =>
    fieldErrors[k] ? { "aria-invalid": true, "aria-describedby": `${id}-e` } : {};

  return (
    <div className={`ctk-panel ctk-glow${isSuccess ? " is-sent" : ""}`}>
      <p className="ctk-eyebrow">project enquiry</p>
      <h2 className="ctk-h3" style={{ margin: "16px 0 32px" }}>
        Get a quote
      </h2>

      {/* Always mounted, so the success message is announced when it appears (rules.md §34). */}
      <div aria-live="polite">
        {isSuccess && (
          <div className="ctk-done">
            <svg viewBox="0 0 72 72" aria-hidden="true">
              <circle cx="36" cy="36" r="34" />
              <path d="M23 37l9 9 18-20" />
            </svg>
            <h3 className="ctk-h3">Message received.</h3>
            <p className="ctk-p" style={{ marginTop: 12 }}>
              Thank you. We will reply within 24 hours, Monday to Saturday.
            </p>
          </div>
        )}
      </div>

      <form
        className="ctk-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const input = {
            name: String(formData.get("name") ?? ""),
            email: String(formData.get("email") ?? ""),
            projectType: String(formData.get("projectType") ?? ""),
            budget: String(formData.get("budget") ?? BUDGETS[BUDGETS.length - 1]),
            message: String(formData.get("message") ?? ""),
            company: String(formData.get("company") ?? ""),
            renderedAt: renderedAtRef.current,
            // Turnstile writes its token into this hidden input inside the widget.
            turnstileToken: String(formData.get("cf-turnstile-response") ?? ""),
          };
          const parsed = contactFormSchema.safeParse(input);
          if (!parsed.success) {
            const errors: Errors = {};
            for (const issue of parsed.error.issues) {
              const key = issue.path[0] as keyof ContactFormInput;
              errors[key] = issue.message;
            }
            setFieldErrors(errors);
            return;
          }
          setFieldErrors({});
          mutate(parsed.data, {
            // Each token is single-use, so a failed attempt needs a fresh one.
            onError: () => {
              if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
            },
          });
        }}
      >
        {/* Honeypot — hidden from real visitors via CSS, not just visually offscreen */}
        <div hidden aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <Field id="name" label="full_name" required error={fieldErrors.name}>
          <input
            className="ctk-input"
            id="name"
            name="name"
            autoComplete="name"
            required
            placeholder="Your name"
            {...invalid("name", "name")}
          />
        </Field>
        <Field id="email" label="email" required error={fieldErrors.email}>
          <input
            className="ctk-input"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@company.com"
            {...invalid("email", "email")}
          />
        </Field>
        <Field id="projectType" label="project_type" full>
          <div className="ctk-select">
            <select className="ctk-input" id="projectType" name="projectType" defaultValue={defaultProjectType}>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </Field>

        <fieldset className="ctk-field ctk-full">
          <legend>budget_usd</legend>
          <div className="ctk-opts" style={{ marginTop: 8 }}>
            {BUDGETS.map((b) => (
              <label key={b} className="ctk-opt">
                <input type="radio" name="budget" value={b} defaultChecked={b === BUDGETS[BUDGETS.length - 1]} />
                <span>{b}</span>
              </label>
            ))}
          </div>
          <p className="ctk-hint">Optional. Prefer to talk in PKR? Mention it in your message.</p>
        </fieldset>

        <Field id="message" label="project_details" required error={fieldErrors.message} full>
          <textarea
            className="ctk-input"
            id="message"
            name="message"
            required
            placeholder="What do you want to build? Links to examples or designs are welcome."
            {...invalid("message", "message")}
          />
        </Field>

        {TURNSTILE_SITE_KEY && (
          <div className="ctk-full">
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
              strategy="lazyOnload"
              onReady={renderTurnstile}
            />
            <div ref={turnstileRef} />
          </div>
        )}

        {error && (
          <p role="alert" className="ctk-full" style={{ color: "var(--danger)", fontSize: 14 }}>
            {error.message}
          </p>
        )}

        <div className="ctk-full ctk-form__foot">
          <p className="ctk-meta">
            By sending this form you agree to our <Link href="/privacy">Privacy Policy</Link> and{" "}
            <Link href="/terms">Terms of Use</Link>.
          </p>
          <span className="ctk-mag" data-magnetic>
            <button className="ctk-btn ctk-btn--primary" type="submit" disabled={isPending}>
              {isPending ? "Sending…" : "Send Message"}
              <Icon name="arrow" />
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}
