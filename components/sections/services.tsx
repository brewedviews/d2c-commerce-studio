import { services } from "@/content/services";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y border-t border-line">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="02">What we build</SectionLabel>
            <h2 id="services-title" data-reveal className="mt-6 font-display text-d2">
              Four ways we help brands <em className="italic">sell.</em>
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-ink/75">
              From a brand’s first storefront to the systems running behind it — designed and engineered by the same
              team.
            </p>
            <ButtonLink href="/services" variant="text" className="mt-8">
              Services in detail
            </ButtonLink>
          </div>
        </div>

        <ol className="border-t border-ink lg:col-span-8">
          {services.map((service, i) => (
            <li key={service.slug} data-reveal className="group border-b border-line">
              <div className="grid gap-4 py-9 md:grid-cols-8 md:gap-8 md:py-12">
                <span className="label pt-3 text-stone transition-colors duration-500 group-hover:text-accent md:col-span-1">
                  0{i + 1}
                </span>
                <div className="md:col-span-7">
                  <h3 className="font-display text-d3 transition-transform duration-700 ease-out-expo group-hover:translate-x-2">
                    {service.title}
                  </h3>
                  <div className="mt-5 grid gap-6 md:grid-cols-7">
                    <p className="text-ink/80 md:col-span-4">{service.summary}</p>
                    <ul className="space-y-1.5 md:col-span-3">
                      {service.deliverables.map((d) => (
                        <li key={d} className="label flex gap-2 text-stone">
                          <span aria-hidden="true">—</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
