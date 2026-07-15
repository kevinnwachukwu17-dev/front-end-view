import React from 'react';
import { Link } from 'react-router-dom';
import ErrorLayout from './ErrorLayout';

const Forbidden = () => {
  return (
    <ErrorLayout
      code="403"
      icon="🚫"
      title="Access Denied"
      description="Sorry, you don't have permission to access this page. This area is restricted to authorized users only."
      actionText="Go Back Home"
      actionLink="/"
      secondaryAction={{
        text: "Contact Support",
        onClick: () => window.location.href = '/contact'
      }}
    >
      <div className="text-center text-gray-400 text-sm">
        <p>If you believe this is a mistake, please:</p>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <a
            href="https://wa.me/2347061066372"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-400 transition-colors"
          >
            💬 Chat on WhatsApp
          </a>
          <span className="text-gray-600">|</span>
          <Link to="/login" className="text-primary-500 hover:text-primary-400 transition-colors">
            🔑 Log In
          </Link>
        </div>
      </div>
    </ErrorLayout>
  );
};

export default Forbidden;