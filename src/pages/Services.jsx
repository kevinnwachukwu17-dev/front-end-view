import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';

// Import all service images from home_cards_imgs
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

// Service Card Component
const ServiceCard = ({ service, onWhatsApp, onPhoneCall, onRegister, onQuickEnquiry }) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const getAltText = (title) => {
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
  };

  // Service categories for filtering
  const getCategory = (title) => {
    const examServices = ['WAEC | NECO | JAMB  | GCE', 'JAMB "RUNS" | PROCESSING', 'JAMB | WAEC INTENSIVE LESSONS & COACHING', 'IELTS', 'CELPIP'];
    const admissionServices = ['UNIPORT | AFE BABALOLA | ABSU | UNICAL ADMISSION PROCESSING'];
    const techServices = ['Web Development', 'Cloud Solutions', 'Mobile Development', 'AI & Machine Learning', 'Cybersecurity', 'Digital Analytics', 'UX/UI DESIGN'];
    const computerServices = ['COMPUTER TRAINING | PROGRAMMING', 'GENERAL COMPUTER SERVICES'];
    
    if (examServices.includes(title)) return 'Examination';
    if (admissionServices.includes(title)) return 'Admission';
    if (techServices.includes(title)) return 'Technology';
    if (computerServices.includes(title)) return 'Computer Training';
    return 'Other';
  };

  const getPopularity = (title) => {
    const popular = ['WAEC | NECO | JAMB  | GCE', 'JAMB "RUNS" | PROCESSING', 'Web Development', 'COMPUTER TRAINING | PROGRAMMING'];
    if (popular.includes(title)) return '⭐ Popular';
    return '';
  };

  const getPriceRange = (title) => {
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
  };

  const getDuration = (title) => {
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
  };

  const category = getCategory(service.title);
  const popularity = getPopularity(service.title);
  const priceRange = getPriceRange(service.title);
  const duration = getDuration(service.title);

  const getCourseDetails = (title) => {
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
  };

  const details = getCourseDetails(service.title);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`card group cursor-pointer flex flex-col h-full items-center text-center relative overflow-hidden ${service.highlight ? 'border-primary-500/30 bg-gradient-to-br from-primary-500/5 to-transparent' : ''}`}
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
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Register
            </button>
            
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Details
            </button>
          </div>
          
          {/* Quick Enquiry Button */}
          <button
            onClick={() => onQuickEnquiry(service)}
            className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 px-3 py-1.5 rounded-lg transition-all duration-200 text-xs font-semibold border border-green-500/30"
          >
            📧 Quick Enquiry
          </button>
        </div>
      </motion.div>

      {/* Modal - Keep the same as before */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setShowModal(false)}
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
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{service.title}</h2>
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
                    className="text-gray-400 hover:text-white transition-colors"
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
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    What You'll Learn
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(service.features || details.features).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="text-primary-500">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>Learning Mode</span>
                    </div>
                    <p className="text-white font-medium">{details.mode}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Duration</span>
                    </div>
                    <p className="text-white font-medium">{details.duration}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Certification</span>
                    </div>
                    <p className="text-white font-medium">{details.certification}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Schedule
                    </h4>
                    <p className="text-gray-300 text-sm">{details.schedule}</p>
                  </div>

                  <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                    <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
                    className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
};

const Services = () => {
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFaqModal, setShowFaqModal] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // All services from Home.jsx
  const servicesData = {
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
  };

  const allServices = [...servicesData.newServices, ...servicesData.existingServices];

  // Get unique categories
  const getCategory = (title) => {
    const examServices = ['WAEC | NECO | JAMB  | GCE', 'JAMB "RUNS" | PROCESSING', 'JAMB | WAEC INTENSIVE LESSONS & COACHING', 'IELTS', 'CELPIP'];
    const admissionServices = ['UNIPORT | AFE BABALOLA | ABSU | UNICAL ADMISSION PROCESSING'];
    const techServices = ['Web Development', 'Cloud Solutions', 'Mobile Development', 'AI & Machine Learning', 'Cybersecurity', 'Digital Analytics', 'UX/UI DESIGN'];
    const computerServices = ['COMPUTER TRAINING | PROGRAMMING', 'GENERAL COMPUTER SERVICES'];
    
    if (examServices.includes(title)) return 'Examination';
    if (admissionServices.includes(title)) return 'Admission';
    if (techServices.includes(title)) return 'Technology';
    if (computerServices.includes(title)) return 'Computer Training';
    return 'Other';
  };

  const categories = ['All', 'Examination', 'Admission', 'Technology', 'Computer Training'];

  // Filter services based on category and search
  const filteredServices = allServices.filter(service => {
    const matchesCategory = activeCategory === 'All' || getCategory(service.title) === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // FAQ Data
  const faqs = [
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
  ];

  const handleWhatsApp = (serviceName) => {
    const phoneNumber = '2347061066372';
    const message = encodeURIComponent(`Hello! I'm interested in ${serviceName}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };
  
  const handlePhoneCall = () => {
    window.location.href = 'tel:+2347061066372';
  };

  const handleRegister = (serviceName) => {
    sessionStorage.setItem('interestedService', serviceName);
    navigate('/register');
  };

  const handleQuickEnquiry = (service) => {
    setSelectedService(service);
    setShowEnquiryModal(true);
  };

  const handleEnquirySubmit = async (data) => {
    setLoading(true);
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
      toast.error('Failed to send enquiry. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Our Services
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive educational and technology solutions tailored to your needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section with Filters */}
      <section className="py-12 sm:py-20 px-4 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInUp} transition={{ duration: 0.4 }}>
          
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
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-400">
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
              className="mt-2 px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white hover:opacity-90 transition text-sm"
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
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No services found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}
                className="mt-4 text-primary-500 hover:text-primary-400"
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
              className="text-primary-500 hover:text-primary-400 text-sm font-semibold"
            >
              Still have questions? Ask us →
            </button>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
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
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-lg w-full bg-dark-100 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 rounded-t-2xl">
                <h2 className="text-2xl font-bold text-white">
                  {selectedService.title === 'Free Consultation' ? 'Free Consultation' : `Register for ${selectedService.title}`}
                </h2>
                <p className="text-white/90 text-sm mt-1">
                  {selectedService.title === 'Free Consultation' 
                    ? 'Book a free consultation with our experts' 
                    : 'Fill in your details to get started'}
                </p>
              </div>
              
              <form onSubmit={handleSubmit(handleEnquirySubmit)} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    {...register('name', { required: 'Full name is required' })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                    placeholder="0801 234 5678"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Your Message</label>
                  <textarea
                    {...register('message')}
                    rows="3"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
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
                    className="flex-1 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : selectedService.title === 'Free Consultation' ? 'Book Consultation' : 'Submit Registration'}
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
            className="fixed bottom-24 right-6 z-40 p-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;