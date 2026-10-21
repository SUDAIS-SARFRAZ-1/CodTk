---
trigger: always_on
---

# Project Rules

> Version 3.0 — September 22, 2026. Replaces the previous e-commerce/3D rule set, which described an unrelated project. This version is scoped to the CodTK corporate marketing website defined in `prd.md`. Rules are renumbered — cite by number from this version.

Hard constraints. These override convenience, speed of writing code, or a "simpler" alternative. If a suggestion conflicts with a rule below, the rule wins.

## Content Integrity
1. **No fabricated content ships, ever.** No lorem ipsum, no invented testimonials, no stock "trusted by" client logos, no made-up team members, no fake phone numbers, no invented statistics. If real content isn't available yet, the section doesn't render (or is clearly marked as coming soon) — it doesn't get faked to fill space. This is the single most important rule on this project: the site's entire purpose is to prove CodTK is a real, credible company (`prd.md` §6.7).
2. Team photos are real, non-stock, non-AI-generated, and (per `prd.md` FR-12) link to a real, verifiable LinkedIn profile where the person has agreed to be listed.
3. Portfolio/case-study entries link to a live demo or public repository wherever one exists (`prd.md` §6.4, FR-4). An unverifiable claim is worse than no claim.
4. Numbers, credentials, and claims about team size, experience, or delivered projects must be accurate as of the date they're published — don't round up or leave stale numbers in place after they change.

## Contact Form & Backend
5. The contact form (FR-1) validates on both client and server. Client-side validation is a UX courtesy only — the server independently re-validates every field and rejects malformed input regardless of what the client already checked.
6. Use a schema validator (e.g. Zod) at the form-submission endpoint boundary rather than ad hoc `if` checks.
7. The contact/quote form is protected against spam and bot submission (rate limiting and/or CAPTCHA — e.g. Cloudflare Turnstile or hCaptcha) per NFR 8.3. Don't ship the form without this.
8. Form submissions are sent to the business email reliably; if a database is added later to also store leads (`prd.md` §9), the email send and the DB write are independent — a failure in one must not silently swallow the other.
9. Never log the full contents of a form submission (name/email/message) to a general-purpose log stream beyond what's needed for debugging a delivery failure — treat submitted personal data as data covered by the Privacy Policy (FR-9).

## Frontend Framework (Next.js)
10. Next.js (App Router) is the whole stack for this project unless `prd.md` §9 changes — it renders pages and, where needed, hosts the contact-form API route. Don't introduce a separate Express service unless the team has explicitly decided to split the backend out.
11. Choose rendering mode per page deliberately: static generation (SSG) or ISR for content pages (Home, Services, Tech Stack, Portfolio, About, Process) since their content rarely changes and SEO matters; the Contact page's form submission is the only part of the site that needs a server/client round trip.
12. Use `next/image` for all imagery (team photos, portfolio screenshots, logos) so responsive sizing, lazy-loading, and modern-format serving (WebP/AVIF) happen by default.
13. Anything that only makes sense client-side (mobile nav toggle, scroll-triggered WhatsApp button, form submission state) is a client component — don't mark a whole static content page `'use client'` just because one small part of it is interactive.

## Frontend State
14. Most of this site needs **no global state at all** — content pages are static/server-rendered. Don't add React Query or Zustand to a page that's just rendering content.
15. Where an async action exists (contact form submission, a booking-widget embed, a future newsletter signup), use React Query for the request/loading/error/success lifecycle rather than hand-rolled `useState` + `useEffect` fetch logic.
16. Zustand (or plain `useState`/`useContext`) is for small, cross-component UI state only: mobile nav open/closed, whether the persistent WhatsApp CTA is visible, an active FAQ/accordion item. If a piece of state is only used by one component and its direct children, it doesn't need a store — pass props or use local state.
17. There is no user auth, no cart, and no personalized data in v1 (`prd.md` §5.2) — don't build a token/session layer that has nothing to protect. If accounts are ever added in a future version, that's a new architecture decision, not an extension of this rule set.
18. Full patterns: `state-management.md`.

## Design System & Professional UI
19. Every color, font size, spacing value, radius, and shadow comes from a shared set of design tokens (Tailwind theme config) — no raw hex values or arbitrary one-off Tailwind values (`text-[17px]`, `mt-[13px]`) scattered through components.
20. Build pages from shared primitives (`components/ui`, `components/layout`). Don't create a one-off button, card, or modal when a primitive already exists.
21. One primary CTA per page/section, labeled with a specific action ("Get a Quote", "Book a Call", "Send Message") — not a generic "Submit" or "Click Here".
22. Every page guides the visitor toward a CTA — per NFR 8.2, there is no dead-end page with no next action.
23. Pages are responsive from 360px to 1920px and are checked at 360, 768, 1280, and 1440px before being called done (FR-5).

