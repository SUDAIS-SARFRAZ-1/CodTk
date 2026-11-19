# codtk.com — Launch audit (Phase 1)

**Date:** 2026-11-19 · **Audited:** live site `https://www.codtk.com` (commit `814ffeb`, identical to `main` and to branch `feat/launch-ready` at the time of audit) and its production build.
**Method:** `curl` against the live site (headers, redirects, robots, sitemap, 404, timing); the prerendered HTML in `.next/server/app` (what crawlers receive); Lighthouse 13.6.0 against the live site (5 pages × mobile/desktop); Playwright checks at 360/768/1280 px from earlier today.

Legend: **PASS** · **FAIL** · **PARTIAL** · **N/A**. "Owner" marks items only the founder can do (dashboards, DNS, legal, real content).

---

## 0. Stack (Phase 0)

| Area | Finding |
|---|---|
| Framework | Next.js 16.3.6, App Router, React 19.2, TypeScript, Turbopack. All 10 pages statically prerendered (SSG); one dynamic route, `POST /contact/api`. |
| Styling | Tailwind v4 is installed, but the site is styled by one hand-written design-system stylesheet, `app/codtk.css` (tokens + components), plus `app/globals.css`. |
| Fonts | `next/font/google`: Instrument Sans, Instrument Serif, JetBrains Mono — self-hosted, subset `latin`. |
| Content | Hard-coded in `lib/*.ts` (services, process, projects, tech stack, contact facts) and page files. No CMS. |
| Forms | `components/sections/ContactForm.tsx` → React Query mutation → `app/contact/api/route.ts`: Zod validation (client + server), honeypot, time-trap, in-memory rate limit, Cloudflare Turnstile (server-verified when the secret is set), Resend email to `contact@codtk.com`. |
| SEO | Per-page `metadata` via `lib/seo.ts#pageMetadata`; `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` (1200×630, site-wide); JSON-LD on Home only (Organization, WebSite, FAQPage). |
| Analytics | Vercel Analytics + Speed Insights (cookieless, always on); GA4 `G-6MJ1YPNKP6` hard-coded in `CookieBanner.tsx`, loaded only after "Accept"; Cloudflare Web Analytics beacon auto-injected by Cloudflare. |
| Hosting / edge | Vercel, proxied by Cloudflare (`server: cloudflare`, `cf-cache-status: DYNAMIC`, `x-vercel-cache: HIT`). |
| Tests / CI | **None.** No test runner, no `test` script, no CI. (`prd.md` §10 asks for Vitest + one Playwright test.) |
| Process conflict | `.agent/rules.md` §48 mandates a single-branch workflow on `main`; this work runs on `feat/launch-ready` at the founder's request. |

## Summary — top issues by impact

1. **Canonical host mismatch (SEO, FAIL).** Live site serves `www.codtk.com` (apex 308 → www), but every canonical tag, `og:url`, the sitemap and robots.txt point to `https://codtk.com`. Google is told the canonical URL is one that redirects away. → **Owner decision: www or apex.**
2. **Cloudflare bot-detection script on every page (performance + best practices, FAIL).** `/cdn-cgi/challenge-platform/scripts/jsd/main.js` is injected by Cloudflare (Bot Fight Mode / JavaScript Detections). It is the *only* reason Best Practices is 81 on every page (3 deprecated-API warnings) and costs ≈0.5 s of main-thread time on mobile. → Owner: Cloudflare dashboard.
3. **Mobile main-thread time (performance, PARTIAL).** Mobile Lighthouse 73–81 vs desktop 89–98. LCP is fine (1.1–1.2 s; 2.6 s on Home); the cost is Total Blocking Time 500–1,290 ms. Sources: Cloudflare's script (above), React/Next hydration, and ≈2.3 s of unattributed style/layout/paint work (hypothesis: the three always-running CSS loops; to be measured in Phase 5).
4. **Titles and descriptions not built for search (on-page SEO, FAIL).** Inner titles are 12–22 characters with no keywords ("Services — CodTK"); three descriptions exceed 160 characters, Terms is 47.
5. **Structured data only on Home (FAIL).** No BreadcrumbList, Service, or ProfessionalService/logo/areaServed anywhere.
6. **No per-service pages, no /faq, no /thank-you, no llms.txt (FAIL vs brief).** All 12 services live on one URL (`/services#id`), so no page can rank for "custom ERP development" etc.
7. **Cookie consent not equally prominent; no Consent Mode v2; GA4 ID hard-coded (PARTIAL).**
8. **Privacy policy out of date (PARTIAL).** Names Google Sheets, Slack and Calendly (not built) and omits Cloudflare Web Analytics.
9. **Thin pages (PARTIAL).** Tech Stack 93 words; Portfolio 233; Contact 232.
10. **E-E-A-T: founder named, team anonymous (PARTIAL).** No named builders, roles or bios beyond the founder line.

