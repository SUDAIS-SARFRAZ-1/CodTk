# UI/UX Design Guidelines — AptiScript Corporate Website

Version 1.0 — September 22, 2026 — Status: Active.

> This file previously contained content mislabeled from an unrelated e-commerce/3D project template. It's rewritten here to match the actual site defined in `prd.md`: a 7-page marketing/lead-gen website (Home, Services, Tech Stack, Portfolio, About/Team, Process, Contact) with no cart, no 3D, no accounts.

## Design North Star

A visitor who has never heard of AptiScript should land on any page and instantly know three things:

- **What is this company?** A real, professional software house — not a template site or a single freelancer.
- **What can I do right now?** One obvious next action per page (get a quote, book a call, message us).
- **Can I trust them?** Real people, real work, a clear process — see `prd.md` §6.7 (Trust & Credibility Elements) for the specific requirements this drives.

If a visual choice fights any of these three, it loses — including anything that slows the page down (NFR 8.1) or looks decorative without earning its place.

## 1. Core Principles

- **Clarity over cleverness.** A visitor should never have to guess what a section is for or where the CTA is.
- **Consistency.** Same component, same spacing, same color, every time it appears — a "Get a Quote" button looks and behaves identically on Home and on Services.
- **Restraint.** This is a B2B credibility site, not a flashy consumer product. Prefer whitespace and typography doing the work over heavy imagery, gradients, or animation.
- **Honesty.** No section implies something that isn't true — no fake "trusted by" logos, no invented stats, no stock photos presented as the team (see `rules.md` §1).

## 2. Brand & Visual Direction

- **Palette:** three colors only — black, white, and deep cobalt blue `#2c3480` (plus shades/tints of those three for hover, grey text, borders, and light section backgrounds). Light site; black is used for contrast sections (e.g. hero, footer). Cobalt is the single accent for CTAs, links, and key highlights. Never use cobalt as text on black (≈1.9:1 contrast, fails WCAG AA) — on black sections use white text, and cobalt only as a button fill. No automatic dark mode.
- **Typography:** Inter, for both headings and body text. A strict type scale (e.g. 4–5 sizes) reused everywhere — no ad hoc font sizes per component.
- **Imagery:** real team photos, real portfolio screenshots/demos, and simple iconography for services and process steps. No stock "business handshake" photography — it undercuts the credibility goal this whole site exists for.
- **Tone:** confident and plain-spoken copy. Technical credibility comes from specifics (named technologies, concrete process steps, real project outcomes), not buzzwords.

## 3. Design Tokens

All values below are implemented as a single Tailwind theme config — components consume tokens, never raw values (`rules.md` §19).

| Token category | Examples |
|---|---|
| Color | `background`, `foreground`, `muted`, `brand` (accent), `border`, `success`, `error` |
| Type scale | `text-sm`, `text-base`, `text-lg`, `text-2xl`, `text-4xl` — mapped to defined heading/body sizes, not arbitrary values |
| Spacing | A consistent scale (4px base unit) for padding/margin/gaps across all sections |
| Radius | One or two values (e.g. `rounded-md`, `rounded-xl`) reused for cards, buttons, inputs |
| Shadow | A single subtle elevation shadow for cards/dropdowns — this site doesn't need heavy depth effects |
| Motion | `duration-150` (micro-interactions), `duration-300` (panels/menus) — see §7 |

## 4. Shared Components (`components/ui`, `components/layout`)

- **Button** — primary (brand-filled), secondary (outlined/ghost). One primary CTA per screen (`rules.md` §21).
- **Card** — used for service summaries, portfolio entries, team members.
- **Section** — consistent vertical rhythm/padding wrapper used on every page so spacing never has to be reinvented per page.
- **Header** — logo, nav, primary CTA button, mobile menu toggle.
- **Footer** — nav links, social links, business email/phone, Privacy/Terms links, and (per `prd.md` §6.7) business registration number/location once available.
- **WhatsAppButton** — persistent floating CTA, visible across scroll (FR-2), dismissible or auto-hiding only when it would overlap the footer contact form.
- **Badge/Pill** — used for the Tech Stack grouped-pill layout (`prd.md` §6.3).

