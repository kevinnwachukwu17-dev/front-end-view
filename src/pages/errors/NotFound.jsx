import React from 'react';
import { Link } from 'react-router-dom';
import ErrorLayout from './ErrorLayout';

const NotFound = () => {
  return (
    <ErrorLayout
      code="404"
      icon="🔍"
      title="Page Not Found"
      description="Oops! The page you're looking for doesn't exist or has been moved. It might have been removed, had its name changed, or is temporarily unavailable."
      actionText="Go Back Home"
      actionLink="/"
    >
      <div className="text-center text-gray-400 text-sm mb-6">
        <p>Try checking the URL for typos or visit our:</p>
        <div className="flex flex-wrap gap-3 justify-center mt-3">
          <Link to="/services" className="text-primary-500 hover:text-primary-400 transition-colors">
            Services
          </Link>
          <span className="text-gray-600">|</span>
          <Link to="/blog" className="text-primary-500 hover:text-primary-400 transition-colors">
            Blog
          </Link>
          <span className="text-gray-600">|</span>
          <Link to="/contact" className="text-primary-500 hover:text-primary-400 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </ErrorLayout>
  );
};

export default NotFound;