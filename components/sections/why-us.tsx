import { differentiators } from "@/content/services";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils/cn";

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="section-y bg-ink text-paper">
      <div className="container-site">
        <SectionLabel index="03" className="text-stone-soft">
          Why us
        </SectionLabel>
        <h2 id="why-title" data-reveal className="mt-6 max-w-[22ch] font-display text-d2">
          Not a theme shop. Not a bloated agency. A studio built for how D2C brands{" "}
          <em className="italic text-accent-ink/70">actually sell.</em>
        </h2>

        <div className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
          {differentiators.map((item, i) => (
            <div key={item.title} data-reveal className={cn("border-t border-line-dark pt-6", i % 2 === 1 && "lg:mt-24")}>
              <p className="label text-accent-ink/60">0{i + 1}</p>
              <h3 className="mt-8 font-display text-d4">{item.title}</h3>
              <p className="mt-4 text-paper/70">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
