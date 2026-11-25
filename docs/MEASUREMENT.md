# Measurement — codtk.com

What is tracked, where each number lives, and a 30-day review routine. Nothing here needs code changes; the owner steps are marked **TODO(owner)**.

## What runs on the site

| Tool | What it measures | Consent | Where it is wired |
|---|---|---|---|
| Vercel Analytics | Page views, referrers, countries (cookieless) | Not needed | `app/layout.tsx` (`<Analytics />`); enable in Vercel → Analytics |
| Vercel Speed Insights | Real-visitor Core Web Vitals (LCP, INP, CLS) | Not needed | `app/layout.tsx` (`<SpeedInsights />`); enable in Vercel → Speed Insights |
| Cloudflare Web Analytics | Visits and Core Web Vitals at the edge (cookieless) | Not needed | Injected by Cloudflare today; see "Cloudflare" below |
| Google Analytics 4 | Sessions, engagement, events and conversions | **Only after "Accept"** on the cookie banner, with Consent Mode v2 (ads signals denied) | `components/layout/CookieBanner.tsx`; ID from `NEXT_PUBLIC_GA_ID` (falls back to `G-6MJ1YPNKP6`) |
| Google Search Console | Impressions, clicks, CTR, positions, indexing | n/a | **TODO(owner):** add the property (DNS or `GOOGLE_SITE_VERIFICATION`) and submit `/sitemap.xml` |
| Bing Webmaster Tools | Same for Bing (also feeds Copilot) | n/a | **TODO(owner):** import from Search Console or set `BING_SITE_VERIFICATION` |

## GA4 events

All are sent with `track()` in `lib/analytics.ts`, which does nothing until GA4 is loaded (that is, until consent). Clicks are classified in one place: `components/layout/ClickTracking.tsx`.

| Event | Fires when | Parameters | Key event? |
|---|---|---|---|
| `generate_lead` | The contact form is sent successfully (then the visitor lands on `/thank-you`) | `project_type` | **Yes** |
| `whatsapp_click` | Any `wa.me` / WhatsApp link, including the floating button | `location` | **Yes** |
| `email_click` | Any `mailto:` link | `location` | No |
| `phone_click` | Any `tel:` link | `location` | No |
| `cta_click` | Any link to `/contact` (incl. pre-filled `#service=` quote links) or any primary button | `location`, `label`, `href` | No |
| `outbound_social_click` | LinkedIn, Instagram or Facebook profile links | `network`, `location` | No |

`location` is the nearest section's `data-section` (e.g. `intro`, `services`, `faq`, `contact`, `start a project`) or `nav` / `footer`.

**TODO(owner) in GA4 → Admin:**
1. Confirm `G-6MJ1YPNKP6` is the right property; set `NEXT_PUBLIC_GA_ID` in Vercel (Production) to it.
2. Events → mark `generate_lead` and `whatsapp_click` as **key events**.
3. Custom definitions → add event-scoped dimensions `location`, `project_type`, `network`, `label` so they appear in reports.
4. A `/thank-you` page view is also a clean conversion URL if you prefer destination-based goals.

Because GA4 only runs after consent, it under-counts. Use Vercel Analytics for total traffic and GA4 for behaviour and conversion *rates*.

## Cloudflare (from the brief, not applied — DNS is the owner's call)

- **TODO(owner):** Cloudflare → DNS: set the Vercel records (A `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`) to **DNS only** (grey cloud). Vercel already terminates TLS and caches at its own edge; proxying through Cloudflare as well adds a second hop (TTFB measured at 0.45–0.98 s in the audit).
- Once grey-clouded, Cloudflare can no longer inject its analytics automatically. **TODO(owner):** Cloudflare → Web Analytics → add site → copy the token; Claude then adds the manual beacon `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"…","spa":true}'>` (`spa: true` so client-side navigations count).
- While still proxied: **turn off Bot Fight Mode / JavaScript Detections** (Security → Bots). It injects `/cdn-cgi/challenge-platform/…/jsd/main.js` on every page, which alone drops Lighthouse Best Practices to 81 and costs ≈0.5 s of phone main-thread time. Turnstile already protects the form.

## The SEO funnel — where each number lives

| Stage | Metric | Where |
|---|---|---|
| **Visibility (Found)** | Impressions; queries in the top 10; pages indexed | Search Console → Performance (Search results); Pages (indexing) |
| | AI mentions / citations | Manual test (see routine) — no reliable tool yet |
| **Clicks (Chosen)** | Organic clicks; CTR; average position | Search Console → Performance |
| | AI referral sessions | GA4 → Reports → Acquisition → Traffic acquisition, filter session source contains `chatgpt`, `perplexity`, `copilot`, `gemini`, `claude` |
| **Engagement (Helped)** | Engaged sessions, engagement rate, pages per session | GA4 → Engagement; Vercel Analytics for raw page views |
| | Scroll depth | GA4 enhanced measurement (`scroll` = 90%); enable in Data streams → Enhanced measurement |
| **Conversion (Convinced)** | Organic leads (`generate_lead` + `whatsapp_click` by organic source); conversion rate | GA4 → Key events, segment by Session default channel group = Organic Search |
| | Branded searches ("codtk") | Search Console → Performance, query contains `codtk` |
| **Revenue (Paid)** | Won deals from organic leads; SEO ROI | Outside the site: tag each lead's source in your own records (the lead email carries the project type; ask "how did you find us?" on the first call) |

## 30-day review routine

Once a month (first Monday), ~45 minutes:

1. **Search Console** — Performance (last 28 days vs previous): top queries, pages, CTR, position. Note "striking distance" queries (positions 8–20) and the page that ranks for each; improve that page's title/description or content. Pages → any "Crawled – currently not indexed" or errors. Sitemaps → status OK.
2. **GA4** — Traffic acquisition (organic vs social vs direct), key events (`generate_lead`, `whatsapp_click`) by channel and by `location`, engagement rate on service pages.
3. **Speed** — Vercel Speed Insights: LCP, INP, CLS at P75 on mobile. Investigate anything that turns "Needs improvement".
4. **AI visibility** — ask these 10 questions in ChatGPT (search on), Perplexity and Google AI Mode; record whether CodTK appears and which page is cited:
   1. software company in Lahore for startups
   2. custom ERP development company Pakistan
   3. who builds custom ERP systems in Lahore
   4. web development company Lahore with fixed quotes
   5. mobile app development company Pakistan
   6. how to take my shop online in Pakistan
   7. custom ERP vs off-the-shelf ERP for a small business
   8. SaaS development company Pakistan
   9. what does CodTK do
   10. is CodTK a real company / CodTK reviews
5. Write the month's numbers into one line per metric (a sheet is enough) so trends are visible.
