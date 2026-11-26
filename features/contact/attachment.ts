// Optional PRD/SRS upload on the quote form. The browser checks name and size for instant feedback;
// the server runs the same checks plus the file's first bytes, so a renamed file can't get through.

// Vercel rejects request bodies over 4.5 MB, so the file must leave room for the other fields.
export const ATTACHMENT_MAX_BYTES = 4 * 1024 * 1024;
export const ATTACHMENT_ACCEPT = ".pdf,.doc,.docx";

// Magic bytes: PDF "%PDF", DOCX is a ZIP ("PK\x03\x04"), DOC is an OLE file.
const SIGNATURES: Record<string, number[]> = {
  pdf: [0x25, 0x50, 0x44, 0x46],
  docx: [0x50, 0x4b, 0x03, 0x04],
  doc: [0xd0, 0xcf, 0x11, 0xe0],
};

const extension = (name: string) => name.split(".").pop()?.toLowerCase() ?? "";

export function attachmentError(name: string, size: number): string | undefined {
  if (!(extension(name) in SIGNATURES)) return "Attach a PDF or Word document (.pdf, .doc, .docx)";
  if (size === 0) return "That file is empty";
  if (size > ATTACHMENT_MAX_BYTES) return "Keep the file under 4 MB";
  return undefined;
}

export function matchesSignature(name: string, bytes: Uint8Array): boolean {
  const sig = SIGNATURES[extension(name)];
  return !!sig && sig.every((b, i) => bytes[i] === b);
}

// Only letters, numbers, dot, dash and underscore reach the email, capped in length.
export function safeFilename(name: string): string {
  const ext = extension(name);
  const base = name.slice(0, name.length - ext.length - 1).replace(/[^\w.-]+/g, "_").slice(0, 80) || "document";
  return `${base}.${ext}`;
}
