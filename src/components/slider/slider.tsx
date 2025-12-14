import React, { useEffect, useRef, useMemo, memo } from "react";
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

const Slider = memo(
  ({
    items,
    type,
    classNameItem,
    onLoadMore,
    hasMore = false,
    isLoading = false,
  }: SliderProps) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const loadMoreTriggered = useRef(false);
    const lastLoadTime = useRef(0);

    useEffect(() => {
      if (!api || !onLoadMore || !hasMore) {
        return;
      }

      const handleScroll = () => {
        if (isLoading) return;

        const now = Date.now();
        if (now - lastLoadTime.current < 1000) {
          return;
        }

        const { selectedScrollSnap, scrollSnapList } = api;
        const currentIndex = selectedScrollSnap();
        const totalSlides = scrollSnapList().length;

        // Load more when reaching the last 3 slides
        if (currentIndex >= totalSlides - 3 && !loadMoreTriggered.current) {
          loadMoreTriggered.current = true;
          lastLoadTime.current = now;

          // Use requestAnimationFrame for smooth update
          requestAnimationFrame(() => {
            onLoadMore();
          });

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

    // Memoize carousel options để tránh re-create
    const carouselOpts = useMemo(
      () => ({
        slidesToScroll: type === "popular" ? 3 : 1,
        align: "start" as const,
        duration: 25, // Smooth scroll duration
      }),
      [type]
    );

    return (
      <Carousel className="w-full" opts={carouselOpts} setApi={setApi}>
        <CarouselContent className="transition-all duration-300 ease-out">
          {items.map((item, index) => (
            <CarouselItem
              key={`${item.id}-${index}`}
              className={`${classNameItem} transition-opacity duration-200`}
            >
              {renderItem(item)}
            </CarouselItem>
          ))}
          {isLoading && (
            <CarouselItem className={classNameItem}>
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="left-10 dark:bg-gray-800" />
        <CarouselNext className="right-10 dark:bg-gray-800" />
      </Carousel>
    );
  }
);

export default Slider;
