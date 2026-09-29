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

/** A capability delivered, explained in a sentence or two. */
export type BuildItem = {
  title: string;
  body: string;
};

/** "What we built", grouped by layer (storefront, commerce, operations…). */
export type BuildGroup = {
  group: string;
  items: BuildItem[];
};

/** One row of the technology table: what it is and the job it does here. */
export type TechnologyRole = {
  layer: string;
  technology: string;
  role: string;
};

export type ArchitectureNode = {
  name: string;
  detail?: string;
  /** Engineered by us (vs. a third-party platform or managed service). */
  built?: boolean;
};

/**
 * A layered system diagram, read top to bottom. Each tier talks to the next;
 * `via` labels that connection. `support` lists cross-cutting services shown
 * beside the main flow. Only real, verified relationships belong here.
 */
export type Architecture = {
  tiers: { label: string; via?: string; nodes: ArchitectureNode[] }[];
  support?: { label: string; nodes: ArchitectureNode[] };
};

/** A step-by-step sequence through the system, e.g. how checkout settles. */
export type SystemFlow = {
  title: string;
  intro?: string;
  steps: BuildItem[];
};

/** A screenshot-led explanation of one part of the experience. */
export type Walkthrough = {
  title: string;
  body: string;
  points?: string[];
  desktop: ImageAsset;
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
  /** Flat, art-directed opener for the case-study page. */
  hero: Cover;
  /** Closing editorial gallery — images not already used in the walkthrough. */
  gallery: ImageAsset[];
  /** Short positioning line under the case-study title. */
  headline: string;
  overview: string;
  challenge: string;
  /** Optional second paragraph expanding on the requirement. */
  challengeDetail?: string;
  solution: string;
  stack: string[];
  capabilities: string[];
  /** Heading for the "What we built" section. */
  builtTitle: string;
  built: BuildGroup[];
  technology: TechnologyRole[];
  architecture: Architecture;
  flow?: SystemFlow;
  walkthrough: Walkthrough[];
  seo: { title: string; description: string };
  outcome?: string;
  /** Only substantiated results. Empty → section is not rendered. */
  results: { label: string; value: string }[];
  testimonial?: Testimonial;
};
