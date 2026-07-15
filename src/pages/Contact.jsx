import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Constants
const CONSTANTS = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  MAX_MESSAGE_LENGTH: 1000,
  MIN_MESSAGE_LENGTH: 10,
  ANIMATION_DURATION: 0.5,
  CONTACT_EMAIL: 'hello@jeods.com',
  CONTACT_PHONE: '+2347061066372  |  813-1649230',
  CONTACT_PHONE_ALT: '+2347061066372',
};

// SVG Icons
const Icons = {
  Location: () => (
    <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Email: () => (
    <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  WhatsApp: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.125 1.523 5.865L0 24l6.352-1.648C8.13 23.48 10.05 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.842 0-3.586-.497-5.077-1.364l-.364-.207-3.77.977.977-3.674-.21-.365C4.422 15.63 3.929 13.89 3.929 12c0-4.456 3.615-8.071 8.071-8.071s8.071 3.615 8.071 8.071-3.615 8.071-8.071 8.071z"/>
    </svg>
  ),
};

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef(null);
  const nameInputRef = useRef(null);

  // Focus first input on mount
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Handle form submission with validation
  const onSubmit = useCallback(async (data) => {
    // Validate API URL
    if (!CONSTANTS.API_URL || CONSTANTS.API_URL === 'http://localhost:5000/api') {
      toast.error('API connection error. Please try again later.');
      return;
    }

    setLoading(true);
    setSubmitSuccess(false);

    try {
      const response = await axios.post(`${CONSTANTS.API_URL}/contact`, {
        ...data,
        subject: data.subject || 'General Inquiry',
        source: 'JEO Digital Website'
      });

      if (response.data.success) {
        toast.success('Message sent successfully! We\'ll get back to you within 24 hours.', {
          duration: 5000,
          icon: '✅'
        });
        setSubmitSuccess(true);
        reset();
        setMessageLength(0);
        
        // Reset success state after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error(response.data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      if (error.response) {
        // Server responded with error
        toast.error(error.response.data.message || 'Server error. Please try again.');
      } else if (error.request) {
        // Request made but no response
        toast.error('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        toast.error('Failed to send message. Please try again or call us directly.');
      }
    } finally {
      setLoading(false);
    }
  }, [reset]);

  // Handle message length tracking
  const handleMessageChange = useCallback((e) => {
    const length = e.target.value.length;
    setMessageLength(length);
  }, []);

  // Format phone number for display
  const formatPhone = (phone) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary-500 focus:text-white focus:p-4 focus:rounded-lg"
      >
        Skip to main content
      </a>

      <div id="main-content" className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions or ready to start your journey? We're here to help you achieve your educational and career goals.
          </p>
        </motion.div>

        {/* Quick Contact Options */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <a 
            href={`tel:+${CONSTANTS.CONTACT_PHONE}`}
            className="card text-center hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Call us"
          >
            <div className="text-3xl mb-2" aria-hidden="true">📞</div>
            <p className="text-sm font-semibold">Call Us</p>
            <p className="text-xs text-gray-400">{formatPhone(CONSTANTS.CONTACT_PHONE)}</p>
          </a>
          <a 
            href={`mailto:${CONSTANTS.CONTACT_EMAIL}`}
            className="card text-center hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Email us"
          >
            <div className="text-3xl mb-2" aria-hidden="true">📧</div>
            <p className="text-sm font-semibold">Email Us</p>
            <p className="text-xs text-gray-400">24/7 Support</p>
          </a>
          <a 
            href="https://wa.me/2347061066372" 
            target="_blank" 
            rel="noopener noreferrer"
            className="card text-center hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Chat on WhatsApp"
          >
            <div className="text-3xl mb-2" aria-hidden="true">💬</div>
            <p className="text-sm font-semibold">WhatsApp</p>
            <p className="text-xs text-gray-400">Fast Response</p>
          </a>
          <a 
            href="#" 
            className="card text-center hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Schedule appointment"
          >
            <div className="text-3xl mb-2" aria-hidden="true">📅</div>
            <p className="text-sm font-semibold">Book Appointment</p>
            <p className="text-xs text-gray-400">Schedule a Call</p>
          </a>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="card" role="complementary" aria-label="Contact information">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1" aria-hidden="true">
                    <Icons.Location />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Visit Us</p>
                    <p className="text-gray-300">No 1 Nicholas street, By Brass Junction, Aba, Abia State, Nigeria.</p>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-500 text-sm hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1" aria-hidden="true">
                    <Icons.Email />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Email Us</p>
                    <a 
                      href={`mailto:${CONSTANTS.CONTACT_EMAIL}`}
                      className="text-gray-300 hover:text-primary-400 transition-colors block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
                    >
                      {CONSTANTS.CONTACT_EMAIL}
                    </a>
                    <a 
                      href="mailto:support@jeodigital.com"
                      className="text-gray-300 hover:text-primary-400 transition-colors block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
                    >
                      support@jeodigital.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1" aria-hidden="true">
                    <Icons.Phone />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Call Us</p>
                    <a 
                      href={`tel:+${CONSTANTS.CONTACT_PHONE}`}
                      className="text-gray-300 hover:text-primary-400 transition-colors block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
                    >
                      {formatPhone(CONSTANTS.CONTACT_PHONE)}
                    </a>
                    <a 
                      href={`tel:+${CONSTANTS.CONTACT_PHONE_ALT}`}
                      className="text-gray-300 hover:text-primary-400 transition-colors block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
                    >
                      {formatPhone(CONSTANTS.CONTACT_PHONE_ALT)}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card" role="complementary" aria-label="Business hours">
              <h3 className="text-2xl font-semibold mb-4">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1" aria-hidden="true">
                    <Icons.Clock />
                  </div>
                  <div className="flex-1 space-y-2 text-gray-300">
                    <div className="flex justify-between items-center">
                      <span>Monday - Friday:</span>
                      <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Saturday:</span>
                      <span className="text-white font-medium">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Sunday:</span>
                      <span className="text-white font-medium">Closed</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400">
                    <span className="text-primary-500">📌</span> Emergency support available 24/7 via WhatsApp
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="card">
              <h3 className="text-2xl font-semibold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Follow us on Facebook"
                >
                  <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Connect with us on LinkedIn"
                >
                  <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card"
            role="form"
            aria-label="Contact form"
          >
            <form 
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-6"
              noValidate
            >
              <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
              <p className="text-sm text-gray-400 mb-6">
                Fill in the form below and we'll get back to you within 24 hours.
              </p>

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name <span className="text-primary-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  ref={nameInputRef}
                  {...register('name', { 
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    },
                    maxLength: {
                      value: 100,
                      message: 'Name must be less than 100 characters'
                    }
                  })}
                  className={`input-field ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="John Doe"
                  aria-required="true"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-400 text-sm mt-1" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address <span className="text-primary-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  {...register('email', { 
                    required: 'Email address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  type="email"
                  className={`input-field ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="john@example.com"
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  autoComplete="email"
                />
                {errors.email && (
                  <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  {...register('subject', {
                    maxLength: {
                      value: 200,
                      message: 'Subject must be less than 200 characters'
                    }
                  })}
                  className={`input-field ${errors.subject ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="How can we help you?"
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && (
                  <p id="subject-error" className="text-red-400 text-sm mt-1" role="alert">
                    {errors.subject.message}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message <span className="text-primary-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  {...register('message', { 
                    required: 'Message is required',
                    minLength: {
                      value: CONSTANTS.MIN_MESSAGE_LENGTH,
                      message: `Message must be at least ${CONSTANTS.MIN_MESSAGE_LENGTH} characters`
                    },
                    maxLength: {
                      value: CONSTANTS.MAX_MESSAGE_LENGTH,
                      message: `Message must be less than ${CONSTANTS.MAX_MESSAGE_LENGTH} characters`
                    }
                  })}
                  rows="5"
                  className={`input-field ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Tell us about your project or inquiry..."
                  aria-required="true"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : 'message-counter'}
                  onChange={handleMessageChange}
                />
                <div className="flex justify-between mt-1">
                  {errors.message ? (
                    <p id="message-error" className="text-red-400 text-sm" role="alert">
                      {errors.message.message}
                    </p>
                  ) : (
                    <p id="message-counter" className="text-gray-500 text-sm">
                      {messageLength} / {CONSTANTS.MAX_MESSAGE_LENGTH} characters
                    </p>
                  )}
                </div>
              </div>

              {/* Form validation summary */}
              {Object.keys(errors).length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3" role="alert">
                  <p className="text-red-400 text-sm">
                    Please fix the errors above before submitting.
                  </p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="btn-primary w-full relative focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={loading ? 'Sending message...' : 'Send message'}
              >
                {loading || isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {/* Success message */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <p className="text-green-400 text-sm">
                      ✅ Message sent successfully! We'll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Map Section - Optional */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12"
        >
          <div className="card p-0 overflow-hidden">
            <div className="relative w-full h-64 md:h-96 bg-gray-800 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-lg font-semibold text-white">Find Us Here</p>
                <p className="text-sm">No 1 Nicholas street, By Brass Junction, Aba, Abia State, Nigeria.</p>
                <a 
                  href="https://maps.app.goo.gl/Uvi2ZS4gchC3ZMDZ6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-primary-500 hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-4 py-2"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12"
        >
          <h3 className="text-2xl font-semibold text-center mb-6">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h4 className="font-semibold text-white mb-2">How quickly do you respond?</h4>
              <p className="text-gray-400 text-sm">We typically respond within 24 hours during business days. For urgent inquiries, please call us directly.</p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-white mb-2">Do you offer free consultations?</h4>
              <p className="text-gray-400 text-sm">Yes! We offer a free 15-minute consultation to understand your needs and discuss how we can help.</p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-white mb-2">What services do you offer?</h4>
              <p className="text-gray-400 text-sm">We offer educational services including JAMB/WAEC preparation, admission processing, computer training, and more.</p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-white mb-2">Do you have physical offices?</h4>
              <p className="text-gray-400 text-sm">Yes, we have offices in multiple locations. Check our address above or contact us for directions.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;