import { useEffect, useState } from "react";
import { getPlaylists } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";

const PopularPlaylists: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPlaylists().then((data) => setPlaylists(data));
  }, []);

  return (
    <div className="p-3 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Playlists Populares</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="p-4 rounded bg-secundary flex flex-col items-center justify-center text-center">
            <img src={playlist.picture_medium} alt={playlist.name} className="rounded" />
            <h3>{playlist.name}</h3>
            <button onClick={() => navigate(`/playlist/${playlist.id}`)} className="bg-details focus:bg-details active:bg-details text-white p-2 mt-2 rounded-lg">
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
      <div className=" sm:space-y-12">
        <Footer />
      </div>
    </div>
  );
};

export default PopularPlaylists;
