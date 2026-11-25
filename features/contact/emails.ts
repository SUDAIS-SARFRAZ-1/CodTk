import type { ContactFormInput } from "@/features/contact/schema";
import { WHATSAPP_LINK, WHATSAPP_NUMBER_DISPLAY } from "@/lib/contact";

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ESCAPES[c]);

type Lead = Pick<ContactFormInput, "name" | "email" | "projectType" | "budget" | "message">;

// Email clients need inline styles and can't read the site's tokens.
export function leadEmail({ name, email, projectType, budget, message }: Lead) {
  const rows = [
    ["Name", name],
    ["Email", email],
    ["Project type", projectType],
    ["Budget (USD)", budget],
  ];
  return {
    // A line break in a subject is rejected, which would lose the lead.
    subject: `New quote request: ${name.replace(/\s+/g, " ")}`,
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`,
    html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;color:#0b1220">
<div style="background:#000;padding:16px 20px;border-bottom:3px solid #0067fc;border-radius:10px 10px 0 0">
<span style="color:#fff;font-size:16px;font-weight:bold">New quote request</span>
<span style="color:#7cc0ff;font-size:12px;margin-left:8px">codtk.com/contact</span>
</div>
<table cellpadding="0" cellspacing="0" style="width:100%;border:1px solid #e3e8f0;border-top:0;font-size:14px">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:10px 16px;color:#5b6270;width:130px;border-bottom:1px solid #eef1f5">${k}</td><td style="padding:10px 16px;border-bottom:1px solid #eef1f5;font-weight:bold">${esc(v)}</td></tr>`,
  )
  .join("\n")}
<tr><td colspan="2" style="padding:14px 16px;white-space:pre-wrap;line-height:1.5">${esc(message)}</td></tr>
</table>
<p style="font-size:12px;color:#5b6270">Hit reply to answer ${esc(name)} directly.</p>
</div>`,
  };
}

export function confirmationEmail(name: string) {
  // The address is unverified, so only a plain first name is echoed: anything else (a link, say) would let
  // a stranger put their own words in an email from codtk.com.
  const first = name.split(/\s/)[0];
  const hello = /^[\p{L}\p{M}'’-]{1,40}$/u.test(first) ? `Hi ${first},` : "Hi,";
  const thanks =
    "Thanks for reaching out to CodTK. We've received your project details and an engineer will reply within 24 hours, Monday to Saturday (Pakistan time), with questions, an approach and a quote.";
  const link = 'style="color:#0052cc"';
  return {
    subject: "We got your project details | CodTK",
    text: `${hello}\n\n${thanks}\n\nIf it's urgent, message us on WhatsApp: ${WHATSAPP_NUMBER_DISPLAY}\n\nThe CodTK team\nhttps://codtk.com`,
    html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;color:#0b1220;font-size:14px;line-height:1.6">
<p>${esc(hello)}</p>
<p>${thanks}</p>
<p>If it's urgent, message us on <a href="${WHATSAPP_LINK}" ${link}>WhatsApp</a>.</p>
<p>The CodTK team<br><a href="https://codtk.com" ${link}>codtk.com</a></p>
</div>`,
  };
}
