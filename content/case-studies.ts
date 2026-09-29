import type { CaseStudy, ImageAsset } from "./types";

/**
 * Case studies. Imagery is captured from the live production sites.
 * `results` and `testimonial` stay empty until real, client-approved data
 * exists — the UI skips those sections when they are empty.
 */

const desktop = (src: string, alt: string): ImageAsset => ({ src, alt, width: 2400, height: 1500, kind: "desktop" });
const mobile = (src: string, alt: string): ImageAsset => ({ src, alt, width: 1109, height: 2400, kind: "mobile" });

const pk = "/images/case-studies/prabha-kala";
const lk = "/images/case-studies/lokl";

export const caseStudies: CaseStudy[] = [
  {
    slug: "prabha-kala",
    title: "Prabha Kala",
    client: "Prabha Kala",
    category: "D2C Fashion",
    description: "A premium D2C fashion commerce experience for a saree brand.",
    url: "https://www.prabhakala.in",
    urlLabel: "prabhakala.in",
    brandColor: "#6b1d2f",
    heroImage: desktop(
      `${pk}/home.jpg`,
      "Prabha Kala storefront homepage with an editorial hero of two women in handloom sarees and the line “Made for the woman on the move.”",
    ),
    mobileImage: mobile(`${pk}/mobile-home.jpg`, "Prabha Kala homepage on a phone"),
    gallery: [
      desktop(`${pk}/new-arrivals.jpg`, "New Arrivals grid on the Prabha Kala storefront with fabric labels, prices and add-to-bag actions"),
      mobile(`${pk}/mobile-product.jpg`, "Prabha Kala product page on mobile showing a purple Banarasi silk saree with a sticky add-to-bag bar"),
      desktop(`${pk}/product.jpg`, "Product page for a Rani Pink Banarasi silk saree with gallery, price, quantity and add-to-bag"),
      desktop(`${pk}/collection.jpg`, "The All Sarees collection with price, fabric, colour and occasion filters"),
      mobile(`${pk}/mobile-collection.jpg`, "Prabha Kala collection page on mobile with filter and sort controls"),
      desktop(`${pk}/collections.jpg`, "Curated edits for festive, everyday and wedding occasions, and a Shop by Craft section"),
    ],
    challenge:
      "The brand needed a premium D2C storefront — one that felt as considered as its sarees, while running on dependable commerce operations for catalogue, payments and shipping.",
    solution:
      "We designed a warm, editorial storefront and built it as a custom frontend on top of Shopify. Shopify holds the catalogue and content; a Railway-hosted backend handles the custom checkout, Razorpay payments and Shiprocket shipping.",
    stack: ["Shopify", "Custom frontend", "Railway", "Razorpay", "Shiprocket"],
    capabilities: [
      "Custom storefront",
      "Shopify catalogue",
      "Shopify CMS",
      "Custom checkout",
      "Razorpay payments",
      "Railway backend",
      "Shiprocket shipping",
      "Responsive experience",
    ],
    features: [
      "Shop by fabric and by occasion",
      "Price, fabric, colour and occasion filters",
      "Search and wishlist",
      "Curated edits and craft collections",
      "Mobile-first product pages",
      "Staff-only store admin",
    ],
    outcome: "A complete, operational D2C commerce experience — live and selling at prabhakala.in.",
    results: [],
  },
  {
    slug: "lokl",
    title: "LOKL",
    client: "LOKL",
    category: "Hyperlocal Commerce",
    description: "A hyperlocal commerce ecosystem connecting consumers with the retailers in their neighbourhood.",
    url: "https://www.shoplokl.in",
    urlLabel: "shoplokl.in",
    brandColor: "#0a1f5c",
    heroImage: desktop(
      `${lk}/home.jpg`,
      "LOKL homepage with the banner “Bhilai’s own neighbourhood shopping app” and a festive campaign hero",
    ),
    mobileImage: mobile(`${lk}/mobile-home.jpg`, "LOKL shopping app homepage on a phone"),
    gallery: [
      desktop(`${lk}/catalogue.jpg`, "LOKL product catalogue with gender and price filters and discount chips"),
      mobile(`${lk}/mobile-product.jpg`, "LOKL product page on mobile with size selection, Buy now and Add to bag"),
      desktop(`${lk}/stores.jpg`, "“Stores near you” listing of local retailers with locality, opening hours and product counts"),
      desktop(`${lk}/store.jpg`, "A local retailer’s store page on LOKL with opening status and products"),
      mobile(`${lk}/mobile-merchant.jpg`, "Merchant sign-up flow on mobile: “Your shop, findable online”"),
      desktop(`${lk}/merchant.jpg`, "LOKL merchant onboarding site inviting local shops to open a store online"),
    ],
    challenge:
      "Neighbourhood retailers had customers nearby but no practical way to be found and ordered from online. LOKL needed a full ecosystem — for shoppers, for merchants, and for the operations connecting them.",
    solution:
      "We built a customer storefront, a self-serve merchant ecosystem and the backend infrastructure beneath both: catalogue, inventory, orders, payments, delivery, notifications and analytics.",
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
    features: [
      "Location-aware store discovery",
      "Per-store storefront pages",
      "Pre-orders outside store hours",
      "Self-serve merchant onboarding",
      "Category, price and discount filters",
      "App-style mobile navigation",
    ],
    outcome: "A live hyperlocal marketplace serving shoppers and merchants in Bhilai.",
    results: [],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export const flagshipCaseStudy = caseStudies[0];
