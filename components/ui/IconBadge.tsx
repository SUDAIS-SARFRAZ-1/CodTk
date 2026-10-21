// Outline icon (Heroicons path) in a tinted square — used on service and "why us" cards.
export function IconBadge({ path }: { path: string }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-control bg-muted text-accent">
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    </span>
  );
}
