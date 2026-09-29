import Image from "next/image";
import type { ImageAsset } from "@/content/types";
import { PhoneFrame } from "@/components/ui/device-frame";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils/cn";

type Row = { type: "full"; image: ImageAsset } | { type: "pair"; a: ImageAsset; b: ImageAsset; flip: boolean };

/**
 * Editorial rhythm: the first image runs full width, then images pair up
 * (a phone capture beside a wide one, or large + small) and alternate sides.
 */
function toRows(images: ImageAsset[]): Row[] {
  const [first, ...rest] = images;
  const rows: Row[] = first ? [{ type: "full", image: first }] : [];
  let pairs = 0;
  for (let i = 0; i < rest.length; i += 2) {
    const [a, b] = [rest[i], rest[i + 1]];
    if (b) rows.push({ type: "pair", a, b, flip: pairs++ % 2 === 1 });
    else rows.push({ type: "full", image: a });
  }
  return rows;
}

function Flat({ image, sizes }: { image: ImageAsset; sizes: string }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      className="block h-auto w-full rounded-sm ring-1 ring-line"
    />
  );
}

function Tile({ image, brandColor, sizes, paired }: { image: ImageAsset; brandColor: string; sizes: string; paired: boolean }) {
  if (image.kind !== "mobile") {
    // Beside a phone panel, sit the wide image on a matching full-height panel.
    if (!paired) return <Flat image={image} sizes={sizes} />;
    return (
      <div className="flex h-full items-center rounded-sm bg-paper-sunk p-4 md:p-8">
        <Flat image={image} sizes={sizes} />
      </div>
    );
  }
  return (
    <div className="flex h-full items-center justify-center rounded-sm px-6 py-10 md:py-14" style={{ backgroundColor: brandColor }}>
      <PhoneFrame image={image} sizes="(min-width: 768px) 20vw, 55vw" className="w-[62%] max-w-[300px]" />
    </div>
  );
}

export function CaseStudyGallery({ images, brandColor }: { images: ImageAsset[]; brandColor: string }) {
  if (images.length === 0) return null;

  return (
    <section aria-labelledby="gallery-title" className="pb-8">
      <div className="container-site">
        <SectionLabel>
          <span id="gallery-title">Gallery</span>
        </SectionLabel>
        <div className="mt-10 space-y-4 md:space-y-6">
          {toRows(images).map((row) =>
            row.type === "full" ? (
              <div key={row.image.src} data-reveal>
                <Flat image={row.image} sizes="(min-width: 1680px) 1550px, 94vw" />
              </div>
            ) : (
              <div key={row.a.src} data-reveal className="grid gap-4 md:grid-cols-12 md:gap-6">
                {[row.a, row.b].map((img, j) => {
                  // Phone captures take the narrow column; otherwise the first image is the large one.
                  const narrow = img.kind === "mobile" || (row.a.kind !== "mobile" && row.b.kind !== "mobile" && j === 1);
                  return (
                    <div
                      key={img.src}
                      className={cn(
                        narrow ? "md:col-span-4" : "md:col-span-8",
                        row.flip && (j === 0 ? "md:order-2" : "md:order-1"),
                      )}
                    >
                      <Tile image={img} brandColor={brandColor} paired={row.a.kind === "mobile" || row.b.kind === "mobile"} sizes={narrow ? "(min-width: 768px) 32vw, 94vw" : "(min-width: 768px) 62vw, 94vw"} />
                    </div>
                  );
                })}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
