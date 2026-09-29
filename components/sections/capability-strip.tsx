import { Marquee } from "@/components/animations/marquee";

const items = [
  "Custom storefronts",
  "Shopify catalogues",
  "Custom checkout",
  "Razorpay payments",
  "Shiprocket shipping",
  "Brand websites",
  "Commerce systems",
  "Merchant platforms",
];

export function CapabilityStrip() {
  return (
    <section aria-label="Capabilities" className="border-y border-line bg-paper py-6 md:py-8">
      <Marquee items={items} className="font-display text-[1.75rem] italic leading-none text-ink md:text-[2.6rem]" />
    </section>
  );
}
