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
import { getAlbums } from "@/services/api";

export function AlbumsCarousel() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<
    { id: number; title: string; link: string; cover_medium: string }[]
  >([]);

  useEffect(() => {
    async function fetchAlbums() {
      const data = await getAlbums();
      if (data) {
        setAlbums(data);
      }
    }
    fetchAlbums();
  }, []);

  return (
    <Carousel opts={{ align: "start" }} className="w-full max-w-full mx-auto overflow-hidden">
      <CarouselContent className="gap-2">
        {albums.map((album) => (
          <CarouselItem key={album.id} className="basis-4/5 sm:basis-1/4 md:basis-1/5 lg:basis-1/7">
            <div className="p-1">
              <Card className="shadow-md rounded-xl border-none bg-transparent">
                <CardContent className="flex flex-col items-center p-2 sm:p-4">
                  <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/album/${album.id}`);
                      }}
                      className="transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"

                  >
                  <img
                    src={album.cover_medium}
                    alt={album.title}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <h2 className="text-sm sm:text-lg font-bold text-center mt-2">{album.title}</h2>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/album/${album.id}`);
                    }}
                    className="mt-1 text-details text-xs sm:text-sm font-semibold hover:underline"
                  >
                    Ouvir
                  </a>
                </CardContent>
              </Card>
            </div>
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
  );
}
