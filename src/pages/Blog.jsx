import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

// Import only necessary images
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

// Constants
const CONSTANTS = {
  CAROUSEL_SPEED: 0.8,
  CAROUSEL_DUPLICATE_COUNT: 3,
  SCROLL_THRESHOLD: 100,
  ANIMATION_DURATION: 0.5,
};

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [liveUpdates, setLiveUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const observerRef = useRef(null);
  const sectionRefs = useRef({});

  // Get current date for display
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Memoized university images to prevent re-renders
  const universityImages = useMemo(() => [
    { id: 1, name: 'UNIPORT', url: 'https://www.uniport.edu.ng', img: admissionProcessingImg },
    { id: 2, name: 'UNICAL', url: 'https://www.unical.edu.ng', img: examinationRegImg },
    { id: 4, name: 'Afe Babalola', url: 'https://www.abuad.edu.ng', img: jambRunsImg },
    { id: 6, name: 'OAU', url: 'https://www.oauife.edu.ng', img: webDevelopmentImg },
    { id: 7, name: 'UI', url: 'https://www.ui.edu.ng', img: cloudSolutionsImg },
    { id: 8, name: 'UNILAG', url: 'https://unilag.edu.ng', img: mobileDevelopmentImg },
    { id: 9, name: 'UNIBEN', url: 'https://www.uniben.edu', img: aiMlImg },
    { id: 10, name: 'FUNAAB', url: 'https://www.unaab.edu.ng', img: cybersecurityImg },
    { id: 11, name: 'LASU', url: 'https://www.lasu.edu.ng', img: digitalAnalyticsImg },
    { id: 12, name: 'RSUST', url: 'https://www.rsu.edu.ng', img: generalComputerImg },
    { id: 13, name: 'DELSU', url: 'https://www.delsu.edu.ng', img: admissionProcessingImg },
    { id: 14, name: 'UNIMAID', url: 'https://www.unimaid.edu.ng', img: examinationRegImg },
    { id: 15, name: 'UNIUYO', url: 'https://www.uniuyo.edu.ng', img: computerTrainingImg },
    { id: 16, name: 'UNIZIK', url: 'https://www.unizik.edu.ng', img: jambRunsImg },
    { id: 17, name: 'FUTO', url: 'https://www.futo.edu.ng', img: lessonCoachingImg },
    { id: 18, name: 'ABU', url: 'https://www.abu.edu.ng', img: webDevelopmentImg },
    { id: 19, name: 'BUK', url: 'https://www.buk.edu.ng', img: cloudSolutionsImg },
    { id: 20, name: 'MAU', url: 'https://www.mautech.edu.ng', img: mobileDevelopmentImg },
    { id: 21, name: 'GOUU', url: 'https://www.gouni.edu.ng', img: aiMlImg },
    { id: 22, name: 'Covenant', url: 'https://www.covenantuniversity.edu.ng', img: cybersecurityImg },
    { id: 23, name: 'Babcock', url: 'https://www.babcock.edu.ng', img: digitalAnalyticsImg },
    { id: 24, name: 'Redeemer', url: 'https://www.run.edu.ng', img: generalComputerImg }
  ], []);

  // Duplicate images for seamless scrolling - reduced from 3 to 2 for performance
  const scrollingImages = useMemo(() => 
    [...universityImages, ...universityImages], 
    [universityImages]
  );

  // Services data - memoized
  const services = useMemo(() => [
    {
      id: 1,
      title: "JAMB Registration & UTME Preparation 2026",
      category: "jamb",
      heroCaption: "Score 320+ in JAMB 2026 - Your Gateway to University Education!",
      description: "Get complete JAMB registration support for 2026 UTME, CBT training, past questions, and real-time exam preparation. Our success rate is over 95% with students scoring 280+.",
      details: [
        "JAMB 2026 Profile Creation & Registration (UTME/DE)",
        "Change of Course/Institution Processing for 2026",
        "CBT Computer-Based Test Training with 2026 Mock Exams",
        "2020-2026 Past Questions & Answers Compilation",
        "Mock Exams with Real-Time Scoring & Performance Analysis",
        "24/7 Online Support & Tutoring for JAMB 2026",
        "JAMB 2026 Syllabus Coverage & Exam Tips",
        "Free JAMB Mobile App for Practice"
      ],
      updates: [
        "JAMB 2026 Registration: January 20th - March 15th, 2026",
        "JAMB 2026 UTME Exam Date: April 15th - April 30th, 2026",
        "Free JAMB Mock Exam Every Saturday - Book Your Slot!",
        "JAMB 2026 Change of Course/Institution Begins May 2026",
        "Last Minute CBT Training - Intensive Classes Available"
      ],
      image: jambRunsImg,
      year: "2026",
      showBrochure: true
    },
    {
      id: 2,
      title: "WAEC, NECO & GCE 2026 Examinations",
      category: "exams",
      heroCaption: "Excellence is Not an Act, But a Habit - Pass with Distinction in 2026!",
      description: "Comprehensive support for WAEC 2026, NECO 2026, and GCE examinations including registration, study materials, and intensive coaching classes.",
      details: [
        "Complete Registration Support for WAEC/NECO/GCE 2026",
        "Subject-Based Intensive Coaching Classes",
        "2020-2026 Past Questions & Study Materials",
        "Practical & Theory Examination Preparation",
        "Online Tutorials & Video Lessons",
        "Result Checking & Certificate Collection",
        "WAEC/NECO/GCE Timetable Distribution",
        "Exam Day Preparation Tips & Support"
      ],
      updates: [
        "WAEC 2026 Registration: February 1st - March 30th, 2026",
        "WAEC 2026 WASSCE: May 15th - June 30th, 2026",
        "NECO 2026 Registration: April 1st - May 15th, 2026",
        "NECO 2026 Exams: July 10th - August 20th, 2026",
        "GCE 2026 Registration: June 1st - July 30th, 2026",
        "GCE 2026 Exams: September 15th - October 30th, 2026"
      ],
      image: examinationRegImg,
      year: "2026",
      showBrochure: false
    },
    {
      id: 3,
      title: "2026/2027 University Admissions Processing",
      category: "admission",
      heroCaption: "Your Dream University Awaits in 2026 - Let Us Make It Happen!",
      description: "Expert admission processing for 2026/2027 academic session at top Nigerian universities including UNIPORT, UNICAL, ABSU, and Afe Babalola University.",
      details: [
        "Post UTME 2026 Registration & Preparation",
        "Direct Entry Application Processing for 2026",
        "2026/2027 Supplementary Admission Forms",
        "Change of Course/Institution for 2026",
        "Admission Status Tracking & Follow-up Service",
        "Clearance Document Preparation",
        "Departmental Cut-off Mark Analysis",
        "Scholarship Application Assistance"
      ],
      updates: [
        "UNIPORT 2026/2027 Post UTME: July 15th - August 30th, 2026",
        "UNICAL 2026/2027 Admission List: September 2026",
        "ABSU 2026/2027 Supplementary Form: October 2026",
        "Afe Babalola University 2026/2027 Admission Ongoing",
        "JAMB 2026/2027 Admission Cap: August - December 2026",
        "Direct Entry 2026 Registration: June - July 2026"
      ],
      image: admissionProcessingImg,
      year: "2026/2027",
      showBrochure: false
    },
    {
      id: 4,
      title: "Computer Training & Digital Skills 2026",
      category: "computer",
      heroCaption: "Empower Yourself with Digital Skills for a Better Future in 2026!",
      description: "Practical computer training from basics to advanced programming. Get certified and become job-ready in today's digital economy. New batches starting monthly.",
      details: [
        "Basic Computer Appreciation & Internet Skills",
        "Microsoft Office Suite (Word, Excel, PowerPoint, Access)",
        "Web Design & Development (HTML, CSS, JavaScript, React)",
        "Graphic Design (Canva, Photoshop, CorelDraw, Illustrator)",
        "Programming (Python, Java, JavaScript, PHP)",
        "Data Analysis & Digital Marketing",
        "Certificate Issuance upon Completion",
        "Internship & Job Placement Assistance"
      ],
      updates: [
        "Computer Training 2026 Batch A: April 15th - June 15th, 2026",
        "25% Discount for Early Bird Registration (Before March 30th)",
        "Free Practical Projects & Internship Opportunities",
        "New Data Analytics Course Launching May 2026",
        "Weekend Classes Available for Working Professionals"
      ],
      image: computerTrainingImg,
      year: "2026",
      showBrochure: false
    },
    {
      id: 5,
      title: "Intensive Coaching & Private Lessons 2026",
      category: "coaching",
      heroCaption: "Knowledge is Power - Transform Your Future in 2026 Today!",
      description: "Personalized home tutoring and group coaching for all subjects. Expert teachers with proven track records of student success in 2026 examinations.",
      details: [
        "Home Tutoring (All Subjects - Primary to University)",
        "Group Coaching Classes (Maximum 5 Students per Group)",
        "WAEC/NECO/JAMB 2026 Exam Preparation",
        "Project/Thesis Writing Assistance",
        "Homework Help & Assignment Support",
        "Flexible Scheduling Options (Morning/Evening/Weekend)",
        "Monthly Progress Reports",
        "Online Virtual Classes Available"
      ],
      updates: [
        "2026 Coaching Batch Registration: Ongoing",
        "Early Bird Registration Discount - 20% Off (Until March 30th)",
        "Free Trial Class Available - Book Your Slot",
        "New Coaching Centers Opened in Aba, PH, Uyo",
        "Holiday Coaching Classes for Exam Preparation"
      ],
      image: lessonCoachingImg,
      year: "2026",
      showBrochure: false
    },
    {
      id: 6,
      title: "General Computer Services 2026",
      category: "services",
      heroCaption: "Fast, Reliable & Affordable - Your One-Stop Digital Hub in 2026!",
      description: "Quality computer services including printing, typing, scanning, and online registration assistance at affordable rates with express delivery options.",
      details: [
        "High-Quality Printing (B&W and Color - Up to A3 Size)",
        "Professional Typing & Document Formatting",
        "Scanning & Document Digitization (High Resolution)",
        "Laminating, Binding & Photocopying Services",
        "Online Forms & Registration Assistance",
        "Passport Photography & ID Card Making",
        "Bulk Printing Discount Available",
        "Home/Office Delivery Service"
      ],
      updates: [
        "New High-Speed Color Printing Machine Installed - 2026",
        "Bulk Printing: 30% Discount for 500+ Pages",
        "Operating Hours: Monday - Saturday: 8am - 7pm",
        "Sunday: 10am - 2pm (Limited Services)",
        "Express Service Available (2-Hour Delivery)"
      ],
      image: generalComputerImg,
      year: "2026",
      showBrochure: false
    }
  ], []);

  // Filter services
  const filteredServices = useMemo(() => 
    selectedCategory === 'all' 
      ? services 
      : services.filter(service => service.category === selectedCategory),
    [services, selectedCategory]
  );

  // Fetch live updates
  useEffect(() => {
    const fetchLiveUpdates = async () => {
      setLoading(true);
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const updates = [
          { id: 1, title: "JAMB 2026 Registration Opens January 20th", source: "JAMB Official", date: "2026-01-15", category: "jamb", url: "https://www.jamb.gov.ng" },
          { id: 2, title: "JAMB UTME 2026 Exam Date Announced - April 15th", source: "JAMB Official", date: "2026-01-10", category: "jamb", url: "https://www.jamb.gov.ng" },
          { id: 3, title: "WAEC 2026 Registration Deadline Extended to March 30th", source: "WAEC Nigeria", date: "2026-02-20", category: "waec", url: "https://www.waecnigeria.org" },
          { id: 4, title: "WAEC 2026 WASSCE Timetable Released", source: "WAEC Nigeria", date: "2026-02-01", category: "waec", url: "https://www.waecnigeria.org" },
          { id: 5, title: "NECO 2026 Examination Timetable Now Available", source: "NECO", date: "2026-01-25", category: "neco", url: "https://www.neco.gov.ng" },
          { id: 6, title: "NECO 2026 Registration Ongoing - Apply Now", source: "NECO", date: "2026-02-10", category: "neco", url: "https://www.neco.gov.ng" },
          { id: 7, title: "UNIPORT 2026/2027 Post UTME Screening Dates Out", source: "UNIPORT", date: "2026-03-05", category: "admission", url: "https://www.uniport.edu.ng" },
          { id: 8, title: "UNIPORT Admission Form 2026/2027 Now Available", source: "UNIPORT", date: "2026-02-15", category: "admission", url: "https://www.uniport.edu.ng" },
          { id: 9, title: "UNICAL Releases 2026/2027 Admission List", source: "UNICAL", date: "2026-03-20", category: "admission", url: "https://www.unical.edu.ng" },
          { id: 10, title: "UNICAL Post UTME 2026 Registration Details", source: "UNICAL", date: "2026-03-01", category: "admission", url: "https://www.unical.edu.ng" },
          { id: 11, title: "ABSU 2026/2027 Supplementary Admission Form Out", source: "ABSU", date: "2026-03-10", category: "admission", url: "https://www.absu.edu.ng" },
          { id: 12, title: "ABSU Post UTME 2026 Screening Schedule", source: "ABSU", date: "2026-02-28", category: "admission", url: "https://www.absu.edu.ng" },
          { id: 13, title: "Afe Babalola University 2026 Admission Ongoing", source: "ABUAD", date: "2026-02-05", category: "admission", url: "https://www.abuad.edu.ng" },
          { id: 14, title: "GCE 2026 Registration Now Open - Limited Slots", source: "WAEC GCE", date: "2026-03-15", category: "exams", url: "https://www.waecnigeria.org" },
          { id: 15, title: "Computer Training 2026 Batch Registration - 20% Discount", source: "JEO Digital", date: "2026-03-12", category: "computer", url: "#" }
        ];
        setLiveUpdates(updates);
      } catch (error) {
        console.error('Failed to fetch updates:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveUpdates();
  }, []);

  // Optimized carousel animation
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollPosition = 0;
    let lastTimestamp = 0;
    const scrollSpeed = CONSTANTS.CAROUSEL_SPEED;

    const animate = (timestamp) => {
      if (!isPaused && carousel) {
        if (lastTimestamp === 0) lastTimestamp = timestamp;
        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        // Smooth scrolling with delta time
        scrollPosition += scrollSpeed * (delta / 16);
        
        const maxScroll = carousel.scrollWidth / 2;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft = scrollPosition;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const sections = ['hero', 'updates', 'services'];
    
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
      );

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          observerRef.current.observe(element);
        }
      });

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, []);

  // Handle external link redirection
  const handleExternalLink = useCallback((url) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  // Handle register button click
  const handleRegisterClick = useCallback((serviceName) => {
    sessionStorage.setItem('interestedService', serviceName);
    navigate('/register');
  }, [navigate]);

  // Handle category filter
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Skip to main content link - Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary-500 focus:text-white focus:p-4 focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 px-4 overflow-hidden" aria-labelledby="hero-title">
        <div className="absolute inset-0 w-full h-full" aria-hidden="true">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" aria-hidden="true"></span>
              <span className="text-xs text-gray-300">Updated: {formattedDate}</span>
            </div>
            <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                2026 Educational News & Updates
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Stay informed with the latest 2026 examination updates, admission information, and educational news
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div id="main-content" className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist">
          {['all', 'jamb', 'exams', 'admission', 'computer', 'coaching', 'services'].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-full capitalize transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
              role="tab"
              aria-selected={selectedCategory === category}
              aria-label={`Filter by ${category}`}
            >
              {category === 'all' ? 'All Services 2026' : category}
            </button>
          ))}
        </div>

        {/* Live Updates Ticker */}
        <section id="updates" className="mb-12 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl p-6 border border-white/10" aria-labelledby="updates-title">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl" aria-hidden="true">📢</span>
            <h3 id="updates-title" className="text-xl font-bold text-white">Live Updates 2026</h3>
            <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full animate-pulse" aria-live="polite">LIVE</span>
            <span className="text-xs text-gray-400">Last updated: {formattedDate}</span>
          </div>
          {loading ? (
            <div className="flex justify-center py-4" role="status" aria-label="Loading updates">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto" role="feed" aria-label="Live updates feed">
              {liveUpdates.map((update) => (
                <div key={update.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <span className="text-green-500 text-xl" aria-hidden="true">•</span>
                  <div className="flex-1">
                    <p className="text-gray-300">{update.title}</p>
                    <p className="text-xs text-gray-500">{update.source} • {update.date}</p>
                  </div>
                  {update.url !== '#' && (
                    <button 
                      onClick={() => handleExternalLink(update.url)}
                      className="text-primary-500 hover:text-primary-400 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-3 py-1"
                      aria-label={`Visit ${update.source} website`}
                    >
                      Visit Website →
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Year Badge */}
        <div className="text-center mb-8">
          <span className="inline-block px-6 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-semibold border border-primary-500/30">
            🗓️ Academic Year 2026/2027
          </span>
        </div>

        {/* Services Grid */}
        <section id="services" className="space-y-16" aria-label="Educational services">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-dark-100/50 to-dark-200/30 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm"
              role="article"
              aria-label={`${service.title} - ${service.year}`}
            >
              {/* Year Ribbon */}
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-primary-500 text-white text-xs rounded-full font-bold">
                    {service.year}
                  </span>
                </div>

                {/* Hero Section with Big Image */}
                <div className="relative bg-gradient-to-r from-primary-900/50 to-secondary-900/50 p-8 md:p-12">
                  <div className="flex flex-col items-center gap-8">
                    {/* Big Image */}
                    <div className="w-full max-w-2xl mx-auto">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl border-2 border-primary-500/30"
                        loading="lazy"
                        width="800"
                        height="400"
                      />
                    </div>
                    {/* Centered Text */}
                    <div className="text-center">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{service.title}</h2>
                      <p className="text-primary-400 text-lg italic">{service.heroCaption}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6 md:p-8">
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">{service.description}</p>

                {/* Detailed Information */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <span aria-hidden="true">✨</span> What We Offer - {service.year}
                    </h3>
                    <ul className="space-y-3">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start gap-2">
                          <span className="text-primary-500" aria-hidden="true">✓</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <span aria-hidden="true">📢</span> {service.year} Updates
                    </h3>
                    <div className="space-y-3">
                      {service.updates.map((update, idx) => (
                        <div key={idx} className="p-3 bg-primary-500/10 rounded-lg border border-primary-500/20">
                          <p className="text-gray-300 text-sm">{update}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <button 
                    onClick={() => handleRegisterClick(service.title)}
                    className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label={`Register for ${service.title}`}
                  >
                    Register for {service.year}
                  </button>
                  {service.showBrochure && (
                    <button 
                      onClick={() => handleRegisterClick(service.title)}
                      className="px-6 py-2 rounded-lg border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-label={`Download ${service.year} brochure`}
                    >
                      Download {service.year} Brochure
                    </button>
                  )}
                  <a 
                    href="https://wa.me/2347061066372" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-label="Chat on WhatsApp"
                  >
                    <span aria-hidden="true">💬</span> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Featured Partner Universities Carousel Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-16 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl p-8 border border-white/10"
          aria-labelledby="partners-title"
        >
          <div className="text-center mb-8">
            <h3 id="partners-title" className="text-2xl font-bold text-white mb-2">Our Partner Universities</h3>
            <p className="text-gray-400 text-sm">Trusted by leading institutions across Nigeria</p>
          </div>

          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            className="overflow-x-auto scrollbar-hide cursor-grab"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowX: 'scroll' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            role="region"
            aria-label="Partner universities carousel"
            tabIndex={0}
          >
            <div className="flex gap-6" style={{ width: 'max-content' }}>
              {scrollingImages.map((uni, idx) => (
                <div
                  key={`${uni.id}-${idx}`}
                  onClick={() => handleExternalLink(uni.url)}
                  className="group cursor-pointer transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
                  style={{ minWidth: '160px' }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Visit ${uni.name} website`}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleExternalLink(uni.url);
                    }
                  }}
                >
                  <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-all duration-300">
                    <div className="w-36 h-36 overflow-hidden">
                      <img 
                        src={uni.img} 
                        alt={`${uni.name} logo`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        width="144"
                        height="144"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Hint - Accessibility */}
          <div className="text-center mt-4">
            <p className="text-gray-400 text-xs">👆 Hover to pause • Scroll to explore</p>
          </div>
        </motion.div>

        {/* Motivational Footer */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12 text-center py-12"
          aria-labelledby="cta-title"
        >
          <h3 id="cta-title" className="text-2xl font-bold text-white mb-2">Your Success Story Starts Here in 2026</h3>
          <p className="text-gray-400">Join thousands of successful students who trusted JEO Digital Solutions for their 2026 educational journey</p>
          <button 
            onClick={() => handleRegisterClick('2026 Registration')}
            className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Get started with 2026 registration"
          >
            Get Started Today - 2026 Registration
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;