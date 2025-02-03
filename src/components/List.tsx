import React from "react";
import Card from "./TrackCard";

interface ListProps {
  items: {
    id: number;
    image: string;
    title: string;
    subtitle?: string;
  }[];
  onItemClick?: (id: number) => void;
}

const List: React.FC<ListProps> = ({ items, onItemClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card
          key={item.id}
          image={item.image}
          title={item.title}
          subtitle={item.subtitle}
          onClick={() => onItemClick && onItemClick(item.id)}
        />
      ))}
    </div>
  );
};

export default List;
