import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../utils/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.post('/auth/forgot-password', { email });
      
      if (response.data.success) {
        toast.custom((t) => (
          <div className="bg-dark-200 border border-green-500/30 rounded-lg p-4 max-w-sm shadow-xl">
            <div className="flex items-start gap-3">
              <div className="text-green-500 text-xl">📧</div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">Reset Link Sent!</h4>
                <p className="text-sm text-gray-300 mb-3">
                  We've sent a password reset link to <span className="text-primary-400">{email}</span>
                </p>
                <p className="text-xs text-gray-400">
                  Please check your email inbox (and spam folder) and click the link to reset your password.
                </p>
                <button 
                  onClick={() => toast.dismiss(t.id)}
                  className="mt-3 text-sm bg-primary-600 px-3 py-1 rounded hover:bg-primary-700 text-white"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        ), { duration: 8000 });
        
        // Redirect to login after a delay
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      const errorMessage = error.response?.data?.error || 'Failed to send reset link. Please try again.';
      toast.error(errorMessage);
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
            <div className="text-5xl mb-4">🔐</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Forgot Password?
            </h2>
            <p className="text-gray-400 mt-2">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="Enter your registered email"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending...</span>
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-primary-500 hover:text-primary-400 transition-colors">
              ← Back to Login
            </Link>
          </div>

          <div className="mt-4 text-center text-xs text-gray-500">
            <p>Check your spam folder if you don't see the email within a few minutes.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;