## Baseline Lighthouse (live, before any change)

| Page | Perf mobile | Perf desktop | A11y m / d | Best pr. | SEO | LCP m | TBT m | CLS | TTFB m (doc) |
|---|---|---|---|---|---|---|---|---|---|
| Home | 77 | 97 | 100 / 100 | 81 | 100 | 2.6 s | 500 ms | 0 | 660 ms |
| Services | 73 | 98 | 100 / 96 | 81 | 100 | 1.2 s | 1,290 ms | 0.004 | 650 ms |
| About | 73 | 97 | 100 / 100 | 81 | 100 | 1.2 s | 1,190 ms | 0.001 | 650 ms |
| Contact | 76 | 89 | 100 / 100 | 81 | 100 | 1.2 s | 1,030 ms | 0 | 650 ms |
| /portfolio/mindmesh | 81 | 97 | 100 / 100 | 81 | 100 | 1.1 s | 680 ms | 0 | 730 ms |

Lab data (simulated mid-range phone). INP is a field metric; TBT is its lab proxy. Field data from the brief (Cloudflare, last 24 h): LCP P75 ≈ 2.76 s, TTFB P75 ≈ 1.5 s — mostly measured **before** `814ffeb` removed the stage tour, scroll loop and heavy animation, so re-check field data after a few days.

`curl` TTFB from this machine to `https://www.codtk.com/`: 0.45–0.98 s across three runs (DNS 15 ms, TCP 120–540 ms, TLS 280–775 ms). The TLS/connect share supports the double-proxy hypothesis.

---

## 1. Site basics

| Check | Result | Evidence | Fix |
|---|---|---|---|
| HTTPS everywhere | **PASS** | `http://` → `https://` 308 on both hosts; HSTS `max-age=63072000`. | — |
| One canonical host + permanent redirect | **FAIL** | apex → www 308 (permanent, fine), but `http://codtk.com` → `https://codtk.com` → `https://www.codtk.com` is a **2-hop chain**, and canonicals point to the apex. | Owner picks host. Recommended: **apex `codtk.com`** (matches code, sitemap and every printed link) — set it as Primary in Vercel → Domains so www 308s to apex. Alternative: keep www and set `NEXT_PUBLIC_SITE_URL=https://www.codtk.com` in Vercel. |
| Works on phones | **PASS** | No horizontal overflow at 360/768/1280; phone layout compacted today (`814ffeb`). 390/430 px to be re-checked in Phase 11. | — |
| Loads in under 2 s | **PARTIAL** | Desktop LCP 0.5–1.1 s; mobile LCP 1.1–2.6 s; mobile TBT up to 1.3 s. | Phase 5 (Cloudflare script, hydration, CSS loops). |
| Real contact details | **PASS** | `+92 314 6397321`, `wa.me/923146397321`, `contact@codtk.com` as `tel:`/`wa.me`/`mailto:` links; old `3019492010` appears nowhere in the site (only in historical planning docs `.agent/prd-questions.md`, `.agent/prd-v2-draft.md` and git-ignored test snapshots). | — |
| Favicon set | **PARTIAL** | `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`. No SVG favicon, no 192/512 PNG, no web manifest, no `theme-color`. | Phase 4. |
| Custom 404 | **PASS** | `/no-such-page-xyz` returns real **404**, branded page with Home/Contact + page links. | Optional: inline styles → design tokens. |
| Thank-you page after submit | **FAIL** (vs brief) | Success is shown in place (`aria-live`), no `/thank-you` URL — so no clean conversion URL. | Phase 4: `/thank-you` (noindex). |
| Privacy policy | **PARTIAL** | `/privacy` exists; lists Google Sheets, Slack, Calendly (not built) and omits Cloudflare Web Analytics. | Phase 4 + **TODO(owner): legal review**. |
| Terms page | **PASS** (content) / owner review | `/terms` exists; description only 47 chars. | **TODO(owner): legal review.** |
| Cookie consent | **PARTIAL** | GA4 is genuinely blocked until "Accept" (script injected only after consent). Reject = outlined, Accept = filled blue → not equally prominent. No Consent Mode v2. | Phase 4. |
| FAQ | **PARTIAL** | 5 questions on Home with FAQPage JSON-LD. No `/faq`, none on service pages. | Phase 7. |
| Analytics installed | **PASS** (4 tools) | Vercel Analytics, Speed Insights, GA4 (consented), Cloudflare WA (auto). GA4 ID hard-coded. | Phase 9: GA4 ID → env var; events. |
| Forms: errors, spam protection, delivery | **PASS** (code) / unverified live | Zod client + server, inline errors, honeypot, time-trap, rate limit, Turnstile fails closed when the secret is set, Resend → `contact@codtk.com`. Delivery not tested end-to-end in this audit. | Phase 4: real test submission; confirm Turnstile + Resend env vars on Vercel and Cloudflare Email Routing for `contact@`. |
| Automated tests | **FAIL** | No test runner. | Phase 4/11: Vitest for the schema, one Playwright form test (rules.md §42–43). |

