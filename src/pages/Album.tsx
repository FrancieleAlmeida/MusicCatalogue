import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAlbum } from "../services/api";
import { Footer } from "@/components/Footer";

interface Track {
  id: number;
  title: string;
  duration: number;
  preview: string;
}

interface Album {
  id: number;
  title: string;
  cover_medium: string;
  artist: {
    id: number;
    name: string;
  };
  tracks: {
    data: Track[];
  };
}

const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (!id) {
        console.error("ID do álbum não encontrado.");
        setLoading(false);
        return;
      }

      try {
        const albumData = await getAlbum(id);
        setAlbum(albumData);
      } catch (error) {
        console.error("Erro ao carregar o álbum", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  if (loading) return <p className="text-white text-center mt-10">Carregando...</p>;
  if (!album) return <p className="text-white text-center mt-10">Álbum não encontrado.</p>;

  return (
    <div className="min-h-screen text-white p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={album.cover_medium}
            alt={album.title}
            className="w-48 h-48 sm:w-60 sm:h-60 object-cover rounded-lg shadow-lg"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold">{album.title}</h1>
            <p className="text-lg text-gray-400 mt-2">Artista: {album.artist.name}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Faixas:</h2>
          <ul className="space-y-4">
            {album.tracks.data.map((track) => (
              <li
                key={track.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-secundary p-4 rounded-lg shadow-md"
              >
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm sm:text-base font-medium">{track.title}</p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")}
                  </p>
                </div>
                <audio controls className="mt-2 sm:mt-0 sm:ml-4 w-full sm:w-48">
                  <source src={track.preview} type="audio/mpeg" />
                  Seu navegador não suporta o áudio.
                </audio>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className=" sm:space-y-12">
        <Footer />
      </div>
    </div>
  );
};

export default AlbumPage;
