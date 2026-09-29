import type { PricingTier } from "./types";

export const pricingTiers: PricingTier[] = [
  {
    name: "Launch",
    from: "₹99K",
    audience: "For small and new D2C brands going online properly for the first time.",
    includes: ["Shopify storefront", "Brand-led design", "Razorpay & shipping setup"],
  },
  {
    name: "Custom",
    from: "₹1.99L",
    audience: "For serious D2C brands that have outgrown a theme.",
    includes: ["Fully custom design", "Custom sections & flows", "Analytics events"],
  },
  {
    name: "Commerce Pro",
    from: "₹2.99L",
    audience: "For brands that need sophisticated commerce architecture.",
    includes: ["Custom frontend on Shopify", "Checkout & backend logic", "Operations integrations"],
  },
  {
    name: "Enterprise / Custom",
    from: "₹4L+",
    audience: "For complex systems, marketplaces and multi-party integrations.",
    includes: ["Custom platforms & APIs", "Merchant / admin tooling", "Infrastructure on Railway"],
  },
];

export const pricingNotes = {
  scoping:
    "Every project is scoped based on design complexity, integrations, catalogue size and operational requirements.",
  thirdParty: "Third-party subscriptions are billed separately and remain owned by the client.",
};

/** Accounts the client owns. We configure and integrate them. */
export const clientOwnedServices = [
  "Shopify plan",
  "Domain",
  "Razorpay",
  "Shiprocket",
  "WhatsApp provider",
  "Email provider",
  "Paid Shopify apps",
  "Analytics platforms",
  "Other SaaS subscriptions",
];
