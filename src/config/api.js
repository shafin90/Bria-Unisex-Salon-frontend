import axios from 'axios';

// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  TIMEOUT: 10000, // 10 seconds
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    // Log error for debugging
    console.error('API Error:', error.response?.data || error.message);
    
    return Promise.reject(error);
  }
);

// API endpoints configuration
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/adminLogin/adminLogin',
    LOGOUT: '/adminLogout',
    PROFILE: '/admin/profile',
  },
  
  // Services endpoints
  SERVICES: {
    LIST: '/services',
    CREATE: '/services',
    UPDATE: (id) => `/services/${id}`,
    DELETE: (id) => `/services/${id}`,
  },
  
  // Bookings endpoints
  BOOKINGS: {
    LIST: '/bookings',
    CREATE: '/bookings',
    UPDATE: (id) => `/bookings/${id}`,
    DELETE: (id) => `/bookings/${id}`,
    STATUS: (id) => `/bookings/${id}/status`,
  },
  
  // Offers endpoints
  OFFERS: {
    LIST: '/offers',
    CREATE: '/offers',
    UPDATE: (id) => `/offers/${id}`,
    DELETE: (id) => `/offers/${id}`,
  },
  
  // Reviews endpoints
  REVIEWS: {
    LIST: '/reviews',
    CREATE: '/reviews',
    UPDATE: (id) => `/reviews/${id}`,
    DELETE: (id) => `/reviews/${id}`,
    APPROVE: (id) => `/reviews/${id}/approve`,
  },
  
  // Users endpoints
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },
  
  // Dashboard endpoints
  DASHBOARD: {
    STATS: '/dashboard/stats',
    RECENT_BOOKINGS: '/dashboard/recent-bookings',
    RECENT_REVIEWS: '/dashboard/recent-reviews',
  },
  
  // Public endpoints
  PUBLIC: {
    SERVICES: '/public/services',
    BOOK_APPOINTMENT: '/public/book-appointment',
    SUBMIT_REVIEW: '/public/submit-review',
  }
};

// Export the configured axios instance
export default apiClient;

// Export API configuration for reference
export { API_CONFIG };
