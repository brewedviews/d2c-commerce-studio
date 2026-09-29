import type { PricingTier } from "./types";

/**
 * Indicative ranges by complexity, not packages. Every project gets a fixed
 * quote once scope is agreed; the ranges only help a brand self-qualify.
 */
export const pricingTiers: PricingTier[] = [
  {
    name: "Simple D2C Launch",
    qualifier: "Starting around",
    range: "₹30K",
    audience: "For small and new D2C brands going online properly for the first time.",
    includes: ["Shopify storefront", "Brand-led design", "Razorpay & shipping setup"],
  },
  {
    name: "Custom Storefronts",
    qualifier: "Typically",
    range: "₹50K–₹1.5L+",
    audience: "For serious D2C brands that have outgrown a theme.",
    includes: ["Fully custom design", "Custom sections & flows", "Analytics events"],
  },
  {
    name: "Advanced Commerce",
    qualifier: "Typically",
    range: "₹1L–₹3L+",
    audience: "For brands that need sophisticated commerce architecture.",
    includes: ["Custom frontend on Shopify", "Checkout & backend logic", "Operations integrations"],
  },
  {
    name: "Complex / Custom",
    qualifier: "Scoped",
    range: "To requirements",
    audience: "For complex systems, marketplaces and multi-party integrations.",
    includes: ["Custom platforms & APIs", "Merchant / admin tooling", "Infrastructure on Railway"],
  },
];

/** Homepage pricing: a starting point to self-qualify against, not a package table. */
export const pricingSummary = {
  lead: "Simple launches can start around ₹30K, while more involved commerce builds are scoped based on requirements.",
  factors: [
    "Design complexity",
    "Number of pages",
    "Catalogue size",
    "Integrations",
    "Custom functionality",
    "Commerce requirements",
  ],
  scoping: "Every project is scoped around your brand, catalogue, functionality and integrations.",
  thirdParty: "Third-party subscriptions and platform costs are separate.",
};

export const pricingNotes = {
  indicative:
    "These are indicative ranges, not fixed quotes. You get a fixed quote once we’ve agreed the scope on a short discovery call.",
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
