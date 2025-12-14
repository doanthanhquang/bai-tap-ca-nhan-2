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
  data?: {
    user: {
      id: string;
      username: string;
      email: string;
      dob: string;
      phone: string;
    };
    token?: string;
  };
}

export const userApi = {
  // Register a new user
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axiosInstance.post<RegisterResponse>('/users/register', data);
    return response.data;
  },
};
