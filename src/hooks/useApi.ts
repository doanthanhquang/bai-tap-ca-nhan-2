import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';

/**
 * Custom hook for handling API calls with loading and error states
 * 
 * @example
 * const { data, loading, error, refetch } = useApi(
 *   () => exampleService.getUsers()
 * );
 */
export function useApi<T>(
  apiFunction: () => Promise<T>,
  immediate: boolean = true
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
      return result;
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorMessage = axiosError.response?.data
        ? JSON.stringify(axiosError.response.data)
        : axiosError.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    error,
    refetch: execute,
  };
}

/**
 * Custom hook for handling mutations (POST, PUT, DELETE)
 * 
 * @example
 * const { mutate, loading, error } = useMutation(
 *   (userData) => exampleService.createUser(userData)
 * );
 */
export function useMutation<T, P>(
  apiFunction: (params: P) => Promise<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: P): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(params);
      setData(result);
      return result;
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorMessage = axiosError.response?.data
        ? JSON.stringify(axiosError.response.data)
        : axiosError.message || 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    mutate,
    data,
    loading,
    error,
  };
}
