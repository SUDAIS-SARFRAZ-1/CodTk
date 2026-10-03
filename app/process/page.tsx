import type { Metadata } from "next";
import { PROCESS_STEPS } from "@/lib/process";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How AptiScript Technologies delivers a project: Discovery, Design, Development, Testing & Deployment, and Support.",
};


export default function ProcessPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Process</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        A clear, repeatable process from first conversation to launch and beyond.
      </p>

      <ol className="mt-10 space-y-8">
        {PROCESS_STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground">
              {index + 1}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{step.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14 rounded-xl border border-border bg-muted p-6">
        <h2 className="text-lg font-semibold text-foreground">Engagement Model</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>A contract and NDA are signed before any work starts.</li>
          <li>
            Fixed-price for clearly scoped projects; payment is an upfront deposit followed by
            milestone payments, as set out in the contract.
          </li>
          <li>Payment by bank transfer (Pakistan), Wise, or card via Stripe.</li>
        </ul>
      </div>
    </section>
  );
}
