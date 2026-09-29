import type { Walkthrough as Item } from "@/content/types";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frame";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils/cn";

/**
 * Screenshot-led feature walkthrough: every image sits next to the reason it
 * is there. Media and text alternate sides on large screens.
 */
export function Walkthrough({ items, brandColor, url }: { items: Item[]; brandColor: string; url?: string }) {
  return (
    <section aria-labelledby="walkthrough-title" className="section-y">
      <div className="container-site">
        <SectionLabel>In detail</SectionLabel>
        <h2 id="walkthrough-title" data-reveal className="mt-6 font-display text-d2">
          Inside the <em className="italic">experience.</em>
        </h2>

        <div className="mt-16 space-y-24 md:mt-24 md:space-y-36">
          {items.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={item.title} className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                <div className={cn("lg:col-span-8", flip && "lg:order-2 lg:col-start-5")}>
                  <div data-reveal className="relative rounded-sm px-4 pb-4 pt-6 sm:px-8 sm:pt-10 md:px-12 md:pt-14" style={{ backgroundColor: brandColor }}>
                    <div className={cn(item.mobile && "w-[86%] sm:w-[84%]", item.mobile && flip && "ml-auto")}>
                      <BrowserFrame image={item.desktop} url={url} sizes="(min-width: 1024px) 55vw, 90vw" className="translate-y-0" />
                    </div>
                    {item.mobile && (
                      <div
                        className={cn(
                          "absolute -bottom-6 w-[30%] max-w-[240px] sm:w-[24%] md:-bottom-10",
                          flip ? "left-3 sm:left-6 md:left-10" : "right-3 sm:right-6 md:right-10",
                        )}
                      >
                        <PhoneFrame image={item.mobile} sizes="(min-width: 1024px) 14vw, 30vw" />
                      </div>
                    )}
                  </div>
                </div>

                <div className={cn("lg:col-span-4", flip && "lg:order-1", item.mobile && "max-lg:pt-6")}>
                  <p className="label text-stone">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 font-display text-d3">{item.title}</h3>
                  <p className="mt-5 text-ink/80">{item.body}</p>
                  {item.points && item.points.length > 0 && (
                    <ul className="mt-7 border-t border-line">
                      {item.points.map((p) => (
                        <li key={p} className="flex gap-3 border-b border-line py-2.5 text-[0.95rem] text-ink/85">
                          <span aria-hidden="true" className="text-accent">
                            —
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
