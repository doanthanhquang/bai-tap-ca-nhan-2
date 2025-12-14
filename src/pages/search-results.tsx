import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { moviesApi } from "@/api";
import type { Movie, Pagination as PaginationType } from "@/api/types";
import MovieCard from "@/components/movie/movie-card";
import CommonPagination from "@/components/common/pagination";
import { Search } from "lucide-react";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const searchType = (searchParams.get("type") as 'title' | 'person') || "title";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationType>({
    total_items: 0,
    current_page: 1,
    total_pages: 1,
    page_size: 20,
  });

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        setLoading(true);
        setError(null);
        const response = await moviesApi.searchMovies({
          searchType,
          query,
          page: 1,
          limit: 20,
        });
        setMovies(response.data);
        setPagination(response.pagination);
      } catch (err) {
        console.error("Error searching movies:", err);
        setError("Failed to search movies");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, searchType]);

  const handlePageChange = async (newPage: number) => {
    if (newPage === pagination.current_page || loading) return;

    try {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      const response = await moviesApi.searchMovies({
        searchType,
        query,
        page: newPage,
        limit: 20,
      });
      setMovies(response.data);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Error changing page:", err);
      setError("Failed to load page");
    } finally {
      setLoading(false);
    }
  };

  const getSearchTypeLabel = () => {
    return searchType === 'title' ? 'title' : 'person';
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
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Search Results for "{query}"
          </h1>
          <span className="text-gray-600 dark:text-gray-400">
            {movies.length} results
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Searching by {getSearchTypeLabel()}
        </p>
      </div>

      {/* Results Grid */}
      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          <CommonPagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            onPageChange={handlePageChange}
            loading={loading}
          />
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
