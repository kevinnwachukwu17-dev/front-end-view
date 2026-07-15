import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorLayout from './ErrorLayout';

const TooManyRequests = () => {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <ErrorLayout
      code="429"
      icon="🚦"
      title="Too Many Requests"
      description="You've made too many requests in a short period. Please wait a moment before trying again."
      actionText="Go Home"
      actionLink="/"
    >
      <div className="text-center mb-6">
        <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-6 py-3">
          <p className="text-yellow-400 font-mono text-2xl font-bold">
            {countdown}s
          </p>
          <p className="text-gray-500 text-xs mt-1">Please wait before trying again</p>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm">
        <p>While you wait:</p>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <Link to="/services" className="text-primary-500 hover:text-primary-400 transition-colors">
            Browse Our Services
          </Link>
          <span className="text-gray-600">|</span>
          <a
            href="https://wa.me/2347061066372"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-400 transition-colors"
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      </div>
    </ErrorLayout>
  );
};

export default TooManyRequests;