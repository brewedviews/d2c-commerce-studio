import type { TechnologyGroup } from "./types";

export const technologyStatement =
  "We use the right technology for the business — not technology for its own sake.";

export const technologyGroups: TechnologyGroup[] = [
  { role: "Commerce", items: ["Shopify"] },
  { role: "Frontend", items: ["Next.js", "React", "TypeScript"] },
  { role: "Payments", items: ["Razorpay"] },
  { role: "Shipping", items: ["Shiprocket"] },
  { role: "Infrastructure", items: ["Railway"] },
  { role: "Measurement", items: ["Google Analytics", "Meta"] },
];
