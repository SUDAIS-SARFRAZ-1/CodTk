# Product Requirements Document — v2.0
## CodTK — Corporate Website
*Building Next Generation Software*

| | |
|---|---|
| **Owner and approver** | Sudais Sarfraz, Founder (sole approver) |
| **Version** | 2.0 |
| **Date** | October 18, 2026 |
| **Status** | Approved for build. Decisions come from `prd-questions.md` (all 55 answered) |
| **Replaces** | `prd.md` v1.2 (AptiScript Technologies) and `prd-v2-draft.md` |

> Items marked **(pending input)** are decided but wait on something only the founder can supply, such as a URL. Items marked **(assumed)** are defaults Claude picked where an answer was ambiguous; change them by editing this file.

---

## 1. Product summary

A public marketing and lead-generation website for **CodTK** (codtk.com), a new software company in Lahore, Pakistan. The site has two jobs:

1. Make a first-time visitor believe CodTK is a real, competent company.
2. Turn that belief into a lead: a quote request, a booked call or a WhatsApp message.

It also serves as a live demo of the team's work, so it must be fast, accessible and well built.

**What it is not:** a client portal, a store, a blog/CMS or an app with accounts.

**Honesty rule.** CodTK is newly started. The site never publishes a headcount, client logos, testimonials, awards or stats that aren't true. Sections that need such proof stay hidden until real proof exists.

## 2. Positioning

- **Market:** Pakistan first, international (US/UK/EU/Gulf) second.
- **Audience, in priority order:** startup founders (MVPs), SMBs and local businesses, then enterprises/agencies later (once registered and with client work), recruiters/partners as secondary.
- **Why CodTK (hero and "Why CodTK" copy):** "Work directly with the engineers who build your product: clear scope, honest timelines and modern code, from a Lahore team that answers fast."
- **Response promise:** reply within 24 hours, Monday to Saturday (PKT).
- **Target keywords:** "software company Lahore", "software house Lahore", "custom software development Pakistan", "MERN stack development agency".
- **Reference sites:** Devsinc, Systems Limited, NetSol. Borrow their structure (one clear hero promise with one primary CTA, services grid, case-study cards, closing CTA banner). Do not copy their stats walls, logo and award grids, or heavy "AI-native" wording. CodTK's angle is small, direct and honest.

## 3. Company facts (source of truth for copy)

| Item | Value |
|---|---|
| Name | CodTK (plain "CodTK" everywhere; no "AptiScript" anywhere) |
| Domain | codtk.com, bought from Hostinger; to be connected to Vercel |
| Email | codtk.official@gmail.com (no domain mailbox for now) |
| Phone / WhatsApp | +92 301 9492010 (same number; tap-to-call and WhatsApp link) |
| Location | "Lahore, Pakistan" only. No street address |
| Registration | Not registered. No SECP/NTN shown |
| Founder | Sudais Sarfraz, Software Engineering graduate, University of Central Punjab (UCP), 2026. No photo. Links to portfolio, LinkedIn, GitHub **(pending input: URLs)** |
| Team | Presented as "the CodTK team", grouped by function (frontend, backend, DevOps). No headcount, no individual profiles, no photos |
| Social | LinkedIn, Instagram, Facebook, X **(pending input: URLs)**. Icons hidden until provided |
| Certifications, awards, past employers | None to show |

## 4. Goals and KPIs

| # | Goal | Measured by | Target |
|---|---|---|---|
| G1 | Credibility | Bounce rate, time on About/Portfolio (Vercel Analytics) | Baseline in first 30 days |
| G2 | Lead generation | Form submissions + WhatsApp clicks + Calendly bookings per month | 5 qualified leads/month within 90 days of launch; 10/month by month 6 (starting targets, revisit quarterly) |
| G3 | Findability | Search Console impressions and rankings for the target keywords; Google Business Profile views | Indexed on all pages within 2 weeks of launch |
| G4 | Proof of quality | Lighthouse (mobile profile) Performance, Accessibility, Best Practices and SEO each 90+; LCP under 2.5s | Home and Services at launch, all pages by Phase 2 |

## 5. Scope

### 5.1 In scope (v2)
Pages: Home, Services, Tech Stack, Portfolio (with case-study detail pages), About, Process, Contact, Privacy Policy, Terms of Use, and a custom 404.
Plus: hardened contact form with lead storage and notifications, WhatsApp CTA on every page, Calendly booking, SEO basics and structured data, Vercel Analytics, Google Search Console and Google Business Profile.

### 5.2 Out of scope (v2)
Blog/CMS, careers page, client portal or login, Urdu/multi-language, online payments or invoicing.

## 6. Pages and requirements

### 6.1 Home (built on the CodTK design system)
Hero (logo monolith, the "Why CodTK" line, primary CTA "Get a Quote", secondary "Book a Call") → service stack → tech strip → process scrolly → Why CodTK → featured work (MindMesh only) → team line ("Built by the CodTK team in Lahore", no number) → trust strip (24-hour reply, Mon–Sat; client IP ownership; NDA on every project) → CTA banner → footer.
Hidden until real: "Trusted by" logo strip, testimonials, stats.

