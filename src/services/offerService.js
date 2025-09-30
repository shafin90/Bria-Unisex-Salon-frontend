import apiClient, { API_ENDPOINTS } from '../config/api.js';

export const offerService = {
  // Get all offers
  getOffers: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.OFFERS.LIST);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new offer
  createOffer: async (offerData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.OFFERS.CREATE, offerData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update offer
  updateOffer: async (id, offerData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.OFFERS.UPDATE(id), offerData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete offer
  deleteOffer: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.OFFERS.DELETE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get offer by ID
  getOfferById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.OFFERS.UPDATE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
