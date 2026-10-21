import type { ReactNode } from "react";
import { PageEnter } from "@/components/codtk/PageEnter";

// Re-mounts on every navigation, so PageEnter can play the enter animation as a page transition.
export default function Template({ children }: { children: ReactNode }) {
  return <PageEnter>{children}</PageEnter>;
}
