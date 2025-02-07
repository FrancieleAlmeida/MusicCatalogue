import { ArtistsCarousel } from "@/components/ArtistsCarousel";
import { PlaylistsCarousel } from "@/components/PlaylistsCarousel";

export default function Home() {
  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Playlists Populares</h1>
        <PlaylistsCarousel />
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Artistas Brasileiros Populares</h1>
        <ArtistsCarousel />
      </div>
    </>
  );
}
