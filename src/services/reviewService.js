import apiClient from './apiClient';
import { mapErrorMessage } from '../utils/errorHandler';

const reviewService = {
  getReviewsForProfessional: async (professionalId) => {
    try {
      const response = await apiClient.get('/api/reviews', {
        params: { professionalId: professionalId || undefined },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  addReview: async (bookingId, reviewData) => {
    try {
      const response = await apiClient.post('/api/reviews', {
        bookingId,
        ...reviewData,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  updateReview: async (reviewId, reviewData) => {
    try {
      const response = await apiClient.put(`/api/reviews/${reviewId}`, reviewData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  deleteReview: async (reviewId) => {
    try {
      await apiClient.delete(`/api/reviews/${reviewId}`);
      return { success: true, data: { id: reviewId } };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },
};

export default reviewService;
