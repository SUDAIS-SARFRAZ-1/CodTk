import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/features/contact/schema";
import { BUSINESS_EMAIL } from "@/lib/contact";

// Best-effort in-memory rate limit — resets on cold start and isn't shared
// across serverless instances. A real fix (Upstash/Vercel KV, or a CAPTCHA
// vendor like Cloudflare Turnstile) is still pending a decision (rules.md §7).
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

  const { name, email, projectType, message, company, renderedAt } = parsed.data;

  // Honeypot: real visitors never fill this hidden field.
  if (company) {
    return NextResponse.json({ ok: true }); // pretend success, don't tip off the bot
  }

  // Time-trap: a submission faster than ~2s after the form rendered is
  // almost certainly scripted, not a human filling out four fields.
  if (Date.now() - renderedAt < 2000) {
    return errorResponse(400, "TOO_FAST", "Please try submitting again.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send email.");
    return errorResponse(500, "EMAIL_NOT_CONFIGURED", "Email delivery isn't set up yet.");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    // Sending from Resend's shared sandbox address until a custom domain is
    // verified in Resend — see README/instructions.md for the follow-up.
    from: "AptiScript Website <onboarding@resend.dev>",
    to: BUSINESS_EMAIL,
    replyTo: email,
    subject: `New quote request: ${projectType}`,
    text: `From: ${name} <${email}>\nProject type: ${projectType}\n\n${message}`,
  });

  if (error) {
    console.error("Resend send failed:", error);
    return errorResponse(502, "EMAIL_SEND_FAILED", "Couldn't send your message. Please try again.");
  }

  return NextResponse.json({ ok: true });
}
