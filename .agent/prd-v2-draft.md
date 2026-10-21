# Product Requirements Document — DRAFT v2.0
## CodTK — Corporate Website
*Building Next Generation Software*

| | |
|---|---|
| **Owner** | Sudais Sarfraz, Founder (see Q-1.3) |
| **Version** | 2.0-draft |
| **Date** | October 18, 2026 |
| **Status** | Draft. Becomes final once every open question in `prd-questions.md` is answered |
| **Replaces** | `prd.md` v1.2 (AptiScript Technologies) |

> **How to read this draft.** Anything already confirmed in the repo or by the founder is stated as fact. Anything still open is tagged **[Q-x.y]**, and that tag points to a question in `prd-questions.md`. Once all questions are answered, this file replaces `prd.md`, and the tags turn into decisions.

---

## 1. Product summary

A public marketing and lead-generation website for **CodTK** (codtk.com), a software house in Lahore, Pakistan. The site has two jobs:

1. Make a first-time visitor believe CodTK is a real, competent company.
2. Turn that belief into a lead: a quote request, a booked call or a WhatsApp message.

It also serves as a live demo of the team's work. It must be fast, accessible and well built.

**What it is not:** a client portal, a store, a CMS or an app with accounts.

## 2. Background and what changed since v1.2

| Area | v1.2 said | Current reality (Oct 2026) |
|---|---|---|
| Company name | AptiScript Technologies | **CodTK** (plain "CodTK" everywhere), domain codtk.com |
| Business email | aptiscripttechnologies@gmail.com | **codtk.official@gmail.com** |
| Brand | Not defined | CodTK logo (raster, `public/brand/`). Palette is black, white and logo blue. Fully dark, glassmorphism. CodTK Design System adopted (Instrument Serif/Sans, JetBrains Mono, full motion spec, static Blueprint grid background) |
| Team size | "10 members" | **Unverified [Q-2.1]**. The About page currently shows functions only, with "profiles coming soon" |
| Portfolio | MindMesh as a client-style flagship | MindMesh (BSSE capstone) and Organic Store, honestly labelled as **founder projects**, not client work |
| Workflow | GitHub Actions CI | Single-branch `main`, **no CI** (rules §44/§48). `instructions.md` still mentions CI, which conflicts **[Q-9.4]** |
| Contact form | Planned | Built: Zod validation, honeypot, time-trap, in-memory rate limit, Resend email from the sandbox sender |

## 3. Goals

| # | Goal | Measured by |
|---|---|---|
| G1 | Credibility: reads as a real, professional company | Bounce rate, time on About/Portfolio |
| G2 | Lead generation | Form submissions, WhatsApp clicks and booked calls per month **[Q-10.1]** |
| G3 | Findability | Rankings and impressions for target keywords **[Q-3.3]** |
| G4 | Proof of quality | Lighthouse 90+ and LCP under 2.5s on Home and Services |

## 4. Target audience

| Segment | Need | Status |
|---|---|---|
| Startup founders (MVPs) | Speed, transparency, fixed scope | Assumed primary |
| SMBs and local businesses | Reliability, clear pricing, local trust | Assumed |
| Enterprises and agencies (outsourcing) | Process, capacity, security, registration | Depends on team size and registration |
| Recruiters and partners | Portfolio, credentials | Secondary |

**Open:** primary market and segment priority **[Q-3.1, Q-3.2]**.

## 5. Scope

### 5.1 In scope (v2 launch)
- Pages: Home, Services, Tech Stack, Portfolio (and case-study detail pages), About/Team, Process, Contact, Privacy, Terms, plus a 404 page.
- Contact form with server-side validation, spam protection and email delivery.
- WhatsApp CTA on every page.
- Booking link **[Q-6.1]**.
- SEO basics: metadata, OG images, sitemap, robots and structured data (Organization / LocalBusiness) **[Q-8.3]**.
- Analytics **[Q-8.1]**.

### 5.2 Out of scope (v2)
Client login, payments or invoicing, blog/CMS, multi-language, careers page. **Confirm [Q-11.1]**.

## 6. Pages and requirements

### 6.1 Home (built on the CodTK design system)
Hero (logo monolith, tagline, "Get a Quote" and "Book a Call") → service stack → tech strip → process scrolly → Why CodTK → featured work **[Q-5.3]** → team/capacity line **[Q-2.1]** → trust strip (response-time commitment **[Q-4.4]**) → CTA banner → footer.

### 6.2 Services
Six services: Web, Mobile, Backend & API, Cloud & DevOps, Automation, Consulting. Each has a description, representative tech, deliverables and a CTA that opens the contact form with that service pre-filled (FR-3).
- Confirm the list, and whether iOS is offered **[Q-4.1]**.
- Pricing shown or not **[Q-4.2]**.
- Typical timelines and minimum engagement **[Q-4.3]**.

### 6.3 Tech Stack
Grouped logo/pill grid. The repo already has logos beyond the v1.2 list (TypeScript, Python, Kotlin, Expo, Firebase, AWS, PWA). **Confirm the final list, and that the team actually ships with each one [Q-4.5]**.

### 6.4 Portfolio
- Case-study format: problem, solution, features, tech, outcome, plus repo/demo links.
- Current entries: MindMesh (public repo), Organic Store (founder project).
- **Open:** more projects, client work under NDA, demo URLs, screenshots **[Q-5.1–5.4]**.

