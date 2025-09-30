import { useApiEffect } from './useApi.js';
import { dashboardService } from '../services';

// Hook for fetching dashboard stats
export const useDashboardStats = () => {
  return useApiEffect(dashboardService.getStats);
};

// Hook for fetching recent bookings
export const useRecentBookings = (limit = 10) => {
  return useApiEffect(() => dashboardService.getRecentBookings(limit), [limit]);
};

// Hook for fetching recent reviews
export const useRecentReviews = (limit = 10) => {
  return useApiEffect(() => dashboardService.getRecentReviews(limit), [limit]);
};
