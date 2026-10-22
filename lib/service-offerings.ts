// The one service list (founder's Services brief, 2026-10-22, merged with the earlier six so nothing
// was lost). The Services page, home service cards, footer and contact form all read it; the home
// cards' short copy lives in lib/services.ts, keyed by `id`.
// Add a service here and the page, anchor chips and contact form pick it up; no layout code changes.

export type ServiceTone = "web" | "mobile" | "saas" | "ai" | "api" | "cloud" | "consulting";

export type ServiceOffering = {
  id: ServiceTone;
  title: string;
  tag: string;
  cmd: string;
  description: string;
  deliverables: string[];
  tech: string[];
  // Previous title, so older shared links (`/contact?service=<old title>`) still pre-fill the form.
  legacyTitle?: string;
};

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    id: "web",
    title: "Web Applications",
    tag: "web · next.js",
    cmd: "codtk init web --stack next --ssr",
    description:
      "Custom web applications and business websites built for speed, SEO, and easy maintenance — from marketing sites to full internal tools. We build customer portals, internal tools, marketplaces and dashboards.",
    deliverables: [
      "Responsive website or web app, built for speed and search",
      "Admin area so your team can update content",
      "Logins, roles and permissions where you need them",
      "Hosting, domain and HTTPS set up",
      "Search basics: titles, sitemap and page speed",
      "Source code and every account handed to you",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    legacyTitle: "Web Application Development",
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    tag: "android · ios",
    cmd: "codtk init mobile --targets android,ios",
    description:
      "Mobile apps built the way your project needs — cross-platform apps with React Native, native Android apps in Kotlin, or installable progressive web apps (PWAs) that run on any phone from a single codebase. Offline sync, push notifications, payments and store submission are handled for you.",
    deliverables: [
      "One app for Android and iPhone, or a native Android app",
      "Designs of the key screens before the build",
      "Push notifications and offline use where needed",
      "Connection to your backend, or one we build",
      "Google Play and App Store submission",
      "Source code and store listings in your name",
    ],
    tech: ["React Native", "Flutter", "Expo", "Kotlin", "Firebase", "PWA", "TypeScript"],
    legacyTitle: "Mobile Application Development",
  },
  {
    id: "saas",
    title: "SaaS Products",
    tag: "saas · multi-tenant",
    cmd: "codtk init saas --tenants multi --billing stripe",
    description:
      "Subscription software that serves many customers from one platform, with billing, team roles and analytics in place from the first release. We begin with discovery, so the first version solves one problem well.",
    deliverables: [
      "Product discovery and a first-release scope",
      "Multi-tenant architecture that keeps each customer's data separate",
      "Subscription billing and invoices through Stripe",
      "Role-based access for teams and administrators",
      "Usage analytics and an admin dashboard",
      "Source code and every account handed to you",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis", "AWS"],
  },
  {
    id: "ai",
    title: "AI and Automation",
    tag: "ai · workflows",
    cmd: "codtk automate --from orders --to invoices",
    description:
      "Custom automation that connects your existing tools and APIs, cutting out repetitive manual work across your business. Where it helps, we add AI assistants that answer from your own documents and extract data from files, always with a human review step.",
    deliverables: [
      "A review of the manual work worth automating",
      "AI assistants and document extraction from your own files",
      "Connections between the tools you already use",
      "Scheduled jobs, webhooks, reports and notifications",
      "Alerts when something fails, with human review where it matters",
      "A written guide to how it all works",
    ],
    tech: ["Python", "OpenAI", "FastAPI", "pgvector", "Node.js", "Webhooks", "REST APIs"],
    legacyTitle: "Business Process Automation",
  },
  {
    id: "api",
    title: "Backend Systems and APIs",
    tag: "rest · realtime",
    cmd: "codtk init api --auth rbac --realtime",
    description:
      "Secure, well-structured backend systems and APIs — authentication, role-based access, webhooks, and real-time features included. Every API is documented with OpenAPI and load-tested before launch.",
    deliverables: [
      "REST and GraphQL API design, documented with OpenAPI",
      "Database design in PostgreSQL or MongoDB",
      "Authentication, role-based access and audit trails",
      "Payments, ERP, webhooks and third-party integrations",
      "Real-time updates over WebSockets, and background queues",
      "Automated and load tests for the core logic",
    ],
    tech: ["Node.js", "Express", "NestJS", "GraphQL", "PostgreSQL", "MongoDB", "Redis", "WebSockets"],
    legacyTitle: "Backend & API Development",
  },
  {
    id: "cloud",
    title: "DevOps and Cloud",
    tag: "ci/cd · cloud",
    cmd: "codtk deploy --ci github-actions --env production",
    description:
      "CI/CD pipelines and cloud deployment so your product ships reliably and scales without manual, error-prone releases. Infrastructure is defined as code, monitored after launch and reviewed for cost.",
    deliverables: [
      "Cloud architecture, migration and cost optimisation",
      "A pipeline that tests and deploys every change",
      "Hosting on AWS, Azure, Google Cloud, Vercel or Render, defined as code",
      "Docker containers and Kubernetes for consistent environments",
      "Separate staging and production, with monitoring",
      "Backups, HTTPS and safely stored secrets",
      "Handover notes so your team can run it",
    ],
    tech: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Vercel", "Render"],
    legacyTitle: "Cloud & DevOps Solutions",
  },
  {
    id: "consulting",
    title: "Software Consulting",
    tag: "architecture",
    cmd: "codtk plan --scope v1 --risks",
    description:
      "Technical strategy and system design for teams that need an outside expert to plan architecture before committing to a build. You receive a written plan you keep, whoever builds it.",
    deliverables: [
      "A review of your idea, product or existing code",
      "Recommended architecture and tech stack",
      "A first-version scope: what to build first",
      "Risks, estimates and open questions",
      "A written technical plan you keep",
      "The option to have us build it afterwards",
    ],
    tech: ["System Design"],
    legacyTitle: "Custom Software Consulting",
  },
];