### 6.5 About / Team
- Company story, founder profile, team grouped by function, mission.
- Real photos linked to LinkedIn (FR-12), only for people who agree to be listed.
- **Open:** real headcount, who is listed, the founder bio and photo **[Q-2.1–2.5]**.

### 6.6 Process
Discovery → Design → Development → Deployment → Support, with the tooling used at each step.
Engagement model (FR-13): contract/NDA, payment structure and payment methods **[Q-7.1–7.4]**.

### 6.7 Contact
Form (name, email, project type, message), WhatsApp (+92 301 9492010), email, booking link, location (Lahore, Pakistan) and Privacy/Terms links.
- **Open:** phone number separate from WhatsApp, budget/timeline fields, file upload **[Q-6.2–6.4]**.

### 6.8 Privacy Policy and Terms of Use
Required by FR-9. **Open:** who writes or reviews them, and which law applies **[Q-7.5]**.

### 6.9 Footer (trust anchor)
Navigation, email, WhatsApp, phone, location, social icons (LinkedIn, Instagram, Facebook, X; hidden until URLs are provided **[Q-1.5]**), SECP/NTN **[Q-1.4]**, Privacy/Terms links and © CodTK.

## 7. Functional requirements

| ID | Requirement | Priority | Status |
|---|---|---|---|
| FR-1 | Contact form → business email | Must | Built, but uses the sandbox sender **[Q-9.2]** |
| FR-2 | WhatsApp CTA on all pages | Must | Built |
| FR-3 | Service → pre-filled quote form | Should | Verify |
| FR-4 | Case-study detail pages | Should | Built |
| FR-5 | Responsive from 360 to 1920px | Must | Home done; other pages pending redesign |
| FR-6 | Meta, OG, sitemap, robots | Must | Verify per page |
| FR-7 | Social links | Could | Waiting for URLs |
| FR-8 | Analytics | Should | **[Q-8.1]** |
| FR-9 | Privacy and Terms pages | Must | Pages exist; content to be confirmed |
| FR-10 | Booking link on Home and Contact | Should | **[Q-6.1]** |
| FR-11 | SECP/NTN in footer | Could | **[Q-1.4]** |
| FR-12 | Team linked to LinkedIn | Should | **[Q-2.2]** |
| FR-13 | Engagement model stated | Must | **[Q-7.x]** |
| FR-14 *(new)* | Spam protection: CAPTCHA and/or durable rate limit | Must | **[Q-9.1]**. The current in-memory limit isn't reliable on serverless |
| FR-15 *(new)* | Auto-reply confirmation email to the visitor | Could | **[Q-6.5]** |
| FR-16 *(new)* | Structured data (Organization/LocalBusiness JSON-LD) | Should | **[Q-8.3]** |
| FR-17 *(new)* | Custom 404 page with a CTA | Should | Not built |

## 8. Non-functional requirements
- **Performance:** LCP under 2.5s; Lighthouse 90+ on Home and Services. The motion system must not break this budget.
- **Accessibility:** WCAG 2.1 AA; `prefers-reduced-motion` respected; no custom cursor or pinning on phones.
- **Security:** HTTPS, server-side Zod validation, sanitised email body, no logging of personal data, secrets only in env.
- **Browsers:** latest two versions of Chrome, Safari, Firefox and Edge; iOS Safari; Android Chrome.
- **SEO:** one `h1` per page, unique titles and descriptions, keywords **[Q-3.3]**.

## 9. Technical implementation (current)
Next.js 16 App Router + TypeScript, Tailwind v4 with design tokens, TanStack Query (contact form only), Zod, Resend, Vercel hosting. No database. Motion has no library today, although Framer Motion/GSAP are allowed **[Q-9.5]**.
**Missing:** test runner and tests (rules §42/§43) **[Q-9.3]**, domain verification in Resend, a CAPTCHA vendor.

## 10. Timeline
Every date below is open **[Q-10.2]**.

| Milestone | Deliverable | Target |
|---|---|---|
| M1 | PRD v2 approved | |
| M2 | All content supplied (bios, photos, case studies, legal) | |
| M3 | Remaining pages rebuilt on the design system | |
| M4 | Form hardening, analytics, SEO, tests | |
| M5 | QA at 360/768/1280/1440, Lighthouse | |
| M6 | Launch on codtk.com | |

## 11. KPIs
Leads per month, form conversion rate, WhatsApp clicks, booked calls, keyword rankings, bounce rate. Numeric targets **[Q-10.1]**.

## 12. Risks
| Risk | Mitigation |
|---|---|
| Team-size claim can't be verified | State only what's true **[Q-2.1]** |
| Portfolio has no client work yet | Honest "founder project" labels; add client work as it ships |
| Stripe isn't available to Pakistan-registered businesses | Confirm the real payment methods **[Q-7.3]** |
| Spam floods the form | FR-14 |
| Emails from the Resend sandbox sender land in spam, or only reach the account owner | Verify codtk.com in Resend **[Q-9.2]** |
| Content depends on the founder's time | One content owner with a deadline **[Q-10.3]** |
| No CI on `main`, which auto-deploys to production | Run lint, typecheck and build locally; revisit if the team grows |

## 13. Revision history
| Version | Date | Summary |
|---|---|---|
| 1.0–1.2 | Sep 2026 | AptiScript PRD (see `prd.md`) |
| 2.0-draft | Oct 18, 2026 | Rebrand to CodTK, design system, current build status, open questions |
