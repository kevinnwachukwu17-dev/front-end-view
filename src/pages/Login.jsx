import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorType, setErrorType] = useState(null);

  // Clear any stale tokens on component mount (fixes mobile caching issues)
  useEffect(() => {
    // Check if token exists but might be invalid
    const token = localStorage.getItem('token');
    if (token) {
      // Optional: verify token validity with backend
      console.log('Existing token found, will attempt to use it');
    }
    
    // Clear any stored service selection from previous sessions
    const selectedService = localStorage.getItem('selectedService');
    if (selectedService) {
      console.log('Selected service from registration:', selectedService);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorType(null);
    
    // Trim email to remove any hidden whitespace characters (common on mobile)
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    
    if (!trimmedEmail || !trimmedPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    try {
      const response = await login(trimmedEmail, trimmedPassword);
      const userRole = response.user?.role || 'student';
      
      toast.success(`Login successful! Redirecting to dashboard...`);
      
      // Determine redirect path based on role
      let redirectPath = '/dashboard';
      switch(userRole) {
        case 'student':
          redirectPath = '/student/dashboard';
          break;
        case 'staff':
          redirectPath = '/staff/dashboard';
          break;
        case 'admin':
          redirectPath = '/admin/portal';
          break;
        default:
          redirectPath = '/dashboard';
      }
      
      // Small delay to ensure state updates and token is stored
      setTimeout(() => {
        navigate(redirectPath);
      }, 500);
      
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response?.data) {
        const errorCode = error.response.data.code;
        const backendError = error.response.data.error;
        
        switch (errorCode) {
          case 'USER_NOT_FOUND':
            errorMessage = 'User does not exist. Please register first.';
            break;
          case 'WRONG_PASSWORD':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 'INVALID_CREDENTIALS':
            errorMessage = 'Invalid email or password. Please check your credentials.';
            break;
          case 'EMAIL_NOT_CONFIRMED':
            toast.custom((t) => (
              <div className="bg-dark-200 border border-yellow-500/30 rounded-lg p-4 max-w-sm shadow-xl">
                <div className="flex items-start gap-3">
                  <div className="text-yellow-500 text-xl">📧</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Email Not Confirmed</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      Please check your email inbox (including spam folder) and click the confirmation link before logging in.
                    </p>
                    <button 
                      onClick={() => toast.dismiss(t.id)}
                      className="text-sm bg-primary-600 px-3 py-1 rounded hover:bg-primary-700 text-white"
                    >
                      Got it
                    </button>
                  </div>
                </div>
              </div>
            ), { duration: 8000 });
            setLoading(false);
            return;
          case 'RATE_LIMIT':
            errorMessage = 'Too many login attempts. Please wait a few minutes before trying again.';
            break;
          default:
            errorMessage = backendError || 'Login failed. Please try again.';
        }
        toast.error(errorMessage);
      } else if (error.message === 'Network Error') {
        toast.error('Unable to connect to server. Please check your internet connection and try again.');
      } else if (error.message === 'Request failed with status code 500') {
        toast.error('Server error. Please try again later or contact support.');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-400 mt-2">Login to your JEO Digital Solutions account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label className="block text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="Enter your email"
                required
                disabled={loading}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors pr-12"
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-sm text-primary-500 hover:text-primary-400 transition-colors">
              Forgot Password?
            </Link>
          </div>

          <div className="mt-6 text-center">
            <Link to="/register" className="text-primary-500 hover:text-primary-400 transition-colors">
              Don't have an account? Sign Up Here
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;