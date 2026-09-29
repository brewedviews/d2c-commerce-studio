import type { Metadata } from "next";
import { caseStudies } from "@/content/case-studies";
import { ProjectFeature } from "@/components/case-study/project-feature";
import { FinalCta } from "@/components/sections/final-cta";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "Work — D2C Commerce Case Studies",
  description:
    "Live commerce platforms we have designed and built: Prabha Kala, a D2C fashion storefront on Shopify, and LOKL, a hyperlocal marketplace.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <header className="container-site pb-16 pt-12 md:pb-24 md:pt-20">
        <SectionLabel>Work</SectionLabel>
        <h1 className="mt-6 font-display text-d1">
          <span className="rise-line">
            <span>Live, and</span>
          </span>
          <span className="rise-line" style={{ "--i": 1 } as React.CSSProperties}>
            <span>
              <em className="italic">selling.</em>
            </span>
          </span>
        </h1>
        <p className="fade-in mt-10 max-w-xl text-lead text-ink/80 md:ml-[50%]" style={{ "--i": 2 } as React.CSSProperties}>
          Every project here is a working commerce platform — designed, engineered and launched end-to-end. No
          concepts, no mock-ups.
        </p>
      </header>

      <div className="container-site space-y-28 pb-28 md:space-y-44 md:pb-44">
        {caseStudies.map((study, i) => (
          <ProjectFeature key={study.slug} study={study} index={i + 1} reverse={i % 2 === 1} headingLevel="h2" />
        ))}
      </div>

      <FinalCta />
    </>
  );
}
