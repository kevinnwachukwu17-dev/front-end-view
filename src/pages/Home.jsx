import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

// Import error handler
import { handleApiError } from '../utils/errorHandler';

// Import all card images directly
import examinationRegImg from '../assets/home_cards_imgs/examination-registrations.jpg';
import jambRunsImg from '../assets/home_cards_imgs/jamb-runs.jpg';
import admissionProcessingImg from '../assets/home_cards_imgs/admission-processing.jpg';
import computerTrainingImg from '../assets/home_cards_imgs/computer-training.jpg';
import generalComputerImg from '../assets/home_cards_imgs/general-computer-services.jpg';
import lessonCoachingImg from '../assets/home_cards_imgs/lesson-coaching.jpg';
import webDevelopmentImg from '../assets/home_cards_imgs/web-development.jpg';
import cloudSolutionsImg from '../assets/home_cards_imgs/cloud-solutions.jpg';
import mobileDevelopmentImg from '../assets/home_cards_imgs/mobile-development.jpg';
import aiMlImg from '../assets/home_cards_imgs/ai-ml.jpg';
import cybersecurityImg from '../assets/home_cards_imgs/cybersecurity.jpg';
import digitalAnalyticsImg from '../assets/home_cards_imgs/digital-analytics.jpg';
import ieltsImg from '../assets/home_cards_imgs/ielts-Img.jpg';
import celpipImg from '../assets/home_cards_imgs/celpip-Img.jpg';
import uxuiImg from '../assets/home_cards_imgs/uxui-Img.jpg';

// Import testimonial images - using fewer for performance
import testimonialImg1 from '../assets/testimony_imgs/testimonyImg1.jpg';
import testimonialImg2 from '../assets/testimony_imgs/testimonyImg2.jpg';
import testimonialImg3 from '../assets/testimony_imgs/testimonyImg3.jpg';
import testimonialImg4 from '../assets/testimony_imgs/testimonyImg4.jpg';

// Import Team members images
import teamImg1 from '../assets/team_members_imgs/teamImg1.jpg';
import teamImg2 from '../assets/team_members_imgs/teamImg2.jpg';
import teamImg3 from '../assets/team_members_imgs/teamImg3.jpg';
import teamImg4 from '../assets/team_members_imgs/teamImg4.jpg';
import teamImg5 from '../assets/team_members_imgs/teamImg5.jpg';
import teamImg6 from '../assets/team_members_imgs/teamImg6.jpg';
import teamImg7 from '../assets/team_members_imgs/teamImg7.jpg';
import teamImg8 from '../assets/team_members_imgs/teamImg8.jpg';

// Constants
const CONSTANTS = {
  PHONE_NUMBER: '2347061066372',
  COUNTER_DURATION: 2000,
  CARDS_TO_SHOW: 2,
  MAX_TESTIMONIALS: 8,
  ANIMATION_DURATION: 0.3,
};

// Service Categories
const SERVICE_CATEGORIES = {
  EXAMINATION: ['WAEC | NECO | JAMB  | GCE', 'JAMB "RUNS" | PROCESSING', 'JAMB | WAEC INTENSIVE LESSONS & COACHING', 'IELTS', 'CELPIP'],
  ADMISSION: ['UNIPORT | AFE BABALOLA | ABSU | UNICAL ADMISSION PROCESSING'],
  TECHNOLOGY: ['Web Development', 'Cloud Solutions', 'Mobile Development', 'AI & Machine Learning', 'Cybersecurity', 'Digital Analytics', 'UX/UI DESIGN'],
  COMPUTER: ['COMPUTER TRAINING | PROGRAMMING', 'GENERAL COMPUTER SERVICES']
};

