import { describe, expect, it } from "vitest";
import { confirmationEmail, leadEmail } from "@/features/contact/emails";

describe("contact emails", () => {
  it("escapes visitor input in the lead email and keeps the subject on one line", () => {
    const { html, text, subject } = leadEmail({
      name: "<b>A\n& B</b>",
      email: "a@example.com",
      projectType: "SEO",
      budget: "Not sure yet",
      message: `<img src=x onerror="alert(1)">`,
    });
    expect(html).toContain("&lt;b&gt;A\n&amp; B&lt;/b&gt;");
    expect(html).not.toContain("<img");
    expect(text).toContain(`<img src=x onerror="alert(1)">`);
    expect(subject).toBe("New quote request: <b>A & B</b>");
  });

  it("confirms with the site's reply promise", () => {
    const { html, text } = confirmationEmail("Ayesha Khan");
    for (const body of [html, text]) {
      expect(body).toContain("Hi Ayesha,");
      expect(body).toContain("within 24 hours, Monday to Saturday");
    }
  });

  it.each(["https://evil.example", "<b>x</b>", "evil.example/win"])("never echoes %s to the visitor", (name) => {
    const { html, text } = confirmationEmail(name);
    expect(text).toMatch(/^Hi,/);
    expect(html + text).not.toContain("evil");
    expect(html).not.toContain("<b>");
  });
});
