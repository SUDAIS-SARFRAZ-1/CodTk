import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "AptiScript Technologies — a full-service software house founded by Sudais Sarfraz.",
};

const TEAM_FUNCTIONS = [
  { name: "Frontend", description: "React, Next.js, and the UI you actually see." },
  { name: "Backend", description: "APIs, databases, auth, and business logic." },
  { name: "DevOps", description: "CI/CD, deployment, and infrastructure." },
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">About Us</h1>
      <p className="mt-4 text-muted-foreground">
        AptiScript Technologies is a full-service software house delivering custom web and mobile
        applications, backend systems, and cloud solutions — end to end, not just one slice of the
        stack.
      </p>

      <div className="mt-12 rounded-xl border border-border bg-muted p-6">
        <h2 className="text-lg font-semibold text-foreground">Founder</h2>
        <p className="mt-2 font-medium text-foreground">Sudais Sarfraz</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Founder — Software Engineering graduate, building AptiScript Technologies into a
          full-service software house handling the entire development lifecycle.
        </p>
        <a
          href="https://sudaissarfraz.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold text-brand hover:text-brand-dark"
        >
          View portfolio →
        </a>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Our Team</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Our team covers the full development lifecycle:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {TEAM_FUNCTIONS.map((fn) => (
            <div key={fn.name} className="rounded-xl border border-border bg-background p-4">
              <p className="font-semibold text-foreground">{fn.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{fn.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Individual team profiles are coming soon.
        </p>
      </div>
    </section>
  );
}
