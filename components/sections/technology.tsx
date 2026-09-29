import { technologyGroups, technologyStatement } from "@/content/technology";
import { SectionLabel } from "@/components/ui/section-label";

export function Technology({ index = "06" }: { index?: string }) {
  const [before, after] = technologyStatement.split(" — ");

  return (
    <section aria-labelledby="tech-title" className="section-y">
      <div className="container-site">
        <SectionLabel index={index || undefined}>Technology</SectionLabel>
        <h2 id="tech-title" data-reveal className="mt-6 max-w-[22ch] font-display text-d3">
          {before} — <span className="text-stone">{after}</span>
        </h2>

        <dl className="mt-16 grid grid-cols-2 border-t border-line sm:grid-cols-3 lg:grid-cols-6 md:mt-20">
          {technologyGroups.map((group) => (
            <div key={group.role} data-reveal className="border-b border-line py-6 pr-4 lg:border-b-0">
              <dt className="label text-stone">{group.role}</dt>
              <dd className="mt-3 space-y-0.5">
                {group.items.map((item) => (
                  <span key={item} className="block font-display text-[1.6rem] leading-tight">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
