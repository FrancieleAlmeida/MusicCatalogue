import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPlaylist } from "../services/api";
import { Footer } from "@/components/Footer";

const Playlist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      if (!id) {
        console.error("ID da playlist não encontrado.");
        setLoading(false);
        return;
      }

      try {
        const playlistData = await getPlaylist(id);
        setPlaylist(playlistData);
      } catch (error) {
        console.error("Erro ao carregar detalhes da playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [id]);

  if (loading) return <p className="text-white text-center mt-10">Carregando...</p>;
  if (!playlist) return <p className="text-white text-center mt-10">Playlist não encontrada.</p>;

  return (
    <div className="min-h-screen text-white p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={playlist.picture_big}
            alt={playlist.title}
            className="w-48 h-48 sm:w-60 sm:h-60 object-cover rounded-lg shadow-lg"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold">{playlist.title}</h1>
            <p className="text-lg text-gray-400 mt-2">
              Criado por: {playlist.creator.name}
            </p>
            <a
            href={playlist.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block bg-details hover:bg-hover text-white py-2 px-4 rounded-lg transition"
          >
            Perfil no Deezer
          </a>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Faixas:</h2>
          <ul className="space-y-4">
            {playlist.tracks.data.map((track: any) => (
              <li
                key={track.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-secundary p-4 rounded-lg shadow-md"
              >
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm sm:text-base font-medium">{track.title}</p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {track.artist.name}
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

export default Playlist;
