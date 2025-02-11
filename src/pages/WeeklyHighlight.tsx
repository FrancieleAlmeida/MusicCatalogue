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
  album: { id: number; title: string; cover_big: string };
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

    <div className="p-4 space-y-6 sm:space-y-12">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-4xl mx-auto mt-10">
        {track.album.cover_big && (
          <img 
            src={track.album.cover_big} 
            alt={track.album.title} 
            className="rounded-lg w-64 h-64 sm:w-80 sm:h-80 object-cover shadow-lg"
          />
        )}
        <div className="text-center sm:text-left">
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
          <div className="mt-4 flex flex-col items-center sm:items-start">
            {track.preview ? (
              <button
                onClick={handlePlayPause}
                className="bg-details hover:bg-hover text-white py-2 px-6 rounded-lg transition flex items-center justify-center w-40 h-12"
              >
                {playingTrack === track.preview ? <Pause size={24} /> : <Play size={24} />}
                <span className="ml-2">{playingTrack === track.preview ? "Pausar" : "Ouvir Prévia"}</span>
              </button>
            ) : (
              <p className="text-gray-400">Prévia não disponível.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer fixo na parte inferior */}
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default WeeklyHighlights;