### 6.2 Services
Featured six: Web, Mobile (Android and iOS via cross-platform, **assumed**), Backend & API, Cloud & DevOps, Automation, Consulting. UI/UX is part of every project, not a separate service (**assumed**).
- Each card: description, representative tech, deliverables, CTA that opens the quote form with that service pre-filled (FR-3).
- A seventh card, "Something else? Tell us", opens the form with "Other" selected. CodTK takes any kind of development.
- No prices. Every service ends in "Get a Quote".
- No fixed timelines or minimum size: "Timeline and cost depend on scope; we confirm both before work starts."
- Post-launch support and maintenance is offered and mentioned on this page and in Process.

### 6.3 Tech Stack
Keep the current list as it is in the repo (v1.2 list plus TypeScript, Python, Kotlin, Expo, Firebase, AWS, PWA), grouped as a logo/pill grid.

### 6.4 Portfolio
- Case-study format: problem, solution, features, tech, outcome, links.
- **MindMesh** (BSSE capstone, labelled "founder project"): repo link; no live demo yet.
- **Organic Store:** hidden for now (**assumed** from "just MindMesh for now"). It has a live site and can be re-enabled as a founder project with its URL.
- Client work is shown only with the client's written permission. Otherwise it is left out.
- More projects will be added later by the founder.

### 6.5 About
Company story (new Lahore software company), mission, team by function, and a minimal founder line: name, role, "Software Engineering, UCP (2026)", and icon links to portfolio, LinkedIn and GitHub. The founder is not featured at the top of any page.

### 6.6 Process
Discovery → Design → Development → Deployment → Support, with the tooling used at each step.
Engagement model (FR-13):
- NDA/contract signed before every project (template to be created).
- Payment: milestones (e.g. 30/40/30) for fixed-scope work; monthly retainer for support and maintenance.
- Payment methods: JazzCash, Easypaisa, Payoneer.
- The client owns the code and IP after full payment.

### 6.7 Contact
- Form fields: name, email, project type (services + Other), optional budget range, message. No file upload; visitors can paste links.
- WhatsApp link and tap-to-call for +92 301 9492010, email, Calendly booking link **(pending input: URL)**, "Lahore, Pakistan", reply promise, Privacy/Terms links.

### 6.8 Privacy Policy and Terms of Use
Claude drafts both from a template for founder review. They cover Pakistani law and international clients (GDPR). The Privacy Policy must name every processor of visitor data: Resend (email), Google Sheets (lead storage), Slack (notifications, if enabled), Cloudflare Turnstile (spam check), Vercel Analytics (cookieless), Calendly (booking).

### 6.9 Footer
Navigation, email, WhatsApp, phone, "Lahore, Pakistan", social icons (hidden until URLs), Privacy/Terms links, © CodTK. No registration number.

### 6.10 404
Branded page with a short message and "Get a Quote" and "Go home" CTAs.

## 7. Lead flow

1. Visitor submits the form. Cloudflare Turnstile token is verified server-side.
2. Zod validates and sanitises input; honeypot and time-trap stay.
3. Resend sends the lead to codtk.official@gmail.com from an @codtk.com sender.
4. Resend sends the visitor an auto-reply ("we got your message; we reply within 24 hours, Mon–Sat").
5. The lead is appended to a Google Sheet (name, email, type, budget, message, timestamp).
6. Optional: a Slack message to a CodTK channel for each new lead (**assumed** meaning of "Slack"; Could priority).

Steps 5 and 6 must never block or fail the submission: if they error, the email in step 3 is still the record. No personal data is written to logs.

## 8. Functional requirements

| ID | Requirement | Priority | Status |
|---|---|---|---|
| FR-1 | Contact form → codtk.official@gmail.com from a verified @codtk.com sender | Must | Sender read from `RESEND_FROM`; needs codtk.com verified in Resend, then set the env var |
| FR-2 | WhatsApp CTA on all pages | Must | Built |
| FR-3 | Service card → pre-filled quote form (incl. "Other") | Should | Verify |
| FR-4 | Case-study detail pages | Should | Built; MindMesh only (Organic Store hidden via `hidden` flag) |
| FR-5 | Responsive from 360 to 1920px | Must | Home done; other pages pending redesign |
| FR-6 | Meta, OG image (site-wide + per case study), sitemap, robots, canonical codtk.com | Must | Built: per-page title/description/canonical/OG, generated OG image, sitemap.xml, robots.txt |
| FR-7 | Social links, hidden until URLs exist | Could | Pending URLs |
| FR-8 | Vercel Analytics, plus Search Console and Google Business Profile | Should | Not set up |
| FR-9 | Privacy and Terms pages with final content | Must | Drafted Oct 20; founder review pending |
| FR-10 | Calendly link on Home and Contact | Should | Pending URL |
| FR-11 | SECP/NTN in footer | Won't (v2) | Not registered |
| FR-12 | Founder links (portfolio, LinkedIn, GitHub) on About | Should | Pending URLs |
| FR-13 | Engagement model stated on Process | Must | Built (§6.6 wording) |
| FR-14 | Cloudflare Turnstile on the form | Must | Built; needs Turnstile keys in Vercel env |
| FR-15 | Auto-reply email to the visitor | Should | Not built; needs FR-1 domain |
| FR-16 | Organization/LocalBusiness JSON-LD | Should | Not built |
| FR-17 | Custom 404 with CTAs | Should | Not built |
| FR-18 | Lead saved to Google Sheet | Should | Not built |
| FR-19 | Slack notification per lead | Could | Not built; confirm |
| FR-20 | Optional budget-range field | Should | Not built |
| FR-21 | Remove every "AptiScript" reference (docs, `package.json`, comments) | Must | Done in code and docs (historical PRD/question files keep the old name) |

