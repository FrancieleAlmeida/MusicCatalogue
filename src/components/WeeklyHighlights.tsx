import { useEffect, useState } from "react";
import { getTracks } from "../services/api";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";


const WeeklyHighlights: React.FC = () => {
  const navigate = useNavigate();
  const [highlights, setHighlights] = useState<any[]>([]);

  useEffect(() => {
    getTracks().then((data) => setHighlights(data));
  }, []);

  return (
    <div className="p-3 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">🔥 Destaques da Semana</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {highlights.map((track) => (
          <div key={track.id} className="p-4 rounded bg-secundary flex flex-col items-center justify-center text-center">
            <img src={track.album.cover_medium} alt={track.title} className="rounded" />
            <h2 className="text-sm sm:text-lg font-bold text-center mt-2">{track.title}</h2>
            <p className="text-xs sm:text-sm text-gray-500">{track.artist.name}</p>
            <button
              onClick={() => navigate(`/weekly-highlights/${track.id}`)}
              className="bg-details focus:bg-details active:bg-details text-white p-2 mt-2 rounded-lg"
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
      <div className="sm:space-y-12">
        <Footer />
      </div>
    </div>
  );
};

export default WeeklyHighlights;