## Performance
24. Target: initial page load under 2.5s on standard broadband, Lighthouse performance score 90+ on Home and Services (NFR 8.1). Treat a regression below this as a bug, not a nitpick.
25. Images are served responsive and compressed, in modern formats (WebP/AVIF) where supported, and lazy-loaded below the fold. Never ship a full-resolution upload straight into a page.
26. Keep the initial JS bundle lean — this site does not need a large client-side framework footprint. Load anything non-critical (booking-widget embed scripts, chat widgets) after first paint, not blocking it.
27. Debounce any live client-side input handling (e.g. a live-filtering search on Portfolio, if added) at ~300ms.

## SEO & Discoverability
28. Every page has a unique, accurate `<title>` and meta description (FR-6).
29. Semantic HTML structure with a correct heading hierarchy (one `<h1>` per page) — per NFR 8.4.
30. `sitemap.xml` and `robots.txt` are kept current as pages are added or removed (FR-6).
31. Open Graph tags are set on every page so links shared on social/WhatsApp render properly (FR-6).
32. Target keywords from `prd.md` §8.4 ("software house Lahore," "custom software development Pakistan," "MERN stack development agency") inform page copy and headings naturally — never keyword-stuffed.

## Accessibility
33. Target WCAG 2.1 AA: sufficient color contrast, full keyboard navigability, visible focus states, descriptive alt text on every image and logo (`prd.md` NFR 8.6).
34. Form fields and their error/success messages are screen-reader accessible (proper `<label>` association, `aria-live` region for submission feedback).

## Security
35. HTTPS is enforced site-wide (NFR 8.3) — this is a hosting/deploy configuration, not optional.
36. Every field submitted through the contact form is sanitized and validated server-side before being used anywhere (sent as email, written to a database, etc.) to prevent injection.
37. No secret (business email SMTP credentials, CAPTCHA site/secret keys, database connection string if one is added) is ever committed to the repo — `.env` files are gitignored, and a `.env.example` with placeholder values is kept current.

## Code Style & Structure
38. Naming: components in PascalCase, hooks prefixed `use`, files grouped by page/feature rather than by file type.
39. No commented-out code, no leftover `console.log`/`debugger` in commits.
40. Prefer TypeScript types/interfaces over `any`; a Zod-inferred type beats a hand-duplicated shape for anything validated with Zod.
41. Keep components focused — a component doing data-fetching, layout, and complex conditional rendering all at once should be split.

## Testing
42. The contact form's validation logic (required fields, email format, spam-protection integration) has at least one automated test — this is the one piece of real "business logic" this site has, and it directly affects lead generation (`prd.md` §11 KPIs).
43. A critical-path end-to-end check (can a visitor find a service, reach the contact form, and successfully submit it) exists before launch, even if the rest of the test suite stays light for a mostly-static site.
44. There is no CI pipeline on this project (a deliberate choice — see §48). Run lint, typecheck, and build locally before pushing to `main`; nothing else catches a broken build.

## Environment & Secrets
45. Staging (preview deploys) and production use separate credentials for any third-party service (email delivery, CAPTCHA, analytics) where the provider distinguishes test/live keys.
46. Secrets are loaded from environment variables / the hosting platform's secret manager — never hardcoded as a fallback default in code.

## Git & Version Control
47. Commit messages describe the *why*, not just the *what*, for anything beyond a trivial content change.
48. Single-branch workflow: work directly on `main`, no `develop`, no feature branches, no required PRs, no CI gate. This was deliberately simplified from an earlier `develop`/feature-branch/CI setup — this project's size and single-developer stage didn't justify that overhead. Revisit if the team actually grows into the repo.
49. `.env`, `node_modules`, and `.next` build output stay out of version control via `.gitignore`.

## Dependency Management
50. Adding a new dependency is a deliberate choice — check it's actively maintained and isn't duplicating something already in the project (a second date library, a second HTTP client, a second animation library, a second UI component library). This is a small marketing site; it should have a small dependency footprint.
51. Lockfiles are committed and respected — don't hand-edit dependency versions without regenerating the lockfile.

## Documentation
52. `prd.md` stays current as scope decisions are made — if a page or requirement changes, the PRD changes in the same PR, not as a follow-up.
53. Setup steps (env vars needed, how to run locally, how to deploy) stay current in the README.

## When Unsure
54. If a rule here and a request from the user conflict, point out the conflict rather than silently picking one.
55. If a task pushes this project toward e-commerce-level complexity (a database beyond simple lead storage, user accounts, payment processing, a CMS) that isn't in `prd.md`, that's a flag to raise explicitly — see `prd.md` §5.2 and §14 for what's deliberately deferred to a future version.
