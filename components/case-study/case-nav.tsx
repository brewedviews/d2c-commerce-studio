import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { Arrow } from "@/components/ui/arrow";
import { cn } from "@/lib/utils/cn";

type Target = { href: string; eyebrow: string; title: string; color?: string; track?: boolean };

/**
 * Previous / next between case studies. The ends fall back to /work:
 * first study → "← Work", last study → "Back to Work →".
 */
export function CaseNav({ previous, next }: { previous?: CaseStudy; next?: CaseStudy }) {
  const back: Target = previous
    ? { href: `/work/${previous.slug}`, eyebrow: "Previous project", title: previous.title, track: true }
    : { href: "/work", eyebrow: "All projects", title: "Work" };
  const forward: Target = next
    ? { href: `/work/${next.slug}`, eyebrow: "Next project", title: next.title, color: next.brandColor, track: true }
    : { href: "/work", eyebrow: "All projects", title: "Back to Work" };

  return (
    <nav aria-label="Case studies" className="border-t border-line">
      <div className="grid md:grid-cols-2">
        <Link
          href={back.href}
          rel={previous ? "prev" : undefined}
          data-track={back.track ? "click_case_study" : undefined}
          data-track-location="case_nav_previous"
          className="group flex min-h-48 flex-col justify-between gap-10 border-b border-line px-5 py-10 transition-colors duration-500 hover:bg-paper-sunk sm:px-8 md:min-h-72 md:border-b-0 md:border-r md:px-[clamp(1.25rem,0.6rem+3.2vw,4rem)] md:py-14"
        >
          <span className="label text-stone">{back.eyebrow}</span>
          <span className="flex items-center gap-5 font-display text-d2">
            <Arrow className="size-[0.55em] rotate-180 transition-transform duration-700 ease-out-expo group-hover:-translate-x-2" />
            {back.title}
          </span>
        </Link>

        <Link
          href={forward.href}
          rel={next ? "next" : undefined}
          data-track={forward.track ? "click_case_study" : undefined}
          data-track-location="case_nav_next"
          className={cn(
            "group flex min-h-48 flex-col justify-between gap-10 px-5 py-10 text-right sm:px-8 md:min-h-72 md:px-[clamp(1.25rem,0.6rem+3.2vw,4rem)] md:py-14",
            forward.color ? "text-paper" : "bg-ink text-paper",
          )}
          style={forward.color ? { backgroundColor: forward.color } : undefined}
        >
          <span className="label text-paper/70">{forward.eyebrow}</span>
          <span className="flex items-center justify-end gap-5 font-display text-d2">
            {next ? `Next: ${forward.title}` : forward.title}
            <Arrow className="size-[0.55em] transition-transform duration-700 ease-out-expo group-hover:translate-x-2" />
          </span>
        </Link>
      </div>
    </nav>
  );
}
