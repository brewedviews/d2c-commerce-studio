import Image from "next/image";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/utils/cn";

/**
 * Minimal frames for real product screenshots. Deliberately understated:
 * a hairline window bar with the live URL, or a slim phone bezel.
 */

export function BrowserFrame({
  image,
  url,
  sizes,
  priority,
  className,
  tone = "light",
}: {
  image: ImageAsset;
  url?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-sm shadow-[0_1px_0_rgba(0,0,0,0.04),0_30px_80px_-30px_rgba(19,19,17,0.35)]",
        tone === "dark" ? "bg-ink-raised ring-1 ring-line-dark" : "bg-[#fbfaf6] ring-1 ring-line/80",
        className,
      )}
    >
      <div className={cn("flex h-7 items-center gap-3 px-3", tone === "dark" ? "text-stone-soft" : "text-stone")}>
        <span aria-hidden="true" className="flex gap-1.5">
          <i className="size-1.5 rounded-full bg-current opacity-40" />
          <i className="size-1.5 rounded-full bg-current opacity-40" />
          <i className="size-1.5 rounded-full bg-current opacity-40" />
        </span>
        {url && <span className="label mx-auto -translate-x-4 text-[0.62rem] normal-case tracking-normal">{url}</span>}
      </div>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full"
      />
    </figure>
  );
}

export function PhoneFrame({
  image,
  sizes,
  priority,
  className,
}: {
  image: ImageAsset;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[1.6rem] bg-ink p-[5px] shadow-[0_40px_80px_-30px_rgba(19,19,17,0.55)]",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full rounded-[1.3rem]"
      />
    </figure>
  );
}
