// Export all API services
export { authService } from './authService.js';
export { serviceService } from './serviceService.js';
export { bookingService } from './bookingService.js';
export { offerService } from './offerService.js';
export { reviewService } from './reviewService.js';
export { userService } from './userService.js';
export { dashboardService } from './dashboardService.js';

// Export the main API client and configuration
export { default as apiClient, API_ENDPOINTS, API_CONFIG } from '../config/api.js';
