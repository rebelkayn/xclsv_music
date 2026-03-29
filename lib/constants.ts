import type { Step } from "@/types";

export const SITE = {
  name: "XCLSV",
  tagline: "A song made just for you.",
  subline:
    "Commission an exclusive song from the world's most iconic artists for your personal collection.",
  termsText:
    "I agree to the Terms & Conditions — all sales are final, songs are streaming-only and may not be downloaded, recorded, or redistributed.",
} as const;

export const steps: Step[] = [
  {
    title: "Select Your Artist",
    description:
      "Browse our roster of world-class musicians and select an artist that you would like to commission.",
    icon: "◆",
  },
  {
    title: "Personalize Your Song",
    description:
      "You can choose to include your name or a line in your personalized song, or let the artist have complete control.",
    icon: "✦",
  },
  {
    title: "Receive Your Masterpiece",
    description:
      "Within 30 days, your one-of-one song will be delivered by the artist and you will be able to stream it here.",
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

