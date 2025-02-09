import { ArtistsCarousel } from "@/components/ArtistsCarousel";
import { PlaylistsCarousel } from "@/components/PlaylistsCarousel";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-4xl font-bold mb-6">Explore o Melhor da Música 🎶</h1>

      <div className="p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Playlists Populares</h2>
        <PlaylistsCarousel />
        <Link to="/playlists" className="text-details font-semibold hover:underline mt-4 block text-right">
          Ver mais →
        </Link>
      </div>

      <div className="p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Artistas Populares</h2>
        <ArtistsCarousel />
        <Link to="/artists" className="text-details font-semibold hover:underline mt-4 block text-right">
          Ver mais →
        </Link>
      </div>
    </div>
  );
}
