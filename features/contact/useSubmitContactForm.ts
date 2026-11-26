import { useMutation } from "@tanstack/react-query";
import type { ContactFormInput } from "./schema";

type Submission = { data: ContactFormInput; file?: File };

// Multipart, so an attached PRD/SRS travels as a file; the fields ride along as one JSON part.
async function submitContactForm({ data, file }: Submission) {
  const body = new FormData();
  body.set("data", JSON.stringify(data));
  if (file) body.set("file", file);
  const res = await fetch("/contact/api", { method: "POST", body });
  if (!res.ok) {
    const json = await res.json().catch(() => null);
    throw new Error(json?.error?.message ?? "Something went wrong. Please try again.");
  }
  return res.json();
}

export function useSubmitContactForm() {
  return useMutation({ mutationFn: submitContactForm });
}
