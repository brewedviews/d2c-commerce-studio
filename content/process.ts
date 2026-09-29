import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    body: "Understand the brand, products, customers and requirements.",
    outputs: ["Scope & integrations map", "Catalogue structure", "Fixed quote"],
  },
  {
    index: "02",
    title: "Design",
    body: "Create the visual system and the shopping experience.",
    outputs: ["Visual direction", "Key page designs", "Mobile-first flows"],
  },
  {
    index: "03",
    title: "Build",
    body: "Develop the storefront, commerce infrastructure and integrations.",
    outputs: ["Storefront", "Payments & shipping", "Analytics events"],
  },
  {
    index: "04",
    title: "Launch",
    body: "Connect the domain, deploy, test end-to-end and go live.",
    outputs: ["Domain & deployment", "Order-flow testing", "Handover"],
  },
];
