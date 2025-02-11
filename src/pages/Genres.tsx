import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGenreById, getArtistsByGenre } from "../services/api";
import { Footer } from "@/components/Footer";

interface Genre {
  link: string | undefined;
  id: number;
  name: string;
  picture_medium: string;
}

interface Artist {
  link: string | undefined;
  id: number;
  name: string;
  picture_medium: string;
}

const GenrePage = () => {
  const { id } = useParams<{ id: string }>();
  const [genre, setGenre] = useState<Genre | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenreData = async () => {
      if (!id) {
        console.error("❌ ID do gênero não encontrado.");
        setLoading(false);
        return;
      }

      try {
        const [genreData, artistsData] = await Promise.all([
          getGenreById(id),
          getArtistsByGenre(id),
        ]);

        console.log("✅ Gênero carregado:", genreData);
        console.log("✅ Artistas carregados:", artistsData);

        setGenre(genreData);
        setArtists(artistsData);
      } catch (error) {
        console.error("❌ Erro ao carregar os dados do gênero", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreData();
  }, [id]);

  if (loading) return <p className="text-white text-center mt-10">Carregando...</p>;
  if (!genre) return <p className="text-white text-center mt-10">Gênero não encontrado.</p>;

  return (
    <div className="min-h-screen text-white p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={genre.picture_medium}
            alt={genre.name}
            className="w-48 h-48 sm:w-60 sm:h-60 object-cover rounded-lg shadow-lg"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold">{genre.name}</h1>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Artistas Populares</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {artists.length > 0 ? (
              artists.map((artist) => (
                <div key={artist.id}
                className="text-center cursor-pointer"
                onClick={() => window.open(`https://www.deezer.com/pt/artist/${artist.id}`, '_blank')}>
                  <img
                    src={artist.picture_medium}
                    alt={artist.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full mx-auto"
                  />
                  <p className="mt-2 text-sm">{artist.name}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Nenhum artista encontrado para este gênero.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GenrePage;
