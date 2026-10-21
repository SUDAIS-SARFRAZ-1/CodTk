export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-sm font-medium text-foreground">
      {children}
    </span>
  );
}
