import { clientOwnedServices, pricingNotes } from "@/content/pricing";

/** Makes third-party costs and account ownership explicit. */
export function Ownership() {
  return (
    <div className="grid gap-8 rounded-sm bg-paper p-6 md:grid-cols-12 md:gap-8 md:p-10">
      <div className="md:col-span-5">
        <p className="label text-accent">You own your stack</p>
        <p className="mt-4 font-display text-d4">
          Your accounts, in your name. We configure and integrate them.
        </p>
        <p className="mt-4 text-sm text-ink/70">{pricingNotes.thirdParty}</p>
      </div>
      <ul className="grid grid-cols-2 content-start gap-x-6 md:col-span-6 md:col-start-7 lg:grid-cols-3">
        {clientOwnedServices.map((s) => (
          <li key={s} className="border-b border-line py-3 text-sm text-ink/85">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