Don't create a one-off variant of any of these inline in a page — extend the shared component.

## 5. Page Blueprints

Each maps directly to `prd.md` §6.

### 5.1 Home
Hero (name, tagline, primary + secondary CTA) → Services overview cards → Tech stack strip → Featured portfolio preview (1–2 projects) → Team/capacity highlight → Trust strip (process summary / response-time commitment) → Footer CTA + contact form entry point.

### 5.2 Services
One card per service (Web, Mobile, Backend & API, Cloud & DevOps, Automation, Consulting), each with: short description, representative tech, and a CTA to a pre-filled quote request (FR-3). Structured by client outcome — headings should read like problems solved, not tech jargon.

### 5.3 Tech Stack
Grouped pill/logo layout by category (Frontend, State Management, Databases/ORM, Backend, DevOps) per `prd.md` §6.3 — scannable in seconds, not a dense text list.

### 5.4 Portfolio
Case-study cards → detail page per project (FR-4): problem, solution, tech used, outcome, and a link to a live demo/repo. MindMesh is the featured flagship entry.

### 5.5 About / Team
Company narrative → founder profile → team grid by function (frontend/backend/DevOps), each member with a real photo linked to LinkedIn (FR-12) → mission/positioning statement.

### 5.6 Process
Discovery → Design → Development → Deployment → Support, as a numbered timeline, each step noting the tooling used (reinforces technical credibility) plus the engagement-model summary (contract/NDA, payment structure — FR-13).

### 5.7 Contact
Form (name, email, project type, message — FR-1), WhatsApp/direct contact info, booking link (FR-10), and links to Privacy Policy / Terms (FR-9).

## 6. Trust & Credibility in Layout (ties to `prd.md` §6.7)

- Footer is the anchor for verifiable-identity signals: registration number/location once available, phone, email, WhatsApp.
- Team section always pairs a photo with a name, role, and outbound LinkedIn link — never a photo alone.
- Every portfolio card that has a live demo/repo shows that link visibly, not buried in the detail page only.
- The booking link (Calendly-style) appears on both Home and Contact, styled as a secondary CTA next to the form — an alternative path, not a replacement for it.

## 7. Motion

This is a fast-loading content site, not a 3D/immersive product — motion is minimal and purposeful only:

- Micro-interactions (button/link hover, focus states): ≤ 200ms, opacity/transform only.
- Panel/menu transitions (mobile nav open, accordion): ≤ 300ms.
- No parallax, no scroll-hijacking, no auto-playing looping animation near a CTA.
- Respect `prefers-reduced-motion` — disable non-essential transitions when set.
- Nothing here should cost the performance budget in `instructions.md` §5 — a hero fade-in is fine; a hero video background or heavy animation library is not, given the 2.5s load target (NFR 8.1).

## 8. Accessibility

- WCAG 2.1 AA contrast on all text/background pairs, including on the brand-accent CTA button.
- Full keyboard navigability: header nav, mobile menu, all form fields, and the WhatsApp/booking buttons.
- Every image (team photos, portfolio screenshots, tech-stack logos) has descriptive alt text — not filenames or "image."
- Form inputs have associated `<label>`s and screen-reader-announced validation/success messages.

## 9. Responsive Behavior

Checked at 360px, 768px, 1280px, and 1440px (FR-5, `rules.md` §23):
- Header collapses to a hamburger menu below tablet width; the primary CTA and WhatsApp button remain reachable at every breakpoint.
- Tech Stack pill grid and Portfolio/Team card grids reflow from multi-column to single-column on mobile without losing legibility.
- Forms stack to full-width single-column on mobile.
