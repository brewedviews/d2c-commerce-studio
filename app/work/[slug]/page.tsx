import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { site } from "@/content/site";
import { CaseStudyGallery } from "@/components/case-study/gallery";
import { FinalCta } from "@/components/sections/final-cta";
import { Arrow } from "@/components/ui/arrow";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frame";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const title = `${study.title} — ${study.category} Case Study`;
  return {
    title,
    description: `${study.description} Built with ${study.stack.join(", ")}.`,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: "article",
      title: `${title} — ${site.name}`,
      description: study.description,
      url: `/work/${study.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  const meta = [
    { label: "Client", value: study.client },
    { label: "Category", value: study.category },
    { label: "Stack", value: study.stack.join(", ") },
    ...(study.year ? [{ label: "Year", value: study.year }] : []),
  ];

  return (
    <article>
      {/* Header */}
      <header className="container-site pb-14 pt-10 md:pb-20 md:pt-16" data-track-view="view_case_study" data-track-id={study.slug}>
        <nav aria-label="Breadcrumb" className="label flex items-center gap-2 text-stone">
          <Link href="/work" className="link-underline">
            Work
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-ink">
            {study.title}
          </span>
        </nav>
        <h1 className="mt-8 font-display text-d1">
          <span className="rise-line">
            <span>{study.title}</span>
          </span>
        </h1>
        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
          <p className="fade-in text-lead text-ink/85 md:col-span-6" style={{ "--i": 1 } as React.CSSProperties}>
            {study.description}
          </p>
          <dl className="fade-in grid grid-cols-2 gap-x-8 gap-y-6 md:col-span-5 md:col-start-8" style={{ "--i": 2 } as React.CSSProperties}>
            {meta.map((m) => (
              <div key={m.label} className="border-t border-line pt-3">
                <dt className="label text-stone">{m.label}</dt>
                <dd className="mt-2 text-[0.95rem]">{m.value}</dd>
              </div>
            ))}
            {study.url && (
              <div className="border-t border-line pt-3">
                <dt className="label text-stone">Live site</dt>
                <dd className="mt-2 text-[0.95rem]">
                  <a href={study.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                    {study.urlLabel} <span aria-hidden="true">↗</span>
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      {/* Hero stage */}
      <div style={{ backgroundColor: study.brandColor }}>
        <div className="container-site relative pb-0 pt-12 md:pt-20">
          <div className="fade-in relative md:w-[84%]" style={{ "--i": 3 } as React.CSSProperties}>
            <BrowserFrame image={study.heroImage} url={study.urlLabel} priority sizes="(min-width: 1680px) 1400px, (min-width: 768px) 84vw, 92vw" className="translate-y-10 md:translate-y-16" />
          </div>
          {study.mobileImage && (
            <div className="absolute bottom-0 right-[4%] hidden w-[18%] max-w-[300px] translate-y-24 md:block">
              <PhoneFrame image={study.mobileImage} sizes="18vw" priority />
            </div>
          )}
        </div>
      </div>

      {/* Narrative */}
      <section aria-label="Overview" className="container-site pt-32 md:pt-48">
        <div className="grid gap-y-16 md:grid-cols-12">
          <h2 className="label text-stone md:col-span-3">Challenge</h2>
          <p data-reveal className="font-display text-d4 md:col-span-8 md:col-start-5">
            {study.challenge}
          </p>
          <h2 className="label text-stone md:col-span-3">Solution</h2>
          <p data-reveal className="text-lead text-ink/85 md:col-span-7 md:col-start-5">
            {study.solution}
          </p>
        </div>
      </section>

      <section aria-labelledby="built-title" className="container-site section-y">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 id="built-title" className="label text-stone">
              What we built
            </h2>
            <ol className="mt-5 border-t border-ink">
              {study.capabilities.map((c, i) => (
                <li key={c} className="flex items-baseline gap-5 border-b border-line py-3.5">
                  <span className="label text-stone">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[1.45rem] leading-tight">{c}</span>
                </li>
              ))}
            </ol>
          </div>
          {study.features.length > 0 && (
            <div className="md:col-span-5 md:col-start-8">
              <h2 className="label text-stone">Inside the experience</h2>
              <ul className="mt-5 border-t border-ink">
                {study.features.map((f) => (
                  <li key={f} className="border-b border-line py-3.5 text-ink/85">
                    {f}
                  </li>
                ))}
              </ul>
              <h2 className="label mt-12 text-stone">Technology</h2>
              <p className="mt-4 text-ink/85">{study.stack.join(" · ")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section aria-label="Gallery" className="container-site">
        <CaseStudyGallery images={study.gallery} url={study.urlLabel} brandColor={study.brandColor} />
      </section>

      {/* Results — rendered only when substantiated data exists */}
      {study.results.length > 0 && (
        <section aria-labelledby="results-title" className="container-site section-y">
          <h2 id="results-title" className="label text-stone">
            Results
          </h2>
          <dl className="mt-8 grid gap-10 border-t border-ink pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {study.results.map((r) => (
              <div key={r.label}>
                <dd className="font-display text-d2">{r.value}</dd>
                <dt className="mt-2 text-ink/75">{r.label}</dt>
              </div>
            ))}
          </dl>
        </section>
      )}

      {study.testimonial && (
        <section aria-label="Testimonial" className="container-site section-y">
          <figure className="mx-auto max-w-4xl">
            <blockquote className="font-display text-d3">“{study.testimonial.quote}”</blockquote>
            <figcaption className="label mt-8 text-stone">
              {study.testimonial.name}
              {study.testimonial.role && ` — ${study.testimonial.role}`}
            </figcaption>
          </figure>
        </section>
      )}

      {study.outcome && (
        <section aria-labelledby="outcome-title" className="container-site section-y">
          <div className="grid gap-8 border-t border-ink pt-10 md:grid-cols-12">
            <h2 id="outcome-title" className="label text-stone md:col-span-3">
              Outcome
            </h2>
            <p data-reveal className="font-display text-d3 md:col-span-9">
              {study.outcome}
            </p>
          </div>
        </section>
      )}

      {/* Next project */}
      {next.slug !== study.slug && (
        <Link href={`/work/${next.slug}`} className="group block border-t border-line">
          <div className="container-site grid items-center gap-8 py-16 md:grid-cols-12 md:py-24">
            <div className="md:col-span-6">
              <p className="label text-stone">Next project</p>
              <p className="mt-4 flex items-center gap-5 font-display text-d2 transition-colors duration-500 group-hover:text-accent">
                {next.title}
                <Arrow className="size-[0.6em] transition-transform duration-700 ease-out-expo group-hover:translate-x-3" />
              </p>
              <p className="label mt-3 text-stone">{next.category}</p>
            </div>
            <div className="overflow-hidden rounded-sm md:col-span-5 md:col-start-8" style={{ backgroundColor: next.brandColor }}>
              <Image
                src={next.heroImage.src}
                alt=""
                width={next.heroImage.width}
                height={next.heroImage.height}
                sizes="(min-width: 768px) 40vw, 92vw"
                className="h-auto w-full translate-y-[8%] scale-[0.86] rounded-[3px] transition-transform duration-1000 ease-out-expo group-hover:translate-y-[4%]"
              />
            </div>
          </div>
        </Link>
      )}

      <FinalCta title="Want something like this for your brand?" body="Tell us what you’re building. We’ll show you how we’d approach it." />
    </article>
  );
}
