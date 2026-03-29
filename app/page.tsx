import Hero from "@/components/Hero";
import ArtistGrid from "@/components/ArtistGrid";
import HowItWorks from "@/components/HowItWorks";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const artists = await prisma.artist.findMany({
    where: { isActive: true },
    select: {
      slug: true,
      name: true,
      genre: true,
      tagline: true,
      price: true,
      image: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const formatted = artists.map((a) => ({
    ...a,
    price: a.price / 100,
    image: a.image || "",
  }));

  return (
    <main>
      <Hero />
      <ArtistGrid artists={formatted} />
      <HowItWorks />
    </main>
  );
}
