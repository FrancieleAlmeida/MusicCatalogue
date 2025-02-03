import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPlaylist } from '../services/api';

const Playlist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<any>(null);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      if (!id) {
        console.error('ID da playlist não encontrado.');
        return;
      }

      try {
        const playlistData = await getPlaylist(id); 
        setPlaylist(playlistData);
      } catch (error) {
        console.error('Erro ao carregar detalhes da playlist:', error);
      }
    };

    fetchPlaylistDetails();
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
