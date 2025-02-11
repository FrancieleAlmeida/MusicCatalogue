import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTrack } from "@/services/api";
import { Play, Pause } from "lucide-react";
import { Footer } from "../components/Footer";

interface Track {
  link: string | undefined;
  id: number;
  title: string;
  duration: number;
  preview: string;
  artist: { id: number; name: string };
  album: { id: number; title: string; cover_medium: string };
}

const WeeklyHighlights = () => {
  const { id } = useParams<{ id: string }>();
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      if (!id) {
        console.error("ID da música não encontrado.");
        setLoading(false);
        return;
      }

      try {
        const trackData = await getTrack(id);
        if (!trackData || !trackData.title) {
          console.error("Erro: os dados da música são inválidos.");
          return;
        }
        setTrack(trackData);
      } catch (error) {
        console.error("Erro ao carregar a música", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
  }, [id]);

  const handlePlayPause = () => {
    if (!track?.preview) return;

    if (playingTrack === track.preview) {
      audio?.pause();
      setPlayingTrack(null);
    } else {
      const newAudio = new Audio(track.preview);
      newAudio.play();
      setAudio(newAudio);
      setPlayingTrack(track.preview);

      newAudio.onended = () => {
        setPlayingTrack(null);
      };
    }
  };

  if (loading) return <p className="text-center text-gray-400 mt-10">Carregando...</p>;
  if (!track) return <p className="text-center text-gray-400 mt-10">Música não encontrada.</p>;

  return (
    <div className="container mx-auto p-6 mt-5">
      {/* Informações da Música */}
      <div className="flex flex-col sm:flex-row items-center gap-6 max-w-4xl mx-auto">
        {track.album.cover_medium && (
          <img src={track.album.cover_medium} alt={track.album.title} className="rounded-lg w-48 h-48 object-cover shadow-md" />
        )}
        <div>
          <h2 className="text-3xl font-bold mt-2">{track.title}</h2>
          <p className="text-gray-400">Artista: {track.artist.name}</p>
          <p className="text-gray-400">Álbum: {track.album.title}</p>
          <a
            href={track.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block bg-details hover:bg-hover text-white py-2 px-4 rounded-lg transition"
          >
            Ouvir no Deezer
          </a>
          <div className="mt-2 ">
        {track.preview ? (
          <button
            onClick={handlePlayPause}
            className="bg-details hover:bg-hover text-white py-2 px-4 rounded-lg transition flex items-center justify-center w-32 h-12"
          >
            {playingTrack === track.preview ? (
              <Pause size={24} />
            ) : (
              <Play size={24} />
            )}
            <span className="ml-2">{playingTrack === track.preview ? "Pausar" : "Ouvir Prévia"}</span>
          </button>

        ) : (
          <p className="text-gray-400">Prévia não disponível.</p>
        )}
      </div>
        </div>
        
      </div>

      {/* Player de Música */}


      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default WeeklyHighlights;