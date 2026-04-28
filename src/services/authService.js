import apiClient from './apiClient';
import { mapErrorMessage } from '../utils/errorHandler';

const TOKEN_KEY = import.meta.env.VITE_JWT_TOKEN_KEY || 'vite_jwt_token';
const REFRESH_TOKEN_KEY = import.meta.env.VITE_JWT_REFRESH_KEY || 'vite_jwt_refresh';

const authService = {
  register: async (email, password, name, address = '', role = 'user') => {
    try {
      const response = await apiClient.post('/api/auth/register', {
        email,
        password,
        name,
        address,
        role,
      });

      const { accessToken, refreshToken, user } = response.data;

      return {
        success: true,
        data: {
          user,
          token: accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  login: async (email, password) => {
    try {
      const response = await apiClient.post('/api/auth/login', {
        email,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      return {
        success: true,
        data: {
          user,
          token: accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  verifyEmail: async () => {
    return { success: true, data: {} };
  },

  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post('/api/auth/forgot-password', { email });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiClient.post('/api/auth/reset-password', { token, newPassword });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/api/auth/me');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  updateUserProfile: async (userData) => {
    try {
      const response = await apiClient.put('/api/auth/profile', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  switchRole: async (role) => {
    try {
      const response = await apiClient.put('/api/auth/switch-role', { role });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: mapErrorMessage(error),
      };
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/api/auth/logout');
    } catch (error) {
      // Best-effort server logout.
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
    return { success: true };
  },

  isLoggedIn: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
};

export default authService;
