import { cn } from "@/lib/utils/cn";

/** Hairline arrow. `direction="ne"` for external links. */
export function Arrow({ className, direction = "e" }: { className?: string; direction?: "e" | "ne" | "s" }) {
  const rotate = direction === "ne" ? "-rotate-45" : direction === "s" ? "rotate-90" : "";
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn("size-[1em] shrink-0", rotate, className)}
    >
      <path d="M3 10h13m0 0-5.5-5.5M16 10l-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}
