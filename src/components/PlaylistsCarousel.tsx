import { useEffect, useState } from "react";
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
    <Carousel opts={{ align: "start" }} className="w-full max-w-full mx-auto overflow-visible">
      <CarouselContent>
        {playlists.map((playlist) => (
          <CarouselItem key={playlist.id} className="basis-1/1 sm:basis-1/4 md:basis-1/5 lg:basis-1/7">
            <div className="p-3">
              <Card className="shadow-lg rounded-xl border-none bg-transparent">
                <CardContent className="flex flex-col items-center p-4">
                  <img
                    src={playlist.picture_medium}
                    alt={playlist.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <h2 className="text-lg font-bold text-center mt-3">{playlist.title}</h2>
                  <p className="text-sm text-gray-500">{playlist.nb_tracks} músicas</p>
                  <a
                    href={playlist.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-details font-semibold hover:underline"
                  >
                    Ouvir no Deezer
                  </a>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
 {/* Setas à esquerda */}
        <div className="absolute inset-y-0 left-10 flex items-center justify-start px-2">
          <CarouselPrevious className="text-black bg-[#E1DDE4] rounded-full p-2" />
        </div>
        {/* Setas à direita */}
        <div className="absolute inset-y-0 right-10 flex items-center justify-end px-2">
          <CarouselNext className="text-black bg-[#E1DDE4] rounded-full p-2" />
        </div>
    </Carousel>
  );
}
