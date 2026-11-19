import { describe, expect, it } from "vitest";
import { contactFormSchema, PROJECT_TYPE_ALIASES, PROJECT_TYPES } from "@/features/contact/schema";
import { SERVICE_OFFERINGS } from "@/lib/service-offerings";

// The one piece of business logic on the site (rules.md §42): what the contact form accepts.
// The same schema runs in the browser and, independently, in app/contact/api/route.ts.
const valid = {
  name: "Ayesha Khan",
  email: "ayesha@example.com",
  projectType: "Custom ERP Systems",
  message: "We need stock and sales in one system for two shops.",
  renderedAt: Date.now(),
};

describe("contactFormSchema", () => {
  it("accepts a complete enquiry and fills the defaults", () => {
    const r = contactFormSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.budget).toBe("Not sure yet");
      expect(r.data.company).toBe("");
      expect(r.data.turnstileToken).toBe("");
    }
  });

  it.each([
    ["a missing name", { name: "" }],
    ["a one-letter name", { name: "A" }],
    ["an invalid email", { email: "not-an-email" }],
    ["a message under 10 characters", { message: "Hi there" }],
    ["an unknown project type", { projectType: "Shopify Store" }],
    ["an unknown budget", { budget: "$1" }],
    ["a missing render time", { renderedAt: undefined }],
    ["an oversized Turnstile token", { turnstileToken: "x".repeat(2049) }],
  ])("rejects %s", (_, patch) => {
    expect(contactFormSchema.safeParse({ ...valid, ...patch }).success).toBe(false);
  });

  it("trims whitespace before validating", () => {
    const r = contactFormSchema.safeParse({ ...valid, name: "  Ayesha  ", email: " ayesha@example.com " });
    expect(r.success && r.data.name).toBe("Ayesha");
    expect(r.success && r.data.email).toBe("ayesha@example.com");
  });

  it("accepts any honeypot value, so the server can discard bots silently", () => {
    expect(contactFormSchema.safeParse({ ...valid, company: "Spam Co" }).success).toBe(true);
  });
});

describe("project types", () => {
  it("lists all 12 services plus 'Something else', and never Shopify", () => {
    expect(PROJECT_TYPES).toHaveLength(SERVICE_OFFERINGS.length + 1);
    expect(SERVICE_OFFERINGS).toHaveLength(12);
    expect(PROJECT_TYPES.at(-1)).toBe("Something else");
    expect(PROJECT_TYPES.join(" ")).not.toMatch(/shopify/i);
  });

  it("maps every old service title to a current one, so old quote links still pre-fill", () => {
    for (const current of Object.values(PROJECT_TYPE_ALIASES)) {
      expect(PROJECT_TYPES).toContain(current);
    }
    expect(PROJECT_TYPE_ALIASES["Mobile Applications"]).toBe("Mobile Apps (Android & iOS)");
    expect(PROJECT_TYPE_ALIASES["DevOps and Cloud"]).toBe("Cloud & DevOps");
  });
});
