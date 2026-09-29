import type { Metadata } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { pricingNotes } from "@/content/pricing";
import { Ownership } from "@/components/pricing/ownership";
import { PricingList } from "@/components/pricing/pricing-list";
import { Process } from "@/components/sections/process";
import { FinalCta } from "@/components/sections/final-cta";
import { Technology } from "@/components/sections/technology";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "Services — Shopify & D2C Website Development",
  description: `Custom Shopify storefronts, brand websites, commerce systems and custom experiences for D2C brands. Razorpay, Shiprocket and analytics integrations. Projects from ${site.startingPrice}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <header className="container-site pb-16 pt-12 md:pb-24 md:pt-20">
        <SectionLabel>Services</SectionLabel>
        <h1 className="mt-6 font-display text-d1">
          <span className="rise-line">
            <span>Storefronts, and</span>
          </span>
          <span className="rise-line" style={{ "--i": 1 } as React.CSSProperties}>
            <span>
              everything <em className="italic">behind them.</em>
            </span>
          </span>
        </h1>
      </header>

      <div className="container-site">
        {services.map((service, i) => (
          <section
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-title`}
            className="grid gap-8 border-t border-ink py-14 md:grid-cols-12 md:py-20"
          >
            <p className="label text-stone md:col-span-2">0{i + 1}</p>
            <div className="md:col-span-5">
              <h2 id={`${service.slug}-title`} data-reveal className="font-display text-d2">
                {service.title}
              </h2>
              <p className="mt-5 text-lead text-ink/85">{service.summary}</p>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="text-ink/75">{service.detail}</p>
              <ul className="mt-6 border-t border-line">
                {service.deliverables.map((d) => (
                  <li key={d} className="label border-b border-line py-3 text-ink/80">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <div className="border-t border-line">
        <Process index="" />
      </div>

      <section id="pricing" aria-labelledby="svc-pricing-title" data-track-view="view_pricing" className="section-y bg-paper-sunk">
        <div className="container-site">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>Pricing</SectionLabel>
              <h2 id="svc-pricing-title" className="mt-6 font-display text-d2">
                Projects from <em className="italic">{site.startingPrice}.</em>
              </h2>
              <p className="mt-6 max-w-sm text-ink/75">{pricingNotes.scoping}</p>
              <p className="mt-4 max-w-sm text-ink/75">{pricingNotes.indicative}</p>
            </div>
            <div className="lg:col-span-8">
              <PricingList />
            </div>
          </div>
          <div className="mt-16">
            <Ownership />
          </div>
        </div>
      </section>

      <Technology index="" />
      <FinalCta />
    </>
  );
}
