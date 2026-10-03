import { useMutation } from "@tanstack/react-query";
import type { ContactFormInput } from "./schema";

async function submitContactForm(data: ContactFormInput) {
  const res = await fetch("/contact/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message ?? "Something went wrong. Please try again.");
  }
  return res.json();
}

export function useSubmitContactForm() {
  return useMutation({ mutationFn: submitContactForm });
}
