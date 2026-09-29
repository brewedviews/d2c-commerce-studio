"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isAnalyticsEvent } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";

/**
 * One delegated listener for the whole site, so Server Components can opt
 * into tracking declaratively without becoming Client Components:
 *
 *   <a data-track="start_project" data-track-location="hero">…</a>   → on click
 *   <section data-track-view="view_pricing">…</section>              → once per page view, when 40% visible
 */
export function AnalyticsListener() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const event = el.dataset.track;
      if (isAnalyticsEvent(event)) track(event, { location: el.dataset.trackLocation });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          const event = el.dataset.trackView;
          if (isAnalyticsEvent(event)) track(event, { id: el.dataset.trackId, path: pathname });
        }
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll("[data-track-view]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
