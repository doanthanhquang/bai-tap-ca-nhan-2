import React, { useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Movie } from "@/api/types";
import TopRevenue from "@/components/slider/top-revenue";
import Popular from "@/components/slider/popular";

interface SliderProps {
  items: Movie[];
  type: string;
  classNameItem?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

const Slider = ({
  items,
  type,
  classNameItem,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}: SliderProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const loadMoreTriggered = useRef(false);

  useEffect(() => {
    if (!api || !onLoadMore || !hasMore) {
      return;
    }

    const handleScroll = () => {
      if (isLoading) return;

      const { selectedScrollSnap, scrollSnapList } = api;
      const currentIndex = selectedScrollSnap();
      const totalSlides = scrollSnapList().length;

      // Load more when reaching the last 3 slides
      if (currentIndex >= totalSlides - 2 && !loadMoreTriggered.current) {
        loadMoreTriggered.current = true;
        onLoadMore();

        // Reset the trigger after 2 seconds
        setTimeout(() => {
          loadMoreTriggered.current = false;
        }, 2000);
      }
    };

    api.on("select", handleScroll);

    return () => {
      api.off("select", handleScroll);
    };
  }, [api, onLoadMore, hasMore, isLoading]);

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
      setApi={setApi}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={`${item.id}-${index}`} className={classNameItem}>
            {renderItem(item)}
          </CarouselItem>
        ))}
        {isLoading && (
          <CarouselItem className={classNameItem}>
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className="left-10 dark:bg-gray-800" />
      <CarouselNext className="right-10 dark:bg-gray-800" />
    </Carousel>
  );
};

export default Slider;
