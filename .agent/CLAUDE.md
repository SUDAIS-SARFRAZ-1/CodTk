# CLAUDE.md — Agent Operating Guide

You are working on the **CodTK corporate website** — a public marketing site (not an app with accounts, carts, or a database of business records). Its job is to generate leads and make a brand-new software house look credible to a first-time client. This file is your entry point. Read it fully at the start of every session, then load the documents it points to.

@prd.md
@rules.md
@instructions.md
@state-management.md
@ui-ux-design.md

---

## 1. What "good" looks like on this project

Every change should leave the site closer to three outcomes at once:

1. **Credible.** A first-time visitor with no prior knowledge of CodTK should come away believing this is a real, professional company — not a template site or a scam. See `prd.md` §6.7 (Trust & Credibility Elements) for the concrete requirements this drives.
2. **Fast and findable.** The site's own performance and SEO are part of the sales pitch ("we build fast, professional software") — see `prd.md` §8.1 and §8.4.
3. **Simple and correct.** This is a content + lead-capture site, not an application. Resist adding backend complexity (databases, auth, admin panels) that the PRD doesn't call for.

If a "nice to have" fights simplicity or credibility, simplicity and credibility win.

## 2. Document map

| File | What it governs | When you must check it |
|---|---|---|
| `prd.md` | Feature scope, page structure, functional/non-functional requirements, KPIs | Before building or changing any page or feature |
| `rules.md` | Hard, numbered rules. A rule beats convenience. | Before writing any code |
| `instructions.md` | Stack, architecture, performance/SEO/accessibility budgets | When choosing an approach or a library |
| `state-management.md` | When (and when not) to reach for React Query / Zustand on a mostly-static site | Any time you add client-side state or an async form flow |
| `ui-ux-design.md` | Visual language, design tokens, components, page blueprints, motion, accessibility | Any time you touch UI |

Reference order when a question comes up: `prd.md` → `rules.md` → `instructions.md` → `ui-ux-design.md` → `state-management.md` → existing code in the repo → ask the user.

## 3. How to work

**Before coding**
- Restate the task in one or two sentences and list the files/pages you expect to touch.
- Check `prd.md` for scope. If a feature isn't listed there (e.g. a blog, a client login, payment processing — all explicitly out of scope for v1 per §5.2), ask before building it.
- Search the repo for an existing pattern (component, layout, page) and reuse it rather than inventing a parallel one.
- For the contact form or anything that sends data off the client, write a short plan (route, validation schema, spam protection, error states) before writing code.

**While coding**
- Keep changes scoped to one page or feature at a time.
- No placeholder content ships: no lorem ipsum, no fake testimonials or client logos, no invented team members, no fake phone numbers (see `rules.md` §1 and `prd.md`'s credibility discussion — this is a hard rule here, not a style preference).
- Every async region (contact form submit, booking widget, portfolio data if fetched) handles loading, error, and success states.
- Never leave `console.log`, `debugger`, commented-out code, or an unresolved TODO in committed code.

**Before saying you're done — Definition of Done**
- [ ] Lint and type-check pass locally.
- [ ] Page is responsive at 360px, 768px, 1280px, and 1440px.
- [ ] Meets WCAG AA contrast, is keyboard-navigable, images have real alt text.
- [ ] Meta title/description and (where applicable) Open Graph tags are set — see FR-6.
- [ ] No placeholder/fake content anywhere on the page.
- [ ] If a form was touched: client validation exists, but the server independently validates and rejects bad input too (see `rules.md` Contact Form & Backend section).
- [ ] Summarize what you changed, what you tested, and anything you were unsure about.

## 4. Never do these without explicit approval

- Adding a database, ORM, or persistent storage "just in case" — `prd.md` §9 treats a database as optional, only for storing leads, and only if the team decides not to rely on email delivery alone.
- Adding user accounts, login, or an admin dashboard — explicitly out of scope for v1 (`prd.md` §5.2).
- Putting spam/rate-limiting or validation logic only on the frontend — the backend must independently enforce it (see `rules.md`).
- Fabricating any content presented as real: testimonials, client logos, team members, stats, or press mentions.
- Adding a second UI library, a second animation library, or a second state-management library that overlaps an existing choice.
- Committing secrets or `.env` files.
- Disabling a failing lint/test check to unblock a merge.

## 5. When rules conflict with a request

Say so plainly, name the rule or PRD section, propose the closest compliant option, and wait rather than silently picking a side.

## 6. Commands (keep in sync with `package.json` once the project is scaffolded)

```bash
npm run dev            # local dev server
npm run lint
npm run typecheck
npm test               # form validation / component tests
npm run build
```

If a command here doesn't exist in the repo yet, don't guess an alternative — ask, then update this section once it does.
