import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      try {
        const response = await axios.get(`https://deezerdevs-deezer.p.rapidapi.com/album/${id}`, {
          headers: {
            "x-rapidapi-key": "6bcdf6606bmshd11d9521448bceap1d5b11jsn5a6ca7186c9e",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        });
        setAlbum(response.data);
      } catch (error) {
        console.error("Erro ao carregar o álbum", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!album) return <p>Álbum não encontrado.</p>;

  return (
    <div>
      <h1>{album.title}</h1>
      <img src={album.cover_medium} alt={album.title} />
      <h2>Artista: {album.artist.name}</h2>
      <h3>Faixas:</h3>
      <ul>
        {album.tracks.data.map((track) => (
          <li key={track.id}>
            {track.title} - {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")}
            <audio controls>
              <source src={track.preview} type="audio/mpeg" />
              Seu navegador não suporta o áudio.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumPage;
