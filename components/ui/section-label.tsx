import { cn } from "@/lib/utils/cn";

/** Mono index label, e.g. "(03) — Services". */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("label flex items-center gap-3 text-stone", className)}>
      {index && <span>({index})</span>}
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  );
}
