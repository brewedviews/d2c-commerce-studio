import type { SystemFlow as Flow } from "@/content/types";

/** A numbered sequence through the system: horizontal on desktop, a timeline on mobile. */
export function SystemFlow({ flow }: { flow: Flow }) {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <h3 className="font-display text-d3 md:col-span-6">{flow.title}</h3>
        {flow.intro && <p className="text-ink/75 md:col-span-5 md:col-start-8">{flow.intro}</p>}
      </div>
      <ol
        className="relative mt-10 grid gap-0 md:mt-14 lg:[grid-template-columns:repeat(var(--steps),minmax(0,1fr))]"
        style={{ "--steps": flow.steps.length } as React.CSSProperties}
      >
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-[5px] top-3 w-px bg-ink/25 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[5px] lg:h-px lg:w-auto"
        />
        {flow.steps.map((step, i) => (
          <li key={step.title} className="relative pb-8 pl-9 last:pb-0 md:max-w-xl lg:max-w-none lg:pb-0 lg:pl-0 lg:pr-6 lg:pt-10">
            <span aria-hidden="true" className="absolute left-0 top-1 size-[11px] rounded-full border border-ink bg-paper-sunk lg:top-0" />
            <p className="label text-accent">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-2 font-display text-[1.55rem] leading-tight">{step.title}</p>
            <p className="mt-2 text-[0.95rem] text-ink/75">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
