import React from 'react';
import { Link } from 'react-router-dom';
import ErrorLayout from './ErrorLayout';

const ServerError = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <ErrorLayout
      code="500"
      icon="⚙️"
      title="Something Went Wrong"
      description="We're experiencing some technical difficulties. Our team has been notified and is working on a fix. Please try again in a few minutes."
      actionText="Try Again"
      actionLink="/"
      secondaryAction={{
        text: "Refresh Page",
        onClick: handleRefresh
      }}
    >
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
        <p className="text-yellow-400 text-sm text-center">
          ⏳ <span className="font-semibold">Estimated fix time:</span> Our team is actively working on this issue.
        </p>
      </div>
      <div className="text-center text-gray-400 text-sm">
        <p>If this issue persists, please:</p>
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
          <Link to="/contact" className="text-primary-500 hover:text-primary-400 transition-colors">
            📧 Contact Support
          </Link>
        </div>
      </div>
    </ErrorLayout>
  );
};

export default ServerError;