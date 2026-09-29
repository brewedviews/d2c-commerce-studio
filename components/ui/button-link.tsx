import Link from "next/link";
import type { ComponentProps } from "react";
import type { AnalyticsEvent } from "@/lib/analytics/events";
import { cn } from "@/lib/utils/cn";
import { Arrow } from "./arrow";

type Variant = "solid" | "solid-light" | "solid-accent" | "text" | "text-light";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-paper hover:bg-accent",
  "solid-light": "bg-paper text-ink hover:bg-accent hover:text-accent-ink",
  "solid-accent": "bg-accent text-accent-ink hover:bg-ink hover:text-paper",
  text: "text-ink px-0! h-auto! py-1",
  "text-light": "text-paper px-0! h-auto! py-1",
};

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  track?: AnalyticsEvent;
  trackLocation?: string;
  arrow?: boolean;
};

/**
 * Link styled as a button. Solid buttons get an arrow that slides on hover;
 * text buttons get an animated underline.
 */
export function ButtonLink({
  variant = "solid",
  className,
  children,
  track,
  trackLocation,
  arrow = true,
  ...props
}: Props) {
  const isText = variant.startsWith("text");
  return (
    <Link
      {...props}
      data-track={track}
      data-track-location={trackLocation}
      className={cn(
        "group/btn inline-flex h-13 items-center gap-3 rounded-xs px-6 text-[0.95rem] font-medium tracking-[-0.005em]",
        "transition-colors duration-500 ease-out-expo",
        variants[variant],
        className,
      )}
    >
      <span
        className={cn(
          isText &&
            "bg-[linear-gradient(currentColor,currentColor)] bg-size-[100%_1px] bg-bottom-left bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover/btn:bg-size-[0%_1px]",
        )}
      >
        {children}
      </span>
      {arrow && (
        <span className="relative inline-flex overflow-hidden">
          <Arrow className="transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-[120%]" />
          <Arrow className="absolute -translate-x-[120%] transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0" />
        </span>
      )}
    </Link>
  );
}
