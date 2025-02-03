import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArtist } from '../services/api';

const ArtistDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<any>(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      if (!id) {
        console.error('ID do artista não encontrado.');
        return;
      }

      try {
        const artistData = await getArtist(id);
        setArtist(artistData);
      } catch (error) {
        console.error('Erro ao carregar detalhes do artista:', error);
      }
    };

    fetchArtistDetails();
  }, [id]);

  if (!artist) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{artist.name}</h2>
      <img src={artist.picture_big} alt={artist.name} />
      <p>Seguidores: {artist.nb_fan}</p>
      <p><a href={artist.link} target="_blank" rel="noopener noreferrer">Perfil no Deezer</a></p>
    </div>
  );
};

export default ArtistDetails;
