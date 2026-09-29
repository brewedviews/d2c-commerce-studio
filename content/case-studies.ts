import type { CaseStudy, ImageAsset } from "./types";

/**
 * Case studies — the single source for the homepage, /work and /work/[slug].
 *
 * Imagery is captured from the live production sites. Architecture, technology
 * and "what we built" are taken from the projects' own repositories; nothing
 * here describes a feature that doesn't exist in code. `results` and
 * `testimonial` stay empty until real, client-approved data exists — the UI
 * skips those sections when they are empty.
 */

const desktop = (src: string, alt: string): ImageAsset => ({ src, alt, width: 2400, height: 1500, kind: "desktop" });
const mobile = (src: string, alt: string): ImageAsset => ({ src, alt, width: 1109, height: 2400, kind: "mobile" });
const crop = (src: string, alt: string, width: number, height: number): ImageAsset => ({ src, alt, width, height });

const pk = "/images/case-studies/prabha-kala";
const lk = "/images/case-studies/lokl";

/* ── Prabha Kala imagery ─────────────────────────────────────────────── */
const pkImages = {
  showcaseDesktop: desktop(
    `${pk}/showcase-desktop.jpg`,
    "Prabha Kala homepage on desktop: a campaign hero of a woman in a pink saree with tasselled pallu and the line “Draped in colour. Made for moments.”",
  ),
  showcaseMobile: mobile(`${pk}/showcase-mobile.jpg`, "The same Prabha Kala homepage on a phone, with the hero recomposed for a tall screen"),
  heroMobile: crop(`${pk}/hero-mobile.jpg`, "Prabha Kala’s campaign hero on a phone: “Draped in colour. Made for moments.”", 1109, 1480),
  home: desktop(
    `${pk}/home.jpg`,
    "Prabha Kala storefront homepage with an editorial hero of two women in handloom sarees and the line “Made for the woman on the move.”",
  ),
  mobileHome: mobile(`${pk}/mobile-home.jpg`, "Prabha Kala homepage on a phone"),
  cover: crop(
    `${pk}/cover.jpg`,
    "Prabha Kala’s Shop by Occasion section: Festive Edit, Everyday Elegance, Wedding Edit and New & Noteworthy tiles",
    2400,
    1095,
  ),
  coverMobile: crop(`${pk}/cover-mobile.jpg`, "Prabha Kala’s Shop by Occasion tiles on a phone", 1154, 1850),
  newArrivals: desktop(`${pk}/new-arrivals.jpg`, "New Arrivals grid on the Prabha Kala storefront with fabric labels, prices, stock labels and add-to-bag actions"),
  product: desktop(`${pk}/product.jpg`, "Product page for a Rani Pink Banarasi silk saree with gallery, price and savings, stock label, quantity and add-to-bag"),
  mobileProduct: mobile(`${pk}/mobile-product.jpg`, "Prabha Kala product page on mobile showing a purple Banarasi silk saree with a sticky add-to-bag bar"),
  collection: desktop(`${pk}/collection.jpg`, "The All Sarees collection with price, fabric, colour and occasion filters and per-filter counts"),
  mobileCollection: mobile(`${pk}/mobile-collection.jpg`, "Prabha Kala collection page on mobile with filter and sort controls"),
  collections: desktop(`${pk}/collections.jpg`, "Curated edits for festive, everyday and wedding occasions, and a Shop by Craft section"),
};

