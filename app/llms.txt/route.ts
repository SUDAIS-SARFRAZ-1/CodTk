import { BUSINESS_EMAIL, LOCATION, ONE_LINER, REACH, SOCIAL_LINKS, WHATSAPP_LINK, WHATSAPP_NUMBER_DISPLAY } from "@/lib/contact";
import { PROCESS_STEPS } from "@/lib/process";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/seo";
import { SERVICE_GROUPS, SERVICE_OFFERINGS } from "@/lib/service-offerings";
import { SERVICE_SEO, serviceHref } from "@/lib/service-seo";
import { SERVICE_LINES } from "@/lib/services";

// /llms.txt (llmstxt.org): a plain-text map of CodTK for AI assistants, built from the same data as
// the site so it never drifts. Helps; doesn't guarantee citations. Rendered once at build time.
export const dynamic = "force-static";

export function GET() {
  const url = (path: string) => `${SITE_URL}${path}`;
  const lines = [
    "# CodTK",
    "",
    `> ${ONE_LINER} Building Next Generation Software: web, mobile, ERP, AI, cloud & digital growth.`,
    "",
    `- Location: ${LOCATION} · ${REACH}. Time zone PKT (UTC+5).`,
    "- Founded: 2026.",
    `- Contact: ${BUSINESS_EMAIL} · WhatsApp/phone ${WHATSAPP_NUMBER_DISPLAY} (${WHATSAPP_LINK}). Replies within 24 hours, Monday to Saturday.`,
    "- Working terms: fixed quotes after discovery, milestone payments, contract and NDA before work begins, the client owns the source code and IP after payment, one month of free bug fixes after launch.",
    "",
    "## Services",
    ...SERVICE_GROUPS.flatMap((g) => [
      "",
      `### ${g}`,
      ...SERVICE_OFFERINGS.filter((s) => s.group === g).map((s) => `- [${s.title}](${url(serviceHref(s.id))}): ${SERVICE_LINES[s.id]} ${SERVICE_SEO[s.id].audience}`),
    ]),
    "",
    "## How we work",
    ...PROCESS_STEPS.map((p, i) => `${i + 1}. ${p.title}: ${p.description}`),
    "",
    "## Work",
    ...PROJECTS.map((p) => `- [${p.title}](${url(`/portfolio/${p.slug}`)}) (${p.label}): ${p.summary}`),
    "",
    "## Key pages",
    `- [Services](${url("/services")})`,
    `- [About](${url("/about")})`,
    `- [Process](${url("/process")})`,
    `- [FAQ](${url("/faq")})`,
    `- [Contact / get a quote](${url("/contact")})`,
    "",
    "## Profiles",
    ...SOCIAL_LINKS.filter((s) => s.url).map((s) => `- ${s.name}: ${s.url}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
