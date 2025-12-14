import axiosInstance from '@/api/axios';
import type { PersonDetail } from '@/api/types';

export const personApi = {
  // Get person details by ID (director, actor)
  getPersonById: async (id: string) => {
    const response = await axiosInstance.get<PersonDetail>(`/persons/${id}`);
    return response.data;
  },
};
