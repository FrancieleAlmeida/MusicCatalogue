import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArtist, searchTracks } from "../services/api";
import { Play, Pause } from "lucide-react";
import PopularArtists from "../components/PopularArtists"; 
import { Footer } from "@/components/Footer";

const ArtistDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<any>(null);
  const [tracks, setTracks] = useState<{ id: number; title: string; preview: string }[]>([]);
  const [albums, setAlbums] = useState<{ id: number; title: string; cover_medium: string }[]>([]);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      if (!id) {
        console.error("ID do artista não encontrado.");
        return;
      }

      try {
        const artistData = await getArtist(id);
        setArtist(artistData);

        const tracksData = await searchTracks(artistData.name);
        setTracks(tracksData.sort((a: any, b: any) => b.rank - a.rank).slice(0, 5));

        const albumsData = await searchTracks(artistData.name);
        const uniqueAlbums = Array.from(
          new Set(albumsData.map((track: any) => track.album.id))
        ).map((id) => albumsData.find((track: any) => track.album.id === id)?.album);
        setAlbums(uniqueAlbums.slice(0, 5));
      } catch (error) {
        console.error("Erro ao carregar detalhes do artista:", error);
      }
    };

    fetchArtistDetails();
  }, [id]);

  const handlePlayPause = (preview: string) => {
    if (playingTrack === preview) {
      audio?.pause();
      setPlayingTrack(null);
    } else {
      const newAudio = new Audio(preview);
      newAudio.play();
      setAudio(newAudio);
      setPlayingTrack(preview);
    }
  };

  if (!id) return <PopularArtists />;

  if (!artist) return <p className="text-center mt-10 text-gray-400">Carregando...</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-artist p-6 rounded-lg shadow-lg bg-secundary">
        <img src={artist.picture_big} alt={artist.name} className="rounded-lg w-48 h-48 object-cover shadow-md" />
        <div>
          <h2 className="text-3xl font-bold">{artist.name}</h2>
          <p className="text-gray-400">Seguidores: {artist.nb_fan}</p>
          <a
            href={artist.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block bg-details hover:bg-hover text-white py-2 px-4 rounded-lg transition"
          >
            Perfil no Deezer
          </a>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold">Principais Álbuns</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-3 ">
          {albums.map((album: { id: number; title: string; cover_medium: string }) => (
            <div key={album.id} className="bg-artist p-3 rounded-lg shadow-md bg-secundary">
              <img src={album.cover_medium} alt={album.title} className="rounded-lg w-full" />
              <p className="text-center mt-2">{album.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold">Músicas Populares</h3>
        <ul className="mt-3">
          {tracks.map((track: { id: number; title: string; preview: string }) => (
            <li key={track.id} className="flex items-center justify-between bg-artist p-3 rounded-lg shadow-md mb-2 bg-secundary">
              <span>{track.title}</span>
              <button onClick={() => handlePlayPause(track.preview)} className="text-white">
                {playingTrack === track.preview ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className=" sm:space-y-12">
        <Footer />
      </div>
    </div>
  );
};

export default ArtistDetails;
