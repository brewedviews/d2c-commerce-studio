import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button-link";

export function FinalCta({
  title = "Have a brand ready to go online?",
  body = "Let’s turn it into a store people want to buy from.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-accent text-accent-ink">
      <div className="container-site py-24 md:py-40">
        <h2 id="cta-title" data-reveal className="max-w-[13ch] font-display text-d1">
          {title}
        </h2>
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end">
          <p data-reveal className="text-lead md:col-span-5">
            {body}
          </p>
          <div data-reveal className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-6 md:col-start-7 md:justify-end">
            <p className="label">Projects from {site.startingPrice}</p>
            <ButtonLink href={site.cta.primary.href} variant="solid-light" track="start_project" trackLocation="final_cta">
              {site.cta.primary.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
