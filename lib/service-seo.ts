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
  // The service page's H1: the keyword, in plain words. Cards, footer, form and breadcrumb keep the
  // service's plain name from lib/service-offerings.ts (founder, 2026-11-27).
  h1: string;
  audience: string;
  faqs: { question: string; answer: string }[];
};

export const SERVICE_SEO: Record<ServiceTone, ServiceSeo> = {
  web: {
    slug: "web-development",
    title: "Custom Web Development in Lahore | CodTK",
    description: "Custom web development: fast business websites and web apps built for search, with an admin area your team can use. Book a free consultation.",
    keyword: "custom web development",
    h1: "Custom web development",
    audience: "Businesses that need a fast business website, and startups that need a custom web app, portal or internal tool, built with Next.js.",
    faqs: [
      { question: "Can my team update the website ourselves?", answer: "Yes. Every website includes an admin area so your team can update content without a developer." },
      { question: "Do you handle hosting and the domain?", answer: "Yes. We set up hosting, the domain and a secure connection, and hand every account over to you." },
    ],
  },
  mobile: {
    slug: "mobile-app-development",
    title: "Mobile App Development Company | CodTK",
    description: "Android and iOS app development: one cross-platform app, a native Android app or an installable web app, store listing included. Free consultation.",
    keyword: "mobile app development company",
    h1: "Mobile app development",
    audience: "Startups launching an app, and businesses that want customers or staff to use their service on their phones.",
    faqs: [
      { question: "Do you build for both Android and iPhone?", answer: "Yes. We build one app that works on both, or an Android-only app if that's all your customers need." },
      { question: "Do you publish the app to the stores?", answer: "Yes. Google Play and App Store submission is included, and the source code and store listings are in your name." },
    ],
  },
  saas: {
    slug: "saas-development",
    title: "SaaS Development Company | CodTK",
    description: "SaaS development for startups: subscription software with billing, team roles and analytics built in, starting with an MVP. Free consultation.",
    keyword: "SaaS development company",
    h1: "SaaS development",
    audience: "Founders turning an idea into an online product sold to many customers on a subscription.",
    faqs: [
      { question: "How is each customer's data kept separate?", answer: "Each customer only ever sees their own data, and you decide what each staff member can access." },
      { question: "Can you set up subscription billing?", answer: "Yes. Customers are billed automatically each month, with invoices, and you get a dashboard showing how the product is used." },
    ],
  },
  erp: {
    slug: "custom-erp-development",
    title: "Custom ERP Development | CodTK",
    description: "Custom ERP development around how you work: inventory, sales, HR and accounts in one system, your records imported, your team trained. Free consultation.",
    keyword: "custom ERP development",
    h1: "Custom ERP development",
    audience: "Small and growing businesses running stock, sales, staff and accounts across spreadsheets or separate tools.",
    faqs: [
      { question: "What is a custom ERP?", answer: "It's one system for your stock, sales, staff and accounts, so every team works from the same numbers. Ours is built around how your business already works, instead of forcing you to fit ready-made software." },
      { question: "Can you move our existing records into the new system?", answer: "Yes. We import your existing records from spreadsheets or old software, and train your team on the new system." },
    ],
  },
  api: {
    slug: "backend-api-development",
    title: "Backend and API Development | CodTK",
    description: "Backend and API development: secure logins, access levels, payments and live updates, documented and load-tested before launch. Free consultation.",
    keyword: "backend and API development",
    h1: "Backend and API development",
    audience: "Web and mobile products that need a secure Node.js backend for logins, payments and live data.",
    faqs: [
      { question: "Will it be documented?", answer: "Yes. Everything is written up so any developer can work with it, and it's tested under heavy use before launch." },
      { question: "Can you add payments and real-time updates?", answer: "Yes. We connect payment providers and your other tools, and add live updates that appear instantly." },
    ],
  },
  wordpress: {
    slug: "wordpress-development",
    title: "WordPress Development | CodTK",
    description: "WordPress development for fast sites your team updates without a developer, on a lean custom theme with security and backups. Free consultation.",
    keyword: "WordPress development",
    h1: "WordPress development",
    audience: "Businesses that want a fast website their own team can edit without a developer.",
    faqs: [
      { question: "Can we edit the site without a developer?", answer: "Yes. Your team edits pages, posts, menus and forms from the WordPress editor, and we include a short guide." },
      { question: "How do you keep a WordPress site fast and secure?", answer: "We build a light design with only the add-ons you need, set it up to load quickly, and add security protection, backups and updates." },
    ],
  },
  seo: {
    slug: "seo",
    title: "SEO Services for Small Business | CodTK",
    description: "SEO services for small business: technical fixes, local SEO, better pages and a Google Business Profile, so the right clients find you. Free consultation.",
    keyword: "SEO services for small business",
    h1: "SEO services for small business",
    audience: "Businesses that want more of the right clients to find them on Google.",
    faqs: [
      { question: "What does your SEO service include?", answer: "A check-up of your site, research into what your customers search for, better page titles and content, your Google Business Profile, Google's free tracking tools, and a monthly report." },
      { question: "How do you report results?", answer: "Each month you get a report of rankings, traffic and next steps." },
    ],
  },
  marketing: {
    slug: "performance-marketing",
    title: "Performance Marketing Agency | CodTK",
    description: "Google and Meta ads managed for leads and sales, not clicks. Tracking set up before any spend, with monthly reports. Book a free consultation.",
    keyword: "performance marketing agency",
    h1: "Performance marketing",
    audience: "Businesses ready to invest in paid ads that want every enquiry traced to the campaign that brought it.",
    faqs: [
      { question: "Which ad platforms do you run campaigns on?", answer: "Google, Meta (Facebook and Instagram) and TikTok, chosen to fit your business and audience." },
      { question: "How do you measure results?", answer: "We set up tracking on your website before any money is spent, then report spend, enquiries and cost per enquiry every month." },
    ],
  },
  transform: {
    slug: "digital-transformation",
    title: "Take Your Business Online | CodTK",
    description: "Take your business online: orders, bookings, stock and payments move from paper and spreadsheets into simple software, step by step. Free consultation.",
    keyword: "take business online",
    h1: "Take your business online",
    audience: "Shops, clinics and offices still running on paper registers, phone calls and spreadsheets.",
    faqs: [
      { question: "What does taking my business online involve?", answer: "Moving orders, bookings, stock and payments from phone calls, registers and spreadsheets into simple software your staff and customers can use." },
      { question: "Will the business have to stop while you change things?", answer: "No. We change one part at a time, starting where it saves the most time, so the business keeps running throughout." },
    ],
  },
  ai: {
    slug: "ai-automation",
    title: "AI Automation for Business | CodTK",
    description: "AI automation for business: connect the tools you use, cut repetitive work and add AI assistants that answer from your documents. Free consultation.",
    keyword: "AI automation for business",
    h1: "AI automation for business",
    audience: "Teams losing hours to copy-paste and repetitive tasks between the tools they already use.",
    faqs: [
      { question: "What kind of work can you automate?", answer: "Repetitive work between the tools you already use: regular reports, notifications, copying data between systems, and pulling details out of your files." },
      { question: "Does a person check the AI's work?", answer: "Yes. A person always checks what the AI produces, and you get alerts if something goes wrong." },
    ],
  },
  cloud: {
    slug: "cloud-devops",
    title: "DevOps and Cloud Services | CodTK",
    description: "DevOps and cloud services: CI/CD and cloud hosting set up as code, monitored after launch, with the monthly bill kept in check. Free consultation.",
    keyword: "DevOps and cloud services",
    h1: "DevOps and cloud services",
    audience: "Products that need reliable cloud hosting, a CI/CD setup for safe updates, and room to grow.",
    faqs: [
      { question: "Which hosting companies do you work with?", answer: "Amazon (AWS), Microsoft (Azure), Google Cloud, Vercel and Render. We pick the one that fits your product." },
      { question: "Will our team be able to run it after handover?", answer: "Yes. You get clear handover notes, alerts if anything goes down, and a separate test copy for trying changes safely." },
    ],
  },
  consulting: {
    slug: "software-consulting",
    title: "Software Consulting & Technical Planning | CodTK",
    description: "Software consulting before you build: a written plan covering architecture, tech stack, scope, risks and estimates. Start with a free consultation.",
    keyword: "software consulting",
    h1: "Software consulting",
    audience: "Founders and teams who want expert software project planning before committing to a build.",
    faqs: [
      { question: "What do I get?", answer: "A written plan you keep: which technology to use and how to structure it, what to build first, and the risks, rough costs and open questions." },
      { question: "Can you build it afterwards?", answer: "Yes, if you choose to. The plan is yours to use whoever builds it." },
    ],
  },
};

export const serviceHref = (id: ServiceTone) => `/services/${SERVICE_SEO[id].slug}`;
