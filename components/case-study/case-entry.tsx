import { getImageProps } from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { ButtonLink } from "@/components/ui/button-link";

/**
 * Homepage case-study entry: the site's strongest section as a flat cover
 * (no device chrome — the showcase above already does that), then the dark
 * entry block with challenge, scope, outcome and the way into the case study.
 */
export function CaseEntry({ study, index }: { study: CaseStudy; index: number }) {
  const href = `/work/${study.slug}`;
  const titleId = `case-${study.slug}-title`;
  const { image, mobile } = study.cover;
  const sizes = "(min-width: 1680px) 1550px, 94vw";
  const { props: cover } = getImageProps({ src: image.src, alt: image.alt, width: image.width, height: image.height, sizes });
  const small = mobile && getImageProps({ src: mobile.src, alt: mobile.alt, width: mobile.width, height: mobile.height, sizes }).props;

  return (
    <article aria-labelledby={titleId} className="overflow-hidden rounded-sm bg-ink text-paper">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="group/cover block p-2 sm:p-3 md:p-4">
        <div data-reveal="image" className="overflow-hidden rounded-xs">
          <picture>
            {small && <source media="(max-width: 639px)" srcSet={small.srcSet} sizes={sizes} width={small.width} height={small.height} />}
            <img
              {...cover}
              alt={image.alt}
              className="block h-auto w-full transition-transform duration-[1.4s] ease-out-expo group-hover/cover:scale-[1.015]"
            />
          </picture>
        </div>
      </Link>

      <div className="px-5 pb-12 pt-10 sm:px-8 md:px-10 md:pb-16 md:pt-14 lg:px-14">
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <p className="label text-stone-soft">
              {String(index).padStart(2, "0")} — {study.category}
            </p>
            <h3 id={titleId} className="mt-4 font-display text-d2">
              <Link href={href} data-track="click_case_study" data-track-location={`home_${study.slug}_title`} className="transition-colors duration-500 hover:text-paper/70">
                {study.title}
              </Link>
            </h3>
          </div>
          <p className="text-lead text-paper/85 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            {study.description}
          </p>
        </div>

        <div className="mt-12 grid gap-12 border-t border-line-dark pt-10 md:mt-16 md:grid-cols-2 md:pt-12 lg:grid-cols-12 lg:gap-14">
          <div className="md:col-span-2 lg:col-span-4">
            <h4 className="label text-stone-soft">Challenge</h4>
            <p className="mt-5 font-display text-d4">{study.challenge}</p>
          </div>

          <div className="lg:col-span-4 lg:col-start-6">
            <h4 className="label text-stone-soft">What we built</h4>
            <ol className="mt-5 grid grid-cols-2 gap-x-5 border-t border-line-dark md:grid-cols-1">
              {study.capabilities.map((c, i) => (
                <li key={c} className="flex items-baseline gap-4 border-b border-line-dark py-3">
                  <span className="label text-stone-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-paper/90">{c}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col lg:col-span-3 lg:col-start-10">
            <h4 className="label text-stone-soft">Outcome</h4>
            <p className="mt-5 text-lead text-paper/90">{study.outcome}</p>
            <p className="label mt-6 text-stone-soft">{study.stack.join(" · ")}</p>
            <div className="mt-10 flex flex-col items-start gap-5 md:mt-auto md:pt-10">
              <ButtonLink href={href} variant="solid-light" track="click_case_study" trackLocation={`home_${study.slug}`}>
                Read the case study
              </ButtonLink>
              {study.url && (
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="click_visit_site"
                  data-track-location={`home_${study.slug}`}
                  className="link-underline inline-flex items-center gap-2 text-paper/80 hover:text-paper"
                >
                  Visit {study.urlLabel} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