## 2. Technical SEO

| Check | Result | Evidence | Fix |
|---|---|---|---|
| Indexability | **PASS** | 200 on all pages; no `noindex` meta anywhere; content in prerendered HTML. | — |
| robots.txt | **PARTIAL** | `Allow: /`, `Disallow: /contact/api`, sitemap linked — but sitemap URL is the apex (redirects). No explicit AI-crawler rules. | Phase 5 (host + AI bots, **owner to confirm**). |
| sitemap.xml | **PARTIAL** | 10 URLs, all 200 — but all apex (redirecting) URLs; `lastmod` = build date for every page. | Phase 5. |
| Canonical tags | **FAIL** | Every page has an absolute canonical, but on the apex host, which 308s to www. | Host decision (§1). |
| Stray noindex | **PASS** | None. | — |
| Redirect chains | **FAIL** | `http://codtk.com/` → `https://codtk.com/` → `https://www.codtk.com/` (2 hops). | Fixes itself once the host is unified (apex primary = 1 hop). |
| 301 vs 302 | **PASS** | All permanent (308 = permanent, method-preserving). | — |
| Soft 404s | **PASS** | Unknown URLs return 404. | — |
| Broken links / 404s | **PASS** (internal) | All internal link targets in the built HTML are prerendered 200 pages. External links not crawled. | Phase 11: external link check. |
| Orphan pages | **PASS** | Every page is linked from another page. | — |
| Duplicate content / titles / descriptions | **PASS** | No duplicate titles or descriptions. | — |
| Keyword cannibalisation | **N/A today** | Only Home targets anything; risk appears once service pages exist. | `docs/KEYWORD_MAP.md` in Phase 6. |
| Thin pages | **PARTIAL** | Tech Stack 93 words, Portfolio 233, Contact 232 (Contact is fine as a utility page). | Phase 6. |
| URL structure | **PARTIAL** | Clean, lowercase. No service URLs (`/services#web`). | Phase 6: `/services/<slug>`. |
| Architecture & breadcrumbs | **PARTIAL** | Visible breadcrumb ("Home / Services") on inner pages via `PageHero` (MindMesh has a crumb without `aria-label`). No BreadcrumbList schema. | Phase 5. |
| Crawlable JS / SSR | **PASS** | All pages SSG; content, links and FAQ answers are in the initial HTML. Service details on phones sit in a server-rendered `<details>` (in HTML). | — |
| Mobile-first parity | **PARTIAL** | Phones hide the freelancer/agency comparison columns, the Why intro line, CLI lines and Process numbers with `display:none` (still in HTML). Acceptable, but the comparison text carries less weight. | Note only. |
| Core Web Vitals | **PARTIAL** | See baseline table. CLS ≈ 0 everywhere. | Phase 5. |
| Images | **PASS** | All via `next/image` (AVIF/WebP, sizes, lazy); no raw `<img>`; every image has alt text or is correctly `alt=""` decorative. Lighthouse: 11 KiB image saving left. | Minor. |
| Structured data | **FAIL** | Home only: Organization (no `logo`, `areaServed`), WebSite, FAQPage. None on inner pages. | Phase 5. |
| hreflang | **N/A** | English only. | — |
| Open Graph / Twitter | **PARTIAL** | Every page has og:title/description/image + `summary_large_image`, but og:url/canonical are apex; one site-wide image; MindMesh og:title is just "MindMesh". | Phase 4/5. |
| Search Console / Bing | **FAIL** | No verification tag or file. | Phase 5 + owner creates properties. |
| HTML weight | **NOTE** | Home HTML 127 KB (embedded Next.js page data). | Phase 5: check what inflates it. |

