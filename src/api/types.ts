// Common API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
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
  short_description: string;
  genres: string[];
}

// Add more types as needed
