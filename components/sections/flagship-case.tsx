import Image from "next/image";
import { flagshipCaseStudy as study } from "@/content/case-studies";
import { ButtonLink } from "@/components/ui/button-link";
import { PhoneFrame } from "@/components/ui/device-frame";
import { SectionLabel } from "@/components/ui/section-label";

export function FlagshipCase() {
  const product = study.gallery.find((g) => g.src.endsWith("/product.jpg")) ?? study.heroImage;
  const mobile = study.gallery.find((g) => g.kind === "mobile");

  return (
    <section aria-labelledby="flagship-title" className="bg-ink pb-24 text-paper md:pb-36">
      {/* Full-bleed visual moment */}
      <div className="relative overflow-hidden" style={{ backgroundColor: study.brandColor }}>
        <div className="container-site relative pt-20 md:pt-28">
          <SectionLabel index="07" className="text-accent-ink/70">
            Case study
          </SectionLabel>
          <h2 id="flagship-title" data-reveal className="mt-6 max-w-[18ch] font-display text-d2">
            {study.title}: a saree label, built as a complete commerce operation.
          </h2>

          <div className="relative mt-14 md:mt-20">
            <div data-reveal="image" className="w-full translate-y-10 md:w-[82%]">
              <Image
                src={product.src}
                alt={product.alt}
                width={product.width}
                height={product.height}
                sizes="(min-width: 1680px) 1350px, (min-width: 768px) 82vw, 100vw"
                className="h-auto w-full rounded-t-sm"
              />
            </div>
            {mobile && (
              <div className="absolute -bottom-6 right-0 hidden w-[20%] max-w-[300px] md:block">
                <PhoneFrame image={mobile} sizes="20vw" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-site mt-24 grid gap-14 md:mt-32 md:grid-cols-2 lg:grid-cols-12">
        <div data-reveal className="md:col-span-2 lg:col-span-4">
          <h3 className="label text-stone-soft">Challenge</h3>
          <p className="mt-5 font-display text-d4">{study.challenge}</p>
        </div>

        <div data-reveal className="lg:col-span-4 lg:col-start-6">
          <h3 className="label text-stone-soft">What we built</h3>
          <ol className="mt-5 border-t border-line-dark">
            {study.capabilities.map((c, i) => (
              <li key={c} className="flex items-baseline gap-4 border-b border-line-dark py-3">
                <span className="label text-stone-soft">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-paper/90">{c}</span>
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal className="flex flex-col lg:col-span-3 lg:col-start-10">
          <h3 className="label text-stone-soft">Outcome</h3>
          <p className="mt-5 text-lead text-paper/90">{study.outcome}</p>
          <p className="label mt-6 text-stone-soft">{study.stack.join(" · ")}</p>
          <div className="mt-10 flex flex-col items-start gap-5 md:mt-auto md:pt-10">
            <ButtonLink href={`/work/${study.slug}`} variant="solid-light">
              Read the case study
            </ButtonLink>
            {study.url && (
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2 text-paper/80 hover:text-paper"
              >
                Visit {study.urlLabel} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
