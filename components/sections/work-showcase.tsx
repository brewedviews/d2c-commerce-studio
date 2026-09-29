"use client";

import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/content/case-studies";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frame";
import { cn } from "@/lib/utils/cn";

const SLIDE_MS = 5500;

/**
 * Visual proof directly under the hero: one slide per project, each pairing a
 * desktop and a mobile capture of the same page. Advances every SLIDE_MS while
 * on screen; pauses on hover, keyboard focus, the pause control, a hidden tab
 * or prefers-reduced-motion (which also drops the cross-fade).
 */
export function WorkShowcase() {
  const count = caseStudies.length;
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    if (ref.current) observer.observe(ref.current);
    const onVisibility = () => document.hidden && setVisible(false);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      query.removeEventListener("change", sync);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const playing = count > 1 && visible && !hovered && !focused && !stopped && !reducedMotion;

  // One timer at a time, restarted on every slide change.
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setCurrent((i) => (i + 1) % count), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [playing, current, count]);

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Selected work"
      className="relative bg-paper-sunk"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
    >
      <div className="container-site pb-10 pt-12 md:pb-14 md:pt-16">
        {/* Slides share one grid cell so the stage keeps a constant height. */}
        <div className="grid" aria-live={playing ? "off" : "polite"}>
          {caseStudies.map((study, i) => {
            const active = i === current;
            return (
              <div
                key={study.slug}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${study.title}`}
                aria-hidden={!active}
                inert={!active}
                className={cn(
                  "[grid-area:1/1] transition-[opacity,transform,visibility] duration-1000 ease-out-expo motion-reduce:transition-none",
                  active ? "opacity-100" : "invisible translate-y-3 opacity-0",
                )}
              >
                <div className="relative pb-[16%] sm:pb-[9%] md:pb-[7%]">
                  <div className="w-[84%] sm:w-[82%] md:w-[80%]">
                    <BrowserFrame
                      image={study.showcase.desktop}
                      url={study.urlLabel}
                      sizes="(min-width: 1680px) 1300px, (min-width: 768px) 80vw, 84vw"
                      priority={i === 0}
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-[33%] max-w-[300px] sm:w-[26%] md:right-[3%] md:w-[19%]">
                    <PhoneFrame
                      image={study.showcase.mobile}
                      sizes="(min-width: 1680px) 300px, (min-width: 768px) 19vw, (min-width: 640px) 26vw, 33vw"
                      priority={i === 0}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project index doubles as the slide control. */}
        <div className="mt-8 flex items-start gap-6 md:mt-10 md:w-[80%]">
          <ol className="grid flex-1 grid-cols-2 gap-x-6">
            {caseStudies.map((study, i) => {
              const active = i === current;
              return (
                <li key={study.slug}>
                  <button
                    type="button"
                    onClick={() => setCurrent(i)}
                    aria-label={`Show ${study.title}, slide ${i + 1} of ${count}`}
                    aria-current={active ? "true" : undefined}
                    className="group block w-full text-left"
                  >
                    <span className="block h-px w-full overflow-hidden bg-line">
                      <span
                        key={active && playing ? `run-${current}` : "idle"}
                        className={cn(
                          "block h-full origin-left bg-ink",
                          active ? (playing ? "animate-[progress_linear_both]" : "scale-x-100") : "scale-x-0",
                        )}
                        style={active && playing ? { animationDuration: `${SLIDE_MS}ms` } : undefined}
                      />
                    </span>
                    <span
                      className={cn(
                        "label mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 transition-colors duration-500",
                        active ? "text-ink" : "text-stone group-hover:text-ink",
                      )}
                    >
                      <span>{String(i + 1).padStart(2, "0")} — {study.title}</span>
                      <span className="hidden text-stone sm:inline">{study.category}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          {count > 1 && !reducedMotion && (
            <button
              type="button"
              onClick={() => setStopped((s) => !s)}
              aria-label={stopped ? "Play slideshow" : "Pause slideshow"}
              className="label -mt-1 shrink-0 py-2 text-stone transition-colors hover:text-ink"
            >
              {stopped ? "Play" : "Pause"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
