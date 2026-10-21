// prd.md §6.6 — tools per step confirmed by the founder (2026-10-03). `short` labels the step on the
// Home timeline; `gets` is what the client receives at that step, restating §6.6 and the engagement model.
export const PROCESS_STEPS: {
  title: string;
  short: string;
  description: string;
  homeDescription?: string;
  gets: string[];
  tools: string[];
}[] = [
  {
    title: "Discovery",
    short: "Discovery",
    description:
      "We scope the problem, gather requirements, and define what \"done\" looks like before any code is written.",
    gets: ["A written scope and definition of done", "Timeline and cost confirmed before work begins"],
    tools: ["Google Meet / Zoom", "Notion / Google Docs"],
  },
  {
    title: "Design",
    short: "Design",
    description:
      "UI/UX design and technical architecture are planned together, so the product looks right and is built on a solid foundation.",
    gets: ["Designs of the key screens for your approval", "A technical plan for how it will be built"],
    tools: ["Figma", "Miro / FigJam"],
  },
  {
    title: "Development",
    short: "Build",
    description:
      "Iterative development with a weekly update and demo of the latest build. Every change is code-reviewed by a second developer.",
    gets: ["A weekly update and a demo of the latest build", "Every change reviewed by a second developer"],
    tools: ["GitHub", "Jira / Trello / ClickUp", "WhatsApp / Slack"],
  },
  {
    title: "Testing & Deployment",
    short: "Launch",
    description:
      "Automated tests, manual QA, and a staging link for you to try before go-live — then releases ship through a CI/CD pipeline, not by hand.",
    gets: ["A staging link to try before go-live", "Releases through a CI/CD pipeline, not by hand", "Your product live on your domain"],
    tools: ["GitHub Actions", "Vercel", "Render", "AWS"],
  },
  {
    title: "Support",
    short: "Support",
    description:
      "One month of free bug fixes after launch, then optional paid maintenance to keep your product secure and up to date.",
    // the home timeline's wording; the free-fix month and code ownership are stated in Why there
    homeDescription: "We stay with the product after launch and keep it secure, stable and up to date.",
    gets: ["Fixes and security updates to keep it running safely"],
    tools: [],
  },
];
