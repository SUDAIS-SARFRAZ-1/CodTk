# UI/UX Design Guidelines — CodTK Corporate Website

Version 1.0 — September 22, 2026 — Status: Active.

> This file previously contained content mislabeled from an unrelated e-commerce/3D project template. It's rewritten here to match the actual site defined in `prd.md`: a 7-page marketing/lead-gen website (Home, Services, Tech Stack, Portfolio, About/Team, Process, Contact) with no cart, no 3D, no accounts.

## Design North Star

A visitor who has never heard of CodTK should land on any page and instantly know three things:

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

- **Palette:** white, black and the CodTK logo blue `#0067FC` (`blue-500`), plus shades of those three — tokens in `app/codtk.css`, copied from the design system (https://claude.ai/artifact/Ht29CAMG8XhsfyLWVHpcf5, adopted in full 2026-10-18). **White pages with black type.** Black is a *scope*, not a theme: `data-theme="dark"` on an element (navbar pill, cinematic stage, service cards, code windows, CTA, footer) resolves the same token names to black values. Small blue text on white uses `blue-400` (`#0052CC`); white on `blue-500` is 4.8:1.
- **Depth:** on white, hairlines and the soft `shadow-lift`; glows only at full strength inside black scopes. No neon or multi-hue gradients.
- **Logo:** the founder-supplied raster artwork in `public/brand/` (black background converted to transparency). Don't redraw it. It sits inside black scopes as drawn; on white (the navbar, since 2026-10-20) it uses the CSS `invert(1) hue-rotate(180deg)` filter so the white strokes turn near-black and the blue stays blue.
- **Typography:** one family, Instrument Sans (weight 500, tight tracking), for headlines and body; JetBrains Mono only for labels and code. No italic or coloured emphasis inside headlines: emphasis comes from size (founder, 2026-11-26, from `docs/premium.md`). The Home hero heading is black like the rest, with its full stop as the blue bubble (founder, 2026-11-27; it was all blue from 2026-11-26).
- **Premium checklist (2026-11-26):** follow `docs/premium.md`. No arrows inside buttons, no `·` separators in visible copy, no eyebrow labels above section headings (group names and Mission/Vision labels stay), no status dots or pills, no numbering unless it is a real sequence, no "real"/"quiet" filler, no two-word sentence pairs, and cards only for things you can click. Use the type classes in `app/codtk.css`; no ad hoc font sizes.
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

**Scroll motion on every page** (founder, 2026-11-26; this overrides the earlier bans on pinned/scroll-driven scenes, intro screens and fade-up on scroll). Home has the dives below; every page has the scroll reveal below. A curtain header and stacking cards on the other main pages were tried and removed (founder, 2026-11-27: they broke); the curtain came back the same day, rebuilt (below).

- **Intro:** the CodTK logo on black for about 2.5 seconds, only when a visit starts on Home, once per visit (`components/codtk/Intro.tsx`; CSS only, clears itself without JavaScript).
- **Hero dive:** the hero is pinned for a few screens while scrolling fades the copy and dives into the blue full stop of the heading until it fills the screen, then the CodTK logo rises above a lit horizon (`DiveStage.tsx` sets `--p`; CSS does the rest with transform and opacity, no 3D library). The heading is blue and each letter squishes like rubber when pointed at or tapped (`RubberHeading.tsx`; founder, 2026-11-26).
- **Closing dive:** on Home only, the black "Let's build what's next." card grows from a small card to the full screen, its copy rises in and the example chat plays as you scroll (`CtaBanner dive`, reusing `DiveStage`; founder, 2026-11-26). Only on screens at least 768px wide and 680px tall; phones see the static card. Other pages keep the static CTA.
- **Scroll reveal (every page):** from the home motion prototype artifact (founder, 2026-11-27). Headings rise out of a mask; other blocks rise in one after another with a slight spring (`components/layout/ScrollReveal.tsx`). On a first visit, what is already on screen is not hidden (no flash, no LCP cost); after moving between pages, the new page animates in. The home hero, closing CTA dive, Process tunnel and Marquee keep their own motion. Without JavaScript everything shows as is.
- **Curtain (Home):** once the hero dive has fully played, the rest of Home slides up over the logo scene as a white sheet with rounded top corners (`DiveStage tail`, `.ctk-sheet`; founder, 2026-11-27). The dive itself is unchanged.
- **Curtain (inner pages, rebuilt 2026-11-27):** the `PageHero` holds and sinks back while the rest of the page slides over it as a white sheet (`components/layout/Curtain.tsx`). Only when the whole hero fits on screen, so a tall hero (About on phones) scrolls normally; Contact and case studies have their own heroes and scroll normally.
- **Travelling bubble (every page):** a glossy blue bubble lands on the full stop of the heading nearest the upper third of the screen, with a ring splash; between headings it waits on the right edge as a scroll marker (`TravelOrb.tsx`; founder, 2026-11-27). Hidden during the Home dive.
- **Scroll-speed text rows:** the Home `Marquee` runs faster while the page scrolls and eases back (`MarqueeBoost.tsx`).
- **Screenshot parallax:** the MindMesh screenshot drifts slowly inside its frame (CSS view timeline only).
- **Smooth scrolling:** Lenis (`components/layout/SmoothScroll.tsx`, pinned at 1.3.27). Phones keep native touch scrolling.
- All of these switch off under `prefers-reduced-motion`.

What the site also keeps:
- Hover and focus feedback on buttons, cards and links (colour, border, shadow, a small lift).
- Buttons follow the hero prototype artifact (founder, 2026-11-27): pill, 56px tall, they lean toward the pointer (`MagneticButtons.tsx`, mouse only), the primary fills dark blue from the pointer and the secondary fills from below.
- The Home hero copy is centred, and its full stop is a glossy blue bubble that the dive flies into (founder, 2026-11-27).
- The big scrolling text rows on Home (`Marquee`) as the one moving moment, and the tech-logo strip (`TechStrip`), which only moves once a visitor opens it.
- Functional indicators only, such as the form's loading spinner and the open/close of the technology buttons.

Not allowed without the founder's approval (beyond the scenes listed above): new pinned or sticky scroll scenes, scroll-scrubbed or parallax effects, sideways-scrolling showcases, word-by-word blur-in headlines, page-transition effects, a custom cursor, moving or tone-shifting backgrounds, circuit traces, infinite loops (pings, pulses, spinning globes, looping demos) and live `backdrop-filter` blur.

- Animate `transform` and `opacity` only.
- `prefers-reduced-motion: reduce` stops the remaining loops.
- Nothing may cost the performance budget in `instructions.md` §5 (2.5s load target).

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
- Spacing comes from five tokens in `app/codtk.css` (founder, 2026-11-19), phone → desktop at 1024px: section `--sec-y` 56 → 96, heading-to-content `--head-gap` 16 → 24 (tightened 2026-11-26: headings sit close to their content), grid `--grid-gap` 12 → 20, card padding `--card-pad` 16 → 24, side margin `--gutter` 16 → 32. Don't add one-off section, grid or card spacing.
- Phones stay compact: no card fills the screen. Headings are smaller (hero 38px, page titles 32px, section titles 26px), decorative giant numbers and CLI lines are hidden, each service's deliverables and tech fold behind "What's included", and Why CodTK shows the CodTK column only.
