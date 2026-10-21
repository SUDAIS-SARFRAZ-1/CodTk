# PRD v2 — Open Questions (Q&A)

Answer each question on its **Answer:** line. "Not sure" and "skip for now" are valid answers. Nothing gets guessed. Each question says why it matters, so you can see what it unblocks.

We'll go one topic at a time, in this order. The topics marked ⭐ block the most work.

---

## Topic 1 — Company identity & legal ⭐

**Q-1.1** Is the rename to CodTK final, and should all `.agent/` docs, `package.json` and code comments drop "AptiScript"? Should the GitHub repo or folder be renamed too?
*Why:* the docs still say AptiScript everywhere.
**Answer:**

**Q-1.2** Is the domain codtk.com purchased? Who is the registrar, and is it connected to Vercel yet?
*Why:* this blocks launch, email sending from @codtk.com, canonical URLs and the sitemap.
**Answer:**

**Q-1.3** How should the founder's name appear publicly? The old PRD uses both "Sudais Sarfraz" and "Sheikh Sudais".
**Answer:**

**Q-1.4** Is the business registered (SECP / NTN / sole proprietorship / not yet)? If yes, what number should the footer show?
*Why:* FR-11. Enterprise clients often check this.
**Answer:**

**Q-1.5** What are the URLs for LinkedIn, Instagram, Facebook and X?
**Answer:**

**Q-1.6** Should the site show a full office address, or only "Lahore, Pakistan"? Do you have an office, or are you remote?
**Answer:**

**Q-1.7** Will you set up a domain email (e.g. hello@codtk.com), or stay on codtk.official@gmail.com?
*Why:* a Gmail address weakens credibility for B2B clients.
**Answer:**

---

## Topic 2 — Team ⭐

**Q-2.1** How many people actually work at CodTK today (full-time, part-time, contract)? The old PRD claims 10.
*Why:* rules §4 says we can't publish a number that isn't true.
**Answer:**

**Q-2.2** Who agrees to be shown publicly with a name, role, real photo and LinkedIn? List each person.
**Answer:**

**Q-2.3** If people decline, should the About page show team functions only (frontend/backend/DevOps), as it does now?
**Answer:**

**Q-2.4** Founder bio: your degree, university, graduation year, years of experience, a photo and your LinkedIn URL.
**Answer:**

**Q-2.5** Are there any certifications, awards or past employers you're allowed to mention?
**Answer:**

---

## Topic 3 — Market & positioning

**Q-3.1** Which market comes first: Pakistan/local, international (US/UK/EU/Gulf), or both? Rank them.
*Why:* this sets the copy tone, currency, keywords and the time zone we state.
**Answer:**

**Q-3.2** Rank the audience segments: startup founders, SMBs, enterprises/agencies, recruiters.
**Answer:**

**Q-3.3** Should the target keywords stay ("software house Lahore", "custom software development Pakistan", "MERN stack development agency")? Any to add?
**Answer:**

**Q-3.4** In one sentence, why should a client pick CodTK over another Lahore software house?
*Why:* this drives the "Why CodTK" section and the hero copy.
**Answer:**

**Q-3.5** Are there competitors or reference sites whose look or approach you like, or dislike?
**Answer:**

---

## Topic 4 — Services & offer

**Q-4.1** Are the six services final (Web, Mobile, Backend & API, Cloud & DevOps, Automation, Consulting)? Is iOS delivery offered, or Android/PWA only? Is UI/UX design a separate service?
**Answer:**

**Q-4.2** Should the site show pricing? Options: no pricing, "starting from", or packages.
**Answer:**

**Q-4.3** What are your typical project timelines, and is there a minimum project size?
**Answer:**

**Q-4.4** What response time can you honestly promise (e.g. "reply within 24 hours")? What are your working hours and time zone?
**Answer:**

**Q-4.5** Tech Stack page: confirm every technology the team has actually shipped with. The repo has logos for TypeScript, Python, Kotlin, Expo, Firebase, AWS and PWA, plus the v1.2 list. Should anything be removed or added?
**Answer:**

**Q-4.6** Do you offer post-launch support or maintenance plans? Should they be mentioned?
**Answer:**

---

## Topic 5 — Portfolio

**Q-5.1** Besides MindMesh and Organic Store, are there other projects to add (founder, team or client work)?
**Answer:**

**Q-5.2** Do you have client work you can show publicly, or only describe anonymously (e.g. "a logistics company in Lahore")?
**Answer:**

