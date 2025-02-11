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
import { getPlaylists } from "@/services/api";

export function PlaylistsCarousel() {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState<
    { id: number; title: string; nb_tracks: number; link: string; picture_medium: string }[]
  >([]);

  useEffect(() => {
    async function fetchPlaylists() {
      const data = await getPlaylists();
      if (data) {
        setPlaylists(data);
      }
    }
    fetchPlaylists();
  }, []);

  return (
    <Carousel opts={{ align: "start" }} className="w-full max-w-full mx-auto overflow-hidden">
      <CarouselContent className="gap-2">
        {playlists.map((playlist) => (
          <CarouselItem key={playlist.id} className="basis-4/5 sm:basis-1/4 md:basis-1/5 lg:basis-1/7">
            <div className="p-1">
              <Card className="shadow-md rounded-xl border-none bg-transparent">
                <CardContent className="flex flex-col items-center text-center p-2 sm:p-4">
                <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/playlist/${playlist.id}/`);
                      }}
                      className="transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"

                  >
                  <img
                    src={playlist.picture_medium}
                    alt={playlist.title}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <h2 className="text-sm sm:text-lg font-bold text-center mt-2">{playlist.title}</h2>
                  <p className="text-xs sm:text-sm text-gray-500">{playlist.nb_tracks} músicas</p>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/playlist/${playlist.id}`);
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
