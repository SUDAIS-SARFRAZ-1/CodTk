import type { ComponentProps, ReactNode } from "react";

const CONTROL =
  "mt-1.5 block w-full rounded-control border border-border bg-white px-3.5 py-2.5 text-base text-foreground transition-colors duration-150 ease-brand hover:border-muted-foreground focus:border-brand aria-[invalid=true]:border-error";

type FieldBaseProps = { id: string; label: string; error?: string };

function FieldShell({ id, label, error, children }: FieldBaseProps & { children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

// Wires the error message to the control so screen readers announce it (rules.md §34).
function errorProps(id: string, error?: string) {
  return error ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {};
}

export function TextField({ id, label, error, className = "", ...props }: FieldBaseProps & ComponentProps<"input">) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input id={id} name={id} className={`${CONTROL} ${className}`} {...errorProps(id, error)} {...props} />
    </FieldShell>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  className = "",
  ...props
}: FieldBaseProps & ComponentProps<"textarea">) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea id={id} name={id} className={`${CONTROL} ${className}`} {...errorProps(id, error)} {...props} />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  error,
  className = "",
  ...props
}: FieldBaseProps & ComponentProps<"select">) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <select id={id} name={id} className={`${CONTROL} ${className}`} {...errorProps(id, error)} {...props} />
    </FieldShell>
  );
}
