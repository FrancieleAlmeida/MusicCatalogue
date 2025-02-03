import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ArtistDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<any>(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const response = await axios.get(`https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`, {
          headers: {
            'x-rapidapi-key': '6bcdf6606bmshd11d9521448bceap1d5b11jsn5a6ca7186c9e',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
          }
        });
        setArtist(response.data);
      } catch (error) {
        console.error('Erro ao carregar detalhes do artista:', error);
      }
    };

    if (id) {
      fetchArtistDetails();
    }
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