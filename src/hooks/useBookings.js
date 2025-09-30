import { useApiEffect, useMutation } from './useApi.js';
import { bookingService } from '../services';

// Hook for fetching bookings
export const useBookings = (params = {}) => {
  return useApiEffect(() => bookingService.getBookings(params), [JSON.stringify(params)]);
};

// Hook for booking mutations
export const useBookingMutations = () => {
  const createBooking = useMutation(bookingService.createBooking);
  const bookAppointment = useMutation(bookingService.bookAppointment);
  const updateBooking = useMutation(bookingService.updateBooking);
  const deleteBooking = useMutation(bookingService.deleteBooking);
  const updateBookingStatus = useMutation(bookingService.updateBookingStatus);

  return {
    createBooking,
    bookAppointment,
    updateBooking,
    deleteBooking,
    updateBookingStatus
  };
};
