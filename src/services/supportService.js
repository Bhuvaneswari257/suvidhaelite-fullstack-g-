import apiClient from './apiClient';
import { mapErrorMessage } from '../utils/errorHandler';

const supportService = {
  getMyTickets: async () => {
    try {
      const response = await apiClient.get('/api/support/tickets');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  getAllTickets: async () => {
    try {
      const response = await apiClient.get('/api/support/tickets', {
        params: { all: true },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  getTicketsByType: async (type) => {
    try {
      const response = await apiClient.get('/api/support/tickets', {
        params: { all: true, type },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  getTicketById: async (ticketId) => {
    try {
      const response = await apiClient.get(`/api/support/tickets/${ticketId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  createTicket: async (ticketData) => {
    try {
      const response = await apiClient.post('/api/support/tickets', ticketData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  updateTicket: async (ticketId, updateData) => {
    try {
      const response = await apiClient.put(`/api/support/tickets/${ticketId}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  resolveTicket: async (ticketId, resolution) => {
    try {
      const response = await apiClient.put(`/api/support/tickets/${ticketId}/resolve`, {
        resolution,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },

  closeTicket: async (ticketId) => {
    try {
      const response = await apiClient.put(`/api/support/tickets/${ticketId}/close`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: mapErrorMessage(error) };
    }
  },
};

export default supportService;
