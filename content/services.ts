import type { Differentiator, Service } from "./types";

export const services: Service[] = [
  {
    slug: "d2c-stores",
    title: "D2C Stores",
    summary: "Custom storefronts built around Shopify and modern commerce infrastructure.",
    detail:
      "A storefront designed around your products and your customer — collections, filtering, product pages, cart and checkout — running on Shopify or a custom frontend where the brand needs more than a theme.",
    deliverables: [
      "Storefront design system",
      "Collections, search & filters",
      "Product & cart experience",
      "Shopify catalogue setup",
    ],
  },
  {
    slug: "brand-websites",
    title: "Brand Websites",
    summary: "Premium websites for startups, businesses and personal brands.",
    detail:
      "Editorial, fast, search-friendly websites for brands that need to look as considered online as they are in person — built to be edited without calling a developer.",
    deliverables: ["Art direction & layout", "Content structure", "SEO foundations", "Editable content"],
  },
  {
    slug: "commerce-systems",
    title: "Commerce Systems",
    summary: "Payments, shipping, inventory, analytics, integrations and APIs.",
    detail:
      "The operational layer behind the storefront: Razorpay payments, Shiprocket shipping, inventory and order flows, notifications and the analytics you need to understand what is selling.",
    deliverables: ["Razorpay payments", "Shiprocket shipping", "Order & inventory flows", "GA4 & Meta events"],
  },
  {
    slug: "custom-experiences",
    title: "Custom Experiences",
    summary: "Unique functionality that doesn't fit inside a standard theme or plugin.",
    detail:
      "Custom checkout steps, merchant tools, internal dashboards, marketplace mechanics — the parts of your business that a plugin can't express, engineered properly.",
    deliverables: ["Custom checkout logic", "Merchant & admin tools", "Backend services & APIs", "Third-party integrations"],
  },
];

export const differentiators: Differentiator[] = [
  {
    title: "Custom, not template-driven",
    body: "We design around the brand rather than forcing the brand into a theme. Your storefront should look like you, not like the last store the theme was sold to.",
  },
  {
    title: "Commerce-first",
    body: "Every decision is made to support real selling — product discovery, trust at checkout, delivery clarity — not just to look good in a portfolio.",
  },
  {
    title: "Modern infrastructure",
    body: "Shopify, Next.js and React, APIs, payments, shipping and cloud infrastructure — chosen where appropriate, never by default.",
  },
  {
    title: "Fast execution",
    body: "A reusable commerce architecture and AI-assisted engineering let us move quickly without cutting corners on craft.",
  },
];
