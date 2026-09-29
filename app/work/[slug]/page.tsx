import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getAdjacentCaseStudies, getCaseStudy } from "@/content/case-studies";
import { site } from "@/content/site";
import { ArchitectureDiagram } from "@/components/case-study/architecture-diagram";
import { ArtDirectedImage } from "@/components/case-study/art-directed-image";
import { BuildOverview } from "@/components/case-study/build-overview";
import { CaseNav } from "@/components/case-study/case-nav";
import { CaseStudyGallery } from "@/components/case-study/gallery";
import { SystemFlow } from "@/components/case-study/system-flow";
import { TechnologyTable } from "@/components/case-study/technology-table";
import { Walkthrough } from "@/components/case-study/walkthrough";
import { FinalCta } from "@/components/sections/final-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const title = `${study.seo.title} | ${site.name}`;
  return {
    title: { absolute: title },
    description: study.seo.description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { type: "article", title, description: study.seo.description, url: `/work/${study.slug}` },
    twitter: { card: "summary_large_image", title, description: study.seo.description },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { previous, next } = getAdjacentCaseStudies(study.slug);
  const pageUrl = `${site.url}/work/${study.slug}`;

  const meta = [
    { label: "Category", value: study.category },
    { label: "Built with", value: study.stack.join(", ") },
    ...(study.year ? [{ label: "Year", value: study.year }] : []),
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: `${study.title} — ${study.category} case study`,
      headline: study.headline,
      description: study.seo.description,
      url: pageUrl,
      image: `${site.url}${study.hero.image.src}`,
      genre: study.category,
      keywords: study.stack.join(", "),
      creator: { "@type": "Organization", name: site.name, url: site.url },
      ...(study.url ? { about: { "@type": "WebSite", name: study.client, url: study.url } } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work` },
        { "@type": "ListItem", position: 3, name: study.title, item: pageUrl },
      ],
    },
  ];

  return (
    <article>
      {/* 01 — Hero */}
      <header data-track-view="view_case_study" data-track-id={study.slug} className="container-site pb-12 pt-10 md:pb-16 md:pt-16">
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
          <span className="sr-only"> — </span>
          <span className="rise-line text-d3 italic text-ink/70" style={{ "--i": 1 } as React.CSSProperties}>
            <span className="pt-2 md:pt-3">{study.headline}</span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
          <p className="fade-in text-lead text-ink/85 md:col-span-6" style={{ "--i": 2 } as React.CSSProperties}>
            {study.description}
          </p>
          <dl
            className="fade-in grid grid-cols-2 gap-x-8 gap-y-6 md:col-span-5 md:col-start-8"
            style={{ "--i": 3 } as React.CSSProperties}
          >
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
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="click_visit_site"
                    data-track-location="case_hero"
                    className="link-underline"
                  >
                    {study.urlLabel} <span aria-hidden="true">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      <div className="container-site">
        <div
          className="fade-in overflow-hidden rounded-sm p-2 sm:p-3 md:p-4"
          style={{ "--i": 4, backgroundColor: study.brandColor } as React.CSSProperties}
        >
          <div className="overflow-hidden rounded-xs">
            <ArtDirectedImage cover={study.hero} sizes="(min-width: 1680px) 1550px, 94vw" priority />
          </div>
        </div>
      </div>

      {/* Overview, challenge, approach */}
      <section aria-label="Overview" className="container-site section-y">
        <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-8">
          <h2 className="label text-stone md:col-span-3 md:pt-3">Overview</h2>
          <p data-reveal className="font-display text-d3 md:col-span-9">
            {study.overview}
          </p>
        </div>

        <div className="mt-20 grid gap-y-14 md:mt-28 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-5 md:col-start-4">
            <h2 className="label text-accent">The challenge</h2>
            <p data-reveal className="mt-5 font-display text-d4">
              {study.challenge}
            </p>
            {study.challengeDetail && <p className="mt-5 text-ink/75">{study.challengeDetail}</p>}
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <h2 className="label text-stone">Our approach</h2>
            <p data-reveal className="mt-5 text-lead text-ink/85">
              {study.solution}
            </p>
          </div>
        </div>
      </section>

      {/* What we built */}
      <BuildOverview groups={study.built} title={study.builtTitle} />

      {/* Architecture + flow */}
      <section aria-labelledby="architecture-title" className="section-y bg-paper-sunk">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <SectionLabel>Architecture</SectionLabel>
              <h2 id="architecture-title" data-reveal className="mt-6 font-display text-d2">
                How it fits <em className="italic">together.</em>
              </h2>
            </div>
            <p className="text-ink/75 md:col-span-4 md:col-start-9">
              Read top to bottom: each layer talks to the one beneath it. Filled blocks are what we engineered.
            </p>
          </div>
          <div className="mt-14 md:mt-20">
            <ArchitectureDiagram architecture={study.architecture} title={`${study.title} system architecture`} />
          </div>
          {study.flow && (
            <div className="mt-24 border-t border-ink/15 pt-14 md:mt-32 md:pt-20">
              <SystemFlow flow={study.flow} />
            </div>
          )}
        </div>
      </section>

      {/* Technology */}
      <section aria-labelledby="technology-title" className="container-site section-y">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>Technology</SectionLabel>
            <h2 id="technology-title" data-reveal className="mt-6 font-display text-d2">
              The stack, and <em className="italic">why.</em>
            </h2>
            <p className="mt-6 max-w-sm text-ink/75">Each piece is there for a job. This is what each one does in {study.title}.</p>
          </div>
          <div className="lg:col-span-8">
            <TechnologyTable rows={study.technology} caption={`Technology used in ${study.title} and the role of each`} />
          </div>
        </div>
      </section>

      {/* Feature walkthrough */}
      <div className="border-t border-line">
        <Walkthrough items={study.walkthrough} brandColor={study.brandColor} url={study.urlLabel} />
      </div>

      {/* Gallery */}
      <CaseStudyGallery images={study.gallery} brandColor={study.brandColor} />

      {/* Results — only when substantiated data exists */}
      {study.results.length > 0 && (
        <section aria-labelledby="results-title" className="container-site section-y">
          <h2 id="results-title" className="label text-stone">
            Results
          </h2>
          <dl className="mt-8 grid gap-10 border-t border-ink pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {study.results.map((r) => (
              <div key={r.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-ink/75">{r.label}</dt>
                <dd className="font-display text-d2">{r.value}</dd>
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

      {/* Outcome + live site */}
      <section aria-labelledby="outcome-title" className="container-site section-y">
        <div className="grid gap-8 border-t border-ink pt-10 md:grid-cols-12 md:pt-14">
          <h2 id="outcome-title" className="label text-stone md:col-span-3">
            Outcome
          </h2>
          <div className="md:col-span-9">
            {study.outcome && (
              <p data-reveal className="font-display text-d2">
                {study.outcome}
              </p>
            )}
            {study.url && (
              <ButtonLink
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                track="click_visit_site"
                trackLocation="case_outcome"
                className="mt-10"
                aria-label={`Visit ${study.title} (opens ${study.urlLabel} in a new tab)`}
              >
                Visit {study.title}
              </ButtonLink>
            )}
          </div>
        </div>
      </section>

      <CaseNav previous={previous} next={next} />

      <FinalCta title="Want something like this for your brand?" body="Tell us what you’re building. We’ll show you how we’d approach it." />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
