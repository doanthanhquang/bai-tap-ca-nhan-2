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
};
