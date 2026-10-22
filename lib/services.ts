import type { ServiceTone } from "@/lib/service-offerings";

// Home service cards (components/codtk/ServiceStack.tsx), keyed by the service ids in
// lib/service-offerings.ts, the one service list. `blurb` is the short card copy, `example` labels
// the everyday example drawn beside it (components/codtk/ServiceExamples.tsx): illustrations of the
// kind of thing we build, never presented as client work (rules.md §1). Kept clear of the other home
// sections so the home page doesn't repeat itself.
export const SERVICE_DETAILS: Record<ServiceTone, { blurb: string; example: string; built: string; cta: string }> = {
  web: {
    blurb: "Business websites and custom web apps built for speed and search, and easy for your team to update.",
    example: "A clinic's online booking page",
    built: "Built with Next.js, React, TypeScript and Node.js",
    cta: "Get a quote for a web app",
  },
  mobile: {
    blurb:
      "Apps for Android and iPhone from one codebase, a native Android app, or an installable web app, chosen to fit your users and budget.",
    example: "Order tracking for a local shop",
    built: "Built with React Native, Expo, Kotlin and Firebase",
    cta: "Get a quote for an app",
  },
  saas: {
    blurb: "One product sold to many customers, each with their own workspace, plan and monthly billing.",
    example: "A booking tool sold to many salons",
    built: "Built with Next.js, Node.js, PostgreSQL and Stripe",
    cta: "Get a quote for a SaaS product",
  },
  ai: {
    blurb: "We connect the tools you already use so routine work happens on its own, without copy and paste.",
    example: "From new order to invoice, hands-free",
    built: "Built with Node.js, Python, webhooks and your existing apps",
    cta: "Get a quote for automation",
  },
  api: {
    blurb: "The secure engine behind your product: logins, permissions for each kind of user, payments and live updates.",
    example: "A school fee portal",
    built: "Built with Node.js, Express, PostgreSQL and Redis",
    cta: "Get a quote for a backend",
  },
  cloud: {
    blurb: "Hosting that keeps your product online when it matters, and releases that go out without taking it down.",
    example: "An online store on sale day",
    built: "Built with Docker, GitHub Actions, Vercel and AWS",
    cta: "Get a quote for cloud setup",
  },
  consulting: {
    blurb: "An outside engineer's view before you commit: what to build first, how to build it, and what could go wrong.",
    example: "Planning a marketplace before building it",
    built: "Delivered as a written technical plan you keep",
    cta: "Get a quote for a plan",
  },
};
