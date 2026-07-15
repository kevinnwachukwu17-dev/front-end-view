import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import team member images - only import what's needed
import teamImg1 from '../assets/team_members_imgs/teamImg1.jpg';
import teamImg2 from '../assets/team_members_imgs/teamImg2.jpg';
import teamImg3 from '../assets/team_members_imgs/teamImg3.jpg';
import teamImg4 from '../assets/team_members_imgs/teamImg4.jpg';
import teamImg5 from '../assets/team_members_imgs/teamImg5.jpg';
import teamImg6 from '../assets/team_members_imgs/teamImg6.jpg';
import teamImg7 from '../assets/team_members_imgs/teamImg7.jpg';
import teamImg8 from '../assets/team_members_imgs/teamImg8.jpg';

// Import partner institution images from home_cards_imgs
import uniportImg from '../assets/home_cards_imgs/uniport.jpg';
import unicalImg from '../assets/home_cards_imgs/unical.jpg';
import absuImg from '../assets/home_cards_imgs/absu.jpg';
import afebabalolaImg from '../assets/home_cards_imgs/afebabalola.jpg';

// Constants
const CONSTANTS = {
  SCROLL_THRESHOLD: 100,
  ANIMATION_DURATION: 0.5,
  IMAGE_SIZES: {
    TEAM: 'w-32 h-32',
    PARTNER: 'w-full h-24',
  }
};

