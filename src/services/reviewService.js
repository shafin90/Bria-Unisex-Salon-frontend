import apiClient, { API_ENDPOINTS } from '../config/api.js';

export const reviewService = {
  // Get all reviews
  getReviews: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REVIEWS.LIST, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Submit review (public endpoint)
  submitReview: async (reviewData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.PUBLIC.SUBMIT_REVIEW, reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create review (admin)
  createReview: async (reviewData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.REVIEWS.CREATE, reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update review
  updateReview: async (id, reviewData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.REVIEWS.UPDATE(id), reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete review
  deleteReview: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.REVIEWS.DELETE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Approve review
  approveReview: async (id) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.REVIEWS.APPROVE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get review by ID
  getReviewById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REVIEWS.UPDATE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
