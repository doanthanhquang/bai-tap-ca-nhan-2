import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { moviesApi } from "@/api";
import type { Movie } from "@/api/types";
import MovieCard from "@/components/movie/movie-card";
import { Search } from "lucide-react";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("title") || "";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        setLoading(true);
        setError(null);
        const response = await moviesApi.searchMovies({
          title: query,
          page: 1,
          limit: 20,
        });
        setMovies(response.data);
        setHasMore(
          response.pagination.current_page < response.pagination.total_pages
        );
        setPage(1);
      } catch (err) {
        console.error("Error searching movies:", err);
        setError("Failed to search movies");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const loadMore = async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const response = await moviesApi.searchMovies({
        title: query,
        page: page + 1,
        limit: 20,
      });
      setMovies((prev) => [...prev, ...response.data]);
      setHasMore(
        response.pagination.current_page < response.pagination.total_pages
      );
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Error loading more:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Search className="h-16 w-16 text-gray-400 mb-4" />
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Enter a search query to find movies
        </p>
      </div>
    );
  }

  if (loading && movies.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Searching for "{query}"...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Search Results for "{query}"
        </h1>
        <span className="text-gray-600 dark:text-gray-400">
          {movies.length} results
        </span>
      </div>

      {/* Results Grid */}
      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <Search className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No results found for "{query}"
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            Try searching with different keywords
          </p>
        </div>
      )}
    </div>
  );
}
