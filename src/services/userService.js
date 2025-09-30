import apiClient, { API_ENDPOINTS } from '../config/api.js';

export const userService = {
  // Get all users
  getUsers: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.LIST, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.USERS.CREATE, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USERS.UPDATE(id), userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.UPDATE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
