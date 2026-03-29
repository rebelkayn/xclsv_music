import type { Step } from "@/types";

export const SITE = {
  name: "XCLSV",
  tagline: "A song made just for you.",
  subline:
    "Commission a bespoke masterpiece from the world's most iconic artists for your personal collection.",
  termsText:
    "I agree to the Terms & Conditions — all sales are final, songs are streaming-only and may not be downloaded, recorded, or redistributed.",
} as const;

export const steps: Step[] = [
  {
    title: "Select Your Artist",
    description:
      "Browse our curated roster of world-class musicians. Each one handpicked, each one a master of their craft.",
    icon: "◆",
  },
  {
    title: "Personalize Your Song",
    description:
      "Drop your name or a line you want included and the artist will work it into the song. Every commission is crafted exclusively for you.",
    icon: "✦",
  },
  {
    title: "Receive Your Masterpiece",
    description:
      "Within 30 days, your one-of-one song is delivered. Stream it forever. It will never be made again.",
    icon: "♫",
  },
];

export const occasions = [
  { value: "celebration", label: "Celebration" },
  { value: "tribute", label: "Tribute" },
  { value: "personal", label: "Personal" },
  { value: "gift", label: "Gift" },
  { value: "other", label: "Other" },
] as const;

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

