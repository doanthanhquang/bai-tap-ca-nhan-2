import axiosInstance from '@/api/axios';
import type { Movie, PaginatedResponse, MovieTopRatedResponse, MovieDetail } from '@/api/types';

export const moviesApi = {
  // Get paginated list of movies
  getMovies: async (page: number = 1, limit: number = 10) => {
    const response = await axiosInstance.get<PaginatedResponse<Movie>>('/movies', {
      params: { page, limit }
    });
    return response.data;
  },

  // Get single movie by ID with full details
  getMovieById: async (id: string) => {
    const response = await axiosInstance.get<MovieDetail>(`/movies/${id}`);
    return response.data;
  },

  // Get top rated movies by category
  getMoviesTopRate: async ({ category }: { category: string }) => {
    const response = await axiosInstance.get<MovieTopRatedResponse>('/movies/top-rated', {
      params: {
        category,
      }
    });
    return response.data;
  },

  // Get top rated movies by category
  getMoviesMostPopular: async ({ page, limit }: { page: number, limit: number }) => {
    const response = await axiosInstance.get<PaginatedResponse<Movie>>('/movies/most-popular', {
      params: {
        page,
        limit,
      }
    });
    return response.data;
  },

  // Search movies by name
  searchMovies: async ({ title, page = 1, limit = 10 }: { title: string, page?: number, limit?: number }) => {
    const response = await axiosInstance.get<PaginatedResponse<Movie>>('/movies/search', {
      params: {
        title,
        page,
        limit,
      }
    });
    return response.data;
  },
};
