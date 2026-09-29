/**
 * Content model. Everything the UI renders is shaped by these types so the
 * content files can later be swapped for a CMS without touching components.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "desktop" screenshots are 16:10, "mobile" are tall device captures */
  kind?: "desktop" | "mobile";
};

export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  deliverables: string[];
};

export type Differentiator = {
  title: string;
  body: string;
};

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
  outputs: string[];
};

export type PricingTier = {
  name: string;
  /** How to read the range: "Starting around", "Typically", "Scoped". */
  qualifier: string;
  /** Indicative, never a fixed price. */
  range: string;
  audience: string;
  includes: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type TechnologyGroup = {
  role: string;
  items: string[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
};

/** A matched desktop + mobile capture of the same page, for the homepage showcase. */
export type Showcase = {
  desktop: ImageAsset;
  mobile: ImageAsset;
};

/** The single strongest crop of a site, used on its homepage case-study entry. */
export type Cover = {
  image: ImageAsset;
  /** Art-directed crop for small screens; falls back to `image`. */
  mobile?: ImageAsset;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: string;
  /** One-line positioning used on cards */
  description: string;
  url?: string;
  urlLabel?: string;
  year?: string;
  /** Brand colour from the client's own design system, used as a stage backdrop */
  brandColor: string;
  heroImage: ImageAsset;
  /** Tall mobile capture shown alongside the hero on listings */
  mobileImage?: ImageAsset;
  showcase: Showcase;
  cover: Cover;
  gallery: ImageAsset[];
  challenge: string;
  solution: string;
  stack: string[];
  capabilities: string[];
  features: string[];
  outcome?: string;
  /** Only substantiated results. Empty → section is not rendered. */
  results: { label: string; value: string }[];
  testimonial?: Testimonial;
};
