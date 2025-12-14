import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Movie } from "@/api/types";
import TopRevenue from "@/components/slider/top-revenue";
import Popular from "@/components/slider/popular";

interface SliderProps {
  items: Movie[];
  type: string;
  classNameItem?: string;
}

const Slider = ({ items, type, classNameItem }: SliderProps) => {
  const renderItem = (item: Movie) => {
    switch (type) {
      case "top-revenue":
        return <TopRevenue {...item} />;
      case "popular":
        return <Popular {...item} />;
      default:
        return null;
    }
  };
  return (
    <Carousel
      className="w-full"
      opts={{
        slidesToScroll: type === "popular" ? 3 : 1,
        align: "start",
      }}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className={classNameItem}>
            {renderItem(item)}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-10 dark:bg-gray-800" />
      <CarouselNext className="right-10 dark:bg-gray-800" />
    </Carousel>
  );
};

export default Slider;
