import { faqs } from "@/content/faq";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="08">FAQ</SectionLabel>
            <h2 id="faq-title" data-reveal className="mt-6 font-display text-d2">
              Questions, <em className="italic">answered.</em>
            </h2>
            <p className="mt-6 max-w-sm text-ink/75">Something we haven’t covered? Ask us directly.</p>
            <ButtonLink href={site.cta.primary.href} variant="text" track="start_project" trackLocation="faq" className="mt-6">
              Get in touch
            </ButtonLink>
          </div>
        </div>

        <div className="border-t border-ink lg:col-span-8">
          {faqs.map((item) => (
            <details key={item.question} name="faq" className="faq group border-b border-line">
              <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 md:py-7">
                <h3 className="font-display text-[clamp(1.35rem,1.2rem+0.6vw,1.8rem)] leading-snug transition-colors duration-300 group-hover:text-accent">
                  {item.question}
                </h3>
                <span aria-hidden="true" className="relative mt-2.5 size-3.5 shrink-0">
                  <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                  <span className="absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-500 ease-out-expo group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-8 pr-10 text-ink/75">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </section>
  );
}
