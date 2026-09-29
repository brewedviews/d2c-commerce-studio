import { pricingSummary } from "@/content/pricing";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";

/**
 * A starting point to self-qualify against rather than a package table:
 * the price is a floor, and scope sets the rest.
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      data-track-view="view_pricing"
      className="border-t border-line py-[clamp(4rem,2.5rem+5vw,7.5rem)]"
    >
      <div className="container-site grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4 lg:col-span-3">
          <SectionLabel index="05">Pricing</SectionLabel>
        </div>

        <div className="md:col-span-8 lg:col-span-5">
          <h2 id="pricing-title" data-reveal>
            <span className="label block text-stone">Projects starting from</span>
            <span className="mt-4 block font-display text-d1">{site.startingPrice}+</span>
          </h2>
          <p data-reveal className="mt-8 max-w-xl text-lead text-ink/85">
            {pricingSummary.lead}
          </p>
        </div>

        <div data-reveal className="md:col-span-8 md:col-start-5 lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="label text-stone">Scoped on</p>
          <ul className="mt-3 border-t border-line">
            {pricingSummary.factors.map((f) => (
              <li key={f} className="border-b border-line py-2.5 text-ink/85">
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink/70">{pricingSummary.scoping}</p>
          <p className="mt-2 text-sm text-ink/70">{pricingSummary.thirdParty}</p>
          <ButtonLink href={site.cta.primary.href} variant="text" track="start_project" trackLocation="pricing" className="mt-6">
            Get a quote for your scope
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
