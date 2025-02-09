import { useEffect, useState } from "react";
import { getArtists } from "../services/api";
import { useNavigate } from "react-router-dom";

const PopularArtists: React.FC = () => {
  const [artists, setArtists] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getArtists().then((data) => setArtists(data));
  }, []);

  return (
    <div>
      <h2>Artistas Populares</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {artists.map((artist) => (
          <div key={artist.id} className="p-4 rounded bg-secundary flex flex-col items-center justify-center text-center">
            <img src={artist.picture_medium} alt={artist.name} className="rounded" />
            <h3>{artist.name}</h3>
            <button onClick={() => navigate(`/artist/${artist.id}`)} className="bg-details focus:bg-details active:bg-details text-white p-2 mt-2 rounded-lg">
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularArtists;
