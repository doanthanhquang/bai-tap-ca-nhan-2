import { useState, useEffect } from "react";
import { moviesApi } from "@/api";
import type { Movie, MovieTopRatedResponse } from "@/api/types";
import Slider from "@/components/slider";

export function MoviePage() {
  const [moviesTopRate, setMoviesTopRate] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response: MovieTopRatedResponse = await moviesApi.getMoviesTopRate({
        category: "IMDB_TOP_50",
      });
      console.log(response);
      setMoviesTopRate(response.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
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
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <Slider items={moviesTopRate?.slice(0, 5) || []} />
      </div>
    </div>
  );
}
