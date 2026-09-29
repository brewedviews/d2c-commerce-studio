import { getImageProps } from "next/image";
import type { Cover } from "@/content/types";
import { cn } from "@/lib/utils/cn";

/**
 * A flat image with an optional art-directed crop for small screens
 * (<picture> + next/image optimisation for both sources).
 */
export function ArtDirectedImage({
  cover,
  sizes,
  priority,
  className,
  imgClassName,
  breakpoint = 639,
}: {
  cover: Cover;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Max viewport width (px) that gets the mobile crop. */
  breakpoint?: number;
}) {
  const { image, mobile } = cover;
  // For LCP heroes: eager + high fetch priority (Next 16 guidance for art-directed <picture>).
  const common = priority ? { sizes, loading: "eager" as const, fetchPriority: "high" as const } : { sizes };
  const { props: main } = getImageProps({ ...common, src: image.src, alt: image.alt, width: image.width, height: image.height });
  const small = mobile && getImageProps({ ...common, src: mobile.src, alt: mobile.alt, width: mobile.width, height: mobile.height }).props;

  return (
    <picture className={className}>
      {small && (
        <source media={`(max-width: ${breakpoint}px)`} srcSet={small.srcSet} sizes={sizes} width={small.width} height={small.height} />
      )}
      <img {...main} alt={image.alt} className={cn("block h-auto w-full", imgClassName)} />
    </picture>
  );
}
