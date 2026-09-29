import { ogCard, ogSize } from "@/lib/og/card";
import { site } from "@/content/site";

export const alt = `${site.name} — premium digital commerce experiences for ambitious D2C brands`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "Shopify · Custom commerce · India",
    title: "Premium digital commerce experiences for ambitious D2C brands.",
  });
}
