import { useEffect, useState } from "react";
import { getAlbums } from "../services/api";
import { useNavigate } from "react-router-dom";

const PopularAlbums: React.FC = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAlbums().then((data) => setAlbums(data));
  }, []);

  return (
    <div className="p-3 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Albuns Populares</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {albums.map((album) => (
          <div key={album.id} className="p-4 rounded bg-secundary flex flex-col items-center justify-center text-center">
            <img src={album.cover_medium} alt={album.title} className="rounded" />
            <h3>{album.title}</h3>
            <button onClick={() => navigate(`/album/${album.id}`)} className="bg-details focus:bg-details active:bg-details text-white p-2 mt-2 rounded-lg">
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularAlbums;