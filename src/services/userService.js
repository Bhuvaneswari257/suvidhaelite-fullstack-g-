import apiClient from './apiClient';
import { mapErrorMessage } from '../utils/errorHandler';

const userService = {
  /**
   * Get all users (admin only)
   */
  getAllUsers: async (filters = {}) => {
    try {
      const response = await apiClient.get('/admin/users', {
        params: filters,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  /**
   * Get user details (admin only)
   */
  getUserById: async (userId) => {
    try {
      const response = await apiClient.get(`/admin/users/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  /**
   * Change user role (admin only)
   */
  changeUserRole: async (userId, role) => {
    try {
      const response = await apiClient.put(`/admin/users/${userId}/role`, {
        role,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  /**
   * Delete user (admin only)
   */
  deleteUser: async (userId) => {
    try {
      const response = await apiClient.delete(`/admin/users/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },
};

export default userService;
