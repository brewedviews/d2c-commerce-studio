import type { BuildGroup } from "@/content/types";
import { SectionLabel } from "@/components/ui/section-label";

/** "What we built": the capability inventory, grouped by layer, on ink. */
export function BuildOverview({ groups, title }: { groups: BuildGroup[]; title: string }) {
  // Running numbers continue across groups.
  const offsets = groups.map((_, i) => groups.slice(0, i).reduce((sum, g) => sum + g.items.length, 0));
  return (
    <section aria-labelledby="built-title" className="section-y bg-ink text-paper">
      <div className="container-site">
        <SectionLabel className="text-stone-soft">What we built</SectionLabel>
        <h2 id="built-title" data-reveal className="mt-6 max-w-[20ch] font-display text-d2">
          {title}
        </h2>

        <div className="mt-16 space-y-14 md:mt-24 md:space-y-20">
          {groups.map((group, g) => (
            <div key={group.group} className="grid gap-6 border-t border-line-dark pt-8 lg:grid-cols-12 lg:gap-8">
              <h3 className="lg:col-span-3">
                <span className="font-display text-d4">{group.group}</span>
                <span className="label mt-2 block text-stone-soft">
                  {group.items.length} {group.items.length === 1 ? "part" : "parts"}
                </span>
              </h3>
              <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-9">
                {group.items.map((item, i) => (
                  <li key={item.title} data-reveal className="flex gap-4">
                    <span className="label pt-1.5 text-accent-ink/50">{String(offsets[g] + i + 1).padStart(2, "0")}</span>
                    <div>
                      <h4 className="font-display text-[1.6rem] leading-tight">{item.title}</h4>
                      <p className="mt-2 text-paper/70">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
