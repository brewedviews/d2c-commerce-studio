import type { ImageAsset } from "@/content/types";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frame";
import { cn } from "@/lib/utils/cn";

type Row =
  | { type: "wide"; image: ImageAsset }
  | { type: "pair"; mobile: ImageAsset; desktop?: ImageAsset; flip: boolean };

/** Group captures into an editorial rhythm: wide desktop shots, and mobile + desktop pairs. */
function toRows(images: ImageAsset[]): Row[] {
  const rows: Row[] = [];
  let pairs = 0;
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    if (img.kind !== "mobile") {
      rows.push({ type: "wide", image: img });
      continue;
    }
    const next = images[i + 1];
    const desktop = next && next.kind !== "mobile" ? next : undefined;
    if (desktop) i++;
    rows.push({ type: "pair", mobile: img, desktop, flip: pairs++ % 2 === 1 });
  }
  return rows;
}

export function CaseStudyGallery({ images, url, brandColor }: { images: ImageAsset[]; url?: string; brandColor: string }) {
  if (images.length === 0) return null;

  return (
    <div className="space-y-10 md:space-y-16">
      {toRows(images).map((row) =>
        row.type === "wide" ? (
          <div key={row.image.src} data-reveal>
            <BrowserFrame image={row.image} url={url} sizes="(min-width: 1680px) 1550px, 92vw" />
          </div>
        ) : (
          <div key={row.mobile.src} data-reveal className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
            <div
              className={cn(
                "flex justify-center rounded-sm py-10 md:py-16",
                row.desktop ? "md:col-span-4" : "md:col-span-12",
                row.flip && "md:order-2",
              )}
              style={{ backgroundColor: brandColor }}
            >
              <PhoneFrame image={row.mobile} sizes="(min-width: 768px) 22vw, 60vw" className="w-[60%] max-w-[320px] md:w-[62%]" />
            </div>
            {row.desktop && (
              <div className={cn("md:col-span-8", row.flip && "md:order-1")}>
                <BrowserFrame image={row.desktop} url={url} sizes="(min-width: 1680px) 1030px, (min-width: 768px) 62vw, 92vw" />
              </div>
            )}
          </div>
        ),
      )}
    </div>
  );
}
