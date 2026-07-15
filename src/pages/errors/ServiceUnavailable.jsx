import React from 'react';
import { Link } from 'react-router-dom';
import ErrorLayout from './ErrorLayout';

const ServiceUnavailable = () => {
  return (
    <ErrorLayout
      code="503"
      icon="🔄"
      title="Service Temporarily Unavailable"
      description="One of our services is currently unavailable. We're working to restore it as quickly as possible. Please try again later."
      actionText="Go Back Home"
      actionLink="/"
      secondaryAction={{
        text: "Check Service Status",
        onClick: () => window.open('#', '_blank')
      }}
    >
      <div className="text-center text-gray-400 text-sm mb-6">
        <p>Affected services may include:</p>
        <div className="flex flex-wrap gap-2 justify-center mt-3">
          <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs">
            JAMB Registration
          </span>
          <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs">
            WAEC Services
          </span>
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
            Admission Processing
          </span>
        </div>
      </div>
    </ErrorLayout>
  );
};

export default ServiceUnavailable;