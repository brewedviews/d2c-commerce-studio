/**
 * Global studio identity and contact details.
 *
 * ASSUMPTION: the brief does not name the studio. "Brewed Views" is a working
 * name taken from the GitHub organisation; change `name` / `shortName` here and
 * it propagates everywhere (metadata, header, footer, OG image).
 */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const site = {
  name: "Brewed Views",
  shortName: "Brewed Views",
  descriptor: "D2C Commerce Studio",
  url: siteUrl,
  locale: "en_IN",
  location: "India",
  tagline: "We design and build premium digital commerce experiences for D2C brands.",
  description:
    "A D2C commerce studio designing and building premium Shopify and custom storefronts — with Razorpay, Shiprocket and modern commerce infrastructure. Projects from ₹30K.",
  startingPrice: "₹30K",
  /** Contact channels are optional; links render only when configured. */
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || undefined,
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || undefined,
  },
  cta: {
    primary: { label: "Start Your Project", href: "/contact" },
    secondary: { label: "View Our Work", href: "/work" },
    nav: { label: "Start a Project", href: "/contact" },
  },
} as const;

export function whatsappHref(number: string, text?: string) {
  const digits = number.replace(/[^\d]/g, "");
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${q}`;
}
