import { useState } from "react";
import { searchTracks } from "../services/api";
import TrackCard from "../components/TrackCard";
import { Footer } from "@/components/Footer";

const Search = () => {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const results = await searchTracks(query);
      setTracks(results);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

return (
  <div className="min-h-screen flex flex-col">
    <div className="flex-grow p-4">
      <h1 className="text-2xl font-bold mb-4">Buscar Músicas</h1>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} 
          placeholder="Digite o nome da música..."
          className="bg-lgray h-8 p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-details"
        />
        <button
          onClick={handleSearch}
          className="bg-details hover:bg-hover text-white h-8 p-2 rounded flex items-center justify-center"
        >
          Buscar
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <TrackCard
              key={track.id}
              title={track.title}
              artist={track.artist.name}
              albumCover={track.album.cover}
              previewUrl={track.preview}
            />
          ))
        ) : (
          <p>Nenhuma música encontrada.</p>
        )}
      </div>
    </div>
    <Footer />
  </div>
);

};

export default Search;
