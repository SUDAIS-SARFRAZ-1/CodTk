# Off-site SEO checklist — for the founder

Work that happens outside the codebase. In priority order; each item lists what to do and what "done" looks like. Use exactly the facts below everywhere (NAP = name, address/area, phone), so search engines and AI assistants see one consistent entity.

**Copy-paste facts**
- Name: **CodTK**
- One-liner: CodTK is a software and digital growth company based in Lahore, Pakistan, working with startups and businesses worldwide.
- Area: Lahore, Pakistan · Remote team, serving clients worldwide (no street address)
- Phone / WhatsApp: +92 314 6397321 · Email: contact@codtk.com · Website: https://codtk.com
- Founded: 2026 · Category: Software company / Software development / Internet marketing service

## Priority 1 — this week

1. **Fix the canonical host and Cloudflare settings** (see `docs/LAUNCH_REPORT.md` → Owner actions). Everything below links to the site; it should land on one canonical host.
2. **Google Search Console** — add `codtk.com` as a Domain property (DNS TXT at Cloudflare). Submit `https://codtk.com/sitemap.xml`. Request indexing for Home, `/services`, and the 12 `/services/*` pages. *Done when:* sitemap status "Success" and pages move to "Indexed" over 1–2 weeks.
3. **Bing Webmaster Tools** — "Import from Google Search Console". Bing feeds Copilot and several AI assistants. *Done when:* sitemap processed.
4. **Google Business Profile** as a **service-area business** — category "Software company" (secondary: "Website designer", "Internet marketing service"); service area: Lahore + "Pakistan"; **hide the address** (no public street address); phone, website, hours Mon–Sat; add the 12 services; logo and a cover image; the one-liner as the description. Verify by the method Google offers. *Done when:* profile verified and live.
5. **Bing Places** — import from Google Business Profile once it is verified.
6. **Social profiles** — make LinkedIn, Facebook and Instagram match the facts above word for word (name, one-liner, website `https://codtk.com`, phone, email, "Lahore, Pakistan"). The site's Organization schema already lists all three in `sameAs`. *Done when:* all three show identical details.

## Priority 2 — this month

7. **Directory listings with consistent NAP** — Clutch, GoodFirms, DesignRush, and Pakistani listings (e.g. P@SHA member directory once eligible, local business directories). Same name, one-liner, phone, email, website, "Lahore, Pakistan". Don't pay for "top agency" badges; only use free or genuine paid profiles. *Done when:* a spreadsheet lists each profile URL and the date it was checked.
8. **Genuine client reviews (with permission)** — after each delivered project, ask the client for a Google review and, where they agree, a Clutch/GoodFirms review. Never write, buy or incentivise reviews (it breaks Google's and Clutch's policies, and `rules.md` §1). Show reviews on the site only when they are real and permitted.
9. **Founder authority (E-E-A-T)** — complete the founder's LinkedIn (role at CodTK, education, the MindMesh project link) and add the LinkedIn URL to the About page (send it to Claude; `prd.md` FR-12). If teammates agree to be named, send name, role, short bio, photo and LinkedIn for a "Who builds your product" block.

## Priority 3 — ongoing

10. **Earn relevant backlinks** — partner and university pages (UCP alumni/projects), tech community posts (dev.to, Hashnode, Medium) linking to a relevant service page, guest posts on Pakistani business or tech sites, being a resource in local startup communities. No link schemes, link buying or PBNs. Links from a few real, relevant sites beat many weak ones.
11. **Reclaim unlinked brand mentions** — monthly, search `"CodTK" -site:codtk.com`; where a page mentions CodTK without linking, ask politely for a link.
12. **Reddit, forums and LinkedIn thought leadership** — answer real questions (e.g. r/pakistan, r/smallbusiness, LinkedIn posts) about custom ERP, taking a shop online and choosing a developer, honestly and without spamming links. AI assistants increasingly quote these discussions.
13. **Content plan: 1–2 helpful articles a month** answering real client questions. A blog is out of scope for v2 (`prd.md` §5.2). Until it is approved, publish on LinkedIn and link to the matching service page; when a blog is approved, these become pages that feed AEO/GEO. Starter topics (from `docs/KEYWORD_MAP.md`):
    - What is an ERP system, and does a small business need one?
    - Custom ERP vs off-the-shelf: how to choose
    - How much does an app or website cost in Pakistan? (how quotes are built, no invented prices)
    - How to take a shop or clinic online, step by step
    - What to ask a software company before you hire them
    - WordPress vs a custom web app: which fits your business?
14. **Monthly AI-visibility check** — the 10 questions in `docs/MEASUREMENT.md`; note whether CodTK is mentioned and which page is cited.

## Future opportunities (not now)

Video / YouTube SEO (short project walkthroughs), programmatic SEO (only with genuinely distinct pages, never scaled thin content), log-file analysis (once traffic justifies it), knowledge panel (follows from consistent entity data, reviews and mentions), a blog or CMS (needs a scope decision, `prd.md` §5.2).
