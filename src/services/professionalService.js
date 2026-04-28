import apiClient from './apiClient';
import { mapErrorMessage } from '../utils/errorHandler';

const professionalService = {
  getAllProfessionals: async (filters = {}) => {
    try {
      const response = await apiClient.get('/api/professionals', {
        params: filters,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  searchProfessionals: async (query, category = null) => {
    try {
      const response = await apiClient.get('/api/professionals', {
        params: { q: query || undefined, category: category || undefined },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  getProfessionalById: async (professionalId) => {
    try {
      const response = await apiClient.get(`/api/professionals/${professionalId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  registerAsProfessional: async (profileData) => {
    try {
      const response = await apiClient.post('/api/professionals', profileData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  updateProfessionalProfile: async (professionalId, profileData) => {
    try {
      const response = await apiClient.put(`/api/professionals/${professionalId}`, profileData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  getProfessionalServices: async () => {
    return { success: true, data: [] };
  },

  updateProfessionalServices: async () => {
    return { success: true, data: [] };
  },

  updateAvailability: async (professionalId, bookedTimeSlot) => {
    try {
      const current = await professionalService.getProfessionalById(professionalId);
      if (!current.success) {
        return current;
      }

      const professional = current.data;
      const availableTimes = (professional.availableTimes || []).filter(
        time => time !== bookedTimeSlot
      );

      const response = await apiClient.put(`/api/professionals/${professionalId}`, {
        ...professional,
        availableTimes,
      });

      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },
};

export default professionalService;
