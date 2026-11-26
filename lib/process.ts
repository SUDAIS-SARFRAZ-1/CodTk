// prd.md §6.6 — tools per step confirmed by the founder (2026-10-03). The title labels the step on the
// Home timeline; `gets` is what the client receives at that step, restating §6.6 and the engagement model.
export const PROCESS_STEPS: {
  title: string;
  description: string;
  homeDescription?: string;
  gets: string[];
  tools: string[];
}[] = [
  {
    title: "Discovery",
    description:
      "We learn what you need and agree, in writing, exactly what we'll build before any work starts.",
    gets: ["A written plan of exactly what we'll build", "Timeline and cost confirmed before work begins"],
    tools: ["Google Meet / Zoom", "Notion / Google Docs"],
  },
  {
    title: "Design",
    description:
      "We design the screens and plan how it will be built, so it looks right and stands on solid foundations.",
    gets: ["Designs of the key screens for your approval", "A plan for how it will be built"],
    tools: ["Figma", "Miro / FigJam"],
  },
  {
    title: "Building",
    description:
      "We build it in small steps, with a weekly update and a demo of the latest version. A second developer checks every change.",
    gets: ["A weekly update and a demo of the latest version", "Every change reviewed by a second developer"],
    tools: ["GitHub", "Jira / Trello / ClickUp", "WhatsApp / Slack"],
  },
  {
    title: "Testing & Launch",
    description:
      "We test everything and give you a private link to try it yourself, then put it live safely.",
    gets: ["A private link to try it before it goes live", "Updates go live automatically and safely", "Your product live on your domain"],
    tools: ["GitHub Actions", "Vercel", "Render", "AWS"],
  },
  {
    title: "Support",
    description:
      "One month of free bug fixes after launch, then optional paid maintenance to keep your product secure and up to date.",
    // the home timeline's wording; the free-fix month and code ownership are stated in Why there
    homeDescription: "We stay with the product after launch and keep it secure, stable and up to date.",
    gets: ["Fixes and security updates to keep it running safely"],
    tools: [],
  },
];
