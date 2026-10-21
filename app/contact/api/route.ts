import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/features/contact/schema";
import { BUSINESS_EMAIL } from "@/lib/contact";

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

  const { name, email, projectType, budget, message, company, renderedAt, turnstileToken } = parsed.data;

  // Honeypot: real visitors never fill this hidden field.
  if (company) {
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
    return errorResponse(500, "EMAIL_NOT_CONFIGURED", "Email delivery isn't set up yet.");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    // RESEND_FROM is an @codtk.com address once codtk.com is verified in Resend;
    // until then, Resend's sandbox sender (which only delivers to the account owner).
    from: process.env.RESEND_FROM ?? "CodTK Website <onboarding@resend.dev>",
    to: BUSINESS_EMAIL,
    replyTo: email,
    subject: `New quote request: ${projectType}`,
    text: `From: ${name} <${email}>\nProject type: ${projectType}\nBudget: ${budget}\n\n${message}`,
  });

  if (error) {
    console.error("Resend send failed:", error);
    return errorResponse(502, "EMAIL_SEND_FAILED", "Couldn't send your message. Please try again.");
  }

  return NextResponse.json({ ok: true });
}
