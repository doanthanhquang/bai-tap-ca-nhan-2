import axiosInstance from '@/api/axios';

// Registration request type
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone: string;
  dob: string; // ISO date string (YYYY-MM-DD)
}

// Registration response type
export interface RegisterResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    dob: string;
    phone: string;
  };
}

// Login request type
export interface LoginRequest {
  username: string;
  password: string;
}

// Login response type
export interface LoginResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
}

// User profile type (matches API response)
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  phone: string;
  dob: string;
  role: string;
}

// Update profile request type (matches API payload)
export interface UpdateProfileRequest {
  email: string;
  phone: string;
  dob: string; // ISO date string (YYYY-MM-DD)
}

// Favorite movie item returned by API
export interface FavoriteMovieApi {
  id: string;
  title: string;
  original_title: string;
  full_title: string;
  type: string;
  release_year: number;
  release_date: string;
  runtime_mins: number;
  image_url: string;
  plot: string;
  plot_full: string;
  awards: string;
  companies: string;
  countries: string[];
  languages: string[];
  keywords: string[];
  box_office: {
    budget: string;
    grossUSA: string;
    openingWeekendUSA: string;
    cumulativeWorldwideGross: string;
  };
  external_ratings: {
    imDb: string | null;
    metacritic: string | null;
    theMovieDb: string | null;
    filmAffinity: string | null;
    rottenTomatoes: string | null;
  };
  created_at: string;
  updated_at: string;
  imdb_rating: string | null;
  imdb_votes: string | null;
}

// Favorite movies response type (API returns a plain array, no pagination)
export type FavoriteMoviesResponse = FavoriteMovieApi[];

export const userApi = {
  // Register a new user
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axiosInstance.post<RegisterResponse>('/users/register', data);
    return response.data;
  },

  // Login user
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/users/login', data);
    return response.data;
  },

  // Get user profile
  getProfile: async (): Promise<UserProfile> => {
    const response = await axiosInstance.get<UserProfile>('/users/profile');
    return response.data;
  },

  // Update user profile (PATCH method)
  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const response = await axiosInstance.patch<UserProfile>('/users/profile', data);
    return response.data;
  },

  // Get user favorite movies
  getFavorites: async (): Promise<FavoriteMoviesResponse> => {
    const response = await axiosInstance.get<FavoriteMoviesResponse>('/users/favorites');
    return response.data;
  },

  // Add movie to favorites
  addFavorite: async (movieId: string): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.post<{ success: boolean; message: string }>(
      `/users/favorites/${movieId}`
    );
    return response.data;
  },
};