export type EngagementIcon = "fixed" | "team" | "support" | "consulting";

// prd.md §6.6 engagement model, plus the brief's Dedicated team tier.
export const ENGAGEMENT_MODELS: {
  title: string;
  text: string;
  fit: string;
  cta: string;
  icon: EngagementIcon;
  featured?: boolean;
}[] = [
  {
    title: "Fixed-scope project",
    text: "A defined outcome at a fixed price, with scope, timeline and cost agreed in writing before work starts, paid in milestones such as 30% / 40% / 30%.",
    fit: "Best for new builds and MVPs",
    cta: "Scope a Project",
    icon: "fixed",
  },
  {
    title: "Dedicated team",
    text: "A cross-functional CodTK team working on your roadmap, with a weekly demo and a shared channel for day-to-day decisions.",
    fit: "Best for ongoing product development",
    cta: "Discuss a Team",
    icon: "team",
    featured: true,
  },
  {
    title: "Support and retainer",
    text: "Monitoring, fixes, security updates and planned improvements on a monthly retainer. The first month of bug fixes after launch is free.",
    fit: "Best for live, business-critical systems",
    cta: "Arrange Support",
    icon: "support",
  },
];

export const CONSULTING_MODEL = {
  title: "Technical consulting",
  text: "An outside engineer's view before you commit: what to build first, how to build it and what could go wrong, as a written plan.",
  fit: "Best before a big build",
};

export type StandardIcon = "tests" | "review" | "monitor" | "docs" | "shield" | "a11y";

// Delivery standard: targets and practice for every build (founder's brief). Targets, not past scores.
export const LIGHTHOUSE_TARGETS: { label: string; value: number; tone: ServiceTone }[] = [
  { label: "Performance", value: 95, tone: "web" },
  { label: "Accessibility", value: 100, tone: "api" },
  { label: "Best practices", value: 100, tone: "mobile" },
  { label: "SEO", value: 100, tone: "cloud" },
];

export const BUILD_CHECKLIST: { label: string; icon: StandardIcon }[] = [
  { label: "Tests in CI", icon: "tests" },
  { label: "Peer code review", icon: "review" },
  { label: "Monitoring and runbooks", icon: "monitor" },
  { label: "Documentation and handover", icon: "docs" },
  { label: "Security audits", icon: "shield" },
  { label: "WCAG 2.1 AA accessibility", icon: "a11y" },
];

export const MARQUEE_TECH = [
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "Python",
  "Flutter",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud",
  "Terraform",
  "OpenAI",
  "Stripe",
];

// Contact links: the quote form is pre-filled with the service title (prd.md FR-3).
export const quoteHref = (title: string) => `/contact?service=${encodeURIComponent(title)}`;
