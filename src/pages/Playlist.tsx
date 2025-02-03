import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Playlist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<any>(null);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await axios.get(`https://deezerdevs-deezer.p.rapidapi.com/playlist/${id}`, {
          headers: {
            'x-rapidapi-key': '6bcdf6606bmshd11d9521448bceap1d5b11jsn5a6ca7186c9e',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
          }
        });
        setPlaylist(response.data);
      } catch (error) {
        console.error('Erro ao carregar detalhes da playlist:', error);
      }
    };

    if (id) {
      fetchPlaylistDetails();
    }
  }, [id]);

  if (!playlist) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{playlist.title}</h2>
      <img src={playlist.picture_big} alt={playlist.title} />
      <p>Criado por: {playlist.creator.name}</p>
      <ul>
        {playlist.tracks.data.map((track: any) => (
          <li key={track.id}>{track.title} - {track.artist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;