import axios, { type AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

// API base URL
const API_BASE_URL = 'https://34.124.214.214:2423/api';

// App token - required for all requests
const APP_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo';

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'x-app-token': APP_TOKEN, // Required for all requests
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.headers) {
      // Ensure x-app-token is always present
      if (!config.headers['x-app-token']) {
        config.headers['x-app-token'] = APP_TOKEN;
      }
      
      // Add user auth token if exists (for personal features: Profile, Favorites)
      const userToken = localStorage.getItem('token');
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    }
    
    console.log('Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response:', response.status, response.config.url);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          console.error('Unauthorized - please login');
          // Clear token and redirect to login
          localStorage.removeItem('token');
          // window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden - insufficient permissions');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Internal server error');
          break;
        default:
          console.error(`Error ${status}:`, data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error - no response from server');
    } else {
      // Error in request configuration
      console.error('Request configuration error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
