import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about our custom type scale so `text-d2` and
// `text-paper` aren't treated as the same (colour) group.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["d1", "d2", "d3", "d4", "lead", "label"] }],
    },
  },
});

/** Join class names, skipping falsy values and resolving Tailwind conflicts (last wins). */
export function cn(...classes: (string | false | null | undefined)[]) {
  return twMerge(classes.filter(Boolean).join(" "));
}
