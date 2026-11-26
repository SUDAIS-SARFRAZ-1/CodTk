# Keyword map — codtk.com

One primary intent per page, so no two pages compete for the same query. **No search volumes are listed**: none were measured, and the brief forbids unverified numbers. Validate priorities in Google Search Console after ~4 weeks of data (Queries report), then adjust titles here and in code.

Where titles and descriptions live: `lib/seo.ts#pageMetadata` callers in each `app/**/page.tsx`; service pages read `lib/service-seo.ts`; Home sets `HOME_TITLE` / `HOME_DESCRIPTION` in `app/page.tsx`.

## Core pages

| Page | Primary keyword | Intent | Title (chars) | H1 |
|---|---|---|---|---|
| `/` | software development company Lahore | Commercial, local | Software Development Company in Lahore \| CodTK (46) | Software that grows your business. (keyword in the hero's first sentence) |
| `/services` | software development services (pillar) | Commercial | Software Development Services \| CodTK (37) | Engineering capability, end to end. |
| `/about` | CodTK, software house Lahore | Navigational / trust | About CodTK \| Software & Digital Growth Partner (47) | A focused team, engineering with discipline. |
| `/process` | software development process | Informational / trust | Our Software Development Process \| CodTK (40) | A delivery process built for predictable outcomes. |
| `/portfolio` | software case studies | Trust | Portfolio & Case Studies \| CodTK (32) | Selected work. |
| `/portfolio/mindmesh` | MindMesh (project name) | Navigational | MindMesh — AI-powered SaaS platform for agile teams — CodTK (59) | MindMesh |
| `/tech-stack` | MERN / Next.js development stack | Informational | Technologies We Use \| CodTK (27) | Tech Stack |
| `/contact` | contact CodTK, get a quote | Transactional | Contact CodTK \| Get a Fixed Quote (33) | Let's talk about your project. |
| `/faq` | questions about hiring a software company | Informational | FAQ: Working With a Software Company \| CodTK (44) | Frequently asked questions. |

Home's H1 stays the brand line; the keyword is in the title, description and the hero's first sentence (SEO pass, 2026-11-27).

## Service pages (topic cluster under `/services`)

| URL | Primary keyword | Intent | Title (chars) |
|---|---|---|---|
| `/services/web-development` | custom web development | Commercial | Custom Web Development in Lahore \| CodTK (40) |
| `/services/mobile-app-development` | mobile app development company | Commercial | Mobile App Development Company \| CodTK (38) |
| `/services/saas-development` | SaaS development company | Commercial | SaaS Development Company \| CodTK (32) |
| `/services/custom-erp-development` | custom ERP development | Commercial | Custom ERP Development \| CodTK (30) |
| `/services/backend-api-development` | backend and API development | Commercial | Backend and API Development \| CodTK (35) |
| `/services/wordpress-development` | WordPress development | Commercial | WordPress Development \| CodTK (29) |
| `/services/seo` | SEO services for small business | Commercial | SEO Services for Small Business \| CodTK (39) |
| `/services/performance-marketing` | performance marketing agency | Commercial | Performance Marketing Agency \| CodTK (36) |
| `/services/digital-transformation` | take business online | Commercial | Take Your Business Online \| CodTK (33) |
| `/services/ai-automation` | AI automation for business | Commercial | AI Automation for Business \| CodTK (34) |
| `/services/cloud-devops` | DevOps and cloud services | Commercial | DevOps and Cloud Services \| CodTK (33) |
| `/services/software-consulting` | software consulting | Commercial | Software Consulting & Technical Planning \| CodTK (48) |

Every service page: H1 = the keyword in plain words (`h1` in `lib/service-seo.ts`; the breadcrumb, cards, footer and form keep the service's plain name), intro = the service's existing description, then Who it's for, What's included (existing deliverables + tech), How we work, FAQ (2 service-specific + cost + ownership), Related services in the same group, CTA. Linked from the home service cards, the Services page block titles and the footer.

## Cannibalisation guard

- "custom software development company" → `/services` only (pillar). Service pages target their own service term.
- "software development company Lahore" → Home only; `/services/web-development` targets "custom web development".
- "SEO services" → `/services/seo` only. Don't reuse it in another page's title.
- New articles (future blog, out of scope in v2) must target informational queries not listed above.

## Informational questions (AEO) — answered on `/faq` and service pages

| Question | Where it is answered |
|---|---|
| What is an ERP system / custom ERP vs off-the-shelf? | `/services/custom-erp-development` FAQ |
| How much does an app / website / ERP cost? | Every service page FAQ + Home FAQ (fixed quote after discovery; no prices) |
| How to take a business online? | `/services/digital-transformation` FAQ |
| Do I own the source code? | Every service page FAQ + Why CodTK |
