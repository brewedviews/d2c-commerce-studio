import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Form primitives: underline inputs and chip-style choices. Server-safe. */

const inputBase =
  "block w-full border-0 border-b border-line bg-transparent px-0 py-3 text-[1.05rem] text-ink placeholder:text-stone-soft " +
  "transition-colors duration-300 focus:border-ink focus:outline-none focus-visible:outline-none aria-invalid:border-accent";

export function Field({
  id,
  label,
  hint,
  error,
  optional,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label flex justify-between text-stone">
        <span>{label}</span>
        {optional && <span className="text-stone-soft">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-stone">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

export function describedBy(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputBase, props.className)} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputBase, "min-h-32 resize-y", props.className)} />;
}

export function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className={cn(inputBase, "appearance-none pr-8", props.className)}>
        {children}
      </select>
      <svg aria-hidden="true" viewBox="0 0 12 12" className="pointer-events-none absolute right-1 top-1/2 size-3 -translate-y-1/2 text-stone">
        <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </div>
  );
}

/** Radio or checkbox group rendered as selectable chips. */
export function ChoiceGroup({
  name,
  legend,
  options,
  type,
  error,
  selected,
  required,
}: {
  name: string;
  legend: string;
  options: readonly string[];
  type: "radio" | "checkbox";
  error?: string;
  selected?: string | string[];
  required?: boolean;
}) {
  const isSelected = (o: string) => (Array.isArray(selected) ? selected.includes(o) : selected === o);
  const errorId = `${name}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined} aria-invalid={error ? true : undefined}>
      <legend className="label text-stone">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="group relative cursor-pointer">
            <input
              type={type}
              name={name}
              value={option}
              defaultChecked={isSelected(option)}
              required={required && type === "radio"}
              className="peer sr-only"
            />
            <span
              className={cn(
                "inline-flex h-10 items-center rounded-full border border-line px-4 text-[0.92rem] text-ink/85",
                "transition-colors duration-300 group-hover:border-ink",
                "peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper",
                "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
              )}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="mt-3 text-sm text-accent">
          {error}
        </p>
      )}
    </fieldset>
  );
}
