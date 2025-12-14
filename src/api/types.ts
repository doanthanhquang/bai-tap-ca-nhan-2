// Common API response types
export interface ApiResponse<T = unknown> {
  success?: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// Pagination types
export interface Pagination {
  total_items: number;
  current_page: number;
  total_pages: number;
  page_size: number;
}

// Paginated response wrapper
export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

// Example user type (customize based on your API)
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

// Movie types
export interface Movie {
  id: string;
  title: string;
  year: number;
  image: string;
  rate: number;
  rank?: number;
  short_description: string;
  genres: string[];
  box_office_revenue?: string;
}

export interface MovieTopRatedResponse {
  category: string;
  data: Movie[];
  pagination: Pagination;
}

// Person types (Director, Actor)
export interface Person {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface Actor extends Person {
  character: string;
}

// Review types
export interface Review {
  id: number;
  username: string;
  rate: number;
  title: string;
  content: string;
  warning_spoilers: boolean;
  date: string;
}

// Movie Detail types
export interface MovieDetail {
  id: string;
  title: string;
  year: number;
  image: string;
  rate: number;
  short_description: string;
  genres: string[];
  full_title: string;
  runtime: string;
  plot_full: string;
  awards: string;
  box_office: Record<string, unknown>;
  ratings: Record<string, unknown>;
  directors: Person[];
  actors: Actor[];
  reviews: Review[];
  similar_movies: Movie[];
}
