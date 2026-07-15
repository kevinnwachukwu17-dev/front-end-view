import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorLayout from './ErrorLayout';

const NetworkError = () => {
  const [checking, setChecking] = useState(false);

  const checkConnection = () => {
    setChecking(true);
    fetch('/api/health')
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setChecking(false);
        alert('Still unable to connect. Please check your internet connection.');
      });
  };

  return (
    <ErrorLayout
      icon="📡"
      title="Network Connection Error"
      description="We're having trouble connecting to our servers. This could be due to your internet connection or a temporary server issue."
      actionText="Check Connection"
      actionLink="/"
      secondaryAction={{
        text: checking ? 'Checking...' : 'Retry Connection',
        onClick: checkConnection
      }}
    >
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
        <ul className="text-yellow-400 text-sm space-y-1">
          <li>✓ Check your internet connection</li>
          <li>✓ Disable VPN or proxy if active</li>
          <li>✓ Try refreshing the page</li>
        </ul>
      </div>
      <div className="text-center text-gray-400 text-sm">
        <p>Need immediate assistance?</p>
        <a
          href="tel:+2347061066372"
          className="text-primary-500 hover:text-primary-400 transition-colors block mt-1"
        >
          📞 Call us: +234 706 106 6372
        </a>
      </div>
    </ErrorLayout>
  );
};

export default NetworkError;