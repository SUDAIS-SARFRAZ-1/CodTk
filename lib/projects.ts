export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  // Honest provenance — these are founder projects, not client engagements (rules.md §1, §3).
  label: string;
  labelNote: string;
  // The founder's part in the build, shown in the case study's meta row.
  role: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  outcome: string;
  demoUrl?: string;
  repoUrl?: string;
  images: { src: string; alt: string; width: number; height: number }[];
  // Kept in the data but not rendered anywhere (prd.md §6.4).
  hidden?: boolean;
};

// Source: founder's portfolio (Desktop/my_portfolio/src/data/projects.ts), confirmed 2026-10-03.
const ALL_PROJECTS: Project[] = [
  {
    slug: "mindmesh",
    title: "MindMesh",
    // SaaS describes what the platform is (accounts, roles, multi-project); it is not a live paid
    // service, so the capstone label and repo link stay (founder confirmed 2026-10-21).
    subtitle: "AI-powered SaaS platform for agile teams",
    label: "Founder's capstone project",
    labelNote:
      "Built by our founder as a BSSE capstone at the University of Central Punjab — led backend development and AI integration.",
    role: "Backend and AI integration",
    summary:
      "A SaaS platform where teams sign in, run several projects, and let AI turn raw requirements and recorded meetings into epics, sprint tasks, and stakeholder updates.",
    problem:
      "Engineering teams lose critical time deciphering unstructured meeting notes, coordinating action items across disconnected tools, and manually drafting sprint backlogs.",
    solution:
      "A backend of REST APIs with JWT authentication, role-based access, multi-project management, and real-time WebSocket notifications — plus 4 AI agents that automate requirement extraction and meeting intelligence: transcribing voice with Whisper, extracting decisions with an LLM, and turning them into structured sprint deliverables in Jira and GitHub.",
    features: [
      "4 AI agents for project management, outreach, meeting intelligence, and analytics",
      "Meeting recordings converted into transcripts, summaries, tasks, and sprint plans",
      "REST APIs, JWT authentication, RBAC, and multi-project management",
      "Hybrid persistence: MongoDB for AI memory, PostgreSQL for sprint data integrity",
      "Real-time updates over WebSockets (Socket.io)",
    ],
    tech: [
      "React / Next.js",
      "Node.js / Express",
      "FastAPI (Python)",
      "OpenAI LLM",
      "Whisper",
      "PostgreSQL",
      "MongoDB",
      "WebSockets",
      "Docker",
      "CI/CD",
    ],
    outcome: "Built as a working system; the full source code is public on GitHub.",
    repoUrl: "https://github.com/SUDAIS-SARFRAZ-1/MindMesh",
    images: [
      { src: "/projects/mindmesh-2.jpg", alt: "MindMesh project overview dashboard", width: 1366, height: 863 },
      { src: "/projects/mindmesh-3.jpg", alt: "MindMesh meeting intelligence audio upload", width: 1366, height: 683 },
      { src: "/projects/mindmesh-4.jpg", alt: "MindMesh AI document parsing pipeline", width: 1366, height: 683 },
      { src: "/projects/mindmesh-5.jpg", alt: "MindMesh generated backlog review and edit", width: 1366, height: 683 },
      { src: "/projects/mindmesh-6.jpg", alt: "MindMesh sprint planning kanban board", width: 1366, height: 683 },
    ],
  },
  {
    slug: "organic-store",
    hidden: true,
    title: "Organic Store",
    subtitle: "Full-Stack Organic Grocery E-Commerce Platform",
    label: "Founder project",
    labelNote: "Designed and built end-to-end by our founder.",
    role: "Full stack, end to end",
    summary:
      "A complete grocery shopping platform with a customer storefront, secure accounts, cart and checkout, and an admin dashboard for running the store.",
    problem:
      "Shoppers need reliable category filtering, fast search, and a trustworthy checkout, while store operators need one dashboard to manage products, orders, and users.",
    solution:
      "A RESTful Node.js/Express/MongoDB backend paired with a React storefront — Zustand for global state, TanStack React Query for API caching and mutations — secured with JWT authentication and role-based access control.",
    features: [
      "Product browsing with category filtering and search",
      "Shopping cart, checkout workflow, and payment integration",
      "Order management and purchase tracking",
      "Customer accounts with JWT authentication and RBAC",
      "Admin dashboard for products, orders, and users",
    ],
    tech: ["React", "Zustand", "React Query", "Node.js", "Express", "MongoDB", "JWT"],
    outcome: "Live in production — try the demo below; the source code is public on GitHub.",
    demoUrl: "https://organic-store-liart.vercel.app/",
    repoUrl: "https://github.com/SUDAIS-SARFRAZ-1/OrganicStore",
    images: [
      { src: "/projects/organicstore.png", alt: "Organic Store storefront home page", width: 1917, height: 970 },
    ],
  },
];

export const PROJECTS = ALL_PROJECTS.filter((p) => !p.hidden);
