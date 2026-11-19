import type { ServiceTone } from "@/lib/service-offerings";

// Search data for the per-service pages (/services/<slug>), keyed by the ids in
// lib/service-offerings.ts, which keeps the visible service copy. Added for SEO/AEO (founder,
// 2026-11-19: existing wording stays; SEO additions allowed). Every FAQ answer restates a fact already
// on the site (that service's description or deliverables); no prices, timelines or results are
// promised. Keyword targets and intent are documented in docs/KEYWORD_MAP.md.
export type ServiceSeo = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  audience: string;
  faqs: { question: string; answer: string }[];
};

export const SERVICE_SEO: Record<ServiceTone, ServiceSeo> = {
  web: {
    slug: "web-development",
    title: "Web Development Company in Lahore | CodTK",
    description: "Custom web applications and business websites, built for speed and search, with an admin area your team can use. Fixed quote after discovery.",
    keyword: "web development company Lahore",
    audience: "Businesses that need a fast website, and startups that need a custom web app, portal or internal tool.",
    faqs: [
      { question: "Can my team update the website ourselves?", answer: "Yes. Every website includes an admin area so your team can update content without a developer." },
      { question: "Do you handle hosting and the domain?", answer: "Yes. We set up hosting, the domain and HTTPS, and hand every account over to you." },
    ],
  },
  mobile: {
    slug: "mobile-app-development",
    title: "Mobile App Development (Android & iOS) | CodTK",
    description: "Apps for Android and iPhone from one codebase, native Android apps in Kotlin, or installable web apps, including store submission. Fixed quote.",
    keyword: "mobile app development company",
    audience: "Startups launching an app, and businesses that want customers or staff to use their service on their phones.",
    faqs: [
      { question: "Do you build for both Android and iPhone?", answer: "Yes. We build one app for Android and iPhone from a single codebase with React Native, or a native Android app in Kotlin, depending on what your users need." },
      { question: "Do you publish the app to the stores?", answer: "Yes. Google Play and App Store submission is included, and the source code and store listings are in your name." },
    ],
  },
  saas: {
    slug: "saas-development",
    title: "SaaS Development Company | CodTK",
    description: "Subscription software that serves many customers from one platform, with billing, team roles and analytics from the first release.",
    keyword: "SaaS development company",
    audience: "Founders turning an idea into an online product sold to many customers on a subscription.",
    faqs: [
      { question: "How is each customer's data kept separate?", answer: "We use a multi-tenant architecture that keeps each customer's data separate, with role-based access for teams and administrators." },
      { question: "Can you set up subscription billing?", answer: "Yes. Subscription billing and invoices run through Stripe, with usage analytics and an admin dashboard." },
    ],
  },
  erp: {
    slug: "custom-erp-development",
    title: "Custom ERP Development | CodTK",
    description: "A custom ERP built around your workflow: inventory, sales, purchasing, HR and accounts in one system. Your records imported, your team trained.",
    keyword: "custom ERP development",
    audience: "Businesses running stock, sales, staff and accounts across spreadsheets or separate tools.",
    faqs: [
      { question: "What is a custom ERP?", answer: "An ERP brings inventory, sales, HR and accounts into one database, so every team works from the same numbers. A custom ERP is built around the way your business already works, instead of bending your workflow to fit off-the-shelf software." },
      { question: "Can you move our existing records into the new system?", answer: "Yes. We import your existing records from spreadsheets or old software, and train your team on the new system." },
    ],
  },
  api: {
    slug: "backend-api-development",
    title: "Backend & API Development | CodTK",
    description: "Secure backend systems and APIs: logins, role-based access, payments, webhooks and real-time updates, documented with OpenAPI and load-tested.",
    keyword: "backend API development",
    audience: "Web and mobile products that need a secure backend for logins, payments and live data.",
    faqs: [
      { question: "Will the API be documented?", answer: "Yes. Every API is documented with OpenAPI and load-tested before launch." },
      { question: "Can you add payments and real-time updates?", answer: "Yes. We integrate payments, ERP systems, webhooks and third-party services, and add real-time updates over WebSockets with background queues." },
    ],
  },
  wordpress: {
    slug: "wordpress-development",
    title: "WordPress Website Development | CodTK",
    description: "Fast WordPress websites your team can update from the familiar editor, on a lean custom theme with security hardening and backups.",
    keyword: "WordPress website development",
    audience: "Businesses that want a fast website their own team can edit without a developer.",
    faqs: [
      { question: "Can we edit the site without a developer?", answer: "Yes. Your team edits pages, posts, menus and forms from the WordPress editor, and we include a short guide." },
      { question: "How do you keep a WordPress site fast and secure?", answer: "We build a lean custom theme with only the plugins you need, set up caching and compressed images, and add security hardening, backups and updates." },
    ],
  },
  seo: {
    slug: "seo",
    title: "SEO Services for Growing Businesses | CodTK",
    description: "Get found on Google by the clients you want: technical audit, keyword research, page improvements, Google Business Profile and monthly reports.",
    keyword: "SEO services",
    audience: "Businesses that want more of the right clients to find them on Google.",
    faqs: [
      { question: "What does your SEO service include?", answer: "A technical audit, keyword research for the searches your clients make, page titles and content improvements, Google Business Profile set-up, Search Console and analytics, and a monthly report." },
      { question: "How do you report results?", answer: "Each month you get a report of rankings, traffic and next steps." },
    ],
  },
  marketing: {
    slug: "performance-marketing",
    title: "Performance Marketing & Paid Ads | CodTK",
    description: "Paid campaigns on Google, Meta and TikTok, measured by the leads and sales they bring. Tracking set up before any spend; monthly reports.",
    keyword: "performance marketing agency",
    audience: "Businesses ready to invest in paid ads that want every enquiry traced to the campaign that brought it.",
    faqs: [
      { question: "Which ad platforms do you run campaigns on?", answer: "Google, Meta (Facebook and Instagram) and TikTok, chosen to fit your business and audience." },
      { question: "How do you measure results?", answer: "We set up conversion tracking on your website before any spend, then report spend, leads and cost per lead every month." },
    ],
  },
  transform: {
    slug: "digital-transformation",
    title: "Digital Transformation for Businesses | CodTK",
    description: "Take your physical business online: orders, bookings, stock and payments move from paper and spreadsheets into simple software, step by step.",
    keyword: "digital transformation for small business",
    audience: "Shops, clinics and offices still running on paper registers, phone calls and spreadsheets.",
    faqs: [
      { question: "What is digital transformation for a small business?", answer: "Moving orders, bookings, stock and payments from phone calls, registers and spreadsheets into simple software your staff and customers can use." },
      { question: "Will the business have to stop while you change things?", answer: "No. We change one part at a time, starting where it saves the most time, so the business keeps running throughout." },
    ],
  },
  ai: {
    slug: "ai-automation",
    title: "AI & Business Automation | CodTK",
    description: "Custom automation that connects your tools and cuts repetitive manual work, plus AI assistants that answer from your own documents.",
    keyword: "AI business automation",
    audience: "Teams losing hours to copy-paste and repetitive tasks between the tools they already use.",
    faqs: [
      { question: "What kind of work can you automate?", answer: "Repetitive work between the tools you already use: scheduled jobs, webhooks, reports, notifications and data extracted from your files." },
      { question: "Is there human review on AI output?", answer: "Yes. AI assistants always have a human review step, and you get alerts when something fails." },
    ],
  },
  cloud: {
    slug: "cloud-devops",
    title: "Cloud & DevOps Services | CodTK",
    description: "CI/CD pipelines and cloud hosting on AWS, Azure, Google Cloud, Vercel or Render, defined as code, monitored and handed over with notes.",
    keyword: "cloud and DevOps services",
    audience: "Products that need reliable hosting, safe releases and room to grow.",
    faqs: [
      { question: "Which cloud providers do you work with?", answer: "AWS, Azure, Google Cloud, Vercel and Render, with infrastructure defined as code." },
      { question: "Will our team be able to run it after handover?", answer: "Yes. You get handover notes, monitoring, and separate staging and production environments." },
    ],
  },
  consulting: {
    slug: "software-consulting",
    title: "Software Consulting & Technical Planning | CodTK",
    description: "An outside engineer's written plan before you build: architecture, tech stack, first-version scope, risks and estimates. Yours to keep.",
    keyword: "software consulting",
    audience: "Founders and teams who want an expert technical plan before committing to a build.",
    faqs: [
      { question: "What do I get from a consulting engagement?", answer: "A written technical plan you keep: recommended architecture and tech stack, a first-version scope, and risks, estimates and open questions." },
      { question: "Can you build it afterwards?", answer: "Yes, if you choose to. The plan is yours to use whoever builds it." },
    ],
  },
};

export const serviceHref = (id: ServiceTone) => `/services/${SERVICE_SEO[id].slug}`;
