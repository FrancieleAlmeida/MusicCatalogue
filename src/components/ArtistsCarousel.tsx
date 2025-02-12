import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getArtists } from "@/services/api";

export function ArtistsCarousel() {
  const [artists, setArtists] = useState<
    { id: number; name: string; link: string; picture_medium: string }[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArtists() {
      const data = await getArtists();
      if (data) {
        setArtists(data);
      }
    }
    fetchArtists();
  }, []);

  return (
    <div className="w-full flex justify-center relative">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-full mx-auto overflow-visible"
      >
        <CarouselContent className="-ml-2 flex">
          {artists.map((artist) => (
            <CarouselItem
              key={artist.id}
              className="basis-1/1 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
            >
              <Card className="shadow-lg rounded-xl border-none bg-transparent">
                <CardContent className="flex flex-col items-center p-4">
                  <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/artist/${artist.id}`);
                      }}
                      className="transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"

                  >
                  <img
                    src={artist.picture_medium}
                    alt={artist.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-full border-4 border-gray-200"
                  />
                  <h2 className="text-sm sm:text-base font-semibold text-center mt-2">
                    {artist.name}
                  </h2>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault(); 
                      navigate(`/artist/${artist.id}`); 
                    }}
                    className="mt-1 text-details text-xs sm:text-sm font-semibold hover:underline"
                  >
                    Ver Detalhes
                  </a>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-y-0 left-12 flex items-center justify-start px-2">
          <CarouselPrevious className="text-black bg-[#E1DDE4] rounded-full p-2" />
        </div>
        <div className="absolute inset-y-0 right-12 flex items-center justify-end px-2">
          <CarouselNext className="text-black bg-[#E1DDE4] rounded-full p-2" />
        </div>
      </Carousel>
    </div>
  );
}
