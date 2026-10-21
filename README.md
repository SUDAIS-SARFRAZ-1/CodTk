# CodTK — Corporate Website

CodTK is a software company in Lahore, Pakistan, building custom web, mobile, backend and cloud software. **Building Next Generation Software.**

This repo is the company's public marketing/lead-generation website at [codtk.com](https://codtk.com): a Next.js (App Router) + Tailwind CSS site with a contact form as the primary lead-capture flow.

## Project Guidelines

Full project documentation lives in [`.agent/`](.agent/CLAUDE.md). Start there. It links to the PRD, hard rules, stack/architecture instructions, state-management patterns and UI/UX design spec.

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

Other commands:

```bash
npm run build      # production build
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Environment variables

Set these in Vercel (Project → Settings → Environment Variables) for production, and in `.env.local` for local dev. See [`.env.example`](.env.example).

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends contact-form leads by email (Resend). |
| `RESEND_FROM` | Sender address, e.g. `CodTK Website <website@codtk.com>`. codtk.com must be verified in Resend first. Unset = Resend's sandbox sender. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile spam check on the contact form. Once the secret is set, submissions without a valid token are rejected. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL. Defaults to `https://codtk.com`. |

## Deployment

Deployed on [Vercel](https://vercel.com). Production deploys from `main`.
