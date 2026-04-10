import apiClient from './apiClient';
import { mapErrorMessage } from '../utils/errorHandler';

const notificationService = {
  /**
   * Get all notifications
   */
  getNotifications: async () => {
    try {
      const response = await apiClient.get('/notifications');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (notificationId) => {
    try {
      const response = await apiClient.put(
        `/notifications/${notificationId}/read`
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async () => {
    try {
      const response = await apiClient.put('/notifications/read-all');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  /**
   * Delete notification
   */
  deleteNotification: async (notificationId) => {
    try {
      const response = await apiClient.delete(
        `/notifications/${notificationId}`
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },
};

export default notificationService;
