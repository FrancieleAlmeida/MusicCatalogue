import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getGenres } from "@/services/api";

export function GenresCarousel() {
  const [genres, setGenres] = useState<
    { id: number; name: string; picture_medium: string }[]
  >([]);

  useEffect(() => {
    async function fetchGenres() {
      const data = await getGenres();
      if (data) {
        setGenres(data);
      }
    }
    fetchGenres();
  }, []);

  return (
    <Carousel opts={{ align: "start" }} className="w-full max-w-full mx-auto overflow-hidden">
      <CarouselContent className="gap-2">
        {genres.map((genre) => (
          <CarouselItem key={genre.id} className="basis-4/5 sm:basis-1/4 md:basis-1/5 lg:basis-1/7">
            <div className="p-1">
              <Card className="shadow-md rounded-xl border-none bg-transparent">
                <CardContent className="flex flex-col items-center p-2 sm:p-4">
                  <img
                    src={genre.picture_medium}
                    alt={genre.name}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <h2 className="text-sm sm:text-lg font-bold text-center mt-2">{genre.name}</h2>
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
