import apiClient, { API_ENDPOINTS } from '../config/api.js';

export const serviceService = {
  // Get all services
  getServices: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SERVICES.LIST);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get public services (for public pages)
  getPublicServices: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PUBLIC.SERVICES);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new service
  createService: async (serviceData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.SERVICES.CREATE, serviceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update service
  updateService: async (id, serviceData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.SERVICES.UPDATE(id), serviceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete service
  deleteService: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.SERVICES.DELETE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get service by ID
  getServiceById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SERVICES.UPDATE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
