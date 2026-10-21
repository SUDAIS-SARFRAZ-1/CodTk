---
trigger: always_on
---

# Project Instructions

> Version 3.0 — September 22, 2026. Replaces the previous e-commerce/3D instructions, which described an unrelated project. This version reflects the actual CodTK corporate website scope in `prd.md`.

## 1. What This Project Is
A public marketing website for CodTK — a brand-new software house that has no live web presence yet. Pages: Home, Services, Tech Stack, Portfolio, About/Team, Process, Contact (`prd.md` §6). There is no client login, no cart, no payment processing, and no CMS in v1 (`prd.md` §5.2).

The experience goal in one sentence: **it should read as a credible, established-feeling business from the first page load, and load fast enough to prove the team's own delivery quality.**

## 2. Tech Stack
| Layer | Choice | Notes |
|---|---|---|
| Frontend | Next.js (App Router, React, TypeScript) | `prd.md` §9 |
| Styling | Tailwind CSS with design tokens | Matches the team's core stack; also showcased on the Tech Stack page (§6.3) |
| Form/async state | TanStack Query (React Query) | Used narrowly — see `state-management.md`. Not needed for static content pages. |
| Contact-form backend | Next.js API route (preferred) or a small Node.js + Express endpoint if the team wants the API separated | `prd.md` §9 |
| Validation | Zod at the form-submission route boundary | |
| Database (optional) | PostgreSQL via Prisma + Supabase/Neon | Only if the team decides to store leads/inquiries in addition to (or instead of) email delivery — not required to launch v1 |
| Hosting | Vercel (frontend + API route) | `prd.md` §9 |
| CI/CD | GitHub Actions | Lint, type-check, build on every PR |
| Anti-spam | Cloudflare Turnstile or hCaptcha, plus rate limiting | NFR 8.3 |
| Analytics | Google Analytics or Plausible | FR-8 |

A substitution to this stack is a proposal, not a default — raise it explicitly before introducing a library that overlaps an existing choice (see `rules.md`, Dependency Management). This project does **not** need: a 3D/WebGL library, a cart/checkout system, a JWT auth system, or a full ORM-backed content model — those belong to a different kind of product than what `prd.md` scopes.

### 2a. Repository Layout (suggested)
If the repo already has an established layout that differs, the repo wins — raise the difference instead of creating a parallel structure.

```
app/
  page.tsx                 # Home
  services/page.tsx
  tech-stack/page.tsx
  portfolio/
    page.tsx
    [slug]/page.tsx         # case-study detail (FR-4)
  about/page.tsx
  process/page.tsx
  contact/
    page.tsx
    api/route.ts            # form submission handler (Zod validation, spam check, email send)
  privacy/page.tsx
  terms/page.tsx
  sitemap.ts
  robots.ts
components/
  ui/                       # design-system primitives (Button, Input, Card, Section)
  layout/                   # Header, Footer, Container, WhatsAppButton
  sections/                 # Hero, ServiceCard, TechStackGrid, TeamCard, ProcessTimeline
lib/
  email.ts                  # send-to-business-email integration
  validation.ts             # Zod schemas
  analytics.ts
content/                    # structured copy/case-study data, if not hardcoded per page
public/                     # images, logos, favicon
```

## 3. Architecture Rule: Keep It a Content Site
- The frontend's job: render content, collect the contact form input, call the form API route, show the result.
- The only real "backend logic" on this project is: validate the form input, run spam/rate-limit checks, send the email (and optionally write to a database), and return a clear success/error response.
- Don't build a general-purpose API, a data model beyond "a form submission," or an admin interface — none of that is in `prd.md` v1 scope.
- If a future requirement needs more (e.g. a blog/CMS, per `prd.md` §14), that's a new scoping conversation, not a quiet expansion of this project's architecture.

## 4. State Management Split
- **Static content (the vast majority of the site)** needs no state management at all — it's server-rendered/static.
- **React Query** → the contact form submission's request/loading/error/success lifecycle, and any other async client action added later (booking widget, newsletter signup).
- **Zustand or local state** → small UI-only concerns: mobile nav open/closed, WhatsApp CTA visibility on scroll, active FAQ item.
- Full patterns and examples: `state-management.md`.

## 5. Performance Requirements
| Metric | Budget |
|---|---|
| Initial page load (standard broadband) | ≤ 2.5s (NFR 8.1) |
| Lighthouse performance (Home, Services) | 90+ |
| Images | Responsive, compressed, modern formats, lazy-loaded below the fold |
| Initial JS bundle | Kept lean — no heavy client framework needed for a content site |

**How to hit them:** use `next/image` everywhere, prefer static generation/ISR over client-side rendering for content pages, load any third-party embed (booking widget, chat, analytics) after first paint, and don't reach for a client-state library on pages that don't need one.

## 6. Professional Design Baseline
- The site looks like an established, credible business: a restrained palette with one brand accent, generous whitespace, a clear type scale, real photography (team, not stock), and consistent components. No novelty fonts or stock-template feel (`prd.md` NFR 8.2).
- Trust is designed in deliberately — see `prd.md` §6.7 (Trust & Credibility Elements): real team photos linked to LinkedIn, a stated engagement model, business registration details in the footer once available, a booking link, and honest (not fabricated) portfolio/testimonial content.
- All visual values come from design tokens (Tailwind theme). No hardcoded one-off hex values or pixel sizes in components.

## 7. Security Baseline
- HTTPS enforced site-wide.
- The contact form is validated server-side regardless of client-side checks, and protected by rate limiting and/or CAPTCHA (NFR 8.3).
- No secret (email credentials, CAPTCHA keys, DB connection string if used) lives in committed code — see `rules.md`, Environment & Secrets.
- User-submitted content (form fields) is sanitized before use anywhere (email body, database, logs).

## 8. Testing Strategy
- Unit/integration test on the contact-form validation and spam-check logic.
- One end-to-end smoke test covering: land on Home → navigate to a Service → reach Contact → submit the form successfully.
- Tests run in CI on every PR; a failing test blocks merge.

## 9. Deployment & Environments
- Single-branch workflow (see `rules.md` §48): work happens directly on `main`, which is Vercel's Production Branch — every push deploys straight to production. No `develop`/staging branch, no CI pipeline, no required PRs. This is a deliberate simplification for this project's size and stage.
- Run lint, typecheck, and build locally before pushing (`rules.md` §44) — there's no CI to catch a broken build after the fact.
- Any service with a test/live key distinction (CAPTCHA, analytics, email provider) still uses live keys only, since there's no separate staging environment right now.

## 10. Accessibility & SEO Baseline
- WCAG 2.1 AA contrast, full keyboard navigability, semantic HTML (NFR 8.6).
- Every page has a unique title, meta description, and Open Graph tags (FR-6); `sitemap.xml` and `robots.txt` stay current.
- Target keywords from `prd.md` §8.4 inform copy naturally, not through keyword stuffing.

## 11. Documentation Expectations
- Setup instructions (env vars, how to run locally, how to deploy) stay current in the README — a change to setup ships in the same PR as the change that caused it.
- `prd.md` is the source of truth for scope; update it in the same PR as any scope decision.

## 12. Reference Order
When implementing a feature, check things in this order:
1. `prd.md` — does this feature exist, and what's the exact scope?
2. `rules.md` — is there a hard rule about how to write this?
3. This file (`instructions.md`) — does the stack, architecture, or performance/SEO/accessibility baseline constrain the approach?
4. `state-management.md` — detailed state-handling patterns.
5. Existing code in the repo — match established patterns before inventing new ones.
6. Ask, rather than guessing, if the above don't resolve it.
