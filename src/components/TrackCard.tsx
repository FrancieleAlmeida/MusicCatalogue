import { useState } from "react";
import { Play, Pause } from "lucide-react";

interface TrackCardProps {
  title: string;
  artist: string;
  albumCover: string;
  previewUrl: string;
}

const TrackCard: React.FC<TrackCardProps> = ({ title, artist, albumCover, previewUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio(previewUrl);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md flex items-center gap-4 bg-white">
      <img src={albumCover} alt={title} className="w-16 h-16 rounded" />
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-gray-600">{artist}</p>
      </div>
      {previewUrl && (
        <button
          onClick={handlePlayPause}
          className="p-2 rounded bg-blue-500 text-white flex items-center"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      )}
    </div>
  );
};

export default TrackCard;
