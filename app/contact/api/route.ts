import { after, NextResponse } from "next/server";
import { Resend } from "resend";
import { confirmationEmail, leadEmail } from "@/features/contact/emails";
import { contactFormSchema } from "@/features/contact/schema";
import { BUSINESS_EMAIL, LEAD_EMAIL, WHATSAPP_NUMBER_DISPLAY } from "@/lib/contact";

// Best-effort in-memory rate limit — resets on cold start and isn't shared
// across serverless instances. Turnstile below is the main bot defence (rules.md §7).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionsByIp = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = submissionsByIp.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    submissionsByIp.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// Verified only when TURNSTILE_SECRET_KEY is set, so local dev works without keys.
// Once set, a missing, invalid or unverifiable token is rejected (fails closed).
async function isHuman(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  }).catch(() => null);
  if (!res?.ok) return false;
  const result = (await res.json().catch(() => null)) as { success?: boolean } | null;
  return result?.success === true;
}

// Gives the visitor another way through, so a delivery problem doesn't lose the lead.
const SEND_FAILED = `We couldn't send your message. Please email ${BUSINESS_EMAIL} or WhatsApp ${WHATSAPP_NUMBER_DISPLAY}.`;

// codtk.com must be verified in Resend for these senders to work.
const LEAD_FROM = "CodTK Website <website@codtk.com>";
const CONFIRM_FROM = `CodTK <${LEAD_EMAIL}>`;

function errorResponse(status: number, code: string, message: string) {
  return NextResponse.json({ error: { code, message } }, { status });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return errorResponse(429, "RATE_LIMITED", "Too many submissions. Please try again later.");
  }

  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(400, "INVALID_INPUT", "Please check the form and try again.");
  }

  const { name, email, website, renderedAt, turnstileToken } = parsed.data;

  // Honeypot: real visitors never fill this hidden field.
  if (website) {
    return NextResponse.json({ ok: true }); // pretend success, don't tip off the bot
  }

  // Time-trap: a submission faster than ~2s after the form rendered is
  // almost certainly scripted, not a human filling out four fields.
  if (Date.now() - renderedAt < 2000) {
    return errorResponse(400, "TOO_FAST", "Please try submitting again.");
  }

  if (!(await isHuman(turnstileToken, ip))) {
    return errorResponse(400, "CAPTCHA_FAILED", "We couldn't verify you're human. Please try again.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send email.");
    return errorResponse(500, "EMAIL_NOT_CONFIGURED", SEND_FAILED);
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: LEAD_FROM,
    to: LEAD_EMAIL,
    replyTo: email,
    ...leadEmail(parsed.data),
  });

  if (error) {
    console.error("Resend send failed:", error);
    return errorResponse(502, "EMAIL_SEND_FAILED", SEND_FAILED);
  }

  // Runs after the response, so it can't delay or fail the lead. Only with Turnstile on: without it, a bot
  // could use this form to send email from codtk.com to any address.
  if (process.env.TURNSTILE_SECRET_KEY) {
    after(async () => {
      const { error: confirmError } = await resend.emails.send({
        from: CONFIRM_FROM,
        to: email,
        replyTo: LEAD_EMAIL,
        headers: { "Auto-Submitted": "auto-replied" },
        ...confirmationEmail(name),
      });
      if (confirmError) console.error("Confirmation email failed:", confirmError.name);
    });
  }

  return NextResponse.json({ ok: true });
}
