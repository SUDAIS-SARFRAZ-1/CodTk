import { describe, expect, it } from "vitest";
import { ATTACHMENT_MAX_BYTES, attachmentError, matchesSignature, safeFilename } from "@/features/contact/attachment";

describe("contact form attachment", () => {
  it.each(["PRD.pdf", "srs.DOCX", "spec.doc"])("accepts %s", (name) => {
    expect(attachmentError(name, 1000)).toBeUndefined();
  });

  it.each([
    ["an image", "photo.png", 1000],
    ["a script", "run.exe", 1000],
    ["a file with no extension", "PRD", 1000],
    ["an empty file", "PRD.pdf", 0],
    ["a file over 4 MB", "PRD.pdf", ATTACHMENT_MAX_BYTES + 1],
  ])("rejects %s", (_, name, size) => {
    expect(attachmentError(name as string, size as number)).toBeDefined();
  });

  it("checks the file's contents, not just its name", () => {
    expect(matchesSignature("PRD.pdf", new TextEncoder().encode("%PDF-1.7"))).toBe(true);
    expect(matchesSignature("PRD.docx", new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0]))).toBe(true);
    expect(matchesSignature("PRD.pdf", new TextEncoder().encode("MZ fake pdf"))).toBe(false);
    expect(matchesSignature("PRD.pdf", new Uint8Array())).toBe(false);
  });

  it("makes the filename safe for an email", () => {
    expect(safeFilename("My PRD (v2).pdf")).toBe("My_PRD_v2_.pdf");
    expect(safeFilename("../../etc/passwd.pdf")).toBe(".._.._etc_passwd.pdf");
    expect(safeFilename(".pdf")).toBe("document.pdf");
  });
});
