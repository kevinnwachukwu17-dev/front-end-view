import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../utils/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: '',
    width: '0%'
  });

  useEffect(() => {
    // Extract token from URL hash
    const hash = window.location.hash;
    console.log('URL Hash:', hash);
    
    if (hash && hash.includes('access_token=')) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      const type = params.get('type');
      
      console.log('Token:', token);
      console.log('Type:', type);
      
      if (token && type === 'recovery') {
        setAccessToken(token);
        sessionStorage.setItem('reset_token', token);
      } else {
        setError('Invalid reset link. Please request a new one.');
      }
    } else {
      // Check if we have a stored token
      const storedToken = sessionStorage.getItem('reset_token');
      if (storedToken) {
        setAccessToken(storedToken);
      } else {
        setError('No reset token found. Please request a new password reset link.');
      }
    }
  }, []);

  const checkPasswordStrength = (password) => {
    let score = 0;
    let message = '';
    let color = '';
    let width = '0%';

    if (!password) {
      setPasswordStrength({ score: 0, message: '', color: '', width: '0%' });
      return;
    }

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    if (score <= 2) {
      message = 'Weak';
      color = 'bg-red-500';
      width = '33%';
    } else if (score <= 4) {
      message = 'Medium';
      color = 'bg-yellow-500';
      width = '66%';
    } else {
      message = 'Strong';
      color = 'bg-green-500';
      width = '100%';
    }

    setPasswordStrength({ score, message, color, width });
  };

  const validatePassword = (password) => {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!isLongEnough) return 'Password must be at least 8 characters long';
    if (!hasLetters) return 'Password must contain letters';
    if (!hasNumbers) return 'Password must contain numbers';
    if (!hasSpecialChars) return 'Password must contain special characters (!@#$%^&* etc.)';
    if (!hasUpperCase) return 'Password must contain uppercase letters';
    if (!hasLowerCase) return 'Password must contain lowercase letters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (!accessToken) {
      toast.error('No reset token found. Please request a new reset link.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/reset-password', {
        token: accessToken,
        new_password: password
      });

      if (response.data.success) {
        toast.success('Password reset successful! Please login with your new password.');
        sessionStorage.removeItem('reset_token');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      const errorMessage = error.response?.data?.error || 'Failed to reset password. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Invalid Reset Link</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link 
            to="/forgot-password" 
            className="inline-block px-6 py-2 bg-primary-600 rounded-lg text-white hover:bg-primary-700 transition"
          >
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
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
            <div className="text-5xl mb-4">🔄</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Reset Password
            </h2>
            <p className="text-gray-400 mt-2">
              Create a new strong password for your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    checkPasswordStrength(e.target.value);
                  }}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors pr-12"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500"
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

              {/* Password Strength Bar */}
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Password Strength:</span>
                    <span className={`text-xs font-semibold ${
                      passwordStrength.message === 'Weak' ? 'text-red-500' :
                      passwordStrength.message === 'Medium' ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      {passwordStrength.message}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: passwordStrength.width }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Password Requirements */}
              {password && (
                <div className="mt-3 p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400 mb-2">Password must contain:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-white/20'}`}></div>
                      <span className="text-xs text-gray-400">Min. 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-white/20'}`}></div>
                      <span className="text-xs text-gray-400">Uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${/[a-z]/.test(password) ? 'bg-green-500' : 'bg-white/20'}`}></div>
                      <span className="text-xs text-gray-400">Lowercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-white/20'}`}></div>
                      <span className="text-xs text-gray-400">Number (0-9)</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <div className={`w-3 h-3 rounded-full ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'bg-green-500' : 'bg-white/20'}`}></div>
                      <span className="text-xs text-gray-400">Special character (!@#$%^&*)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors pr-12"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500"
                >
                  {showConfirmPassword ? (
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
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 py-3 rounded-lg font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Resetting Password...</span>
                </div>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-primary-500 hover:text-primary-400 transition-colors">
              ← Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;