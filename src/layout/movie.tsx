import { useState, useEffect } from "react";
import { moviesApi } from "@/api";
import type {
  Movie,
  MovieTopRatedResponse,
  PaginatedResponse,
} from "@/api/types";
import Slider from "@/components/slider/slider";

export function MoviePage() {
  const [moviesTopRate, setMoviesTopRate] = useState<Movie[]>([]);
  const [moviesMostPopular, setMoviesMostPopular] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMoviesTopRate = async () => {
    try {
      setLoading(true);
      const response: MovieTopRatedResponse = await moviesApi.getMoviesTopRate({
        category: "IMDB_TOP_50",
      });

      setMoviesTopRate(response.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoviesMostPopular = async () => {
    try {
      setLoading(true);
      const response: PaginatedResponse<Movie> =
        await moviesApi.getMoviesMostPopular({
          page: 1,
          limit: 10,
        });

      setMoviesMostPopular(response.data);
    } catch (err) {
      console.error("Error fetching movies most popular:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesTopRate();
    fetchMoviesMostPopular();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading movies...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-visible">
      {/* Top revenue */}
      <div className="flex items-center justify-center">
        <Slider
          type="top-revenue"
          items={moviesMostPopular?.slice(0, 5) || []}
          classNameItem="flex justify-center"
        />
      </div>

      {/* Popular */}
      <div className="overflow-visible">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Most Popular
        </h2>
        <div className="flex items-center justify-center overflow-visible">
          <Slider
            type="popular"
            items={moviesMostPopular || []}
            classNameItem="basis-1/3 px-2"
          />
        </div>
      </div>

      {/* Top rated */}
      <div className="overflow-visible">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Top Rated
        </h2>
        <div className="flex items-center justify-center">
          <Slider
            type="popular"
            items={moviesTopRate || []}
            classNameItem="basis-1/3 px-2"
          />
        </div>
      </div>
    </div>
  );
}
