import { ArtistsCarousel } from "@/components/ArtistsCarousel";
import { PlaylistsCarousel } from "@/components/PlaylistsCarousel";
import { AlbumsCarousel } from "@/components/AlbumsCarousel";
import { GenresCarousel } from "@/components/GenresCarousel";
import { WeeklyHighlightsCarousel } from "@/components/WeeklyHighlightsCarousel";
import { Footer } from "@/components/Footer";


import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-4 space-y-6 sm:space-y-12">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center">
        Explore o Melhor da Música 🎶
      </h1>

      <div className="p-3 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">🔥 Destaques da Semana</h2>
        <WeeklyHighlightsCarousel />
        <Link to="/weekly-highlights" className="text-details font-semibold hover:underline mt-1 sm:mt-2 block text-right">
          Ver mais →
        </Link>
      </div>

      <div className="p-3 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">📀 Playlists Populares</h2>
        <PlaylistsCarousel />
        <Link to="/playlists" className="text-details font-semibold hover:underline mt-1 sm:mt-2 block text-right">
          Ver mais →
        </Link>
      </div>

      <div className="p-3 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">🎤 Artistas Populares</h2>
        <ArtistsCarousel />
        <Link to="/artist" className="text-details font-semibold hover:underline mt-1 sm:mt-2 block text-right">
          Ver mais →
        </Link>
      </div>

      <div className="p-3 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">💿 Álbuns Populares</h2>
        <AlbumsCarousel />
        <Link to="/albums" className="text-details font-semibold hover:underline mt-1 sm:mt-2 block text-right">
          Ver mais →
        </Link>
      </div>

      <div className="p-3 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">🎸 Gêneros Musicais</h2>
        <GenresCarousel />
      </div>
      <div className=" sm:space-y-12">
        <Footer />
      </div>
    </div>
  );
}
