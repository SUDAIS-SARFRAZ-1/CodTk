import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web, mobile, backend, cloud, automation, and consulting services from AptiScript Technologies — a full-service software house.",
};

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Services</h1>
        <p className="mt-4 text-muted-foreground">
          End-to-end software delivery — pick a service below to request a quote, or{" "}
          <Link href="/contact" className="font-semibold text-brand hover:text-brand-dark">
            get in touch
          </Link>{" "}
          if you&apos;re not sure where to start.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
