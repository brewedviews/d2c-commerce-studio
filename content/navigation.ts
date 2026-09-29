import type { NavItem } from "./types";

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Studio",
    items: [
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Engage",
    items: [
      { label: "Process", href: "/#process" },
      { label: "Pricing", href: "/#pricing" },
      { label: "FAQ", href: "/#faq" },
      { label: "Start a project", href: "/contact" },
    ],
  },
];
