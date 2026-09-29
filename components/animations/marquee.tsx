import { cn } from "@/lib/utils/cn";

/**
 * CSS-only marquee. Content is rendered twice and translated by -50%;
 * the duplicate is hidden from assistive tech. Stops under reduced motion.
 */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-6 md:px-10">{item}</span>
          <span aria-hidden="true" className="text-accent">
            ✳
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
