import React from 'react';
import { Link } from 'react-router-dom';
import ErrorLayout from './ErrorLayout';

const PaymentRequired = () => {
  return (
    <ErrorLayout
      code="402"
      icon="💳"
      title="Payment Required"
      description="This service requires a subscription or payment. Please complete your payment to access this content."
      actionText="Make Payment"
      actionLink="/register"
      secondaryAction={{
        text: "Contact Billing",
        onClick: () => window.location.href = '/contact'
      }}
    >
      <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Our plans start from</p>
            <p className="text-white text-2xl font-bold">₦25,000</p>
          </div>
          <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">What's included</p>
            <p className="text-gray-300 text-sm">✓ Full access to all services</p>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm">
        <p>Need help with payment?</p>
        <a
          href="https://wa.me/2347061066372"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:text-green-400 transition-colors block mt-1"
        >
          💬 Chat on WhatsApp
        </a>
      </div>
    </ErrorLayout>
  );
};

export default PaymentRequired;