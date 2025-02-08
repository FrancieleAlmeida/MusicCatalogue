import { useState } from "react";
import { searchTracks } from "../services/api";
import TrackCard from "../components/TrackCard";

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Buscar Músicas</h1>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome da música..."
          className="border bg-secundary h-8 p-2 rounded w-full"
        />
        <button onClick={handleSearch} className="bg-details hover:bg-hover text-white h-8 p-2 rounded flex items-center justify-center">
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
  );
};

export default Search;
