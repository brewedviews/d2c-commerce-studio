import { caseStudies } from "@/content/case-studies";
import { ProjectFeature } from "@/components/case-study/project-feature";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="section-y">
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index="01">Selected work</SectionLabel>
            <h2 id="work-title" data-reveal className="mt-6 font-display text-d2">
              Commerce, built for <em className="italic">real</em> brands.
            </h2>
          </div>
          <div data-reveal className="md:col-span-4 md:col-start-9">
            <p className="text-ink/75">
              Two live platforms: a D2C fashion label selling online, and a hyperlocal marketplace connecting a city’s
              shoppers with its shops.
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-28 md:mt-24 md:space-y-40">
          {caseStudies.map((study, i) => (
            <ProjectFeature key={study.slug} study={study} index={i + 1} reverse={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-20 flex justify-center md:mt-28">
          <ButtonLink href="/work" variant="text">
            All work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
