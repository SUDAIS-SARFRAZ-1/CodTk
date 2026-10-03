import { Badge } from "@/components/ui/Badge";
import { PROCESS_STEPS } from "@/lib/process";

export function ProcessSteps() {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
      {PROCESS_STEPS.map((step, index) => (
        <li key={step.title} className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground">
              {index + 1}
            </span>
            {index < PROCESS_STEPS.length - 1 && (
              <span className="hidden h-px flex-1 bg-border lg:block" aria-hidden="true" />
            )}
          </div>
          <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
          {step.tools.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {step.tools.map((tool) => (
                <Badge key={tool}>{tool}</Badge>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
