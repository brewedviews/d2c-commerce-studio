import Link from "next/link";
import { site } from "@/content/site";
import { caseStudies } from "@/content/case-studies";
import { ButtonLink } from "@/components/ui/button-link";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frame";

const headline = [
  <>Premium digital</>,
  <>commerce experiences</>,
  <>
    for <em className="italic">ambitious</em> D2C brands.
  </>,
];

export function Hero() {
  const [prabha, lokl] = caseStudies;

  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-site pb-14 pt-10 md:pb-20 md:pt-16">
        <div className="fade-in flex items-center justify-between gap-6 border-b border-line pb-5" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="label text-stone">
            {site.descriptor} <span className="hidden sm:inline">— Shopify · Custom commerce</span>
          </p>
          <Link href="/#pricing" className="label group flex items-center gap-2 text-ink">
            <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="link-underline">Projects from {site.startingPrice}</span>
          </Link>
        </div>

        <h1 id="hero-title" className="mt-8 font-display text-d1 md:mt-12">
          {headline.map((line, i) => (
            <span key={i} className="rise-line" style={{ "--i": i } as React.CSSProperties}>
              <span>
                {line}
                {i < headline.length - 1 && " "}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <nav
            aria-label="Selected work"
            className="fade-in hidden self-end lg:col-span-4 lg:row-span-2 lg:row-start-1 lg:block"
            style={{ "--i": 5 } as React.CSSProperties}
          >
            <p className="label text-stone">Selected work</p>
            <ul className="mt-3 border-t border-line">
              {caseStudies.map((study, i) => (
                <li key={study.slug} className="border-b border-line">
                  <Link href={`/work/${study.slug}`} className="group flex items-baseline gap-4 py-3">
                    <span className="label text-stone">0{i + 1}</span>
                    <span className="font-display text-[1.5rem] leading-none transition-colors duration-500 group-hover:text-accent">
                      {study.title}
                    </span>
                    <span className="label ml-auto text-stone">{study.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p
            className="fade-in max-w-[34rem] text-lead text-ink/80 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-7"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            We design, build, integrate and launch high-performing storefronts — from Shopify setup to custom commerce
            infrastructure.
          </p>
          <div
            className="fade-in flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-6 md:col-start-7 md:row-start-2 lg:col-span-5 lg:col-start-7"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <ButtonLink href={site.cta.primary.href} track="start_project" trackLocation="hero">
              {site.cta.primary.label}
            </ButtonLink>
            <ButtonLink href={site.cta.secondary.href} variant="text">
              {site.cta.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Stage: real work, not illustration */}
      <div className="relative bg-paper-sunk">
        <div className="container-site relative pb-16 pt-12 md:pb-24 md:pt-16">
          <div className="fade-in relative" style={{ "--i": 5 } as React.CSSProperties}>
            <div className="w-[88%] md:w-[80%]">
              <BrowserFrame
                image={prabha.heroImage}
                url={prabha.urlLabel}
                sizes="(min-width: 1680px) 1300px, (min-width: 768px) 80vw, 88vw"
                priority
              />
            </div>
            <div className="absolute -bottom-8 right-0 w-[30%] max-w-[300px] md:-bottom-12 md:right-[3%] md:w-[19%]">
              {lokl.mobileImage && <PhoneFrame image={lokl.mobileImage} sizes="(min-width: 768px) 19vw, 30vw" priority />}
            </div>
          </div>

          <div className="mt-16 grid gap-3 text-sm text-stone sm:grid-cols-2 md:mt-20 md:w-[80%]">
            <p className="label">
              <span className="text-ink">{prabha.title}</span> — {prabha.category}, live at {prabha.urlLabel}
            </p>
            <p className="label sm:text-right md:text-left">
              <span className="text-ink">{lokl.title}</span> — {lokl.category}, live at {lokl.urlLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
