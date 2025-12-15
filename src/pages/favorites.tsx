import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "@/api/user";
import type { Movie } from "@/api/types";
import { AxiosError } from "axios";
import MovieCard from "@/components/movie/movie-card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import CommonPagination from "@/components/common/pagination";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchFavorites = useCallback(
    async () => {
      // Check authentication first
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);

        const response = await userApi.getFavorites();

        // Map API favorite format to existing Movie type
        const mappedMovies: Movie[] = response.map((fav) => ({
          id: fav.id,
          title: fav.title,
          year: fav.release_year,
          image: fav.image_url,
          rate: fav.imdb_rating
            ? Number(fav.imdb_rating)
            : fav.external_ratings?.imDb
            ? Number(fav.external_ratings.imDb)
            : 0,
          short_description: fav.plot,
          genres: fav.keywords ?? [],
          box_office_revenue: fav.box_office?.cumulativeWorldwideGross,
        }));

        setMovies(mappedMovies);
      } catch (err) {
        const axiosError = err as AxiosError<{ message?: string }>;

        if (axiosError.response?.status === 401) {
          // Unauthorized - redirect to login
          localStorage.removeItem("token");
          window.dispatchEvent(new Event("authChange"));
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg text-gray-600 dark:text-gray-400">
            Loading favorite movies...
          </div>
        </div>
      </div>
    );
  }

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(movies.length / pageSize) || 1);
  const startIndex = (page - 1) * pageSize;
  const currentMovies = movies.slice(startIndex, startIndex + pageSize);

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Favorite Movies
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {movies && movies.length > 0
            ? `You have ${movies.length} favorite movie${
                movies.length > 1 ? "s" : ""
              }`
            : "Your favorite movies will appear here"}
        </p>
      </div>

      {/* Movies Grid */}
      {movies && movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
            {currentMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={true}
                onFavoriteChange={(movieId, isFav) => {
                  if (!isFav) {
                    setMovies((prev) => prev.filter((m) => m.id !== movieId));
                  }
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          <CommonPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            loading={loading}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No Favorite Movies Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start adding movies to your favorites to see them here
          </p>
          <Button onClick={() => navigate("/movies")} variant="outline">
            Browse Movies
          </Button>
        </div>
      )}
    </div>
  );
}