// SVG Icons extracted to prevent duplication
const Icons = {
  Mission: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-primary-500">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  Vision: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-secondary-500">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Star: ({ className = "w-5 h-5 text-yellow-500" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  )
};

const About = () => {
  const [isVisible, setIsVisible] = useState({});
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const sectionRefs = useRef({});
  const observerRef = useRef(null);

  // Memoized static data to prevent re-renders
  const stats = useMemo(() => [
    { 
      value: "10,000+", 
      label: "Students Empowered", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
        </svg>
      )
    },
    { 
      value: "98%", 
      label: "Success Rate", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="m22 7-8.5 8.5-5-5L2 17"/>
          <path d="M16 7h6v6"/>
        </svg>
      )
    },
    { 
      value: "50+", 
      label: "Expert Instructors", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    { 
      value: "15+", 
      label: "Years of Excellence", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    { 
      value: "100+", 
      label: "Partner Schools", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <path d="M9 22V12h6v10"/>
        </svg>
      )
    },
    { 
      value: "24/7", 
      label: "Student Support", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    }
  ], []);

  const values = useMemo(() => [
    { 
      title: "Excellence", 
      description: "We strive for excellence in everything we do, from our teaching methods to our student support services.", 
      color: "from-yellow-500/20 to-yellow-600/20",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-yellow-600">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
          <path d="M4 22h16"/>
          <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/>
          <path d="M12 2a4.5 4.5 0 0 1 4.5 4.5v4a4.5 4.5 0 0 1-9 0v-4A4.5 4.5 0 0 1 12 2z"/>
        </svg>
      )
    },
    { 
      title: "Innovation", 
      description: "We embrace cutting-edge technology and innovative teaching methods to deliver the best learning experience.", 
      color: "from-blue-500/20 to-blue-600/20",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-600">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.7.8 1.3 1.5 1.5 2.5"/>
          <path d="M9 18h6"/>
          <path d="M10 22h4"/>
        </svg>
      )
    },
    { 
      title: "Integrity", 
      description: "We operate with transparency, honesty, and ethical practices in all our dealings.", 
      color: "from-green-500/20 to-green-600/20",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-600">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
        </svg>
      )
    },
    { 
      title: "Student-Centric", 
      description: "Our students' success is our ultimate goal. We tailor our approach to meet individual needs.", 
      color: "from-purple-500/20 to-purple-600/20",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-purple-600">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    { 
      title: "Community", 
      description: "We build a supportive community where students can learn, grow, and succeed together.", 
      color: "from-orange-500/20 to-orange-600/20",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-orange-600">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
          <path d="M2 12h20"/>
        </svg>
      )
    },
    { 
      title: "Quality", 
      description: "Continuous improvement and commitment to delivering exceptional results.", 
      color: "from-red-500/20 to-red-600/20",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-red-600">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      )
    }
  ], []);

  // Team members
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

  const milestones = useMemo(() => [
    { 
      year: "2010", 
      title: "Founded", 
      description: "JEO Digital Solutions was established with a vision to transform education.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary-500">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      )
    },
    { 
      year: "2013", 
      title: "First 1000 Students", 
      description: "Reached the milestone of training 1000+ students.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary-500">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
        </svg>
      )
    },
    { 
      year: "2016", 
      title: "Expansion", 
      description: "Expanded operations to multiple locations across Nigeria.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary-500">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    },
    { 
      year: "2019", 
      title: "Digital Innovation", 
      description: "Launched online learning platform and digital resources.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary-500">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.7.8 1.3 1.5 1.5 2.5"/>
          <path d="M9 18h6"/>
          <path d="M10 22h4"/>
        </svg>
      )
    },
    { 
      year: "2022", 
      title: "Partnerships", 
      description: "Partnered with 50+ schools and institutions nationwide.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary-500">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    { 
      year: "2024", 
      title: "Global Reach", 
      description: "Expanded services to international students.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary-500">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    }
  ], []);

  const partners = useMemo(() => [
    { 
      name: "UNIPORT", 
      image: uniportImg, 
      website: "https://www.uniport.edu.ng",
      alt: "University of Port Harcourt"
    },
    { 
      name: "UNICAL", 
      image: unicalImg, 
      website: "https://www.unical.edu.ng",
      alt: "University of Calabar"
    },
    { 
      name: "ABSU", 
      image: absuImg, 
      website: "https://www.absu.edu.ng",
      alt: "Abia State University"
    },
    { 
      name: "AFE BABALOLA", 
      image: afebabalolaImg, 
      website: "https://www.abuad.edu.ng",
      alt: "Afe Babalola University"
    }
  ], []);

  const testimonials = useMemo(() => [
    { 
      name: "Oluwaseun Adebayo", 
      role: "Medical Student, UNILAG", 
      quote: "JEO Digital Solutions transformed my JAMB preparation. Their CBT training was exceptional and I scored 287!", 
      rating: 5 
    },
    { 
      name: "Emmanuel Okafor", 
      role: "Engineering Student, UNN", 
      quote: "The admission processing service was seamless. They secured my admission into UNN within weeks. Highly recommended!", 
      rating: 5 
    },
    { 
      name: "Fatima Bello", 
      role: "Web Developer", 
      quote: "I learned web development in just 3 months. Now I'm working as a freelance developer. Thank you JEO Digital!", 
      rating: 5 
    }
  ], []);

  // Optimized scroll handler with Intersection Observer
  useEffect(() => {
    const sections = ['mission', 'journey', 'values', 'team', 'impact'];
    
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ 
                ...prev, 
                [entry.target.id]: true 
              }));
            }
          });
        },
        { 
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px'
        }
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
    } else {
      // Fallback for older browsers
      const handleScroll = () => {
        sections.forEach(sectionId => {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
              setIsVisible(prev => ({ ...prev, [sectionId]: true }));
            }
          }
        });
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  // Handle smooth scroll for navigation
  const handleSmoothScroll = useCallback((e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Skip to main content link - Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary-500 focus:text-white focus:p-4 focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Hero Section with Parallax */}
      <section 
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0 w-full h-full" aria-hidden="true">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
          <div className="absolute bottom-0 right-20 w-96 h-96 bg-secondary-600 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float animation-delay-6000"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" aria-hidden="true"></span>
              <span className="text-sm text-gray-300">Since 2010</span>
            </div>
            <h1 id="hero-title" className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                About JEO Digital
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Empowering the next generation through innovative technology and quality education
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Wrapper */}
      <div id="main-content">
        {/* Mission & Vision Section */}
        <section id="mission" className="py-20 px-4" aria-labelledby="mission-title">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
              >
                <div className="flex justify-center mb-4" aria-hidden="true">
                  <Icons.Mission />
                </div>
                <h2 id="mission-title" className="text-2xl md:text-3xl font-bold mb-4 text-center">Our Mission</h2>
                <p className="text-gray-300 leading-relaxed text-center">
                  To bridge the digital divide by providing accessible, quality technology education and guidance services that empower students and professionals to achieve their academic and career goals.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-primary-500 font-semibold text-center">Our Commitment:</p>
                  <ul className="text-gray-400 text-sm mt-2 space-y-1 text-center">
                    <li>✓ 100% Student Satisfaction Guaranteed</li>
                    <li>✓ Continuous Support &amp; Guidance</li>
                    <li>✓ Quality Education at Affordable Rates</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-secondary-500/10 to-primary-500/10 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
              >
                <div className="flex justify-center mb-4" aria-hidden="true">
                  <Icons.Vision />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Our Vision</h2>
                <p className="text-gray-300 leading-relaxed text-center">
                  To become Africa's leading educational technology hub, recognized globally for excellence in transforming lives through innovative learning solutions.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-secondary-500 font-semibold text-center">Our Goal:</p>
                  <ul className="text-gray-400 text-sm mt-2 space-y-1 text-center">
                    <li>🌟 Reach 1 Million Students by 2030</li>
                    <li>🌟 Become Africa's #1 EdTech Platform</li>
                    <li>🌟 Revolutionize Education Through Technology</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="impact" className="py-20 px-4 bg-gradient-to-b from-transparent to-white/5" aria-labelledby="impact-title">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 id="impact-title" className="section-title text-3xl md:text-4xl">Our Impact in Numbers</h2>
              <p className="section-subtitle text-base md:text-lg text-gray-400">
                Making a difference through measurable results
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="card text-center hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  role="article"
                  aria-label={`${stat.value} ${stat.label}`}
                  tabIndex={0}
                >
                  <div className="flex justify-center mb-3 text-primary-500" aria-hidden="true">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary-500">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section id="values" className="py-20 px-4" aria-labelledby="values-title">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 id="values-title" className="section-title text-3xl md:text-4xl">Our Core Values</h2>
              <p className="section-subtitle text-base md:text-lg text-gray-400">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-gradient-to-br ${value.color} rounded-2xl p-6 border border-white/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  role="article"
                  tabIndex={0}
                >
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">{value.title}</h3>
                  <p className="text-gray-400 text-sm text-center">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section id="journey" className="py-20 px-4 bg-gradient-to-b from-white/5 to-transparent" aria-labelledby="journey-title">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 id="journey-title" className="section-title text-3xl md:text-4xl">Our Journey</h2>
              <p className="section-subtitle text-base md:text-lg text-gray-400">
                Milestones that shaped our story
              </p>
            </motion.div>

            <div className="relative" role="list">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-500 to-secondary-500 hidden md:block" aria-hidden="true"></div>
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative mb-12 ${idx % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:text-left'}`}
                  role="listitem"
                >
                  <div className={`flex ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-4`}>
                    <div className={`hidden md:block w-1/2 ${idx % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <div className="bg-dark-100/50 rounded-2xl p-6 border border-white/10 hover:scale-105 transition-all duration-300">
                        <div className="flex justify-center mb-2" aria-hidden="true">{milestone.icon}</div>
                        <div className="text-primary-500 font-bold text-sm text-center">{milestone.year}</div>
                        <h3 className="text-xl font-bold mt-2 text-center">{milestone.title}</h3>
                        <p className="text-gray-400 text-sm mt-2 text-center">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="md:hidden w-full mb-4">
                      <div className="bg-dark-100/50 rounded-2xl p-6 border border-white/10">
                        <div className="flex justify-center mb-2" aria-hidden="true">{milestone.icon}</div>
                        <div className="text-primary-500 font-bold text-sm text-center">{milestone.year}</div>
                        <h3 className="text-xl font-bold mt-2 text-center">{milestone.title}</h3>
                        <p className="text-gray-400 text-sm mt-2 text-center">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary-500 text-white font-bold z-10" aria-hidden="true">
                      {idx + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section id="team" className="py-20 px-4" aria-labelledby="team-title">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 id="team-title" className="section-title text-3xl md:text-4xl">Meet Our Expert Team</h2>
              <p className="section-subtitle text-base md:text-lg text-gray-400">
                Dedicated professionals committed to your success
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-dark-100/80 to-dark-200/50 rounded-2xl p-6 border border-white/10 backdrop-blur-sm text-center hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  role="article"
                  aria-label={`${member.name} - ${member.position}`}
                  tabIndex={0}
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary-500/50">
                    <img 
                      src={member.image} 
                      alt={`${member.name} - ${member.position}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width="128"
                      height="128"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-primary-500 text-sm mb-3">{member.position}</p>
                  <p className="text-gray-400 text-sm mb-4">{member.location}</p>
                  
                  {/* Social Icons with Accessibility */}
                  <div className="flex justify-center gap-4 pt-4 border-t border-white/10" role="group" aria-label="Social media links">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
                      aria-label={`${member.name}'s GitHub profile`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      href={member.email}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-300 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-red-400 rounded-full p-1"
                      aria-label={`Email ${member.name}`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-white/5 to-transparent" aria-labelledby="testimonials-title">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 id="testimonials-title" className="section-title text-3xl md:text-4xl">What People Say</h2>
              <p className="section-subtitle text-base md:text-lg text-gray-400">
                Real stories from our students and partners
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="card p-6 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  role="article"
                  aria-label={`Testimonial from ${testimonial.name}`}
                  tabIndex={0}
                >
                  <div className="flex justify-center gap-1 mb-4" role="img" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icons.Star key={i} />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-4 text-center">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center" aria-hidden="true">
                      <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-20 px-4" aria-labelledby="partners-title">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 id="partners-title" className="section-title text-3xl md:text-4xl">Our Partners</h2>
              <p className="section-subtitle text-base md:text-lg text-gray-400">
                Trusted by leading institutions and organizations
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partners.map((partner, idx) => (
                <motion.a
                  key={idx}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/5 rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 cursor-pointer group border border-white/10 hover:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label={`Visit ${partner.name} website (opens in new tab)`}
                >
                  <div className="w-full h-24 mb-3 flex items-center justify-center overflow-hidden rounded-lg bg-white/5">
                    <img 
                      src={partner.image} 
                      alt={partner.alt}
                      className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      width="200"
                      height="96"
                    />
                  </div>
                  <p className="text-white font-semibold text-sm group-hover:text-primary-500 transition-colors">
                    {partner.name}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Partner Institution</p>
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-primary-500 text-xs">Visit Website →</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4" aria-labelledby="cta-title">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl p-12 backdrop-blur-sm border border-white/10"
            >
              <h2 id="cta-title" className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Join thousands of successful students who have trusted JEO Digital Solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white hover:opacity-90 transition inline-block focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  Get Started Today
                </Link>
                <Link 
                  to="/services" 
                  className="px-8 py-3 bg-white/10 border border-primary-500 rounded-lg font-semibold text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 inline-block focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  Explore Our Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;