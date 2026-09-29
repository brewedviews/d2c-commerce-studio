import type { Metadata } from "next";
import { about } from "@/content/about";
import { caseStudies } from "@/content/case-studies";
import { site } from "@/content/site";
import { FinalCta } from "@/components/sections/final-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "About the Studio",
  description: `${site.name} is a D2C commerce studio designing and building premium storefronts and commerce systems for brands in India.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <header className="container-site pb-20 pt-12 md:pb-32 md:pt-20">
        <SectionLabel>About</SectionLabel>
        <h1 className="mt-6 max-w-[20ch] font-display text-d2">
          <span className="rise-line">
            <span>High-quality commerce, without</span>
          </span>
          <span className="rise-line" style={{ "--i": 1 } as React.CSSProperties}>
            <span>
              the <em className="italic">agency complexity.</em>
            </span>
          </span>
        </h1>
        <p className="fade-in mt-10 max-w-2xl text-lead text-ink/80 md:ml-[33%]" style={{ "--i": 2 } as React.CSSProperties}>
          {about.intro}
        </p>
      </header>

      <section aria-labelledby="position-title" className="border-y border-line bg-paper-sunk">
        <div className="container-site section-y">
          <h2 id="position-title" className="label text-stone">
            What we are not
          </h2>
          <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-10">
            {about.positioning.map((p) => (
              <div key={p.title} data-reveal className="border-t border-ink pt-6">
                <h3 className="font-display text-d4">{p.title}</h3>
                <p className="mt-4 text-ink/75">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="method-title" className="container-site section-y">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>How we work</SectionLabel>
            <h2 id="method-title" className="mt-6 font-display text-d3">
              A productised studio, built to move fast.
            </h2>
          </div>
          <ol className="border-t border-ink lg:col-span-7 lg:col-start-6">
            {about.method.map((m, i) => (
              <li key={m.title} data-reveal className="grid gap-3 border-b border-line py-8 md:grid-cols-7 md:gap-8">
                <span className="label pt-2 text-stone md:col-span-1">0{i + 1}</span>
                <div className="md:col-span-6">
                  <h3 className="font-display text-d4">{m.title}</h3>
                  <p className="mt-3 text-ink/75">{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="proof-title" className="bg-ink text-paper">
        <div className="container-site section-y grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel className="text-stone-soft">Proof</SectionLabel>
            <h2 id="proof-title" className="mt-6 font-display text-d2">
              {caseStudies.map((c) => c.title).join(" & ")} are live.
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-paper/75">
              We would rather show you working stores than a wall of logos. See what we built and how.
            </p>
            <ButtonLink href="/work" variant="solid-light" className="mt-8">
              See the work
            </ButtonLink>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
