// prd.md §6.6 — tools per step confirmed by the founder (2026-10-03).
export const PROCESS_STEPS: { title: string; description: string; tools: string[] }[] = [
  {
    title: "Discovery",
    description:
      "We scope the problem, gather requirements, and define what \"done\" looks like before any code is written.",
    tools: ["Google Meet / Zoom", "Notion / Google Docs"],
  },
  {
    title: "Design",
    description:
      "UI/UX design and technical architecture are planned together, so the product looks right and is built on a solid foundation.",
    tools: ["Figma", "Miro / FigJam"],
  },
  {
    title: "Development",
    description:
      "Iterative development with a weekly update and demo of the latest build. Every change is code-reviewed by a second developer.",
    tools: ["GitHub", "Jira / Trello / ClickUp", "WhatsApp / Slack"],
  },
  {
    title: "Testing & Deployment",
    description:
      "Automated tests, manual QA, and a staging link for you to try before go-live — then releases ship through a CI/CD pipeline, not by hand.",
    tools: ["GitHub Actions", "Vercel", "Render", "AWS"],
  },
  {
    title: "Support",
    description:
      "One month of free bug fixes after launch, then optional paid maintenance to keep your product secure and up to date.",
    tools: [],
  },
];
