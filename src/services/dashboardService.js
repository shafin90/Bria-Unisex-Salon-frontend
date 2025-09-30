import apiClient, { API_ENDPOINTS } from '../config/api.js';

export const dashboardService = {
  // Get dashboard statistics
  getStats: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DASHBOARD.STATS);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get recent bookings
  getRecentBookings: async (limit = 10) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DASHBOARD.RECENT_BOOKINGS, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get recent reviews
  getRecentReviews: async (limit = 10) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DASHBOARD.RECENT_REVIEWS, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
