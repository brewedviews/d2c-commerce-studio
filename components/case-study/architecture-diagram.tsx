import type { Architecture, ArchitectureNode } from "@/content/types";
import { cn } from "@/lib/utils/cn";

function Node({ node }: { node: ArchitectureNode }) {
  return (
    <li
      className={cn(
        "flex min-h-[4.25rem] flex-col justify-center rounded-xs border px-4 py-3",
        node.built ? "border-ink bg-ink text-paper" : "border-ink/25 bg-paper text-ink",
      )}
    >
      <span className="text-[0.98rem] font-medium leading-snug">{node.name}</span>
      {node.detail && (
        <span className={cn("label mt-1 normal-case tracking-normal", node.built ? "text-paper/65" : "text-stone")}>{node.detail}</span>
      )}
    </li>
  );
}

/** Downward connector between tiers, labelled with how they talk. */
function Connector({ via }: { via?: string }) {
  return (
    <div aria-hidden="true" className="relative flex h-14 items-center justify-center md:ml-[9.5rem]">
      <span className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-ink/40" />
      <svg viewBox="0 0 10 6" className="absolute bottom-0.5 left-1/2 w-2.5 -translate-x-1/2 text-ink/60">
        <path d="M0 0l5 6 5-6" fill="currentColor" />
      </svg>
      {via && (
        <span className="label relative ml-[calc(50%+1rem)] mr-auto max-w-[calc(50%-1rem)] bg-paper-sunk pr-2 text-[0.64rem] leading-snug text-stone sm:max-w-none sm:whitespace-nowrap">
          {via}
        </span>
      )}
    </div>
  );
}

/**
 * Layered system diagram in HTML/CSS: tiers read top to bottom, filled nodes
 * are what we engineered, outlined nodes are platforms and services. The same
 * content is exposed as a list for assistive tech.
 */
export function ArchitectureDiagram({ architecture, title }: { architecture: Architecture; title: string }) {
  const { tiers, support } = architecture;

  return (
    <figure aria-label={title} className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <ol className="lg:col-span-9">
        {tiers.map((tier, i) => (
          <li key={tier.label}>
            {i > 0 && <Connector via={tier.via} />}
            <div className="grid gap-3 md:grid-cols-[8.5rem_1fr] md:items-center md:gap-4">
              <p className="label text-stone md:text-right">{tier.label}</p>
              <ul
                className="grid gap-2 sm:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
                style={{ "--cols": tier.nodes.length } as React.CSSProperties}
              >
                {tier.nodes.map((node) => (
                  <Node key={node.name} node={node} />
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      {support && (
        <aside aria-label={support.label} className="lg:col-span-3">
          <div className="h-full rounded-xs border border-dashed border-ink/30 p-4 md:p-5">
            <p className="label text-stone">{support.label}</p>
            <p className="mt-1 text-sm text-stone">Alongside every layer</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {support.nodes.map((node) => (
                <Node key={node.name} node={node} />
              ))}
            </ul>
          </div>
        </aside>
      )}

      <figcaption className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/70 lg:col-span-12">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="size-3 rounded-[2px] bg-ink" /> Built by us
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="size-3 rounded-[2px] border border-ink/40 bg-paper" /> Platform or managed service
        </span>
      </figcaption>
    </figure>
  );
}
