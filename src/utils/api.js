import axios from 'axios';

// Use environment variable for production, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🔧 API Utility initialized with URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 second timeout for mobile networks
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // Validate token isn't corrupted (mobile fix)
    if (token && token !== 'undefined' && token !== 'null' && token.length > 10) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token) {
      // Remove invalid token
      console.warn('Invalid token detected, removing...');
      localStorage.removeItem('token');
    }
    
    // Log request for debugging (disable in production)
    if (import.meta.env.DEV) {
      console.log(`📤 ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with retry logic for mobile networks
api.interceptors.response.use(
  (response) => {
    // Log response for debugging (disable in production)
    if (import.meta.env.DEV) {
      console.log(`📥 Response from ${response.config.url}:`, response.status);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle timeout errors
    if (error.code === 'ECONNABORTED' || error.message === 'timeout of 30000ms exceeded') {
      console.error('Request timeout:', error);
      const timeoutError = new Error('Request timeout. Please check your internet connection.');
      timeoutError.timeout = true;
      return Promise.reject(timeoutError);
    }
    
    // Retry failed requests on network errors (max 1 retry for mobile)
    if (error.message === 'Network Error' && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('Network error, retrying request...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
      return api(originalRequest);
    }
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.warn('401 Unauthorized - clearing token and redirecting to login');
      localStorage.removeItem('token');
      // Clear any other stored data
      sessionStorage.clear();
      // Redirect to login page if not already there
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('403 Forbidden - insufficient permissions');
      const forbiddenError = new Error(error.response?.data?.error || 'Access denied. Insufficient permissions.');
      forbiddenError.forbidden = true;
      return Promise.reject(forbiddenError);
    }
    
    // Handle 500 Server Error
    if (error.response?.status === 500) {
      console.error('500 Server Error:', error.response?.data);
      const serverError = new Error('Server error. Please try again later.');
      serverError.serverError = true;
      return Promise.reject(serverError);
    }
    
    // Log other errors
    console.error('API Error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url
    });
    
    return Promise.reject(error);
  }
);

// Helper function to check if API is reachable (for mobile connectivity checks)
export const checkApiHealth = async () => {
  try {
    const response = await api.get('/health', { timeout: 5000 });
    return response.data?.status === 'OK';
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

// Helper function to get the current API URL (useful for debugging)
export const getApiUrl = () => API_URL;

export default api;