**Q-5.3** Should Home show 1 or 2 featured projects, and which ones?
**Answer:**

**Q-5.4** Is there a live demo URL for MindMesh or Organic Store? Is the Organic Store repo public?
**Answer:**

**Q-5.5** Do you have any real testimonials (with name and permission), or should that section stay hidden?
**Answer:**

---

## Topic 6 — Contact & lead capture

**Q-6.1** Which booking tool should we use: Calendly, Cal.com, Google Calendar booking or none? Please share the link.
**Answer:**

**Q-6.2** Is the phone number the same as WhatsApp (+92 301 9492010), or is there a separate one? Should we show it as callable?
**Answer:**

**Q-6.3** Should the form add fields for budget range, timeline or company name, or stay at 4 fields?
*Why:* more fields mean better-qualified leads but fewer submissions.
**Answer:**

**Q-6.4** Do you want file attachments (e.g. a brief or spec PDF)?
**Answer:**

**Q-6.5** Should visitors get an automatic "we received your message" email?
**Answer:**

**Q-6.6** Who receives the leads? Only codtk.official@gmail.com, or a CC as well? Should leads also be saved somewhere (e.g. a Google Sheet or database)?
*Why:* adding a database needs explicit approval (CLAUDE.md §4).
**Answer:**

---

## Topic 7 — Engagement model & legal

**Q-7.1** Do you sign an NDA or contract before every project? Do you have a template?
**Answer:**

**Q-7.2** What payment structures do you offer: fixed price, milestones (e.g. 30/40/30), hourly or monthly retainer?
**Answer:**

**Q-7.3** Which payment methods do you actually accept? Note: Stripe doesn't support Pakistan-registered businesses. Options include Wise, Payoneer, bank transfer, JazzCash/Easypaisa and PayPal.
**Answer:**

**Q-7.4** Do clients own the code and IP after full payment?
**Answer:**

**Q-7.5** Who writes or approves the Privacy Policy and Terms: you, a lawyer, or me drafting from a template for your review? Do they need to cover international clients (GDPR)?
**Answer:**

---

## Topic 8 — Analytics & SEO

**Q-8.1** Which analytics tool: Google Analytics (free, needs a cookie banner), Plausible (paid, privacy-friendly) or Vercel Analytics?
**Answer:**

**Q-8.2** Do you have, or want, a Google Business Profile and Google Search Console?
**Answer:**

**Q-8.3** Should I add structured data (Organization/LocalBusiness) so Google shows your business details?
**Answer:**

**Q-8.4** Should the Open Graph share image be one branded image for all pages, or one per page?
**Answer:**

---

## Topic 9 — Technical decisions

**Q-9.1** Which spam protection: Cloudflare Turnstile (free, recommended), hCaptcha, or a durable rate limit (Upstash Redis)? Or both?
*Why:* rules §7 says the form can't launch without it. The current in-memory limit resets on serverless.
**Answer:**

**Q-9.2** Can you verify codtk.com in Resend so emails send from e.g. website@codtk.com? Who has DNS access?
*Why:* the Resend sandbox sender only delivers to the account owner's email and may land in spam.
**Answer:**

**Q-9.3** Testing: OK to add Vitest for form validation and Playwright for one end-to-end test (rules §42/§43)?
**Answer:**

**Q-9.4** CI conflict: `rules.md` says no CI, while `instructions.md` says GitHub Actions runs on every PR. Which is correct? I'll fix the other doc.
**Answer:**

**Q-9.5** Motion: keep the hand-rolled motion (no library), or add Framer Motion or GSAP?
**Answer:**

**Q-9.6** Who owns the Vercel account, and is the project connected to the GitHub repo?
**Answer:**

---

## Topic 10 — Timeline, KPIs & ownership

**Q-10.1** What are your numeric targets? For example, "10 leads/month within 90 days".
**Answer:**

**Q-10.2** What is the target launch date?
**Answer:**

**Q-10.3** Who supplies content (bios, photos, case studies) and by when? You, or someone on the team?
**Answer:**

**Q-10.4** Will you be the only reviewer/approver, or is there a second reviewer?
**Answer:**

---

## Topic 11 — Scope confirmation

**Q-11.1** Should these stay out of v2: blog, careers page, client portal, Urdu version, payments? Do you want any of them now?
**Answer:**

**Q-11.2** Page rebuild order on the design system after Home: Services → Portfolio → About → Process → Tech Stack → Contact → Legal. Should the order change?
**Answer:**
