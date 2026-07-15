import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ onChatTrigger }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-dark-100/50 backdrop-blur-md border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1 - Logo and Company Info */}
          <div className="text-center md:text-left">
            <Link to="/" className="inline-flex items-center justify-center md:justify-start space-x-3 group relative mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-1">
              <div className="relative flex items-center">
                <div className="bg-white rounded-2xl p-2 shadow-lg transition-all duration-300 group-hover:shadow-primary-500/30">
                  <img 
                    src="/jeods_logo1.jpg" 
                    alt="JEO Digital Solutions Logo" 
                    className="h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                    loading="lazy"
                    width="64"
                    height="64"
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-2 ring-primary-500/30 group-hover:ring-primary-500/60 transition-all duration-300 pointer-events-none"></div>
              </div>
              
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                    JEO
                  </span>
                  <span className="text-white group-hover:text-primary-500 transition-colors">
                    Digital
                  </span>
                </span>
                <span className="text-sm text-primary-500/80 hidden sm:block font-semibold leading-tight">Solutions</span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm mt-4 max-w-xs mx-auto md:mx-0 leading-relaxed">
              Transforming businesses through innovative technology solutions since 2020.
            </p>

            {/* Contact Info */}
            <div className="mt-4 space-y-2 text-sm">
              <a 
                href="mailto:hello@jeodigital.com"
                className="text-gray-400 hover:text-primary-500 transition-colors flex items-center justify-center md:justify-start gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
                aria-label="Email us"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@jeodigital.com
              </a>
              <a 
                href="tel:+2347061066372"
                className="text-gray-400 hover:text-primary-500 transition-colors flex items-center justify-center md:justify-start gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
                aria-label="Call us"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +234 706 106 6372
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
            <ul className="space-y-2.5 text-sm" role="list">
              <li><Link to="/" className="text-gray-300 hover:text-primary-500 transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-primary-500 transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">About</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-primary-500 transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">Services</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-primary-500 transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary-500 transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">Contact</Link></li>
            </ul>
          </div>
          
          {/* Column 3 - Services */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white mb-4">Our Services</h2>
            <ul className="space-y-2.5 text-sm" role="list">
              <li><Link to="/services" className="text-gray-300 hover:text-primary-500 transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">Web Development</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-primary-500 transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">Cloud Solutions</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-primary-500 transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">Mobile Apps</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-primary-500 transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">AI/ML Services</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-primary-500 transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">Cybersecurity</Link></li>
            </ul>
          </div>
          
          {/* Column 4 - Connect With Us */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white mb-4">Connect With Us</h2>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-4 mb-6">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#0A66C2] transition-all duration-300 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-2"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1DA1F2] transition-all duration-300 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-2"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#181717] transition-all duration-300 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-2"
                aria-label="View our GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FF0000] transition-all duration-300 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-2"
                aria-label="Subscribe to our YouTube channel"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            {/* ============================================================
               NEW: GET OUR MOBILE APP SECTION
               ============================================================ */}
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-3">Get Our Mobile App</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                {/* Google Play Store Button */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.jeodigital.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
                  aria-label="Download our app on Google Play"
                >
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    alt="Get it on Google Play"
                    className="h-12 w-auto"
                    loading="lazy"
                    width="200"
                    height="60"
                  />
                </a>

                {/* Apple App Store Button */}
                <a
                  href="https://apps.apple.com/app/jeo-digital/id123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
                  aria-label="Download our app on the App Store"
                >
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-12 w-auto"
                    loading="lazy"
                    width="200"
                    height="60"
                  />
                </a>
              </div>
            </div>
            {/* ============================================================
               END: GET OUR MOBILE APP SECTION
               ============================================================ */}

            {/* Chat Trigger Button - Opens Global Chatbot */}
            <button
              onClick={onChatTrigger}
              className="w-full max-w-xs mx-auto px-4 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center justify-center gap-2"
              aria-label="Open chat to talk with us"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chat with Us
            </button>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">Subscribe to our newsletter</p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-xs mx-auto">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '...' : 'Subscribe'}
                </button>
              </form>
              {subscribed && (
                <p className="text-green-500 text-sm mt-2" role="status">
                  ✓ Successfully subscribed!
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} JEO Digital Solutions. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link to="/privacy" className="text-gray-500 hover:text-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;