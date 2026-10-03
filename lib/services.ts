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
