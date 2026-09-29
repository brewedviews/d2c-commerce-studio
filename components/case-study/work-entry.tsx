import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils/cn";
import { ArtDirectedImage } from "./art-directed-image";

/**
 * A portfolio entry on /work. Uses the same cover as the homepage entry so a
 * project looks the same wherever it appears. `layout` alternates the
 * composition: "stacked" (full-width image, text beneath) and "split"
 * (text column beside a large image).
 */
export function WorkEntry({ study, index, layout }: { study: CaseStudy; index: number; layout: "stacked" | "split" }) {
  const href = `/work/${study.slug}`;
  const titleId = `work-${study.slug}-title`;
  const split = layout === "split";

  const media = (
    <Link
      href={href}
      tabIndex={-1}
      aria-hidden="true"
      data-track="click_case_study"
      data-track-location={`work_${study.slug}_image`}
      className="group/media block overflow-hidden rounded-sm p-2 sm:p-3 md:p-4"
      style={{ backgroundColor: study.brandColor }}
    >
      <div data-reveal="image" className="overflow-hidden rounded-xs">
        <ArtDirectedImage
          cover={study.cover}
          sizes={split ? "(min-width: 1024px) 62vw, 94vw" : "(min-width: 1680px) 1550px, 94vw"}
          priority={index === 1}
          imgClassName="transition-transform duration-[1.4s] ease-out-expo group-hover/media:scale-[1.02]"
        />
      </div>
    </Link>
  );

  const details = (
    <>
      <p className="label text-stone">
        {String(index).padStart(2, "0")} — {study.category}
      </p>
      <h2 id={titleId} className={cn("mt-4 font-display", split ? "text-d2" : "text-d1")}>
        <Link
          href={href}
          data-track="click_case_study"
          data-track-location={`work_${study.slug}_title`}
          className="transition-colors duration-500 hover:text-accent"
        >
          {study.title}
        </Link>
      </h2>
    </>
  );

  const body = (
    <>
      <p className="text-lead text-ink/85">{study.description}</p>
      <ul aria-label="Capabilities" className="mt-8 grid grid-cols-2 gap-x-6 border-t border-line">
        {study.capabilities.map((c) => (
          <li key={c} className="border-b border-line py-2.5 text-[0.92rem] text-ink/80">
            {c}
          </li>
        ))}
      </ul>
      <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
        <ButtonLink href={href} track="click_case_study" trackLocation={`work_${study.slug}_cta`}>
          Read case study
        </ButtonLink>
        {study.url && (
          <a
            href={study.url}
            target="_blank"
            rel="noopener noreferrer"
            data-track="click_visit_site"
            data-track-location={`work_${study.slug}`}
            className="group inline-flex items-center gap-2 font-medium"
          >
            <span className="link-underline">Visit site</span>
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
            <span className="sr-only">(opens {study.urlLabel} in a new tab)</span>
          </a>
        )}
      </div>
    </>
  );

  if (split) {
    return (
      <article aria-labelledby={titleId} className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:order-2 lg:col-span-8">{media}</div>
        <div className="flex flex-col lg:order-1 lg:col-span-4 lg:pt-4">
          {details}
          <div className="mt-8 lg:mt-auto lg:pt-10">{body}</div>
        </div>
      </article>
    );
  }

  return (
    <article aria-labelledby={titleId}>
      {media}
      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
        <div className="md:col-span-5">{details}</div>
        <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">{body}</div>
      </div>
    </article>
  );
}
