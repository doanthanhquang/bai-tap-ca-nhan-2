import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Movie } from "@/api/types";

interface SliderProps {
  items: Movie[];
}

const Slider = ({ items }: SliderProps) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <div className="relative w-90">
              <img src={item.image} alt={item.id} />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-80">
                <span className="text-2xl font-bold text-white">
                  {item.title}
                </span>
                <span className="text-2xl text-white">{item.rate}</span>
                <span className="text-2xl text-white">
                  {item.genres.join(", ")}
                </span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-10 dark:bg-gray-800" />
      <CarouselNext className="right-10 dark:bg-gray-800" />
    </Carousel>
  );
};

export default Slider;
