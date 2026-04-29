import apiClient from './apiClient';
import { mapErrorMessage } from '../utils/errorHandler';

const notificationService = {
  createNotification: async (notification) => {
    try {
      const response = await apiClient.post('/api/notifications', notification);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  /**
   * Get all notifications
   */
  getNotifications: async () => {
    try {
      const response = await apiClient.get('/api/notifications');
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
        `/api/notifications/${notificationId}/read`
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
      const response = await apiClient.put('/api/notifications/read-all');
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
        `/api/notifications/${notificationId}`
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
