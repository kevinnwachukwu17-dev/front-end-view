import React from 'react';
import { Link } from 'react-router-dom';
import ErrorLayout from './ErrorLayout';

const TimeoutError = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <ErrorLayout
      code="408"
      icon="⏰"
      title="Request Timeout"
      description="The request took too long to complete. This could be due to a slow network connection or server overload."
      actionText="Try Again"
      actionLink="/"
      secondaryAction={{
        text: "Retry Request",
        onClick: handleRetry
      }}
    >
      <div className="text-center text-gray-400 text-sm">
        <p>Tips to resolve this:</p>
        <ul className="text-left max-w-xs mx-auto mt-3 space-y-1 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-primary-500">•</span>
            Check your internet connection
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary-500">•</span>
            Try again in a few minutes
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary-500">•</span>
            Contact support if issue persists
          </li>
        </ul>
      </div>
    </ErrorLayout>
  );
};

export default TimeoutError;