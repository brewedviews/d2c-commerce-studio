import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { Arrow } from "@/components/ui/arrow";
import { cn } from "@/lib/utils/cn";

/** Pick the first desktop and first mobile capture from a case study's gallery. */
export function featureImages(study: CaseStudy) {
  const desktop = study.gallery.find((i) => i.kind === "desktop") ?? study.heroImage;
  const mobile = study.gallery.find((i) => i.kind === "mobile") ?? study.mobileImage;
  return { desktop, mobile };
}

/**
 * Editorial project entry: brand-coloured stage with real screenshots,
 * oversized title, and a quiet metadata column.
 */
export function ProjectFeature({
  study,
  index,
  reverse = false,
  headingLevel = "h3",
}: {
  study: CaseStudy;
  index: number;
  reverse?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const { desktop, mobile } = featureImages(study);
  const Heading = headingLevel;
  const href = `/work/${study.slug}`;

  return (
    <article className="group/project">
      <Link
        href={href}
        aria-label={`${study.title} — view case study`}
        className="relative block overflow-hidden rounded-sm"
        style={{ backgroundColor: study.brandColor }}
      >
        <div data-reveal="image" className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[16/9]">
          {/* Desktop capture, bleeding off one edge */}
          <div
            className={cn(
              "absolute top-[10%] w-[118%] transition-transform duration-[1.4s] ease-out-expo group-hover/project:-translate-y-2 sm:top-[12%] sm:w-[78%]",
              reverse ? "right-[6%] sm:right-[8%]" : "left-[6%] sm:left-[8%]",
            )}
          >
            <Image
              src={desktop.src}
              alt={desktop.alt}
              width={desktop.width}
              height={desktop.height}
              sizes="(min-width: 1680px) 1250px, (min-width: 640px) 78vw, 118vw"
              className="h-auto w-full rounded-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)]"
            />
          </div>
          {mobile && (
            <div
              className={cn(
                "absolute bottom-[-6%] w-[42%] transition-transform duration-[1.4s] ease-out-expo group-hover/project:-translate-y-4 sm:bottom-[-14%] sm:w-[21%]",
                reverse ? "left-[8%] sm:left-[6%]" : "right-[8%] sm:right-[6%]",
              )}
            >
              <Image
                src={mobile.src}
                alt={mobile.alt}
                width={mobile.width}
                height={mobile.height}
                sizes="(min-width: 640px) 21vw, 42vw"
                className="h-auto w-full rounded-[1.1rem] border-[5px] border-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
              />
            </div>
          )}

          {/* Hover affordance */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 scale-50 items-center justify-center rounded-full bg-paper text-center text-sm font-medium text-ink opacity-0 transition-[opacity,transform] duration-700 ease-out-expo group-hover/project:scale-100 group-hover/project:opacity-100 max-md:hidden"
          >
            View case
            <br />
            study
          </span>
        </div>
      </Link>

      <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6 lg:col-span-5">
          <p className="label text-stone">
            {String(index).padStart(2, "0")} — {study.category}
          </p>
          <Heading className="mt-3 font-display text-d2">
            <Link href={href} className="transition-colors duration-500 hover:text-accent">
              {study.title}
            </Link>
          </Heading>
        </div>
        <div className="md:col-span-6 lg:col-span-6 lg:col-start-7">
          <p className="text-lead text-ink/85">{study.description}</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Capabilities">
            {study.capabilities.slice(0, 6).map((c) => (
              <li key={c} className="label text-stone">
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-5">
            <Link href={href} className="group/link inline-flex items-center gap-2 font-medium">
              <span className="link-underline">View case study</span>
              <Arrow className="transition-transform duration-500 group-hover/link:translate-x-1" />
            </Link>
            <p className="label text-stone">{study.stack.join(" · ")}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
