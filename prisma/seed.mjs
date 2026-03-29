import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

const artists = [
  {
    name: "RZA",
    slug: "rza",
    email: "rza@xclsv.com",
    genre: "Hip-Hop",
    tagline: "The Abbot. Architect of the Wu-Tang sound and one of the most visionary producers in hip-hop history. A commission from RZA is a sonic blueprint.",
    price: 10000000,
  },
  {
    name: "Method Man",
    slug: "method-man",
    email: "methodman@xclsv.com",
    genre: "Hip-Hop",
    tagline: "The most magnetic voice in rap. Meth brings raw charisma and razor-sharp bars to every track he touches.",
    price: 10000000,
  },
  {
    name: "Ghostface Killah",
    slug: "ghostface-killah",
    email: "ghostface@xclsv.com",
    genre: "Hip-Hop",
    tagline: "Supreme Clientele. Ghostface paints vivid stories with unmatched lyrical intensity — every verse a cinematic experience.",
    price: 10000000,
  },
  {
    name: "Raekwon",
    slug: "raekwon",
    email: "raekwon@xclsv.com",
    genre: "Hip-Hop",
    tagline: "The Chef. From Only Built 4 Cuban Linx to your personal masterpiece — Raekwon cooks up street poetry like no one else.",
    price: 10000000,
  },
  {
    name: "Inspectah Deck",
    slug: "inspectah-deck",
    email: "inspectahdeck@xclsv.com",
    genre: "Hip-Hop",
    tagline: "The Rebel INS. Arguably the most underrated lyricist in the Clan — his opening verse on Triumph alone is immortal.",
    price: 10000000,
  },
  {
    name: "GZA",
    slug: "gza",
    email: "gza@xclsv.com",
    genre: "Hip-Hop",
    tagline: "The Genius. Liquid Swords redefined lyricism. GZA's pen is a scalpel — precise, devastating, and endlessly quotable.",
    price: 10000000,
  },
];

console.log("Seeding artists...");

const password = bcryptjs.hashSync("xclsv2026", 10);

for (const artist of artists) {
  await prisma.artist.upsert({
    where: { slug: artist.slug },
    update: {},
    create: {
      ...artist,
      password,
    },
  });
}

console.log(`Seeded ${artists.length} artists`);
await prisma.$disconnect();
