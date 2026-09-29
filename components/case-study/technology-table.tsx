import type { TechnologyRole } from "@/content/types";

/**
 * Technology with the job it does — a real table on desktop, stacked rows on
 * small screens (same markup, so it stays a table for assistive tech).
 */
export function TechnologyTable({ rows, caption }: { rows: TechnologyRole[]; caption: string }) {
  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">{caption}</caption>
      <thead className="max-md:sr-only">
        <tr className="border-b border-ink">
          <th scope="col" className="label w-[22%] pb-3 font-normal text-stone">
            Layer
          </th>
          <th scope="col" className="label w-[33%] pb-3 font-normal text-stone">
            Technology
          </th>
          <th scope="col" className="label pb-3 font-normal text-stone">
            Role
          </th>
        </tr>
      </thead>
      <tbody className="max-md:block max-md:border-t max-md:border-ink">
        {rows.map((row) => (
          <tr key={row.layer + row.technology} className="border-b border-line max-md:grid max-md:grid-cols-[6.5rem_1fr] max-md:gap-x-4 max-md:py-4">
            <th scope="row" className="label py-5 align-top font-normal text-stone max-md:row-span-2 max-md:py-0 max-md:pt-1.5">
              {row.layer}
            </th>
            <td className="py-5 align-top font-display text-[1.45rem] leading-tight max-md:py-0">{row.technology}</td>
            <td className="py-5 align-top text-ink/75 max-md:py-0 max-md:pt-1 max-md:text-[0.95rem]">{row.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
