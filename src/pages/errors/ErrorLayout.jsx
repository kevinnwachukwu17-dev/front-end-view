import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorLayout = ({ 
  code, 
  title, 
  description, 
  icon, 
  actionText, 
  actionLink, 
  secondaryAction, 
  children 
}) => {
  return (
    <div className="min-h-screen bg-dark-100 flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="bg-dark-100/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-8 md:p-12">
          {/* Error Code */}
          {code && (
            <div className="text-center mb-6">
              <span className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                {code}
              </span>
            </div>
          )}

          {/* Icon */}
          {icon && (
            <div className="text-center mb-6">
              <span className="text-6xl md:text-7xl" aria-hidden="true">
                {icon}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
            {title}
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-center text-base md:text-lg mb-8 leading-relaxed">
            {description}
          </p>

          {/* Children - Additional Content */}
          {children}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link
              to={actionLink || '/'}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {actionText || 'Go Home'}
            </Link>

            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {secondaryAction.text}
              </button>
            )}
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-500 text-sm text-center">
              Need immediate help?{' '}
              <a
                href="https://wa.me/2347061066372"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-400 transition-colors"
              >
                Chat with us on WhatsApp
              </a>
              {' '}or{' '}
              <Link to="/contact" className="text-primary-500 hover:text-primary-400 transition-colors">
                contact support
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorLayout;