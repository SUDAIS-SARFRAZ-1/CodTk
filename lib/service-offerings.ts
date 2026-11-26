// The one service list (founder's briefs of 2026-10-22 and 2026-11-19: 12 services in three groups;
// Shopify is not offered). The Services page, home service cards, footer and contact form all read
// it; the home cards' short copy lives in lib/services.ts, keyed by `id`.
// Add a service here and the page, anchor chips and contact form pick it up; no layout code changes.

export type ServiceTone =
  | "web"
  | "mobile"
  | "saas"
  | "erp"
  | "api"
  | "wordpress"
  | "seo"
  | "marketing"
  | "transform"
  | "ai"
  | "cloud"
  | "consulting";

export const SERVICE_GROUPS = ["Build", "Grow", "Plan & Run"] as const;

export type ServiceOffering = {
  id: ServiceTone;
  group: (typeof SERVICE_GROUPS)[number];
  title: string;
  cmd: string;
  description: string;
  deliverables: string[];
  tech: string[];
  // Previous titles, so older shared links (`/contact?service=<old title>`) still pre-fill the form.
  legacyTitles?: string[];
};

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    id: "web",
    group: "Build",
    title: "Websites & Web Apps",

    cmd: "codtk init web --stack next --ssr",
    description:
      "Custom web development for business websites and web apps, built for speed, SEO and easy maintenance, from marketing sites to full internal tools. We build customer portals, internal tools, marketplaces and dashboards.",
    deliverables: [
      "Responsive website or web app, built for speed and search",
      "Admin area so your team can update content",
      "Logins, roles and permissions where you need them",
      "Hosting, domain and a secure connection set up",
      "Set up so Google can find and list it",
      "Source code and every account handed to you",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    legacyTitles: ["Web Application Development", "Web Applications"],
  },
  {
    id: "mobile",
    group: "Build",
    title: "Mobile Apps (Android & iOS)",

    cmd: "codtk init mobile --targets android,ios",
    description:
      "Mobile app development for Android and iPhone, built the way your project needs: one cross-platform app for both, an Android-only app, or a web app people install on any phone. Notifications, offline use, payments and app-store listing are handled for you.",
    deliverables: [
      "One app for Android and iPhone, or a native Android app",
      "Designs of the key screens before the build",
      "Push notifications and offline use where needed",
      "Connection to your backend, or one we build",
      "Google Play and App Store submission",
      "Source code and store listings in your name",
    ],
    tech: ["React Native", "Flutter", "Expo", "Kotlin", "Firebase", "PWA", "TypeScript"],
    legacyTitles: ["Mobile Application Development", "Mobile Applications"],
  },
  {
    id: "saas",
    group: "Build",
    title: "Subscription Software (SaaS)",

    cmd: "codtk init saas --tenants multi --billing stripe",
    description:
      "SaaS development for subscription software that serves many customers from one platform, with billing, team roles and analytics in place from the first release. We begin with discovery, so your MVP solves one problem well.",
    deliverables: [
      "Product discovery and a first-release scope",
      "Each customer's data kept separate and private",
      "Monthly billing and invoices, handled automatically",
      "Different access levels for staff and admins",
      "Usage analytics and an admin dashboard",
      "Source code and every account handed to you",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis", "AWS"],
    legacyTitles: ["SaaS Products"],
  },
  {
    id: "erp",
    group: "Build",
    title: "Business Management Software (ERP)",

    cmd: "codtk init erp --modules inventory,sales,hr,accounts",
    description:
      "Custom ERP development built around the way your business already works, instead of bending your workflow to fit off-the-shelf software. Inventory, sales, HR and accounts share one database, so every team works from the same numbers.",
    deliverables: [
      "A map of your current workflow and the modules you need",
      "Inventory, sales, purchasing, HR and accounts modules",
      "Roles and permissions for each department",
      "Reports and dashboards for managers",
      "Import of your existing records from sheets or old software",
      "Training for your team and source code handed to you",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Redis", "Docker"],
    legacyTitles: ["Custom ERP Systems"],
  },
  {
    id: "api",
    group: "Build",
    title: "Backends & Integrations (APIs)",

    cmd: "codtk init api --auth rbac --realtime",
    description:
      "Backend and API development for the hidden part that makes apps work: secure logins, access levels, payments and live updates. Everything is documented and tested under heavy use before launch.",
    deliverables: [
      "Connections your website and app use to talk to each other, fully documented",
      "A well-organised database for your information",
      "Secure logins, access levels and a record of who changed what",
      "Links to payment providers and the other tools you use",
      "Live updates, and heavy jobs handled in the background",
      "Tested to work, even under heavy use",
    ],
    tech: ["Node.js", "Express", "NestJS", "GraphQL", "PostgreSQL", "MongoDB", "Redis", "WebSockets"],
    legacyTitles: ["Backend & API Development", "Backend Systems and APIs", "Backend Systems & APIs"],
  },
  {
    id: "wordpress",
    group: "Build",
    title: "WordPress Websites",

    cmd: "codtk init wordpress --theme custom --cache on",
    description:
      "WordPress development for fast websites your team can update without a developer: pages, posts, menus and forms from the familiar WordPress editor. Built on a lean custom theme with only the plugins you need, so the site stays quick and secure.",
    deliverables: [
      "A custom theme designed around your brand",
      "Editable pages, posts, menus and contact forms",
      "Set up to load quickly",
      "Security hardening, backups and updates",
      "Set up so Google can find and list it",
      "A short guide so your team can edit the site",
    ],
    tech: ["WordPress", "PHP", "MySQL", "JavaScript"],
  },
  {
    id: "seo",
    group: "Grow",
    title: "Get Found on Google (SEO)",

    cmd: "codtk audit seo --site yourbusiness.com",
    description:
      "SEO services for small business that get you found on Google by the clients you want. We fix the technical problems that hold a site back, improve pages for the searches your customers make, and set up your Google Business Profile for local SEO.",
    deliverables: [
      "A check-up of your site: speed, errors and how Google sees it",
      "Keyword research for the searches your clients make",
      "Page titles, descriptions and content improvements",
      "Google Business Profile set-up for local search",
      "Google's free tracking tools set up",
      "A monthly report of rankings, traffic and next steps",
    ],
    tech: ["Google Search Console", "Google Analytics", "Google Business Profile", "Schema.org"],
    legacyTitles: ["SEO"],
  },
  {
    id: "marketing",
    group: "Grow",
    title: "Online Advertising",

    cmd: "codtk launch campaign --goal leads --budget monthly",
    description:
      "Performance marketing: paid campaigns on the platforms that fit your business, measured by the leads and sales they bring rather than clicks. Tracking is set up first, so every rupee or dollar spent can be traced to a result.",
    deliverables: [
      "A plan: which platforms, which audience, what budget",
      "Tracking set up first, so you see which ads bring enquiries",
      "Ad campaigns on Google, Meta (Facebook and Instagram) or TikTok",
      "Landing pages built to turn clicks into enquiries",
      "Ongoing testing of ads, audiences and budgets",
      "A monthly report of spend, leads and cost per lead",
    ],
    tech: ["Google Ads", "Meta Ads", "TikTok Ads", "Google Analytics", "Google Tag Manager"],
    legacyTitles: ["Performance Marketing"],
  },
  {
    id: "transform",
    group: "Plan & Run",
    title: "Taking Your Business Online",

    cmd: "codtk migrate --from paper --to online",
    description:
      "Take your physical business online: orders, bookings, stock and payments move from phone calls, registers and spreadsheets into simple software your staff and customers can use. We change one part at a time, so the business keeps running throughout.",
    deliverables: [
      "A review of how the business runs today",
      "A step-by-step plan, starting where it saves the most time",
      "A website, online ordering or booking where it fits",
      "Digital records for stock, customers and payments",
      "Online payments through local and international providers",
      "Staff training and support while the change settles in",
    ],
    tech: ["Next.js", "React Native", "Node.js", "PostgreSQL", "WordPress"],
    legacyTitles: ["Digital Transformation"],
  },
  {
    id: "ai",
    group: "Plan & Run",
    title: "AI & Business Automation",

    cmd: "codtk automate --from orders --to invoices",
    description:
      "AI automation for business that connects the tools you already use and cuts out repetitive work. Where it helps, we add AI assistants that answer from your own documents and pull data from files, always with a person checking the result.",
    deliverables: [
      "A review of the manual work worth automating",
      "AI assistants and document extraction from your own files",
      "Connections between the tools you already use",
      "Automatic tasks, reports and alerts on a schedule",
      "Alerts when something fails, with human review where it matters",
      "A written guide to how it all works",
    ],
    tech: ["Python", "OpenAI", "FastAPI", "pgvector", "Node.js", "Webhooks", "REST APIs"],
    legacyTitles: ["Business Process Automation", "AI and Automation"],
  },
  {
    id: "cloud",
    group: "Plan & Run",
    title: "Cloud Hosting & Updates",

    cmd: "codtk deploy --ci github-actions --env production",
    description:
      "DevOps and cloud services for reliable hosting and safe updates, so your product stays online and every change goes live without mistakes. We watch it after launch and keep the monthly bill in check.",
    deliverables: [
      "A hosting plan, moving from your old host, and lower monthly costs",
      "Every update checked automatically before it goes live",
      "Hosting with a trusted provider such as Amazon, Microsoft or Google",
      "The same setup everywhere, so what works in testing works live",
      "A test copy of your product, plus alerts if anything goes down",
      "Backups, HTTPS and safely stored secrets",
      "Handover notes so your team can run it",
    ],
    tech: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Vercel", "Render"],
    legacyTitles: ["Cloud & DevOps Solutions", "DevOps and Cloud", "Cloud & DevOps"],
  },
  {
    id: "consulting",
    group: "Plan & Run",
    title: "Technical Advice & Planning",

    cmd: "codtk plan --scope v1 --risks",
    description:
      "Software consulting: an outside expert's plan before you spend money on building. You get a written plan to keep, whoever builds it.",
    deliverables: [
      "A review of your idea, product or existing code",
      "Which technology to use, and how to structure it",
      "A first-version scope: what to build first",
      "Risks, estimates and open questions",
      "A written technical plan you keep",
      "The option to have us build it afterwards",
    ],
    tech: ["System Design"],
    legacyTitles: ["Custom Software Consulting", "Software Consulting"],
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
    title: "Fixed-price project",
    text: "One agreed result at one fixed price, agreed in writing first. You pay in stages, for example 30% / 40% / 30%.",
    fit: "Best for a new website or app",
    cta: "Scope a Project",
    icon: "fixed",
  },
  {
    title: "Dedicated team",
    text: "Your own CodTK team working on your plans month by month, with a weekly demo and a shared chat for quick decisions.",
    fit: "Best for products that keep growing",
    cta: "Discuss a Team",
    icon: "team",
    featured: true,
  },
  {
    title: "Monthly support",
    text: "We watch your product, fix problems, keep it secure and keep improving it, for a monthly fee. The first month of fixes after launch is free.",
    fit: "Best once your product is live",
    cta: "Arrange Support",
    icon: "support",
  },
];

export const CONSULTING_MODEL = {
  title: "Advice before you build",
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
  { label: "Automatic testing", icon: "tests" },
  { label: "Every change checked by a second engineer", icon: "review" },
  { label: "Alerts and a plan if something breaks", icon: "monitor" },
  { label: "Clear instructions handed over", icon: "docs" },
  { label: "Security checks", icon: "shield" },
  { label: "Usable by people with disabilities", icon: "a11y" },
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

// Contact links: the quote form is pre-filled with the service title (prd.md FR-3). A fragment, not
// a query, so each service doesn't create a duplicate crawlable /contact URL.
export const quoteHref = (title: string) => `/contact#service=${encodeURIComponent(title)}`;
