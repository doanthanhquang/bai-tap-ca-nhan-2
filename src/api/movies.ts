import axiosInstance from '@/api/axios';
import type { Movie, PaginatedResponse } from '@/api/types';

export const moviesApi = {
  // Get paginated list of movies
  getMovies: async (page: number = 1, limit: number = 10) => {
    const response = await axiosInstance.get<PaginatedResponse<Movie>>('/movies', {
      params: { page, limit }
    });
    return response.data;
  },

  // Get single movie by ID
  getMovieById: async (id: string) => {
    const response = await axiosInstance.get<Movie>(`/movies/${id}`);
    return response.data;
  },
};
