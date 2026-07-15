import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorLayout from './ErrorLayout';

const Maintenance = () => {
  const [countdown, setCountdown] = useState(300); // 5 minutes

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <ErrorLayout
      code="503"
      icon="🔧"
      title="Under Maintenance"
      description="We're currently performing scheduled maintenance to improve your experience. We'll be back online shortly. Thank you for your patience!"
      actionText="Check Status"
      actionLink="/"
    >
      <div className="text-center mb-6">
        <div className="inline-block bg-primary-500/10 border border-primary-500/20 rounded-lg px-6 py-3">
          <p className="text-primary-400 font-mono text-2xl font-bold">
            {formatTime(countdown)}
          </p>
          <p className="text-gray-500 text-xs mt-1">Estimated completion time</p>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm">
        <p>Follow us for updates:</p>
        <div className="flex gap-4 justify-center mt-3">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
            aria-label="Follow on Twitter"
          >
            Twitter
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#0A66C2] transition-colors"
            aria-label="Follow on LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href="https://wa.me/2347061066372"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#25D366] transition-colors"
            aria-label="Chat on WhatsApp"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </ErrorLayout>
  );
};

export default Maintenance;