## 3. On-page SEO per page

| Page | Title (chars) | Description (chars) | H1 | Notes |
|---|---|---|---|---|
| `/` | "CodTK \| Building Next Generation Software" (41) ✅ | 148 ✅ | "Building next generation software" ✅ | No location/keyword in title; 5 H2s ✅. |
| `/services` | "Services — CodTK" (16) ❌ | 221 ❌ too long | "Engineering capability, end to end." — no keyword | 16 H2s (one per service); all services on one URL. |
| `/about` | "About — CodTK" (13) ❌ | 191 ❌ | "A focused team, engineering with discipline." | Founder line + links; no team bios. |
| `/contact` | "Contact — CodTK" (15) ❌ | 185 ❌ | "Let's talk about your project." | Fine as utility page. |
| `/process` | "Our Process — CodTK" (19) ❌ | 144 ✅ | "A delivery process built for predictable outcomes." | Step 4 named "Testing & Deployment" on site vs "Testing & Launch" in the brief. |
| `/portfolio` | "Work — CodTK" (12) ❌ | 139 ✅ | "Selected work." | 233 words. |
| `/portfolio/mindmesh` | 59 ✅ | 164 ⚠️ slightly long | "MindMesh" | og:title only "MindMesh"; no Breadcrumb/CreativeWork schema. Founder project, public repo — confidentiality ✅. |
| `/tech-stack` | "Tech Stack — CodTK" (18) ❌ | 142 ✅ | "Tech Stack" | Thin (93 words). |
| `/privacy` | 22 | 116 | ✅ | Owner legal review. |
| `/terms` | 20 | 47 ❌ | ✅ | Owner legal review. |

Every page: exactly one H1 ✅, logical H2s ✅, descriptive internal anchors ✅ (no "click here").

## 4. AEO / GEO readiness

| Check | Result | Evidence | Fix |
|---|---|---|---|
| Question-led headings / direct answers | **PARTIAL** | Home FAQ (5 Qs: cost, timeline, payments, communication, tech) answers directly. No "What does CodTK do?", "Where are you based?", ERP or digital-transformation questions. | Phase 7. |
| FAQ blocks + FAQPage schema | **PARTIAL** | Home only. | Phase 7. |
| Author / team info (E-E-A-T) | **PARTIAL** | Founder "Sudais Sarfraz, Software Engineering, UCP (2026)" with portfolio + GitHub links on About; team anonymous by policy (`prd.md` §3). | **TODO(owner):** names, roles, bios, photos, LinkedIn — only for people who agree. |
| NAP consistency | **PASS** (site) | Name CodTK, "Lahore, Pakistan · Remote team, serving clients worldwide", +92 314 6397321, contact@codtk.com consistent across pages and JSON-LD. Social profiles not checked from here. | **TODO(owner):** confirm LinkedIn/Facebook/Instagram show the same. |
| sameAs | **PASS** | Organization JSON-LD lists LinkedIn, Facebook, Instagram. | Add `logo`, `areaServed`, ProfessionalService in Phase 5. |
| AI crawler access | **PASS** (implicitly) | `User-Agent: *` allows all; no explicit rules. Cloudflare's bot settings may still challenge AI crawlers. | Phase 5: explicit allow list, **owner to confirm**; check Cloudflare "Block AI bots" is off. |
| llms.txt | **FAIL** (optional) | None. | Phase 8. |

