import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TechLogoStrip } from "@/components/sections/TechLogoStrip";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Faq } from "@/components/sections/Faq";
import { SERVICES } from "@/lib/services";
import { PROJECTS } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="border-t border-border bg-muted py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">What We Do</h2>
            <Link href="/services" className="text-sm font-semibold text-brand hover:text-brand-dark">
              View all services →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Our Stack</h2>
            <Link href="/tech-stack" className="text-sm font-semibold text-brand hover:text-brand-dark">
              See full stack →
            </Link>
          </div>
          <div className="mt-10">
            <TechLogoStrip />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">How We Work</h2>
            <Link href="/process" className="text-sm font-semibold text-brand hover:text-brand-dark">
              See our process →
            </Link>
          </div>
          <div className="mt-10">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Featured Work</h2>
            <Link href="/portfolio" className="text-sm font-semibold text-brand hover:text-brand-dark">
              View portfolio →
            </Link>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-8">
            <Faq />
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ready to start your project?</h2>
          <p className="mt-3 text-background/80">
            Tell us what you&apos;re building — we reply within 24 hours.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors duration-150 hover:bg-brand-dark"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
