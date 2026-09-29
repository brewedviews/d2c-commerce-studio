import { pricingNotes } from "@/content/pricing";
import { site } from "@/content/site";
import { PricingList } from "@/components/pricing/pricing-list";
import { Ownership } from "@/components/pricing/ownership";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      data-track-view="view_pricing"
      className="section-y bg-paper-sunk"
    >
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="05">Pricing</SectionLabel>
            <h2 id="pricing-title" data-reveal className="mt-6 font-display text-d2">
              Clear from the <em className="italic">start.</em>
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-ink/75">
              {pricingNotes.scoping}
            </p>
            <ButtonLink
              href={site.cta.primary.href}
              track="start_project"
              trackLocation="pricing"
              className="mt-8"
            >
              Get a fixed quote
            </ButtonLink>
          </div>
          <div className="lg:col-span-8">
            <PricingList />
          </div>
        </div>

        <div data-reveal className="mt-16 md:mt-24">
          <Ownership />
        </div>
      </div>
    </section>
  );
}
