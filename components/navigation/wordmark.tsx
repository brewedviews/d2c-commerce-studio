import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils/cn";

export function Wordmark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("group inline-flex items-baseline gap-2.5", tone === "light" ? "text-paper" : "text-ink", className)}
    >
      <span
        aria-hidden="true"
        className="inline-block size-2.5 translate-y-[-0.1em] rounded-full bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-150"
      />
      <span className="whitespace-nowrap font-display text-[1.6rem] leading-none tracking-[-0.01em]">{site.name}</span>
    </Link>
  );
}
