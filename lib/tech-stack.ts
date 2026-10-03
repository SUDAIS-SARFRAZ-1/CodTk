// Source: prd.md §6.3 — grouped by category, presented as pills for fast scanning.
// Founder-confirmed additions (2026-10-03): TypeScript, Mobile group, Python, AWS.
export const TECH_STACK: { category: string; items: string[] }[] = [
  {
    category: "Frontend",
    items: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo", "Kotlin", "Firebase", "PWA"],
  },
  {
    category: "State Management",
    items: ["Zustand", "React Query"],
  },
  {
    category: "Databases / ORM",
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase", "Neon"],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express",
      "Python",
      "REST APIs",
      "Auth & RBAC",
      "Webhooks",
      "WebSockets",
      "OAuth",
      "System Design",
    ],
  },
  {
    category: "DevOps",
    items: ["Docker", "Git", "GitHub", "GitHub Actions (CI/CD)", "AWS", "Render", "Vercel"],
  },
];

// Logo files in public/tech/ (Simple Icons, CC0). Concepts like "REST APIs" have no logo
// and are left out of the logo strip; they still appear on the Tech Stack page.
export const TECH_LOGOS: { name: string; file: string }[] = [
  { name: "Next.js", file: "nextdotjs" },
  { name: "React", file: "react" },
  { name: "TypeScript", file: "typescript" },
  { name: "JavaScript", file: "javascript" },
  { name: "Tailwind CSS", file: "tailwindcss" },
  { name: "HTML", file: "html5" },
  { name: "CSS", file: "css" },
  { name: "Expo", file: "expo" },
  { name: "Kotlin", file: "kotlin" },
  { name: "Firebase", file: "firebase" },
  { name: "PWA", file: "pwa" },
  { name: "React Query", file: "reactquery" },
  { name: "Node.js", file: "nodedotjs" },
  { name: "Express", file: "express" },
  { name: "Python", file: "python" },
  { name: "PostgreSQL", file: "postgresql" },
  { name: "MongoDB", file: "mongodb" },
  { name: "Redis", file: "redis" },
  { name: "Prisma", file: "prisma" },
  { name: "Supabase", file: "supabase" },
  { name: "Neon", file: "neon" },
  { name: "Docker", file: "docker" },
  { name: "AWS", file: "amazonwebservices" },
  { name: "Git", file: "git" },
  { name: "GitHub", file: "github" },
  { name: "GitHub Actions", file: "githubactions" },
  { name: "Vercel", file: "vercel" },
  { name: "Render", file: "render" },
];
