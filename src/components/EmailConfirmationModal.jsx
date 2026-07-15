import React from 'react';
import { motion } from 'framer-motion';

const EmailConfirmationModal = ({ email, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-dark-100 rounded-2xl max-w-md w-full border border-primary-500/30 shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 p-4 border-b border-white/10">
          <h3 className="text-xl font-bold text-white text-center">Verify Your Email Address</h3>
        </div>
        
        <div className="p-6 text-center">
          <div className="text-6xl mb-4">📧</div>
          
          <p className="text-gray-300 mb-3">
            We've sent a confirmation link to:
          </p>
          <p className="text-primary-400 font-semibold mb-4 break-all">
            {email}
          </p>
          
          <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-300">
              Please check your email inbox and click the confirmation link to activate your account.
            </p>
            <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
              <span>📌</span> Didn't receive the email? Check your spam folder
            </p>
          </div>
          
          <button
            onClick={onConfirm}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 py-3 rounded-lg font-semibold text-white transition-all transform hover:scale-[1.02]"
          >
            OK, Take me to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailConfirmationModal;