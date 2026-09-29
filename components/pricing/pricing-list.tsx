import { pricingTiers } from "@/content/pricing";

/** Tiers as an editorial price list rather than competing cards. */
export function PricingList() {
  return (
    <ol className="border-t border-ink">
      {pricingTiers.map((tier) => (
        <li key={tier.name} data-reveal className="group grid grid-cols-[1fr_auto] gap-x-6 gap-y-3 border-b border-line py-7 md:grid-cols-12 md:gap-x-8 md:py-9">
          <h3 className="font-display text-d4 md:col-span-3">{tier.name}</h3>
          <p className="col-start-2 row-start-1 text-right md:col-span-3 md:col-start-10">
            <span className="label block text-stone">From</span>
            <span className="font-display text-d4 transition-colors duration-500 group-hover:text-accent">{tier.from}</span>
          </p>
          <div className="col-span-2 md:col-span-6 md:col-start-4 md:row-start-1">
            <p className="text-ink/80">{tier.audience}</p>
            <p className="label mt-3 text-stone">{tier.includes.join(" · ")}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
