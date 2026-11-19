# codtk.com — Launch report

**Branch:** `feat/launch-ready` (11 commits on top of `main` @ `814ffeb`). **Not merged, not pushed, not deployed** — waiting for the founder's approval.
**Date:** 2026-11-20. **Checks on the final commit:** lint ✅ · typecheck ✅ · 13 tests ✅ · production build ✅ (35 routes).

Constraints honoured throughout: existing visible wording unchanged (SEO additions only, per the founder), light motion only, no invented facts, no placeholder sections (the team block waits for real people).

---

## 1. What changed, by phase

| Phase | Commit | Summary |
|---|---|---|
| 0–1 Audit | `f2ebf96` | `docs/AUDIT.md`: stack map, live redirect/canonical checks, per-page on-page SEO, Lighthouse baseline (live), AEO/GEO readiness, 5-second test. |
| 2 Content | — | Already done on `main` (19 Nov): new phone, contact@, 12 grouped services, footer and social icons, About copy, tech strip. Only the team block remains (needs real people). |
| 3 Design pass | `339becb` | Prohibited ARIA on code lines fixed; 44 px touch targets (social icons, Call pill); trust-line dot no longer stranded on phones; balanced headline wrapping; fixed-width clock digits; WhatsApp button respects iPhone safe areas. |
| 4 Launch essentials | `e09c1aa` | `/thank-you` (noindex) + `generate_lead`; web manifest, 192/512 icons, theme colour; favicon 152 KB → 32 KB; cookie banner with equal Accept/Reject and GA4 Consent Mode v2; GA ID from env; Cloudflare added to the privacy processors; Vitest + 13 form-schema tests. |
| Security | `15d71af` | Next.js 16.3.6 → 16.4.6 (critical advisory), Zod 4.6.5 → 4.6.7 (memory exhaustion on oversized input — relevant to the contact endpoint). Production dependencies: **0 known vulnerabilities**. |
| 5 Technical SEO | `e4da52d` | Organization + ProfessionalService JSON-LD (logo, areaServed, contactPoint, knowsAbout, sameAs); BreadcrumbList on every inner page; robots.txt names 8 AI crawlers; truthful sitemap `lastmod`; Search Console / Bing verification via env; reveal animation no longer hides content already on screen. |
| 6 On-page / architecture | `fdbf2e8` | **12 service pages** `/services/<slug>` (existing copy + Who it's for, How we work, FAQ, related, CTA; Service/FAQPage/Breadcrumb JSON-LD), linked from home cards, Services page and footer; "Keyword \| CodTK" titles under 60 chars; descriptions 130–160 chars; `docs/KEYWORD_MAP.md`. |
| 7 AEO | `6324c7e` | `/faq` with 12 direct-answer questions + FAQPage JSON-LD; linked from the footer. |
| 8 GEO | `f7a689a` | `/llms.txt` generated from site data (services, process, work with its "founder project" label, contact, profiles). |
| 9 Measurement | `8cea13a` | Consent-gated GA4 events: `generate_lead`, `whatsapp_click`, `email_click`, `phone_click`, `cta_click`, `outbound_social_click` (with location); `docs/MEASUREMENT.md`. |
| 10 Off-site | `c617f71` | `docs/OFFSITE_SEO.md` — prioritised owner checklist with copy-paste NAP facts. |
| 11 QA | `5e49241` | Contact layout shift 0.083 → **0** (form now server-rendered); code-line contrast 2.9:1 → ~10:1 (Services a11y 96 → **100**); mobile menu Escape returns focus to its button. |

## 2. Before / after metrics

### 2a. Live site before any change (Lighthouse 13.6, from `docs/AUDIT.md`)

| Page | Perf mobile | Perf desktop | A11y | Best pr. | SEO | LCP mobile | TBT mobile |
|---|---|---|---|---|---|---|---|
| Home | 77 | 97 | 100 | **81** | 100 | 2.6 s | 500 ms |
| Services | 73 | 98 | 100 / 96 | **81** | 100 | 1.2 s | 1,290 ms |
| About | 73 | 97 | 100 | **81** | 100 | 1.2 s | 1,190 ms |
| Contact | 76 | 89 | 100 | **81** | 100 | 1.2 s | 1,030 ms |

Best Practices 81 on every live page is caused entirely by Cloudflare's injected bot-detection script — an owner setting (§4), not code.

### 2b. Same machine, `main` vs this branch (Lighthouse 13.6, production builds served locally, runs alternated)

This machine is much slower than Lighthouse's reference phone, so **absolute mobile scores are low for both** — read the arrows, not the numbers. Earlier repeat runs showed ±1–2 s TBT noise between identical builds, so single-run TBT differences under ~1 s are not meaningful.

| Page | Mode | Perf | A11y | Best pr.* | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Home | mobile | 66 → 68 | 100 → 100 | 96 → 96 | 100 → 100 | 1.5 s → 1.0 s | 4.3 s → 3.9 s | 0 → 0 |
| Home | desktop | 69 → 67 | 100 → 100 | 96 → 96 | 100 → 100 | 0.6 s → 0.6 s | 818 → 981 ms | 0 → 0 |
| Services | mobile | 65 → 64 | 100 → 100 | 96 → 96 | 100 → 100 | 1.3 s → 1.5 s | 6.0 s → 4.2 s | 0 → 0 |
| Services | desktop | 74 → 93 | 96 → **100**† | 96 → 96 | 100 → 100 | 0.6 s → 0.7 s | 593 → 154 ms | 0 → 0 |
| `/services/custom-erp-development` (new) | mobile | — → 69 | — → 100 | — → 96 | — → 100 | — → 1.2 s | — → 3.2 s | — → 0 |
| `/services/custom-erp-development` (new) | desktop | — → 75 | — → 100 | — → 96 | — → 100 | — → 0.7 s | — → 501 ms | — → 0 |
| About | mobile | 66 → 66 | 100 → 100 | 96 → 96 | 100 → 100 | 1.0 s → 1.2 s | 4.1 s → 4.0 s | 0 → 0 |
| About | desktop | 73 → 72 | 100 → 100 | 96 → 96 | 100 → 100 | 0.7 s → 0.7 s | 437 → 546 ms | 0.001 → 0 |
| Contact | mobile | 67 → 69 | 100 → 100 | 96 → 96 | 100 → 100 | 1.0 s → 1.0 s | 3.6 s → 2.4 s | 0.090 → **0**† |
| Contact | desktop | 89 → 96 | 100 → 100 | 96 → 96 | 100 → 100 | 0.4 s → 0.4 s | 253 → 151 ms | 0 → 0 |

\* 96 locally on both because Vercel's analytics scripts 404 on a local server; on Vercel this audit passes.
† Measured after the Phase 11 fixes (the A/B ran just before them): Services desktop a11y re-run = 100; Contact CLS measured 0 in the browser.

**Honest reading:** the code-side performance is roughly unchanged on mobile (the remaining blocking time is React start-up and page rendering, which can't be removed without a risky rewrite) and better on desktop for Services and Contact. Measured during QA: the three kept animations (tech strip, scrolling text, hero glows) cost **nothing** once the page has loaded (60 fps, zero long tasks at 4× CPU slowdown). The biggest remaining wins are on the owner side: Cloudflare's injected script (≈0.5 s of phone main-thread time) and the double proxy (TTFB 0.45–0.98 s).

### 2c. SEO / AEO coverage

| | Before | After |
|---|---|---|
| Indexable pages in sitemap | 10 | **23** (12 service pages + FAQ added) |
| Pages with structured data | 1 (Home) | **23** (every indexable page) |
| Titles with a search keyword | 1 | **all** (all under 60 chars, none duplicated) |
| Descriptions outside 120–160 chars | 4 | 1 (MindMesh, 164) |
| FAQ questions marked up | 5 | 5 (Home) + 12 (`/faq`) + 4 per service page |
| AI crawler policy | implicit | explicit (8 named, all allowed) + `/llms.txt` |

### 2d. QA results

- **Responsive:** all 24 pages (23 indexable + thank-you) at 360, 390 and 430 px — no horizontal page overflow (72 page loads); desktop/tablet checked earlier at 768/1280.
- **Keyboard:** logical tab order with a visible focus ring on every stop; mobile menu opens with Enter, Tab moves into it, Escape closes it and returns focus.
- **Links:** every internal link resolves to a built page; all 8 external links return 200.
- **404:** unknown URLs and unknown service slugs return a real 404.
- **Form (server side):** invalid input 400 · too-fast submission 400 · honeypot silently accepted (no email) · rate limit 429 on the 6th try · valid input reaches the email step (500 locally only because there are no Resend keys on this machine). **Real delivery is not tested** — see owner actions.
- **Structured data:** every JSON-LD block parses and lists only visible content. Not yet run through Google's Rich Results Test (needs the deployed URL).

## 3. New wording for your review

Visible sentences that existed before are unchanged. These are **new** SEO/AEO texts, each restating facts already on the site:

- `lib/service-seo.ts` — per service: search title, description, a "Who it's for" line, and two FAQ answers.
- `app/faq/page.tsx` — the 12 FAQ answers (5 reuse the Home FAQ word for word).
- Page titles and descriptions in each `app/**/page.tsx` (listed in `docs/KEYWORD_MAP.md`).
- `/thank-you` reuses the form's existing success message.

## 4. Owner actions — everything only you can do

**Before merging / on deploy**
- [ ] **TODO(owner): canonical host.** Live serves `www.codtk.com` but every canonical, the sitemap and robots say `https://codtk.com`. Recommended: Vercel → Project → Domains → set **`codtk.com` as Primary** (www then 308-redirects to it; also removes the 2-hop http chain). Alternative: keep www and set `NEXT_PUBLIC_SITE_URL=https://www.codtk.com` in Vercel.
- [ ] **TODO(owner): Vercel env (Production):** confirm `RESEND_API_KEY`, `RESEND_FROM` (on verified codtk.com), `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`; add `NEXT_PUBLIC_GA_ID` (= `G-6MJ1YPNKP6` if that is the right property).
- [ ] **TODO(owner): Cloudflare Email Routing** forwards `contact@codtk.com` to Gmail — form leads now go to `contact@`.
- [ ] **TODO(owner): after deploy,** send one real enquiry from `/contact` and confirm it arrives and lands on `/thank-you`.

**Cloudflare (performance)**
- [ ] Security → Bots: **turn off Bot Fight Mode / JavaScript Detections** (fixes Best Practices 81 → ~100 and saves ≈0.5 s on phones; Turnstile protects the form).
- [ ] DNS: set the Vercel records (A `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`) to **DNS only** (grey cloud); then send Claude the Cloudflare Web Analytics token for the manual beacon (`spa: true`).
- [ ] Confirm "Block AI bots" / AI Crawl Control is **off**, or it will override `robots.txt`.

**Search and analytics**
- [ ] Search Console (Domain property via DNS) → submit `/sitemap.xml`; Bing Webmaster Tools (import). Or send Claude the HTML-tag values for `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION`.
- [ ] GA4: mark `generate_lead` and `whatsapp_click` as key events; add custom dimensions (`docs/MEASUREMENT.md`).
- [ ] Run Google's Rich Results Test on `/`, `/faq` and one service page after deploy.

**Decisions**
- [ ] **AI crawlers:** all 8 are allowed (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, CCBot). Confirm, or name any to block.
- [ ] **Branch workflow:** `rules.md` §48 says "main only, no branches"; this work used a branch at your request. Keep branches (Claude updates §48) or go back to main-only?
- [ ] Brand facts the brief and site differ on (`docs/AUDIT.md` §7): "Testing & Launch" vs "Testing & Deployment", where to use "Digital Transformation Partner", whether to show "2–10" team size, Tech Stack page list vs brief §1.7.

**Content and legal**
- [ ] Legal review of Privacy (Cloudflare processor added; it still says "we don't use advertising or tracking cookies" while GA4 sets cookies after consent — worth a lawyer's wording) and Terms.
- [ ] Team / author info: names, roles, short bios, photos, LinkedIn — only for people who agree. The block stays hidden until then (`rules.md` §1).
- [ ] Founder LinkedIn URL for About (`prd.md` FR-12); Calendly link (FR-10).
- [ ] Off-site work: `docs/OFFSITE_SEO.md` (Google Business Profile as a service-area business first).

## 5. Not done, and why

- **View Transitions, sticky mobile CTA bar, skeleton loaders:** the first two conflict with your 19 Nov "light motion only / minimal" decision (page-transition effects are on the not-allowed list; the WhatsApp button already floats on every page). Skeletons: nothing on the site loads data. Say if you want any of them anyway.
- **Hero sentence naming "startups and businesses":** would change existing wording.
- **Playwright end-to-end form test** (`prd.md` §10): not built; the server path is covered by the manual QA above and the schema by Vitest.
- **SVG favicon:** no vector logo source exists; the PNG set covers all browsers.
- **Live form delivery:** can only be tested after deploy (needs production keys).

## 6. Recommended next steps

1. Approve → merge `feat/launch-ready` into `main` → Vercel deploys.
2. Do the "Before merging / on deploy" and Cloudflare items in §4 the same day; send one test lead.
3. Submit the sitemap; request indexing for Home, `/services`, the 12 service pages and `/faq`.
4. Re-run Lighthouse on the live site a few days after the Cloudflare changes and compare with §2a.
5. After 4 weeks of Search Console data, revisit `docs/KEYWORD_MAP.md` using real queries; follow the 30-day routine in `docs/MEASUREMENT.md`.

**Future opportunities (from the 100-concept list, not relevant yet):** video/YouTube SEO, programmatic SEO (only with genuinely distinct pages), log-file analysis, a blog/CMS (out of v2 scope), hreflang (only if a second language is added).
