import React from "react";
import TrackCard from "./TrackCard";

interface ListProps {
  items: {
    id: number;
    image: string;
    title: string;
    subtitle?: string;
  }[];
  onItemClick?: (id: number) => void;
}

const List: React.FC<ListProps> = ({ items}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <TrackCard
          key={item.id}
          albumCover={item.image}
          title={item.title}
          artist={item.subtitle || ""}
          previewUrl=""
        />
      ))}
    </div>
  );
};

export default List;
