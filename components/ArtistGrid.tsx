import type { Artist } from "@/types";
import SectionWrapper from "./SectionWrapper";
import ArtistCard from "./ArtistCard";

export default function ArtistGrid({ artists }: { artists: Artist[] }) {
  return (
    <SectionWrapper
      id="roster"
      title="The Roster"
      subtitle="Each artist is handpicked. Each commission is one of one. Choose the voice that will tell your story."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist, i) => (
          <ArtistCard key={artist.slug} artist={artist} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