// Enhanced Service Card Component// Enhanced Service Card Component
const ServiceCard = React.memo(({ service, onWhatsApp, onPhoneCall, onRegister, onQuickEnquiry }) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getAltText = useCallback((title) => {
    const altMap = {
      'WAEC | NECO | JAMB  | GCE': 'WAEC, NECO, JAMB and GCE examination registration service',
      'JAMB "RUNS" | PROCESSING': 'JAMB accurate processing and CBT training service',
      'WAEC | NECO | JAMB INTENSIVE LESSONS & COACHING': 'Intensive coaching for WAEC, NECO, and JAMB',
      'UNIPORT | AFE BABALOLA | ABSU | UNICAL ADMISSION PROCESSING': 'University admission processing',
      'GENERAL COMPUTER SERVICES': 'General computer services including printing, typing, and scanning',
      'COMPUTER TRAINING | PROGRAMMING': 'Computer training and programming courses',
      'Web Development': 'Web development services',
      'Cloud Solutions': 'Cloud solutions and DevOps services',
      'Mobile Development': 'Mobile app development',
      'AI & Machine Learning': 'Artificial Intelligence and Machine Learning',
      'Cybersecurity': 'Cybersecurity services',
      'Digital Analytics': 'Digital analytics and business intelligence',
      'IELTS': 'IELTS preparation class',
      'CELPIP': 'CELPIP preparation class',
      'UX/UI DESIGN': 'UI/UX design services'
    };
    return altMap[title] || `${title} service offered by JEO Digital Solutions`;
  }, []);

  const getCategory = useCallback((title) => {
    if (SERVICE_CATEGORIES.EXAMINATION.includes(title)) return 'Examination';
    if (SERVICE_CATEGORIES.ADMISSION.includes(title)) return 'Admission';
    if (SERVICE_CATEGORIES.TECHNOLOGY.includes(title)) return 'Technology';
    if (SERVICE_CATEGORIES.COMPUTER.includes(title)) return 'Computer Training';
    return 'Other';
  }, []);

  const getPopularity = useCallback((title) => {
    const popular = ['WAEC | NECO | JAMB  | GCE', 'JAMB "RUNS" | PROCESSING', 'Web Development', 'COMPUTER TRAINING | PROGRAMMING', 'IELTS'];
    return popular.includes(title) ? '⭐ Popular' : '';
  }, []);

  const getPriceRange = useCallback((title) => {
    const prices = {
      'WAEC | NECO | JAMB  | GCE': '₦50,000',
      'JAMB "RUNS" | PROCESSING': '₦50,000 - ₦100,000',
      'JAMB | WAEC INTENSIVE LESSONS & COACHING': '₦50,000 - ₦80,000',
      'UNIPORT | AFE BABALOLA | ABSU | UNICAL ADMISSION PROCESSING': '₦40,000 - ₦60,000',
      'GENERAL COMPUTER SERVICES': 'Pay-per-service',
      'COMPUTER TRAINING | PROGRAMMING': '₦25,000 - ₦100,000',
      'Web Development': '₦150,000',
      'Cloud Solutions': '₦200,000',
      'Mobile Development': '₦180,000',
      'AI & Machine Learning': '₦250,000',
      'Cybersecurity': '₦220,000',
      'Digital Analytics': '₦120,000',
      'IELTS': '₦80,000',
      'CELPIP': '₦85,000',
      'UX/UI DESIGN': '₦140,000'
    };
    return prices[title] || 'Contact for pricing';
  }, []);

  const getDuration = useCallback((title) => {
    const durations = {
      'WAEC | NECO | JAMB  | GCE': '8 weeks',
      'JAMB "RUNS" | PROCESSING': '3-6 months',
      'JAMB | WAEC INTENSIVE LESSONS & COACHING': '6-12 weeks',
      'UNIPORT | AFE BABALOLA | ABSU | UNICAL ADMISSION PROCESSING': '1-3 months',
      'GENERAL COMPUTER SERVICES': 'On-demand',
      'COMPUTER TRAINING | PROGRAMMING': '4-12 weeks',
      'Web Development': '12 weeks',
      'Cloud Solutions': '10 weeks',
      'Mobile Development': '10 weeks',
      'AI & Machine Learning': '14 weeks',
      'Cybersecurity': '12 weeks',
      'Digital Analytics': '8 weeks',
      'IELTS': '6 weeks',
      'CELPIP': '6 weeks',
      'UX/UI DESIGN': '10 weeks'
    };
    return durations[title] || 'Contact for details';
  }, []);

  const category = getCategory(service.title);
  const popularity = getPopularity(service.title);
  const priceRange = getPriceRange(service.title);
  const duration = getDuration(service.title);

  // Check if this is the IELTS service
  const isIeltsService = service.title === 'IELTS';

  // Keyboard event handler for closing modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  const getCourseDetails = useCallback((title) => {
    const detailsMap = {
      'Web Development': {
        features: [
          'Full-Stack Web Development (MERN Stack)',
          'HTML5, CSS3, JavaScript (ES6+)',
          'React.js & Next.js Framework',
          'Node.js & Express Backend',
          'MongoDB & PostgreSQL Databases',
          'RESTful API Development',
          'Git & Version Control',
          'Deployment (Vercel, Netlify, AWS)',
          'Portfolio Development',
          'Job Placement Assistance'
        ],
        mode: 'Online & Physical',
        duration: '12 weeks',
        certification: 'Yes',
        amount: '₦150,000',
        schedule: 'Weekdays (Mon, Wed, Fri) 6PM - 8PM',
        requirements: 'Basic computer knowledge, Laptop required',
        includes: 'Certificate, Course Materials, Mentorship, Project Support'
      },
      'Cloud Solutions': {
        features: [
          'AWS Solutions Architect',
          'Microsoft Azure Administration',
          'Google Cloud Engineer',
          'Cloud Security Best Practices',
          'DevOps Practices & CI/CD',
          'Infrastructure as Code (Terraform)',
          'Serverless Computing',
          'Container Orchestration (Docker, Kubernetes)',
          'Cloud Migration Strategies',
          'Cost Management & Optimization'
        ],
        mode: 'Online',
        duration: '10 weeks',
        certification: 'Yes',
        amount: '₦200,000',
        schedule: 'Weekends (Sat & Sun) 10AM - 2PM',
        requirements: 'Basic IT knowledge, Laptop with 8GB+ RAM',
        includes: 'Cloud Lab Access, Certification Voucher, Project Files'
      },
      'Mobile Development': {
        features: [
          'React Native Fundamentals',
          'iOS & Android App Development',
          'Flutter Framework',
          'UI/UX for Mobile',
          'App Store & Play Store Deployment',
          'Push Notifications',
          'In-App Purchases',
          'Firebase Integration',
          'Offline-First Apps',
          'Real-World Projects'
        ],
        mode: 'Online & Hybrid',
        duration: '10 weeks',
        certification: 'Yes',
        amount: '₦180,000',
        schedule: 'Weekdays (Tue & Thu) 6PM - 8PM',
        requirements: 'JavaScript knowledge',
        includes: 'App Templates, Developer Account Guidance'
      },
      'AI & Machine Learning': {
        features: [
          'Python Programming',
          'Data Science Fundamentals',
          'Machine Learning Algorithms',
          'Deep Learning with TensorFlow',
          'Computer Vision',
          'Natural Language Processing (NLP)',
          'Data Visualization',
          'Pandas & NumPy Mastery',
          'Model Deployment',
          'AI Ethics & Best Practices'
        ],
        mode: 'Online',
        duration: '14 weeks',
        certification: 'Yes',
        amount: '₦250,000',
        schedule: 'Weekends (Sat) 9AM - 3PM',
        requirements: 'Basic Python knowledge',
        includes: 'GPU Access, Kaggle Competitions'
      },
      'Cybersecurity': {
        features: [
          'Network Security Fundamentals',
          'Ethical Hacking',
          'Penetration Testing',
          'Security Auditing',
          'Compliance (GDPR, HIPAA, PCI-DSS)',
          'Cryptography Basics',
          'Incident Response',
          'Cloud Security',
          'Vulnerability Assessment'
        ],
        mode: 'Online',
        duration: '12 weeks',
        certification: 'Yes',
        amount: '₦220,000',
        schedule: 'Weekdays (Mon, Wed, Fri) 7PM - 9PM',
        requirements: 'Networking basics',
        includes: 'Virtual Lab Access, Security Tools'
      },
      'Digital Analytics': {
        features: [
          'Business Intelligence',
          'Data Visualization',
          'Google Analytics 4 (GA4)',
          'SQL for Data Analysis',
          'Tableau & Power BI',
          'Data Storytelling',
          'A/B Testing',
          'Conversion Rate Optimization'
        ],
        mode: 'Online',
        duration: '8 weeks',
        certification: 'Yes',
        amount: '₦120,000',
        schedule: 'Weekends (Sun) 1PM - 5PM',
        requirements: 'Excel knowledge',
        includes: 'Analytics Tools License, Real Data Projects'
      },
      'IELTS': {
        features: [
          'Complete IELTS Preparation',
          'Listening Strategies',
          'Reading Comprehension',
          'Writing Task 1 & 2 Mastery',
          'Speaking Practice',
          'Mock Tests & Assessments',
          'Vocabulary Building',
          'Grammar Enhancement'
        ],
        mode: 'Online & Physical',
        duration: '6 weeks',
        certification: 'Yes',
        amount: '₦80,000',
        schedule: 'Weekends (Sat & Sun) 9AM - 1PM',
        requirements: 'Intermediate English level',
        includes: 'Study Materials, Practice Tests'
      },
      'CELPIP': {
        features: [
          'Complete CELPIP Preparation',
          'Listening Core & Pro',
          'Reading Core & Pro',
          'Writing Core & Pro',
          'Speaking Core & Pro',
          'Mock Exams',
          'Canadian English Focus',
          'One-on-One Tutoring'
        ],
        mode: 'Online',
        duration: '6 weeks',
        certification: 'Yes',
        amount: '₦85,000',
        schedule: 'Weekdays (Tue & Thu) 7PM - 9PM',
        requirements: 'Intermediate English level',
        includes: 'Digital Materials, Mock Tests'
      },
      'UX/UI DESIGN': {
        features: [
          'Design Thinking Methodology',
          'User Research & Personas',
          'Wireframing & Prototyping',
          'Figma Mastery',
          'Adobe XD Fundamentals',
          'Visual Design Principles',
          'Interaction Design',
          'Usability Testing'
        ],
        mode: 'Online & Physical',
        duration: '10 weeks',
        certification: 'Yes',
        amount: '₦140,000',
        schedule: 'Weekends (Sat) 10AM - 4PM',
        requirements: 'Creative mindset',
        includes: 'Design Software Access, Portfolio Review'
      },
      'WAEC | NECO | JAMB  | GCE': {
        features: [
          'Comprehensive Subject Coverage',
          'Past Questions & Answers',
          'Mock Examinations',
          'Study Tips & Techniques',
          'Time Management Strategies',
          'Subject-Specific Coaching'
        ],
        mode: 'Online & Physical',
        duration: '8 weeks',
        certification: 'Yes',
        amount: '₦50,000',
        schedule: 'Weekends (Sat) 9AM - 2PM',
        requirements: 'Secondary school student',
        includes: 'Study Materials, Past Questions'
      },
      'COMPUTER TRAINING | PROGRAMMING': {
        features: [
          'Basic Computing',
          'Microsoft Office Suite',
          'Internet & Email Skills',
          'Web Design Fundamentals',
          'Programming Basics',
          'Certificate Issuance'
        ],
        mode: 'Online & Physical',
        duration: '4-12 weeks',
        certification: 'Yes',
        amount: '₦25,000 - ₦100,000',
        schedule: 'Flexible schedule',
        requirements: 'No prior experience needed',
        includes: 'Course Materials, Certificate'
      },
      'GENERAL COMPUTER SERVICES': {
        features: [
          'Professional Printing Services',
          'Typing & Document Processing',
          'Scanning & Digitization',
          'Online Services & Registration',
          'Document Binding & Lamination',
          'Photocopying Services'
        ],
        mode: 'Physical',
        duration: 'On-demand',
        certification: 'N/A',
        amount: 'Pay-per-service',
        schedule: 'Mon-Sat 8AM - 6PM',
        requirements: 'None',
        includes: 'Quality service delivery'
      },
      'JAMB "RUNS" | PROCESSING': {
        features: [
          'SCORE 300+ in one sitting',
          'Reliable Results',
          'Expert Guidance',
          '24/7 Support',
          'CBT Training',
          'Past Questions & Answers'
        ],
        mode: 'Online & Physical',
        duration: '3-6 months',
        certification: 'Yes',
        amount: '₦50,000 - ₦100,000',
        schedule: 'Flexible',
        requirements: 'JAMB registration',
        includes: 'Training materials, CBT practice'
      },
      'UNIPORT | AFE BABALOLA | ABSU | UNICAL ADMISSION PROCESSING': {
        features: [
          'Post UTME Processing',
          'Supplementary Admission',
          'Direct Entry Processing',
          'Course Selection Guidance',
          'Document Verification',
          'Admission Follow-up'
        ],
        mode: 'Online & Physical',
        duration: '1-3 months',
        certification: 'Yes',
        amount: '₦40,000 - ₦60,000',
        schedule: 'Flexible',
        requirements: 'Valid JAMB result',
        includes: 'Full admission processing'
      },
      'JAMB | WAEC INTENSIVE LESSONS & COACHING': {
        features: [
          'Private Lessons',
          'JAMB CBT Prep',
          'Exam Prep',
          'Project/Thesis Coaching',
          'Subject-Specific Tutoring',
          'Mock Tests & Assessments'
        ],
        mode: 'Online & Physical',
        duration: '6-12 weeks',
        certification: 'Yes',
        amount: '₦50,000 - ₦80,000',
        schedule: 'Flexible schedule',
        requirements: 'Secondary school student',
        includes: 'Study Materials, Practice Tests, One-on-One Support'
      }
    };
    
    return detailsMap[title] || {
      features: service.features || ['Professional Service', 'Expert Guidance', 'Quality Delivery', 'Customer Support'],
      mode: 'Online & Physical',
      duration: 'Contact us',
      certification: 'Yes',
      amount: 'Contact for pricing',
      schedule: 'Flexible schedule',
      requirements: 'Contact for details',
      includes: 'Certificate, Materials, Support'
    };
  }, [service.features]);

  const details = getCourseDetails(service.title);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`card group cursor-pointer flex flex-col h-full items-center text-center relative overflow-hidden ${service.highlight ? 'border-primary-500/30 bg-gradient-to-br from-primary-500/5 to-transparent' : ''}`}
        role="article"
        aria-label={`Service: ${service.title}`}
      >
        {/* Popular Badge */}
        {popularity && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
              {popularity}
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-primary-500/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        <div className="flex-grow w-full pt-8">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 p-3 shadow-lg">
              <div className="rounded-full bg-white p-2">
                <img 
                  src={service.image} 
                  alt={getAltText(service.title)}
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  width="160"
                  height="160"
                />
              </div>
            </div>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 group-hover:text-primary-500 transition-colors text-center px-2">
            {service.title}
          </h3>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap gap-2 justify-center mb-3 px-2">
            <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
              💰 {priceRange}
            </span>
            <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
              ⏱️ {duration}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center mb-6 px-2">
            {(service.features || details.features).slice(0, 4).map((feature, idx) => (
              <span 
                key={idx} 
                className="text-xs sm:text-sm bg-primary-500/20 text-primary-300 px-3 py-1.5 rounded-full border border-primary-500/30"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10 w-full px-2">
          <div className="flex gap-3 w-full">
            <button
              onClick={() => onRegister(service.title)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Register for ${service.title}`}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Register
            </button>
            
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label={`View details for ${service.title}`}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Details
            </button>
          </div>
          
          {/* IELTS "Learn More" Link - Only shows for IELTS service */}
          {isIeltsService && (
            <Link 
              to="/ielts" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-3 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg hover:shadow-purple-500/30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Learn More About IELTS
            </Link>
          )}
          
          {/* Quick Enquiry Button */}
          <button
            onClick={() => onQuickEnquiry(service)}
            className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 px-3 py-1.5 rounded-lg transition-all duration-200 text-xs font-semibold border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label={`Quick enquiry for ${service.title}`}
          >
            📧 Quick Enquiry
          </button>
        </div>
      </motion.div>

      {/* Modal with Accessibility */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setShowModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-100 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 p-6 border-b border-white/10">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white p-2 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                        width="64"
                        height="64"
                      />
                    </div>
                    <div>
                      <h2 id="modal-title" className="text-2xl font-bold text-white">{service.title}</h2>
                      <p className="text-gray-400 text-sm mt-1">Professional Training Program</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                          💰 {priceRange}
                        </span>
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                          ⏱️ {duration}
                        </span>
                        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                          {category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-1"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Features Section */}
                <div>
                  <h3 className="text-lg font-semibold text-primary-400 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    What You'll Learn
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {details.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="text-primary-500" aria-hidden="true">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>Learning Mode</span>
                    </div>
                    <p className="text-white font-medium">{details.mode}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Duration</span>
                    </div>
                    <p className="text-white font-medium">{details.duration}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Certification</span>
                    </div>
                    <p className="text-white font-medium">{details.certification}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Investment</span>
                    </div>
                    <p className="text-white font-bold text-xl">{details.amount}</p>
                  </div>
                </div>

                {/* Schedule & Requirements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-primary-500/10 rounded-xl p-4 border border-primary-500/20">
                    <h4 className="text-primary-400 font-semibold mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Schedule
                    </h4>
                    <p className="text-gray-300 text-sm">{details.schedule}</p>
                  </div>

                  <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                    <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Requirements
                    </h4>
                    <p className="text-gray-300 text-sm">{details.requirements}</p>
                  </div>
                </div>

                {/* What's Included */}
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                  <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    What's Included
                  </h4>
                  <p className="text-gray-300 text-sm">{details.includes}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      onWhatsApp(service.title);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.125 1.523 5.865L0 24l6.352-1.648C8.13 23.48 10.05 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.842 0-3.586-.497-5.077-1.364l-.364-.207-3.77.977.977-3.674-.21-.365C4.422 15.63 3.929 13.89 3.929 12c0-4.456 3.615-8.071 8.071-8.071s8.071 3.615 8.071 8.071-3.615 8.071-8.071 8.071z"/>
                    </svg>
                    Chat on WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      onPhoneCall();
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    Call Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

ServiceCard.displayName = 'ServiceCard';

// Testimonial Carousel Component
const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = useMemo(() => [
    { id: 1, name: "Oluwaseun Adebayo", course: "JAMB Preparation", testimony: "JEO Digital Solutions helped me score 287 in JAMB! Their CBT training was exceptional.", image: testimonialImg1, rating: 5 },
    { id: 2, name: "Chiamaka Nwosu", course: "WAEC Registration", testimony: "I passed all my WAEC subjects with flying colors thanks to their intensive coaching.", image: testimonialImg2, rating: 5 },
    { id: 3, name: "Emmanuel Okafor", course: "Admission Processing", testimony: "They secured my admission into UNIPORT within weeks. Highly recommended!", image: testimonialImg3, rating: 5 },
    { id: 4, name: "Fatima Bello", course: "Computer Training", testimony: "I learned web development in just 3 months. Now I'm working as a freelance developer.", image: testimonialImg4, rating: 4 }
  ], []);

  const cardsToShow = 2;
  const maxIndex = Math.max(0, testimonials.length - cardsToShow);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex, isPaused]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <section 
      id="testimonials-section" 
      className="py-20 px-4 bg-gradient-to-b from-transparent to-white/5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            What Our Students Say
          </h2>
          <p className="text-gray-400 mt-2">Real stories from real students who achieved their dreams with us</p>
        </motion.div>

        <div className="relative">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              currentIndex === 0
                ? 'bg-white/10 text-gray-500 cursor-not-allowed opacity-50'
                : 'bg-primary-500 text-white hover:bg-primary-600 hover:scale-110 shadow-lg'
            }`}
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * 540}px)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-gradient-to-br from-dark-100/80 to-dark-200/50 rounded-3xl p-8 border border-white/10 backdrop-blur-sm mx-5"
                  style={{ width: '500px', minWidth: '500px' }}
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary-500/50">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        loading="lazy"
                        width="128"
                        height="128"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center">{testimonial.name}</h3>
                  <p className="text-primary-500 text-center mb-3">{testimonial.course}</p>
                  <div className="flex justify-center gap-1 mb-4">
                    <span className="text-yellow-500" role="img" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                      {renderStars(testimonial.rating)}
                    </span>
                  </div>
                  <p className="text-gray-300 text-center italic">"{testimonial.testimony}"</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              currentIndex >= maxIndex
                ? 'bg-white/10 text-gray-500 cursor-not-allowed opacity-50'
                : 'bg-primary-500 text-white hover:bg-primary-600 hover:scale-110 shadow-lg'
            }`}
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// Team Carousel Component
const TeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const teamMembers = useMemo(() => [
    { 
      id: 1, 
      name: "Chief Justice Ekwueme O.", 
      position: "CEO/Director", 
      location: "", 
      image: teamImg1,
      linkedin: "https://linkedin.com/in/username",
      github: "https://github.com/username",
      email: "mailto:email@example.com"
    },
    { 
      id: 2, 
      name: "Effiong, Hoska", 
      position: "Full Stack Software Engineer", 
      location: "", 
      image: teamImg2,
      linkedin: "https://linkedin.com/in/hoskaeffiong",
      github: "https://github.com/dxicthub",
      email: "mailto:hoskadavid@gmail.com"
    },
    { 
      id: 3, 
      name: "Clement Abigail", 
      position: "Secretary/Analyst", 
      location: "", 
      image: teamImg3,
      linkedin: "https://linkedin.com/in/username",
      github: "https://github.com/username",
      email: "mailto:email@example.com"
    },
    { 
      id: 4, 
      name: "Mr Obasi Ukaegbu", 
      position: "Mathematics/Physics Teacher", 
      location: "", 
      image: teamImg4,
      linkedin: "https://linkedin.com/in/username",
      github: "https://github.com/username",
      email: "mailto:email@example.com"
    },
    { 
      id: 5, 
      name: "Name withheld", 
      position: "Position withheld", 
      location: "", 
      image: teamImg5,
      linkedin: "#",
      github: "#",
      email: "#"
    },
    { 
      id: 6, 
      name: "Name withheld", 
      position: "Position withheld", 
      location: "", 
      image: teamImg6,
      linkedin: "#",
      github: "#",
      email: "#"
    },
    { 
      id: 7, 
      name: "Name withheld", 
      position: "Position withheld", 
      location: "", 
      image: teamImg7,
      linkedin: "#",
      github: "#",
      email: "#"
    },
    { 
      id: 8, 
      name: "Name withheld", 
      position: "Position withheld", 
      location: "", 
      image: teamImg8,
      linkedin: "#",
      github: "#",
      email: "#"
    }
  ], []);

  const cardsToShow = 2;
  const maxIndex = Math.max(0, teamMembers.length - cardsToShow);

  const handlePrev = useCallback(() => setCurrentIndex(prev => Math.max(0, prev - 1)), []);
  const handleNext = useCallback(() => setCurrentIndex(prev => Math.min(maxIndex, prev + 1)), [maxIndex]);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Meet Our Expert Team</h2>
          <p className="text-gray-400 mt-2">Dedicated professionals committed to your success</p>
        </motion.div>

        <div className="relative">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              currentIndex === 0
                ? 'bg-white/10 text-gray-500 cursor-not-allowed opacity-50'
                : 'bg-primary-500 text-white hover:bg-primary-600 hover:scale-110 shadow-lg'
            }`}
            aria-label="Previous team member"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * 540}px)` }}
            >
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-gradient-to-br from-dark-100/80 to-dark-200/50 rounded-3xl p-8 border border-white/10 backdrop-blur-sm mx-5 text-center"
                  style={{ width: '500px', minWidth: '500px' }}
                >
                  <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary-500/50">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      loading="lazy"
                      width="192"
                      height="192"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-primary-500 mb-2">{member.position}</p>
                  <p className="text-gray-400 mb-4">{member.location}</p>
                  
                  {/* Social Icons */}
                  <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-white/10">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      href={member.email}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-300 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-red-400 rounded-full p-1"
                      aria-label={`Email ${member.name}`}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              currentIndex >= maxIndex
                ? 'bg-white/10 text-gray-500 cursor-not-allowed opacity-50'
                : 'bg-primary-500 text-white hover:bg-primary-600 hover:scale-110 shadow-lg'
            }`}
            aria-label="Next team member"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// Newsletter Component with Accessibility
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
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
    <section className="py-20 px-4 bg-gradient-to-r from-primary-900/30 to-secondary-900/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 mb-8">Get the latest updates on JAMB, WAEC, NECO, and admission news directly in your inbox</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
              required
              disabled={isSubmitting}
            />
            <button 
              type="submit" 
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {subscribed && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-500 mt-4" role="status">
              ✓ Successfully subscribed!
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Trust Badges Component
const TrustBadges = () => (
  <div className="py-8 bg-white/5" role="contentinfo" aria-label="Trusted institutions">
    <div className="max-w-7xl mx-auto px-4">
      <p className="text-center text-gray-400 text-sm mb-6">Trusted by students from</p>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        <span className="text-white font-bold text-lg">UNIPORT</span>
        <span className="text-white font-bold text-lg">UNICAL</span>
        <span className="text-white font-bold text-lg">ABSU</span>
        <span className="text-white font-bold text-lg">RSUT</span>
        <span className="text-white font-bold text-lg">AFE BABALOLA</span>
        <span className="text-white font-bold text-lg">UNIZIK</span>
        <span className="text-white font-bold text-lg">UNIBEN</span>
        <span className="text-white font-bold text-lg">UNIABJ</span>
      </div>
    </div>
  </div>
);

// Main Home Component
const Home = () => {
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);
  
  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // State for animated counters
  const [stats, setStats] = useState({
    students: 900,
    admissions: 300
  });

  // Counter animation effect
  useEffect(() => {
    let animationFrame;
    let startTime;
    
    const animateStats = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / CONSTANTS.COUNTER_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      
      const currentStudents = Math.floor(980 + (1000 - 980) * eased);
      const currentAdmissions = Math.floor(480 + (500 - 480) * eased);
      
      setStats({
        students: currentStudents,
        admissions: currentAdmissions
      });
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateStats);
      }
    };

    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animateStats);
    }, 300);

    return () => {
      clearTimeout(timer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const servicesData = useMemo(() => ({
    newServices: [
      { id: 1, title: 'WAEC | NECO | JAMB  | GCE', image: examinationRegImg, highlight: true, features: ['Fast Processing', 'Accurate', 'Timely', 'Affordable Rates'], showRegister: true },
      { id: 2, title: 'JAMB "RUNS" | PROCESSING', image: jambRunsImg, highlight: true, features: ['SCORE 300+ in one sitting', 'Reliable Results', 'Expert Guidance', '24/7 Support'], showRegister: true },
      { id: 3, title: 'JAMB | WAEC INTENSIVE LESSONS & COACHING', image: lessonCoachingImg, highlight: true, features: ['Private Lessons', 'JAMB CBT Prep', 'Exam Prep', 'Project/Thesis Coaching'], showRegister: true },
      { id: 4, title: 'UNIPORT | AFE BABALOLA | ABSU | UNICAL ADMISSION PROCESSING', image: admissionProcessingImg, highlight: true, features: ['Post UTME', 'Supplementary', 'Direct Admission', 'Other Services'], showRegister: false },
      { id: 5, title: 'GENERAL COMPUTER SERVICES', image: generalComputerImg, highlight: true, features: ['Printing', 'Typing', 'Scanning', 'Online Services'], showRegister: true },
      { id: 6, title: 'COMPUTER TRAINING | PROGRAMMING', image: computerTrainingImg, highlight: true, features: ['Basic Computing', 'Intermediate', 'Advanced', 'Certificate Issuance'], showRegister: true }
    ],
    existingServices: [
      { id: 7, title: 'Web Development', image: webDevelopmentImg, features: ['React/Next.js', 'Vue/Nuxt', 'Node.js', 'Responsive Design'], showRegister: true },
      { id: 8, title: 'Cloud Solutions', image: cloudSolutionsImg, features: ['AWS/Azure/GCP', 'Docker/K8s', 'CI/CD', 'Scalable'], showRegister: true },
      { id: 9, title: 'Mobile Development', image: mobileDevelopmentImg, features: ['React Native', 'Flutter', 'iOS/Android', 'Cross-platform'], showRegister: true },
      { id: 10, title: 'AI & Machine Learning', image: aiMlImg, features: ['Computer Vision', 'NLP', 'Predictive Analytics', 'Automation'], showRegister: true },
      { id: 11, title: 'Cybersecurity', image: cybersecurityImg, features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Data Protection'], showRegister: true },
      { id: 12, title: 'Digital Analytics', image: digitalAnalyticsImg, features: ['Business Intelligence', 'Data Visualization', 'Analytics', 'Reporting'], showRegister: true },
      { id: 13, title: 'IELTS', image: ieltsImg, features: ['Listening Strategies', 'Reading Comprehension', 'Writing Task 1 & 2', 'Speaking Practice'], showRegister: true },
      { id: 14, title: 'CELPIP', image: celpipImg, features: ['Complete CELPIP Prep', 'Listening Core & Pro', 'Writing Core & Pro', 'Reading Core & Pro', 'Speaking Core & Pro'], showRegister: true }, 
      { id: 15, title: 'UX/UI DESIGN', image: uxuiImg, features: ['Design Thinking', 'Wireframing', 'Figma Mastery', 'Adobe XD'], showRegister: true }
    ]
  }), []);
  
  const handleWhatsApp = useCallback((serviceName) => {
    const phoneNumber = CONSTANTS.PHONE_NUMBER;
    const message = encodeURIComponent(`Hello! I'm interested in ${serviceName}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }, []);
  
  const handlePhoneCall = useCallback(() => {
    window.location.href = `tel:+${CONSTANTS.PHONE_NUMBER}`;
  }, []);

  const handleRegister = useCallback((serviceName) => {
    sessionStorage.setItem('interestedService', serviceName);
    navigate('/register');
  }, [navigate]);

  const handleQuickEnquiry = useCallback((service) => {
    setSelectedService(service);
    setShowEnquiryModal(true);
  }, []);

  // UPDATED: handleEnquirySubmit with error handling
  const handleEnquirySubmit = useCallback(async (data) => {
    setIsSubmittingEnquiry(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, {
        ...data,
        subject: `Enquiry: ${selectedService?.title || 'General Enquiry'}`,
        service: selectedService?.title || 'General'
      });
      
      if (response.data.success) {
        toast.success('Enquiry sent successfully! We\'ll contact you within 24 hours.');
        setShowEnquiryModal(false);
        reset();
        setSelectedService(null);
      }
    } catch (error) {
      // Use the error handler utility
      handleApiError(error, navigate, {
        showToast: true,
        fallbackMessage: 'Failed to send enquiry. Please try again or call us directly.'
      });
    } finally {
      setIsSubmittingEnquiry(false);
    }
  }, [selectedService, reset, navigate]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };
  
  const allServices = useMemo(() => [...servicesData.newServices, ...servicesData.existingServices], [servicesData]);

  const getCategory = useCallback((title) => {
    if (SERVICE_CATEGORIES.EXAMINATION.includes(title)) return 'Examination';
    if (SERVICE_CATEGORIES.ADMISSION.includes(title)) return 'Admission';
    if (SERVICE_CATEGORIES.TECHNOLOGY.includes(title)) return 'Technology';
    if (SERVICE_CATEGORIES.COMPUTER.includes(title)) return 'Computer Training';
    return 'Other';
  }, []);

  const categories = ['All', 'Examination', 'Admission', 'Technology', 'Computer Training'];

  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const matchesCategory = activeCategory === 'All' || getCategory(service.title) === activeCategory;
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            service.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allServices, activeCategory, searchTerm, getCategory]);

  const faqs = useMemo(() => [
    {
      q: "How do I register for a service?",
      a: "Simply click the 'Register' button on any service card, fill in your details, and submit. We'll contact you within 24 hours."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept Bank Transfer, Card Payment, USSD, and Cash at our office."
    },
    {
      q: "Do you offer online classes?",
      a: "Yes, many of our services are available online. Check each service for specific mode of delivery."
    },
    {
      q: "How long does it take to complete a course?",
      a: "Course durations vary by program. You can find the duration on each service card or in the detailed view."
    },
    {
      q: "Do you provide certificates?",
      a: "Yes, we provide certificates upon successful completion of our training programs."
    }
  ], []);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full" aria-hidden="true">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="w-2 h-2 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-pulse mr-2" aria-hidden="true"></span>
              <span className="text-xs sm:text-sm text-gray-300 font-bold">Trusted by 100+ schools and institutions</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">JEO Digital</span><br />
              <span className="text-white">Solutions</span>
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto font-bold px-4">
              From WAEC, NECO, GCE, and JAMB registration to admission processing, computer training, and everyday digital services – we make your journey seamless.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link to="/register" className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-primary-500">
                Register Now
              </Link>
              <Link to="/blog" className="px-8 py-3 bg-white/10 border border-white/20 rounded-lg font-semibold text-white hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-white">
                View Blog
              </Link>
            </div>
            
            {/* Stats Section with Animated Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-20 pt-10 border-t border-white/10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-500" aria-live="polite">
                  {stats.students >= 1000 ? '1000+' : stats.students}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Students Enrolled</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-500" aria-live="polite">
                  {stats.admissions >= 500 ? '500+' : stats.admissions}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Admissions Secured</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-500">24/7</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Support Available</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-500">100%</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Customer Satisfaction</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <TrustBadges />
      
      {/* Enhanced Services Section with Search and Filter */}
      <section id="services-section" className="py-12 sm:py-20 px-4 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInUp} transition={{ duration: 0.4 }}>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-gray-400 mt-2 px-4">Comprehensive educational and technology solutions tailored to your needs</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                  aria-label="Search services"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center" role="tablist">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  role="tab"
                  aria-selected={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-400" aria-live="polite">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Free Consultation CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl p-6 border border-primary-500/20 text-center"
          >
            <p className="text-gray-300 text-sm md:text-base">
              📞 <span className="text-primary-500 font-semibold">Need help choosing?</span> Book a free consultation with our experts
            </p>
            <button
              onClick={() => {
                setSelectedService({ title: 'Free Consultation' });
                setShowEnquiryModal(true);
              }}
              className="mt-2 px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white hover:opacity-90 transition text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Book Free Consultation
            </button>
          </motion.div>
          
          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredServices.map((service, index) => (
                <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} viewport={{ once: true, amount: 0.1 }}>
                  <ServiceCard 
                    service={service} 
                    onWhatsApp={handleWhatsApp} 
                    onPhoneCall={handlePhoneCall} 
                    onRegister={handleRegister}
                    onQuickEnquiry={handleQuickEnquiry}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12" role="status">
              <p className="text-gray-400 text-lg">No services found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}
                className="mt-4 text-primary-500 hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-4 py-2"
              >
                Clear filters
              </button>
            </div>
          )}
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 mt-2">Quick answers to common questions about our services</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-primary-500/30 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-primary-400 mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => {
                setSelectedService({ title: 'Question' });
                setShowEnquiryModal(true);
              }}
              className="text-primary-500 hover:text-primary-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-4 py-2"
            >
              Still have questions? Ask us →
            </button>
          </div>
        </div>
      </section>
      
      <TestimonialCarousel />
      <TeamCarousel />
      <Newsletter />
      
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl p-6 sm:p-12 backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Future?</h2>
            <p className="text-gray-300 mb-8 text-sm sm:text-lg px-4">Join thousands of successful students who trust <span className="text-primary-500">JEO Digital Solutions</span> for their examination, admission, and training needs.</p>
            <Link to="/register" className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white hover:opacity-90 transition inline-block focus:outline-none focus:ring-2 focus:ring-primary-500">
              Register Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enquiry Modal with Accessibility */}
      <AnimatePresence>
        {showEnquiryModal && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowEnquiryModal(false);
              setSelectedService(null);
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-lg w-full bg-dark-100 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 rounded-t-2xl">
                <h2 id="enquiry-modal-title" className="text-2xl font-bold text-white">
                  {selectedService.title === 'Free Consultation' ? 'Free Consultation' : `Register for ${selectedService.title}`}
                </h2>
                <p className="text-white/90 text-sm mt-1">
                  {selectedService.title === 'Free Consultation' 
                    ? 'Book a free consultation with our experts' 
                    : 'Fill in your details to get started'}
                </p>
              </div>
              
              <form onSubmit={handleSubmit(handleEnquirySubmit)} className="p-6 space-y-4" noValidate>
                <div>
                  <label htmlFor="enquiry-name" className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    id="enquiry-name"
                    {...register('name', { required: 'Full name is required' })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your full name"
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1" role="alert">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="enquiry-email" className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    id="enquiry-email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                    placeholder="you@example.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1" role="alert">{errors.email.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="enquiry-phone" className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    id="enquiry-phone"
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                    placeholder="0801 234 5678"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1" role="alert">{errors.phone.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="enquiry-message" className="block text-sm font-medium mb-2">Your Message</label>
                  <textarea
                    id="enquiry-message"
                    {...register('message')}
                    rows="3"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                    placeholder="Tell us about your requirements or questions..."
                  ></textarea>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEnquiryModal(false);
                      setSelectedService(null);
                    }}
                    className="flex-1 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingEnquiry}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white hover:opacity-90 transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {isSubmittingEnquiry ? 'Submitting...' : selectedService.title === 'Free Consultation' ? 'Book Consultation' : 'Submit Registration'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 p-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Back to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;