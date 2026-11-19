# Keyword map — codtk.com

One primary intent per page, so no two pages compete for the same query. **No search volumes are listed**: none were measured, and the brief forbids unverified numbers. Validate priorities in Google Search Console after ~4 weeks of data (Queries report), then adjust titles here and in code.

Where titles and descriptions live: `lib/seo.ts#pageMetadata` callers in each `app/**/page.tsx`; service pages read `lib/service-seo.ts`; Home uses `SITE_TITLE` / `SITE_DESCRIPTION` in `lib/seo.ts`.

## Core pages

| Page | Primary keyword | Intent | Title (chars) | H1 |
|---|---|---|---|---|
| `/` | software company in Lahore (brand + local) | Navigational / commercial | CodTK \| Building Next Generation Software (41) | Building next generation software |
| `/services` | software development services (pillar) | Commercial | Software Development Services \| CodTK (37) | Engineering capability, end to end. |
| `/about` | CodTK, software house Lahore | Navigational / trust | About CodTK \| Software & Digital Growth Partner (47) | A focused team, engineering with discipline. |
| `/process` | software development process | Informational / trust | Our Software Development Process \| CodTK (40) | A delivery process built for predictable outcomes. |
| `/portfolio` | software case studies | Trust | Portfolio & Case Studies \| CodTK (32) | Selected work. |
| `/portfolio/mindmesh` | MindMesh (project name) | Navigational | MindMesh — AI-powered SaaS platform for agile teams — CodTK (59) | MindMesh |
| `/tech-stack` | MERN / Next.js development stack | Informational | Technologies We Use \| CodTK (27) | Tech Stack |
| `/contact` | contact CodTK, get a quote | Transactional | Contact CodTK \| Get a Fixed Quote (33) | Let's talk about your project. |
| `/faq` | software development questions (see Phase 7) | Informational | see `app/faq/page.tsx` | — |

Home deliberately keeps the founder's title from the 19 Nov brief. The local terms ("software company Lahore", "software house Lahore") are carried by the Home description, the Organization/ProfessionalService JSON-LD (Lahore, PK) and the About page.

## Service pages (topic cluster under `/services`)

| URL | Primary keyword | Intent | Title (chars) |
|---|---|---|---|
| `/services/web-development` | web development company Lahore | Commercial, local | Web Development Company in Lahore \| CodTK (41) |
| `/services/mobile-app-development` | mobile app development company | Commercial | Mobile App Development (Android & iOS) \| CodTK (46) |
| `/services/saas-development` | SaaS development company | Commercial | SaaS Development Company \| CodTK (32) |
| `/services/custom-erp-development` | custom ERP development | Commercial | Custom ERP Development \| CodTK (30) |
| `/services/backend-api-development` | backend API development | Commercial | Backend & API Development \| CodTK (33) |
| `/services/wordpress-development` | WordPress website development | Commercial | WordPress Website Development \| CodTK (37) |
| `/services/seo` | SEO services | Commercial | SEO Services for Growing Businesses \| CodTK (43) |
| `/services/performance-marketing` | performance marketing agency | Commercial | Performance Marketing & Paid Ads \| CodTK (40) |
| `/services/digital-transformation` | digital transformation for small business | Commercial / informational | Digital Transformation for Businesses \| CodTK (45) |
| `/services/ai-automation` | AI business automation | Commercial | AI & Business Automation \| CodTK (32) |
| `/services/cloud-devops` | cloud and DevOps services | Commercial | Cloud & DevOps Services \| CodTK (31) |
| `/services/software-consulting` | software consulting | Commercial | Software Consulting & Technical Planning \| CodTK (48) |

Every service page: H1 = the service title, intro = the service's existing description, then Who it's for, What's included (existing deliverables + tech), How we work, FAQ (2 service-specific + cost + ownership), Related services in the same group, CTA. Linked from the home service cards, the Services page block titles and the footer.

## Cannibalisation guard

- "custom software development company" → `/services` only (pillar). Service pages target their own service term.
- "web development company Lahore" → `/services/web-development` only; Home targets the broader "software company in Lahore".
- "SEO services" → `/services/seo` only. Don't reuse it in another page's title.
- New articles (future blog, out of scope in v2) must target informational queries not listed above.

## Informational questions (AEO) — answered on `/faq` and service pages

| Question | Where it is answered |
|---|---|
| What is an ERP system / custom ERP vs off-the-shelf? | `/services/custom-erp-development` FAQ |
| How much does an app / website / ERP cost? | Every service page FAQ + Home FAQ (fixed quote after discovery; no prices) |
| How to take a business online? | `/services/digital-transformation` FAQ |
| Do I own the source code? | Every service page FAQ + Why CodTK |
