import { processSteps } from "@/content/process";
import { SectionLabel } from "@/components/ui/section-label";

export function Process({ index = "04" }: { index?: string }) {
  return (
    <section id="process" aria-labelledby="process-title" className="section-y">
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index={index || undefined}>Process</SectionLabel>
            <h2 id="process-title" data-reveal className="mt-6 font-display text-d2">
              From first call to <em className="italic">first order.</em>
            </h2>
          </div>
          <p data-reveal className="text-ink/75 md:col-span-4 md:col-start-9">
            A product-development workflow, not an agency retainer. Clear stages, a fixed scope, and one team from
            discovery to launch.
          </p>
        </div>

        <ol className="relative mt-16 grid md:mt-24 md:grid-cols-4">
          {/* Timeline rule */}
          <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 w-px bg-line md:left-0 md:right-0 md:top-[5px] md:bottom-auto md:h-px md:w-auto" />
          {processSteps.map((step) => (
            <li key={step.index} data-reveal className="relative pb-14 pl-10 last:pb-0 md:pb-0 md:pl-0 md:pr-10 md:pt-14">
              <span aria-hidden="true" className="absolute left-0 top-1 size-[11px] rounded-full border border-ink bg-paper md:top-0" />
              <p className="font-display text-[clamp(3.5rem,2.5rem+3vw,6rem)] leading-none text-accent">{step.index}</p>
              <h3 className="mt-6 font-display text-d4">{step.title}</h3>
              <p className="mt-3 max-w-xs text-ink/75">{step.body}</p>
              <ul className="mt-6 space-y-1.5">
                {step.outputs.map((o) => (
                  <li key={o} className="label text-stone">
                    {o}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
