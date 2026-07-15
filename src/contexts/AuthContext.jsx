import { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token found:', !!token);
    
    // Clear any potentially corrupted tokens (mobile fix)
    if (token && (token === 'undefined' || token === 'null' || token.length < 10)) {
      console.log('Invalid token detected, clearing...');
      localStorage.removeItem('token');
      setLoading(false);
      return;
    }
    
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      // Add timeout for mobile networks
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await api.get('/auth/me', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log('User data received:', response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      
      // Handle different error types
      if (error.name === 'AbortError') {
        console.error('Request timeout - slow network');
      } else if (error.response?.status === 401) {
        console.error('Unauthorized - token invalid or expired');
      } else if (error.message === 'Network Error') {
        console.error('Network error - check internet connection');
      }
      
      // Clear invalid token on any error
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // Trim inputs to remove hidden whitespace (common on mobile)
    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();
    
    if (!trimmedEmail || !trimmedPassword) {
      throw new Error('Email and password are required');
    }
    
    console.log('Login attempt for:', trimmedEmail);
    
    try {
      // Add timeout for mobile networks
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await api.post('/auth/signin', 
        { email: trimmedEmail, password: trimmedPassword },
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      
      console.log('Full login response:', response.data);
      
      // Try multiple possible token locations
      let token = null;
      
      if (response.data?.access_token) {
        token = response.data.access_token;
      } else if (response.data?.session?.access_token) {
        token = response.data.session.access_token;
      } else if (response.data?.data?.session?.access_token) {
        token = response.data.data.session.access_token;
      }
      
      console.log('Token extracted:', !!token);
      
      if (!token) {
        throw new Error('No access token received from server');
      }
      
      // Validate token isn't corrupted
      if (token === 'undefined' || token === 'null' || token.length < 10) {
        throw new Error('Invalid token received from server');
      }
      
      localStorage.setItem('token', token);
      
      // Small delay to ensure token is stored before fetching user
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await fetchUser();
      return response.data;
      
    } catch (error) {
      console.error('Login error in context:', error);
      
      // Enhance error messages for mobile users
      if (error.name === 'AbortError') {
        const timeoutError = new Error('Request timeout. Please check your internet connection and try again.');
        timeoutError.timeout = true;
        throw timeoutError;
      } else if (error.message === 'Network Error') {
        const networkError = new Error('Unable to connect to server. Please check your internet connection.');
        networkError.network = true;
        throw networkError;
      }
      
      throw error;
    }
  };

  const logout = () => {
    console.log('Logging out user');
    localStorage.removeItem('token');
    // Clear any other stored data
    sessionStorage.clear();
    setUser(null);
    setLoading(false);
  };

  // Helper function to check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token && token !== 'undefined' && token !== 'null' && token.length > 10;
  };

  // Helper function to get user role
  const getUserRole = () => {
    return user?.role || user?.user_metadata?.role || 'student';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout,
      isAuthenticated,
      getUserRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};