## 9. Non-functional requirements
- **Performance:** LCP under 2.5s; Lighthouse 90+ (mobile) as in G4. Fonts loaded via `next/font` with subsetting; motion stays hand-written and lazy.
- **Accessibility:** WCAG 2.1 AA, including text contrast on glass surfaces; `prefers-reduced-motion` respected; no custom cursor or pinning on phones.
- **Security:** HTTPS, Turnstile, server-side Zod validation, sanitised email body, no logging of personal data, secrets only in env.
- **Browsers:** latest two versions of Chrome, Safari, Firefox and Edge; iOS Safari; Android Chrome.
- **SEO:** one `h1` per page, unique titles and descriptions, target keywords from §2.

## 10. Technical implementation
Next.js 16 App Router + TypeScript, Tailwind v4 with design tokens, TanStack Query (contact form only), Zod, Resend, Vercel hosting (owned by the founder, connected to GitHub). No database; the Google Sheet is the lead store.
- **Motion:** hand-written, no Framer Motion or GSAP.
- **Spam:** Cloudflare Turnstile.
- **Tests:** Vitest for form validation; one Playwright end-to-end test of the contact form.
- **CI/CD:** used. `instructions.md` is correct; update `rules.md` §44/§48 to match. Lint, typecheck, tests and build must pass before deploy.

## 11. Launch plan

Launch date: **October 20, 2026**. That is two days after this PRD, so launch is split into two phases.

### Phase 1: launch on Oct 20 (Must items only)
| Task | Owner |
|---|---|
| Connect codtk.com to Vercel | Founder |
| Verify codtk.com in Resend (add its DNS records in Hostinger) | Founder |
| Switch the form to the @codtk.com sender; send a test lead | Claude |
| Add Turnstile (FR-14) | Claude |
| Draft Privacy and Terms (FR-9); founder reviews | Claude, Founder |
| Remove "AptiScript" everywhere (FR-21) | Claude (needs repo access) |
| Reduce portfolio to MindMesh | Claude |
| Meta, sitemap, robots, canonical (FR-6) | Claude |

### Phase 2: after launch
Remaining page redesigns in this order: Services → Portfolio → About → Process → Tech Stack → Contact → Legal. Plus auto-reply, Google Sheet, budget field, Calendly, JSON-LD, 404, analytics, Search Console, Google Business Profile, tests, Slack (if confirmed), QA at 360/768/1280/1440/1920 and Lighthouse.

## 12. Inputs still needed from the founder
- Social URLs (LinkedIn, Instagram, Facebook, X).
- Founder portfolio, LinkedIn and GitHub URLs.
- Calendly link.
- Confirm Slack lead notifications (yes/no) and the channel.
- Confirm whether Organic Store goes back on the Portfolio, with its URL.
- NDA/contract template (Claude can draft one on request).
- GitHub repo renamed, and the repo attached to the Claude project for code work.

## 13. Risks
| Risk | Mitigation |
|---|---|
| Oct 20 launch is two days away | Phase 1 is limited to Must items; everything else ships after |
| Leads lost while the form uses the Resend sandbox sender | Verify codtk.com before launch and send a test lead |
| A new company with one project looks thin | Honest "founder project" label, strong process and engagement-model copy, add work as it ships |
| Gmail address weakens B2B credibility | Accepted for now; revisit a domain mailbox when targeting enterprises |
| No business registration limits enterprise deals | Target startups and SMBs first; register (FBR NTN via IRIS, or SECP) before pursuing enterprises |
| Spam floods the form | Turnstile (FR-14) |
| Google Sheet or Slack outage | Never blocks submission; email remains the record |
| All content depends on the founder's time | Inputs list in §12; site launches with placeholders hidden |

## 14. Revision history
| Version | Date | Summary |
|---|---|---|
| 1.0–1.2 | Sep 2026 | AptiScript PRD |
| 2.0-draft | Oct 18, 2026 | Rebrand to CodTK, design system, build status, open questions |
| 2.0 | Oct 18, 2026 | All 55 questions answered; positioning, lead flow, phased launch for Oct 20 |
