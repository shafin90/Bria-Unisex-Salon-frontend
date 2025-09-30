import apiClient, { API_ENDPOINTS } from '../config/api.js';

export const bookingService = {
  // Get all bookings
  getBookings: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS.LIST, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new booking
  createBooking: async (bookingData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.BOOKINGS.CREATE, bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Book appointment (public endpoint)
  bookAppointment: async (appointmentData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.PUBLIC.BOOK_APPOINTMENT, appointmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update booking
  updateBooking: async (id, bookingData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.BOOKINGS.UPDATE(id), bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete booking
  deleteBooking: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.BOOKINGS.DELETE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update booking status
  updateBookingStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.BOOKINGS.STATUS(id), { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get booking by ID
  getBookingById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS.UPDATE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