/* ── LOKL imagery ────────────────────────────────────────────────────── */
const lkImages = {
  showcaseDesktop: desktop(
    `${lk}/showcase-desktop.jpg`,
    "LOKL women’s store on desktop: delivery banner, a “Plans tonight?” campaign and a New in Women product row",
  ),
  showcaseMobile: mobile(`${lk}/showcase-mobile.jpg`, "The same LOKL women’s page on a phone, with app-style bottom navigation and store names on every product"),
  cover: crop(
    `${lk}/cover.jpg`,
    "LOKL’s Picks for Every Budget section: lifestyle photography merchandised by price, under ₹499 and under ₹999",
    2400,
    1244,
  ),
  coverMobile: crop(`${lk}/cover-mobile.jpg`, "LOKL’s Picks for Every Budget on a phone", 1154, 820),
  home: desktop(`${lk}/home.jpg`, "LOKL homepage with the banner “Bhilai’s own neighbourhood shopping app” and a festive campaign hero"),
  mobileHome: mobile(`${lk}/mobile-home.jpg`, "LOKL shopping app homepage on a phone"),
  categories: desktop(`${lk}/categories.jpg`, "LOKL’s Shop by Category grid: dresses, tops, t-shirts, bottoms, jeans and ethnic wear"),
  catalogue: desktop(`${lk}/catalogue.jpg`, "LOKL product catalogue with gender, price and discount filters and pre-order labels"),
  mobileProduct: mobile(`${lk}/mobile-product.jpg`, "LOKL product page on mobile with the store name, size selection, Buy now and Add to bag"),
  stores: desktop(`${lk}/stores.jpg`, "“Stores near you” listing of local retailers with locality, opening hours and product counts"),
  store: desktop(`${lk}/store.jpg`, "A local retailer’s store page on LOKL with opening status, delivery details and products"),
  merchant: desktop(`${lk}/merchant.jpg`, "LOKL merchant onboarding site inviting local shops to open a store online"),
  mobileMerchant: mobile(`${lk}/mobile-merchant.jpg`, "Merchant sign-up flow on mobile: “Your shop, findable online”"),
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "prabha-kala",
    title: "Prabha Kala",
    client: "Prabha Kala",
    category: "D2C Fashion",
    headline: "Premium D2C fashion commerce",
    description: "A premium D2C fashion commerce experience for a saree brand.",
    url: "https://www.prabhakala.in",
    urlLabel: "prabhakala.in",
    brandColor: "#6b1d2f",
    heroImage: pkImages.home,
    mobileImage: pkImages.mobileHome,
    showcase: { desktop: pkImages.showcaseDesktop, mobile: pkImages.showcaseMobile },
    cover: { image: pkImages.cover, mobile: pkImages.coverMobile },
    hero: { image: pkImages.showcaseDesktop, mobile: pkImages.heroMobile },

    overview:
      "Prabha Kala is a premium D2C saree brand. We designed its storefront and built the commerce system behind it: a custom storefront and API on Railway, with Shopify as the backbone for catalogue, content and orders, and a custom checkout that takes payment through Razorpay.",
    challenge:
      "The brand needed a premium D2C storefront — one that presents sarees with the care of a boutique, and runs on dependable commerce underneath.",
    challengeDetail:
      "The brief called for more than a theme: an editorial, brand-led shopping experience, with Shopify kept as the system of record for catalogue, stock and orders. So the storefront had to be custom, and everything behind it had to stay in step with Shopify.",
    solution:
      "We designed a warm, editorial storefront and built it as a custom React frontend with a FastAPI commerce API, both on Railway. Shopify holds the catalogue, homepage content and orders; the API prices every cart from live Shopify data and runs a custom checkout with Razorpay.",

    stack: ["Shopify", "Custom frontend", "Railway", "Razorpay", "Shiprocket"],
    capabilities: [
      "Custom storefront",
      "Shopify catalogue",
      "Shopify CMS",
      "Product and collection experience",
      "Custom checkout",
      "Razorpay",
      "Shiprocket",
      "Railway",
    ],

    builtTitle: "Storefront, commerce and operations — designed and engineered together.",
    built: [
      {
        group: "Storefront",
        items: [
          {
            title: "Custom storefront",
            body: "A responsive React storefront designed around the brand rather than a theme: an editorial homepage, curated edits and craft-led collections.",
          },
          {
            title: "Homepage CMS",
            body: "The homepage hero is managed in Shopify through Metaobjects, so the team changes campaigns in Shopify admin without a deploy.",
          },
          {
            title: "Products & collections",
            body: "Collections filter by price, fabric, colour and occasion. Product pages carry the gallery, savings, live stock and GST and shipping details.",
          },
          {
            title: "Search",
            body: "Search across the catalogue, refined with the same facets shoppers use on collection pages.",
          },
          {
            title: "Wishlist",
            body: "Shoppers save sarees to a wishlist kept on their own device — no account required.",
          },
          {
            title: "Cart",
            body: "A server-side cart that re-prices every line from live Shopify data, so the browser never supplies a price.",
          },
        ],
      },
      {
        group: "Commerce",
        items: [
          {
            title: "Shopify catalogue",
            body: "Products, variants, images and inventory come from the Shopify Admin API. Shopify stays the source of truth.",
          },
          {
            title: "Custom checkout",
            body: "Checkout validates the cart and customer details, applies Shopify discount codes on the server and reserves stock in a Shopify draft order before payment.",
          },
          {
            title: "Razorpay payments",
            body: "Razorpay collects payment. Every confirmed payment settles through a single path that turns the draft into a Shopify order.",
          },
          {
            title: "Shiprocket",
            body: "A Shiprocket Checkout integration: a secured catalogue feed from Shopify, with Shiprocket’s hosted checkout wired in as a checkout provider.",
          },
        ],
      },
      {
        group: "Operations",
        items: [
          {
            title: "Backend on Railway",
            body: "A FastAPI service with MongoDB for carts, checkout records and analytics events. It never stores prices or customer data that belongs in Shopify.",
          },
          {
            title: "Shopify webhooks",
            body: "Signature-verified, de-duplicated order and inventory webhooks keep the storefront and checkout records in step with Shopify.",
          },
          {
            title: "Store admin",
            body: "A staff-only, read-only admin for orders, catalogue, checkout records and storefront analytics.",
          },
          {
            title: "First-party analytics",
            body: "Storefront events are collected into the brand’s own database with random first-party IDs — never emails or phone numbers.",
          },
          {
            title: "Deployment",
            body: "Storefront and API run as separate Railway services with health checks, served on the prabhakala.in domain.",
          },
        ],
      },
    ],

    technology: [
      { layer: "Commerce", technology: "Shopify", role: "Catalogue, inventory, discount codes and orders — the system of record" },
      { layer: "Content", technology: "Shopify Metaobjects", role: "Homepage hero content, edited in Shopify admin" },
      { layer: "Frontend", technology: "React · Vite · Tailwind", role: "The custom storefront" },
      { layer: "Backend", technology: "FastAPI (Python)", role: "Cart pricing, checkout, payment settlement, webhooks and the admin API" },
      { layer: "Data", technology: "MongoDB", role: "Carts, checkout-to-order records and analytics events" },
      { layer: "Payments", technology: "Razorpay", role: "Payment collection, with signature-verified confirmation" },
      { layer: "Checkout", technology: "Shiprocket Checkout", role: "Catalogue feed and hosted-checkout provider" },
      { layer: "Hosting", technology: "Railway", role: "Storefront and API services, health-checked deploys, prabhakala.in" },
    ],

    architecture: {
      tiers: [
        { label: "Customer", nodes: [{ name: "Shopper", detail: "Mobile & desktop web" }] },
        { label: "Storefront", via: "HTTPS", nodes: [{ name: "React storefront", detail: "Railway · prabhakala.in", built: true }] },
        {
          label: "Commerce API",
          via: "/api",
          nodes: [
            { name: "FastAPI", detail: "Railway", built: true },
            { name: "MongoDB", detail: "Carts · checkouts · events" },
          ],
        },
        {
          label: "Platforms",
          via: "Admin API · webhooks · provider APIs",
          nodes: [
            { name: "Shopify", detail: "Catalogue · stock · CMS · orders" },
            { name: "Razorpay", detail: "Payments" },
            { name: "Shiprocket", detail: "Checkout · catalogue feed" },
          ],
        },
      ],
      support: {
        label: "Operations",
        nodes: [
          { name: "Store admin", detail: "Orders · catalogue · analytics", built: true },
          { name: "First-party analytics", detail: "Own database, no PII", built: true },
          { name: "Health checks", detail: "Per Railway service" },
        ],
      },
    },

    flow: {
      title: "How checkout works",
      intro: "Prices and stock always come from Shopify. The browser only ever sends what the shopper chose.",
      steps: [
        { title: "Cart", body: "Every cart line is re-priced from live Shopify variant data." },
        { title: "Validate", body: "The API checks stock and customer details and applies any Shopify discount code." },
        { title: "Reserve", body: "Stock is reserved in a Shopify draft order, and Shopify’s total becomes the amount to pay." },
        { title: "Pay", body: "Razorpay collects the payment in the browser." },
        { title: "Settle", body: "The verified payment — from the browser or a webhook — settles through one path." },
        { title: "Order", body: "The draft becomes a Shopify order, and the shopper lands on their confirmation." },
      ],
    },

    walkthrough: [
      {
        title: "An editorial homepage",
        body: "A campaign-led homepage built around photography, with a hero the team manages in Shopify. On phones the composition is rebuilt for a tall screen rather than shrunk.",
        points: ["Hero slides from Shopify Metaobjects", "Autoplay with pause, swipe and keyboard control", "New arrivals straight from the catalogue"],
        desktop: pkImages.home,
        mobile: pkImages.mobileHome,
      },
      {
        title: "Collections and discovery",
        body: "The whole catalogue filters by price, fabric, colour and occasion, with counts on every option. On mobile, filters and sorting move behind a single control so products stay first.",
        points: ["Fabric, colour and occasion facets", "Sorting and in-stock filtering", "Shop by occasion and by craft"],
        desktop: pkImages.collection,
        mobile: pkImages.mobileCollection,
      },
      {
        title: "The product page",
        body: "Product pages lead with the drape: a large gallery, a clear price and saving, live stock, and GST and shipping stated before the shopper has to ask. On mobile, add-to-bag stays within reach.",
        points: ["Low-stock labels from live inventory", "Wishlist on every product", "Payment and delivery reassurance by the button"],
        desktop: pkImages.product,
        mobile: pkImages.mobileProduct,
      },
      {
        title: "Curated edits",
        body: "Occasion and craft edits turn a catalogue into something closer to a boutique: festive, everyday and wedding sarees, and the weaves behind them.",
        desktop: pkImages.collections,
      },
    ],

    gallery: [pkImages.newArrivals, pkImages.showcaseMobile, pkImages.cover],

    seo: {
      title: "Prabha Kala — D2C Fashion Commerce Case Study",
      description:
        "How we designed and built Prabha Kala’s premium D2C storefront: a custom storefront on Shopify with a custom checkout, Razorpay payments and a FastAPI backend on Railway.",
    },
    outcome: "A complete operational D2C commerce experience.",
    results: [],
  },
  {
    slug: "lokl",
    title: "LOKL",
    client: "LOKL",
    category: "Hyperlocal Commerce",
    headline: "Shoppers, shops and delivery on one platform",
    description: "A hyperlocal commerce ecosystem connecting consumers with local retailers.",
    url: "https://www.shoplokl.in",
    urlLabel: "shoplokl.in",
    brandColor: "#0a1f5c",
    heroImage: lkImages.home,
    mobileImage: lkImages.mobileHome,
    showcase: { desktop: lkImages.showcaseDesktop, mobile: lkImages.showcaseMobile },
    cover: { image: lkImages.cover, mobile: lkImages.coverMobile },
    hero: { image: lkImages.cover, mobile: lkImages.coverMobile },

    overview:
      "LOKL connects shoppers with the offline retailers in their neighbourhood. We designed and built the whole platform: the customer storefront, a self-serve merchant ecosystem, a rider app for local delivery, and the backend that runs orders, payments, notifications and analytics between them.",
    challenge:
      "Neighbourhood retailers had customers nearby but no practical way to be found and ordered from online.",
    challengeDetail:
      "That meant more than a storefront. Shoppers needed to discover nearby stores and order with confidence; merchants needed to list products, manage stock and handle orders from a phone; and every order needed a path from the shop counter to the customer’s door.",
    solution:
      "We built a customer storefront, a self-serve merchant ecosystem, a rider app and the backend beneath them: catalogue, inventory, orders, payments, delivery, notifications and analytics.",

    stack: ["Next.js", "React", "Python API", "MongoDB", "Redis", "Razorpay"],
    capabilities: [
      "Customer storefront",
      "Merchant ecosystem",
      "Product catalogue",
      "Inventory",
      "Payments",
      "Orders",
      "Delivery",
      "Notifications",
      "Analytics",
      "Backend infrastructure",
    ],

    builtTitle: "Three sides of a marketplace, and the platform between them.",
    built: [
      {
        group: "Customers",
        items: [
          {
            title: "Customer storefront",
            body: "A Next.js storefront with app-style mobile navigation: shop by category, by store or by budget, with search, a wishlist and order tracking.",
          },
          {
            title: "Store discovery",
            body: "Location-aware discovery of nearby stores, each with its own storefront page, opening hours and products.",
          },
          {
            title: "Pre-orders",
            body: "Closed stores still take pre-orders, clearly labelled with when the shop opens.",
          },
        ],
      },
      {
        group: "Merchants",
        items: [
          {
            title: "Merchant onboarding",
            body: "Self-serve registration, KYC and store setup, so a local shop can get itself online.",
          },
          {
            title: "Product catalogue",
            body: "Merchants manage their own products. Homepage feeds — popular in the city, selling fast, new arrivals — are computed from real orders and stock.",
          },
          {
            title: "Inventory",
            body: "Per-product stock updated from the merchant dashboard, low-stock signals, back-in-stock alerts for shoppers and nudges to merchants.",
          },
          {
            title: "Merchant operations",
            body: "Merchants accept or reject orders, prepare them for pickup and follow their sales in their own analytics, exportable as CSV.",
          },
        ],
      },
      {
        group: "Platform",
        items: [
          {
            title: "Payments",
            body: "Razorpay online payments alongside cash on delivery. Payment status is confirmed by signature-verified webhooks with an amount check, and refunds can be initiated.",
          },
          {
            title: "Order management",
            body: "A full order lifecycle — accepted, handed to a rider, pickup verified, delivered — with an audit log on every order.",
          },
          {
            title: "Delivery",
            body: "Serviceability checks, tiered delivery fees and ETAs configured per city, plus a rider app with OTP sign-in and push alerts.",
          },
          {
            title: "Notifications",
            body: "SMS, WhatsApp and OTP behind a provider-agnostic layer, so the messaging provider can change without touching the product.",
          },
          {
            title: "Analytics",
            body: "Funnel, search, store and product analytics for the team; sales and returns reporting for merchants.",
          },
          {
            title: "Custom backend",
            body: "A FastAPI backend on MongoDB with a Redis-cached geo layer, Sentry monitoring and separate staging and production environments.",
          },
        ],
      },
    ],

    technology: [
      { layer: "Frontend", technology: "Next.js · React · TypeScript", role: "Customer storefront, merchant dashboard, rider and admin apps" },
      { layer: "Backend", technology: "FastAPI (Python)", role: "Catalogue, orders, delivery, payments and analytics APIs" },
      { layer: "Data", technology: "MongoDB", role: "Stores, products, orders and events" },
      { layer: "Cache", technology: "Redis", role: "Geo-query cache for store discovery, degrading gracefully without it" },
      { layer: "Payments", technology: "Razorpay", role: "Online payments, webhooks and refunds, alongside cash on delivery" },
      { layer: "Messaging", technology: "SMS · WhatsApp", role: "Notifications and OTP through a provider-agnostic layer" },
      { layer: "Push", technology: "Web Push", role: "Order alerts for riders" },
      { layer: "Media", technology: "Cloudinary", role: "Product and store imagery" },
      { layer: "Monitoring", technology: "Sentry", role: "Error tracking across staging and production" },
      { layer: "Hosting", technology: "Railway", role: "Production hosting for shoplokl.in" },
    ],

    architecture: {
      tiers: [
        { label: "People", nodes: [{ name: "Shoppers" }, { name: "Merchants" }, { name: "Riders" }] },
        {
          label: "Apps",
          via: "HTTPS",
          nodes: [
            { name: "Customer storefront", detail: "Discover · cart · checkout", built: true },
            { name: "Merchant dashboard", detail: "Products · stock · orders", built: true },
            { name: "Rider app", detail: "Pickups · deliveries", built: true },
          ],
        },
        {
          label: "Platform API",
          via: "/api",
          nodes: [
            { name: "FastAPI", detail: "Orders · catalogue · delivery", built: true },
            { name: "MongoDB", detail: "Stores · products · orders" },
            { name: "Redis", detail: "Geo cache" },
          ],
        },
        {
          label: "Services",
          via: "Provider APIs",
          nodes: [
            { name: "Razorpay", detail: "Online payments" },
            { name: "Messaging", detail: "SMS · WhatsApp · OTP" },
            { name: "Web Push", detail: "Rider alerts" },
          ],
        },
      ],
      support: {
        label: "Operations",
        nodes: [
          { name: "Analytics", detail: "Funnels · merchant reports", built: true },
          { name: "Admin console", detail: "Merchants · orders · riders", built: true },
          { name: "Sentry", detail: "Monitoring" },
        ],
      },
    },

    flow: {
      title: "How an order moves",
      intro: "From a shopper’s phone to a shop counter and back to their door. Every state change is recorded on the order.",
      steps: [
        { title: "Discover", body: "The shopper sets a location; LOKL checks serviceability and shows nearby stores with delivery fee and ETA." },
        { title: "Order", body: "The shopper checks out with Razorpay or cash on delivery." },
        { title: "Accept", body: "The merchant accepts or rejects the order from their dashboard." },
        { title: "Hand over", body: "The order is handed to a rider and the pickup is verified." },
        { title: "Deliver", body: "The order is marked delivered, and the audit log holds the full history." },
      ],
    },

    walkthrough: [
      {
        title: "The customer storefront",
        body: "An app-like storefront for a whole city’s shops. Campaigns and new-in rows are merchandised like a single store, while every product still carries the name of the shop it comes from.",
        points: ["All, Women and Men views", "Store name on every product", "App-style navigation on mobile"],
        desktop: lkImages.showcaseDesktop,
        mobile: lkImages.showcaseMobile,
      },
      {
        title: "Catalogue and discovery",
        body: "The catalogue filters by gender, price and discount across every store at once. Product pages show the store, size availability and both Buy now and Add to bag.",
        points: ["Price and discount filters", "Pre-order labels when a shop is closed", "Size selection per product"],
        desktop: lkImages.catalogue,
        mobile: lkImages.mobileProduct,
      },
      {
        title: "Stores near you",
        body: "Shoppers can browse by shop, not just by product: nearby stores with their locality, opening hours, price range and product count, each linking to its own storefront.",
        desktop: lkImages.stores,
      },
      {
        title: "The merchant ecosystem",
        body: "Local shops sign themselves up. Onboarding takes them from registration to a live storefront, and the merchant dashboard is where they manage products, stock and orders.",
        points: ["Self-serve registration and KYC", "Products and stock from a phone", "Order accept, pickup and analytics"],
        desktop: lkImages.merchant,
        mobile: lkImages.mobileMerchant,
      },
    ],

    gallery: [lkImages.home, lkImages.mobileHome, lkImages.store, lkImages.categories],

    seo: {
      title: "LOKL — Hyperlocal Commerce Case Study",
      description:
        "How we designed and built LOKL, a hyperlocal commerce platform: customer storefront, self-serve merchant ecosystem, local delivery, Razorpay payments and a FastAPI backend.",
    },
    outcome: "A hyperlocal commerce ecosystem spanning customer experience, merchant operations and commerce infrastructure.",
    results: [],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/** Neighbours for case-study navigation; the ends fall back to /work. */
export function getAdjacentCaseStudies(slug: string) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  return {
    previous: i > 0 ? caseStudies[i - 1] : undefined,
    next: i >= 0 && i < caseStudies.length - 1 ? caseStudies[i + 1] : undefined,
  };
}
