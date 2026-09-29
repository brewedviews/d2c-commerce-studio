import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { ogCard, ogSize } from "@/lib/og/card";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug) ?? caseStudies[0];
  return ogCard({
    eyebrow: `Case study · ${study.category}`,
    title: study.title,
    image: study.heroImage.src,
    panelColor: study.brandColor,
  });
}
