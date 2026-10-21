import type { Service } from "@/components/sections/ServiceCard";

// Source: prd.md §6.2 — structured by client outcome, not internal tech.
export const SERVICES: Service[] = [
  {
    slug: "web-application-development",
    title: "Web Application Development",
    description:
      "Custom web applications and business websites built for speed, SEO, and easy maintenance — from marketing sites to full internal tools.",
    tech: ["Next.js", "React", "Tailwind CSS", "Node.js"],
  },
  {
    slug: "mobile-application-development",
    title: "Mobile Application Development",
    description:
      "Mobile apps built the way your project needs — cross-platform apps with React Native, native Android apps in Kotlin, or installable progressive web apps (PWAs) that run on any phone from a single codebase.",
    tech: ["React Native", "Kotlin", "PWA", "TypeScript"],
  },
  {
    slug: "backend-api-development",
    title: "Backend & API Development",
    description:
      "Secure, well-structured backend systems and APIs — authentication, role-based access, webhooks, and real-time features included.",
    tech: ["Node.js", "Express", "REST APIs", "Auth & RBAC", "WebSockets"],
  },
  {
    slug: "cloud-devops-solutions",
    title: "Cloud & DevOps Solutions",
    description:
      "CI/CD pipelines and cloud deployment so your product ships reliably and scales without manual, error-prone releases.",
    tech: ["Docker", "GitHub Actions", "Vercel", "Render"],
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    description:
      "Custom automation that connects your existing tools and APIs, cutting out repetitive manual work across your business.",
    tech: ["REST APIs", "Webhooks"],
  },
  {
    slug: "custom-software-consulting",
    title: "Custom Software Consulting",
    description:
      "Technical strategy and system design for teams that need an outside expert to plan architecture before committing to a build.",
    tech: ["System Design"],
  },
];

// Home service cards. `blurb` is the short card copy, `example` labels the everyday example drawn
// beside it (components/codtk/ServiceExamples.tsx): illustrations of the kind of thing we build,
// never presented as client work (rules.md §1). Kept clear of the other home sections so the home page
// doesn't repeat itself.
export const SERVICE_DETAILS: Record<string, { blurb: string; example: string; built: string; cta: string }> = {
  "web-application-development": {
    blurb: "Business websites and custom web apps built for speed and search, and easy for your team to update.",
    example: "A clinic's online booking page",
    built: "Built with Next.js, React, TypeScript and Node.js",
    cta: "Get a quote for a web app",
  },
  "mobile-application-development": {
    blurb:
      "Apps for Android and iPhone from one codebase, a native Android app, or an installable web app, chosen to fit your users and budget.",
    example: "Order tracking for a local shop",
    built: "Built with React Native, Expo, Kotlin and Firebase",
    cta: "Get a quote for an app",
  },
  "backend-api-development": {
    blurb: "The secure engine behind your product: logins, permissions for each kind of user, payments and live updates.",
    example: "A school fee portal",
    built: "Built with Node.js, Express, PostgreSQL and Redis",
    cta: "Get a quote for a backend",
  },
  "cloud-devops-solutions": {
    blurb: "Hosting that keeps your product online when it matters, and releases that go out without taking it down.",
    example: "An online store on sale day",
    built: "Built with Docker, GitHub Actions, Vercel and AWS",
    cta: "Get a quote for cloud setup",
  },
  "business-process-automation": {
    blurb: "We connect the tools you already use so routine work happens on its own, without copy and paste.",
    example: "From new order to invoice, hands-free",
    built: "Built with Node.js, Python, webhooks and your existing apps",
    cta: "Get a quote for automation",
  },
  "custom-software-consulting": {
    blurb: "An outside engineer's view before you commit: what to build first, how to build it, and what could go wrong.",
    example: "Planning a marketplace before building it",
    built: "Delivered as a written technical plan you keep",
    cta: "Get a quote for a plan",
  },
};

// Services page blocks (design system ServicesPage). `cmd` is the decorative CLI line, `deliverables`
// is what the service includes, `tech` uses lib/tech-stack.ts names so logos resolve. Scope only,
// never past client results (rules.md §1).
export const SERVICE_PAGE: Record<string, { tag: string; cmd: string; deliverables: string[]; tech: string[] }> = {
  "web-application-development": {
    tag: "web · next.js",
    cmd: "codtk init web --stack next --ssr",
    deliverables: [
      "Responsive website or web app, built for speed and search",
      "Admin area so your team can update content",
      "Logins, roles and permissions where you need them",
      "Hosting, domain and HTTPS set up",
      "Search basics: titles, sitemap and page speed",
      "Source code and every account handed to you",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  "mobile-application-development": {
    tag: "android · ios",
    cmd: "codtk init mobile --targets android,ios",
    deliverables: [
      "One app for Android and iPhone, or a native Android app",
      "Designs of the key screens before the build",
      "Push notifications and offline use where needed",
      "Connection to your backend, or one we build",
      "Google Play and App Store submission",
      "Source code and store listings in your name",
    ],
    tech: ["React Native", "Expo", "Kotlin", "Firebase", "PWA", "TypeScript"],
  },
  "backend-api-development": {
    tag: "rest · realtime",
    cmd: "codtk init api --auth rbac --realtime",
    deliverables: [
      "API design and documentation",
      "Database design in PostgreSQL or MongoDB",
      "Authentication and role-based access",
      "Payments, webhooks and third-party integrations",
      "Real-time updates over WebSockets",
      "Automated tests for the core logic",
    ],
    tech: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "WebSockets"],
  },
  "cloud-devops-solutions": {
    tag: "ci/cd · cloud",
    cmd: "codtk deploy --ci github-actions --env production",
    deliverables: [
      "A pipeline that tests and deploys every change",
      "Hosting on Vercel, Render or AWS",
      "Docker containers for consistent environments",
      "Separate staging and production",
      "Backups, HTTPS and safely stored secrets",
      "Handover notes so your team can run it",
    ],
    tech: ["Docker", "GitHub Actions", "Vercel", "Render", "AWS"],
  },
  "business-process-automation": {
    tag: "workflows",
    cmd: "codtk automate --from orders --to invoices",
    deliverables: [
      "A review of the manual work worth automating",
      "Connections between the tools you already use",
      "Scheduled jobs and webhooks",
      "Reports and notifications sent automatically",
      "Alerts when something fails",
      "A written guide to how it all works",
    ],
    tech: ["Node.js", "Python", "Webhooks", "REST APIs"],
  },
  "custom-software-consulting": {
    tag: "architecture",
    cmd: "codtk plan --scope v1 --risks",
    deliverables: [
      "A review of your idea, product or existing code",
      "Recommended architecture and tech stack",
      "A first-version scope: what to build first",
      "Risks, estimates and open questions",
      "A written technical plan you keep",
      "The option to have us build it afterwards",
    ],
    tech: ["System Design"],
  },
};
