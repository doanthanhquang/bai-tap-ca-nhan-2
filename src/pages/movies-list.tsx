import { useState, useEffect, useCallback, startTransition } from "react";
import { moviesApi } from "@/api";
import type {
  Movie,
  MovieTopRatedResponse,
  PaginatedResponse,
} from "@/api/types";
import Slider from "@/components/slider/slider";

// Skeleton loader component
const SkeletonSlider = () => (
  <div className="w-full animate-pulse">
    <div className="flex gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex-1">
          <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg" />
        </div>
      ))}
    </div>
  </div>
);

export default function MoviesListPage() {
  const [moviesTopRate, setMoviesTopRate] = useState<Movie[]>([]);
  const [moviesMostPopular, setMoviesMostPopular] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [popularPage, setPopularPage] = useState(1);
  const [popularHasMore, setPopularHasMore] = useState(true);
  const [popularLoading, setPopularLoading] = useState(false);

  const [topRatedPage, setTopRatedPage] = useState(1);
  const [topRatedHasMore, setTopRatedHasMore] = useState(true);
  const [topRatedLoading, setTopRatedLoading] = useState(false);

  const fetchMoviesTopRate = useCallback(
    async (page: number = 1, append: boolean = false) => {
      if (topRatedLoading || (!append && loading)) return;

      try {
        if (append) {
          setTopRatedLoading(true);
        } else {
          setLoading(true);
        }

        const response: MovieTopRatedResponse =
          await moviesApi.getMoviesTopRate({
            category: "IMDB_TOP_50",
          });

        // Use startTransition for non-urgent updates
        startTransition(() => {
          if (append) {
            setMoviesTopRate((prev) => [...prev, ...response.data]);
          } else {
            setMoviesTopRate(response.data);
          }

          // Check if there's more data
          setTopRatedHasMore(
            response.pagination.current_page < response.pagination.total_pages
          );
          setTopRatedPage(page);
        });
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
        setTopRatedLoading(false);
      }
    },
    [topRatedLoading, loading]
  );

  const fetchMoviesMostPopular = useCallback(
    async (page: number = 1, append: boolean = false) => {
      if (popularLoading || (!append && loading)) return;

      try {
        if (append) {
          setPopularLoading(true);
        } else {
          setLoading(true);
        }

        const response: PaginatedResponse<Movie> =
          await moviesApi.getMoviesMostPopular({
            page,
            limit: 10,
          });

        // Use startTransition for non-urgent updates
        startTransition(() => {
          if (append) {
            setMoviesMostPopular((prev) => [...prev, ...response.data]);
          } else {
            setMoviesMostPopular(response.data);
          }

          // Check if there's more data
          setPopularHasMore(
            response.pagination.current_page < response.pagination.total_pages
          );
          setPopularPage(page);
        });
      } catch (err) {
        console.error("Error fetching movies most popular:", err);
      } finally {
        setLoading(false);
        setPopularLoading(false);
      }
    },
    [popularLoading, loading]
  );

  // Callbacks for infinite scroll
  const loadMorePopular = useCallback(() => {
    if (popularHasMore && !popularLoading) {
      fetchMoviesMostPopular(popularPage + 1, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popularPage, popularHasMore, popularLoading]);

  const loadMoreTopRated = useCallback(() => {
    if (topRatedHasMore && !topRatedLoading) {
      fetchMoviesTopRate(topRatedPage + 1, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topRatedPage, topRatedHasMore, topRatedLoading]);

  useEffect(() => {
    fetchMoviesTopRate(1, false);
    fetchMoviesMostPopular(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="overflow-visible space-y-8">
      {/* Top revenue */}
      <div className="flex items-center justify-center">
        {loading ? (
          <SkeletonSlider />
        ) : (
          <Slider
            type="top-revenue"
            items={moviesMostPopular?.slice(0, 5) || []}
            classNameItem="flex justify-center"
          />
        )}
      </div>

      {/* Popular */}
      <div className="overflow-visible space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Most Popular
        </h2>
        <div className="flex items-center justify-center overflow-visible">
          {loading ? (
            <SkeletonSlider />
          ) : (
            <Slider
              type="popular"
              items={moviesMostPopular || []}
              classNameItem="basis-1/3 px-2"
              onLoadMore={loadMorePopular}
              hasMore={popularHasMore}
              isLoading={popularLoading}
            />
          )}
        </div>
      </div>

      {/* Top rated */}
      <div className="overflow-visible space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Top Rated
        </h2>
        <div className="flex items-center justify-center">
          {loading ? (
            <SkeletonSlider />
          ) : (
            <Slider
              type="popular"
              items={moviesTopRate || []}
              classNameItem="basis-1/3 px-2"
              onLoadMore={loadMoreTopRated}
              hasMore={topRatedHasMore}
              isLoading={topRatedLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
