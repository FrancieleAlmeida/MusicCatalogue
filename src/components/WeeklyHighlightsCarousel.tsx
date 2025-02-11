import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getTracks } from "@/services/api";

export function WeeklyHighlightsCarousel() {
  const [highlights, setHighlights] = useState<
    { id: number; title: string; link: string; artist: { name: string }; album: { cover_medium: string } }[]
  >([]);

  useEffect(() => {
    async function fetchHighlights() {
      const data = await getTracks();
      if (data) {
        setHighlights(data);
      }
    }
    fetchHighlights();
  }, []);

  return (
    <Carousel opts={{ align: "start" }} className="w-full max-w-full mx-auto overflow-hidden">
      <CarouselContent className="gap-2">
        {highlights.map((track) => (
          <CarouselItem key={track.id} className="basis-4/5 sm:basis-1/4 md:basis-1/5 lg:basis-1/7">
            <div className="p-2">
              <Card className="shadow-md rounded-lg border-none bg-transparent">
                <CardContent className="flex flex-col items-center text-center p-2 sm:p-4">
                  <a
                    href={track.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none "

                  >
                    <img
                      src={track.album.cover_medium}
                      alt={track.title}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                    <h2 className="text-sm sm:text-lg font-bold text-center mt-2">{track.title}</h2>
                    <p className="text-xs sm:text-sm text-gray-500">{track.artist.name}</p>
                  </a>
                  <a
                    href={track.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-details font-semibold hover:underline text-xs sm:text-sm"
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