## 5. Design — the 5-second test

| Question | Desktop | Phone (360×780) |
|---|---|---|
| What is it? | ✅ "Building next generation software" + "Web, mobile, ERP, AI, cloud & digital growth" | ✅ same, above the fold |
| Who is it for? | ❌ not stated (no "startups and businesses") | ❌ |
| Why it matters? | ✅ "Work directly with the engineers… clear scope, honest timelines" + trust line "Fixed quotes · Source code yours" | ✅ |
| What next? | ✅ "Start a Project" (primary) + "Book a Call" (secondary) | ✅ both above the fold |

Design notes for Phase 3 (no changes yet):
- Pill overload above the fold: trust-line dot, "Replies within 24 hours" pill, WhatsApp float and cookie bar compete with the two CTAs.
- On phones the trust line wraps and its blue dot is stranded on the left.
- Three different "pill-shaped" components (chips, badges, buttons) at similar weight.
- Process page: five very large identical dark cards in a row.
- Social icons are 40 px and the Contact "Call us" pill is 36 px — below the 44 px touch target.

## 6. Accessibility (automated)

| Check | Result | Evidence |
|---|---|---|
| Lighthouse a11y | **PASS** 100 on 9/10 runs | Services desktop 96: `aria-label` on a `<p>` (`.sv-cmd`, TypedCommand) — prohibited ARIA. Fix in Phase 3. |
| Focus states | **PASS** | Global `:focus-visible` outline in `codtk.css`. Full keyboard pass (incl. mobile menu) in Phase 11. |
| Reduced motion | **PASS** | All loops and reveals honour `prefers-reduced-motion`. |
| Contrast | **PASS** (Lighthouse) | Manual check of glass/dark surfaces in Phase 3. |

## 7. Brand facts — differences between the brief and the site (owner to confirm)

| Brief §1 | Site today | Question |
|---|---|---|
| Step 4 "Testing & Launch" | "Testing & Deployment" (you asked for this today) | Keep "Testing & Deployment"? |
| Positioning line "Digital Transformation Partner" | not used | Where should it appear? |
| Sign-off "Code. Design. Deliver." / "CODE / DESIGN / BUILD" | "Code. Design. Deliver." in footer | Use both, or the first only? |
| Team size 2–10 | not shown (team presented without headcount, `prd.md` §3) | OK to show "2–10"? |
| Tech stack §1.7 | `/tech-stack` also lists HTML, CSS, JavaScript, Git, GitHub; Services lists Flutter, Kubernetes, Terraform, Azure, GCP, OpenAI, Stripe, NestJS, GraphQL, FastAPI | Should the site list only §1.7? |
| ERP one-liner adds "POS, payroll, CRM" | "One system for your stock, sales, staff and accounts." | Update wording? (You decided earlier today that wording stays as it is.) |

## Owner actions found so far

- **TODO(owner):** choose canonical host (recommended apex `codtk.com`) and set it as Primary in Vercel → Domains.
- **TODO(owner):** Cloudflare → Security: turn off Bot Fight Mode / JavaScript Detections for codtk.com (Turnstile already protects the form).
- **TODO(owner):** Cloudflare DNS: set the Vercel records (A `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`) to **DNS only** (grey cloud); then replace Cloudflare Web Analytics automatic injection with the manual beacon (`spa: true`) — Claude adds the snippet once you give the token.
- **TODO(owner):** confirm `RESEND_API_KEY`, `RESEND_FROM`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` are set in Vercel (production), and Cloudflare Email Routing for `contact@codtk.com`.
- **TODO(owner):** legal review of Privacy and Terms.
- **TODO(owner):** team names/roles/bios/photos/LinkedIn (only people who agree), GA4 property confirmation, Search Console + Bing verification values.
