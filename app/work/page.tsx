import type { Metadata } from "next";
import { caseStudies } from "@/content/case-studies";
import { WorkEntry } from "@/components/case-study/work-entry";
import { FinalCta } from "@/components/sections/final-cta";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "Selected Work — D2C Commerce Case Studies",
  description:
    "Commerce experiences and digital products we've designed and built: Prabha Kala, a premium D2C fashion storefront on Shopify, and LOKL, a hyperlocal commerce ecosystem.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <header data-track-view="view_work" className="container-site pb-16 pt-12 md:pb-24 md:pt-20">
        <SectionLabel>Work</SectionLabel>
        <div className="mt-6 grid gap-8 md:grid-cols-12 md:items-end">
          <h1 className="font-display text-d1 md:col-span-8">
            <span className="rise-line">
              <span>
                Selected <em className="italic">work</em>
              </span>
            </span>
          </h1>
          <p className="fade-in max-w-md text-lead text-ink/80 md:col-span-4" style={{ "--i": 1 } as React.CSSProperties}>
            A few of the commerce experiences and digital products we’ve designed and built.
          </p>
        </div>
      </header>

      <div className="container-site space-y-28 pb-28 md:space-y-44 md:pb-44">
        {caseStudies.map((study, i) => (
          <WorkEntry key={study.slug} study={study} index={i + 1} layout={i % 2 === 0 ? "stacked" : "split"} />
        ))}
      </div>

      <FinalCta />
    </>
  );
}
