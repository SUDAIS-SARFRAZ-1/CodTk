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

// Logo files in public/tech/ (Simple Icons, CC0), with each brand's own colour from Simple Icons. Concepts like "REST APIs" have no logo
// and are left out of the logo strip; they still appear on the Tech Stack page.
export const TECH_LOGOS: { name: string; file: string; color: string }[] = [
  { name: "Next.js", file: "nextdotjs", color: "#000000" },
  { name: "React", file: "react", color: "#61DAFB" },
  { name: "TypeScript", file: "typescript", color: "#3178C6" },
  { name: "JavaScript", file: "javascript", color: "#F7DF1E" },
  { name: "Tailwind CSS", file: "tailwindcss", color: "#06B6D4" },
  { name: "HTML", file: "html5", color: "#E34F26" },
  { name: "CSS", file: "css", color: "#663399" },
  { name: "Expo", file: "expo", color: "#1C2024" },
  { name: "Kotlin", file: "kotlin", color: "#7F52FF" },
  { name: "Firebase", file: "firebase", color: "#DD2C00" },
  { name: "PWA", file: "pwa", color: "#5A0FC8" },
  { name: "React Query", file: "reactquery", color: "#FF4154" },
  { name: "Node.js", file: "nodedotjs", color: "#5FA04E" },
  { name: "Express", file: "express", color: "#000000" },
  { name: "Python", file: "python", color: "#3776AB" },
  { name: "PostgreSQL", file: "postgresql", color: "#4169E1" },
  { name: "MongoDB", file: "mongodb", color: "#47A248" },
  { name: "Redis", file: "redis", color: "#FF4438" },
  { name: "Prisma", file: "prisma", color: "#2D3748" },
  { name: "Supabase", file: "supabase", color: "#3FCF8E" },
  { name: "Neon", file: "neon", color: "#00E599" },
  { name: "Docker", file: "docker", color: "#2496ED" },
  { name: "AWS", file: "amazonwebservices", color: "#FF9900" },
  { name: "Git", file: "git", color: "#F05032" },
  { name: "GitHub", file: "github", color: "#181717" },
  { name: "GitHub Actions", file: "githubactions", color: "#2088FF" },
  { name: "Vercel", file: "vercel", color: "#000000" },
  { name: "Render", file: "render", color: "#000000" },
];
