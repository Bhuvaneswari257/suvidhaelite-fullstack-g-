import apiClient from './apiClient';
import { mapErrorMessage } from '../utils/errorHandler';

const bookingService = {
  getMyBookings: async () => {
    try {
      const response = await apiClient.get('/api/bookings');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  getBookingById: async (bookingId) => {
    try {
      const response = await apiClient.get(`/api/bookings/${bookingId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  createBooking: async (bookingData) => {
    try {
      const response = await apiClient.post('/api/bookings', bookingData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      const response = await apiClient.patch(`/api/bookings/${bookingId}/status`, {
        status: 'Cancelled',
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  updateBookingStatus: async (bookingId, status) => {
    try {
      const response = await apiClient.patch(`/api/bookings/${bookingId}/status`, {
        status,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  payForBooking: async (bookingId) => {
    try {
      const response = await apiClient.patch(`/api/bookings/${bookingId}/payment`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  getAllBookings: async () => {
    try {
      const response = await apiClient.get('/api/bookings');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },
};

export default bookingService;
