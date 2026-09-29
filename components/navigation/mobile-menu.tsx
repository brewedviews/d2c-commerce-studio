"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/content/types";
import { Arrow } from "@/components/ui/arrow";
import { cn } from "@/lib/utils/cn";

export function MobileMenu({ items, cta }: { items: NavItem[]; cta: NavItem }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      // Keep focus inside the menu (panel links + the toggle button).
      const focusables = [buttonRef.current, ...panel.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 -mr-2 flex h-11 items-center gap-3 px-2 text-[0.95rem]"
      >
        <span className={cn("transition-colors duration-500", open && "text-paper")}>{open ? "Close" : "Menu"}</span>
        <span aria-hidden="true" className={cn("relative block h-3 w-6", open ? "text-paper" : "text-ink")}>
          <span
            className={cn(
              "absolute left-0 top-0.5 h-px w-full bg-current transition-transform duration-500 ease-out-expo",
              open && "translate-y-[4px] rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute bottom-0.5 left-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo",
              open && "-translate-y-[4px] -rotate-45",
            )}
          />
        </span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink px-5 pb-8 pt-24 text-paper",
          "transition-[clip-path] duration-700 ease-in-out-quart",
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]",
        )}
      >
        <nav aria-label="Mobile" className="flex-1">
          <ul className="border-t border-line-dark">
            {[...items, { label: "About", href: "/about" }].map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-line-dark">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                  className={cn(
                    "flex items-baseline justify-between py-4 font-display text-[2.6rem] leading-none",
                    "transition-[transform,opacity] duration-700 ease-out-expo",
                    open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                  )}
                >
                  {item.label}
                  <span className="label text-stone-soft">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href={cta.href}
          onClick={() => setOpen(false)}
          data-track="start_project"
          data-track-location="mobile_menu"
          className="flex h-14 items-center justify-between rounded-xs bg-accent px-5 text-accent-ink"
        >
          {cta.label}
          <Arrow />
        </Link>
      </div>
    </div>
  );
}
