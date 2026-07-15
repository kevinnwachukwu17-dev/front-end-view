// ============================================================
// NAVBAR - PRODUCTION READY
// ============================================================

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// CUSTOM HOOKS
// ============================================================

// Hook: Handle scroll with debounce
const useScrollHandler = (threshold = 20) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
};

// Hook: Handle click outside
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
};

// ============================================================
// NAVIGATION DATA
// ============================================================

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

const QUICK_LINKS = [
  // Services
  { label: 'WAEC | NECO | JAMB | GCE', sectionId: 'services-section', path: '/services' },
  { label: 'JAMB "RUNS" | PROCESSING', sectionId: 'services-section', path: '/services' },
  { label: 'Admission Processing', sectionId: 'services-section', path: '/services' },
  { label: 'Computer Training', sectionId: 'services-section', path: '/services' },
  { label: 'General Computer Services', sectionId: 'services-section', path: '/services' },
  { label: 'Lesson & Coaching', sectionId: 'services-section', path: '/services' },
  { label: 'Web Development', sectionId: 'services-section', path: '/services' },
  { label: 'Cloud Solutions', sectionId: 'services-section', path: '/services' },
  { label: 'Mobile Development', sectionId: 'services-section', path: '/services' },
  { label: 'AI & Machine Learning', sectionId: 'services-section', path: '/services' },
  { label: 'Cybersecurity', sectionId: 'services-section', path: '/services' },
  { label: 'Digital Analytics', sectionId: 'services-section', path: '/services' },
  { label: 'Student Testimonials', sectionId: 'testimonials-section', path: '/' },
  { label: 'View Team Members', sectionId: 'team-section', path: '/' },
];

// Group quick links for display
const QUICK_LINKS_GROUPS = [
  {
    title: '📚 Our Services',
    icon: '📚',
    items: QUICK_LINKS.filter(link => link.path === '/services')
  },
  {
    title: '⭐ Testimonials',
    icon: '⭐',
    items: QUICK_LINKS.filter(link => link.path === '/' && link.label.includes('Testimonials'))
  },
  {
    title: '👥 Team',
    icon: '👥',
    items: QUICK_LINKS.filter(link => link.path === '/' && link.label.includes('Team'))
  }
];

// ============================================================
// SUB-COMPONENTS
// ============================================================

// Logo Component
const Logo = () => (
  <Link to="/" className="flex items-center space-x-2 md:space-x-3 group shrink-0">
    <div className="relative flex items-center">
      <div className="bg-white rounded-xl md:rounded-2xl p-1.5 md:p-2 shadow-lg transition-all duration-300 group-hover:shadow-primary-500/30">
        <img 
          src="/jeods_logo1.jpg" 
          alt="JEO Digital Solutions - Home" 
          className="h-10 md:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105"
          width="56"
          height="56"
        />
      </div>
      <div className="absolute inset-0 rounded-xl md:rounded-2xl ring-2 ring-primary-500/30 group-hover:ring-primary-500/60 transition-all duration-300 pointer-events-none"></div>
    </div>
    
    <div className="flex flex-col justify-center">
      <span className="text-lg md:text-2xl font-bold leading-tight">
        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
          JEO
        </span>
        <span className="text-white group-hover:text-primary-500 transition-colors">
          Digital
        </span>
      </span>
      <span className="text-xs text-primary-500/80 hidden sm:block font-semibold leading-tight">Solutions</span>
    </div>
  </Link>
);

// Navigation Link Component
const NavLink = ({ item, location }) => {
  const isActive = location.pathname === item.path;
  
  return (
    <Link
      to={item.path}
      className={`px-4 py-2 text-base font-semibold rounded-lg transition-all duration-300 relative group focus:outline-none focus:ring-2 focus:ring-primary-500 ${
        isActive 
          ? 'text-primary-500' 
          : 'text-gray-300 hover:text-white'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {item.label}
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
};

// Quick Links Dropdown Component
const QuickLinksDropdown = ({ isOpen, setIsOpen, dropdownRef }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuickLinkClick = useCallback((path, sectionId) => {
    setIsOpen(false);
    
    if (location.pathname !== path) {
      // Navigate to the page first, then scroll after navigation
      navigate(path);
      // Use a small delay to allow navigation to complete
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // Scroll to section on same page
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [navigate, location]);

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`px-4 py-2 text-base font-semibold rounded-lg transition-all duration-300 text-gray-300 hover:text-white flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-primary-500 ${
          isOpen ? 'text-white' : ''
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Quick links menu"
      >
        Quick Links
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-72 bg-dark-100/95 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden z-50"
            role="menu"
            aria-label="Quick links"
          >
            <div className="max-h-96 overflow-y-auto">
              {QUICK_LINKS_GROUPS.map((group, groupIdx) => (
                <div key={groupIdx} className="p-2 border-b border-white/10 last:border-b-0">
                  <div className="px-3 py-2 text-xs font-semibold text-primary-500 uppercase tracking-wider">
                    {group.title}
                  </div>
                  {group.items.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickLinkClick(link.path, link.sectionId)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                      role="menuitem"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Menu Component
const MobileMenu = ({ isOpen, setIsOpen, location }) => {
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileTestimonialsOpen, setMobileTestimonialsOpen] = useState(false);
  const [mobileTeamOpen, setMobileTeamOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, setIsOpen]);

  // Trap focus inside menu
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen]);

  const handleNavClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleQuickLinkClick = (path, sectionId) => {
    setIsOpen(false);
    navigate(path);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          <div className="py-4 space-y-2 border-t border-white/10 mt-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`block w-full text-left px-4 py-3 text-base font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    isActive 
                      ? 'bg-primary-500/20 text-primary-500' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
            
            {/* Mobile Quick Links */}
            <div className="mt-4">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-primary-500 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-expanded={mobileServicesOpen}
                aria-label="Toggle services menu"
              >
                <span>📚 Our Services</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    role="group"
                    aria-label="Services quick links"
                  >
                    <div className="pl-6 py-2 space-y-1">
                      {QUICK_LINKS_GROUPS[0].items.map((link, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickLinkClick(link.path, link.sectionId)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <button
                onClick={() => setMobileTestimonialsOpen(!mobileTestimonialsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-primary-500 rounded-lg hover:bg-white/10 transition-colors mt-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-expanded={mobileTestimonialsOpen}
                aria-label="Toggle testimonials menu"
              >
                <span>⭐ Testimonials</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${mobileTestimonialsOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {mobileTestimonialsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    role="group"
                    aria-label="Testimonials quick links"
                  >
                    <div className="pl-6 py-2 space-y-1">
                      {QUICK_LINKS_GROUPS[1].items.map((link, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickLinkClick(link.path, link.sectionId)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <button
                onClick={() => setMobileTeamOpen(!mobileTeamOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-primary-500 rounded-lg hover:bg-white/10 transition-colors mt-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-expanded={mobileTeamOpen}
                aria-label="Toggle team menu"
              >
                <span>👥 Team</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${mobileTeamOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {mobileTeamOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    role="group"
                    aria-label="Team quick links"
                  >
                    <div className="pl-6 py-2 space-y-1">
                      {QUICK_LINKS_GROUPS[2].items.map((link, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickLinkClick(link.path, link.sectionId)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => handleNavClick('/login')}
                className="px-4 py-3 text-base font-semibold rounded-lg border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-colors text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Login
              </button>
              <button
                onClick={() => handleNavClick('/register')}
                className="px-4 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:opacity-90 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Sign Up
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================
// MAIN NAVBAR COMPONENT
// ============================================================

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const scrolled = useScrollHandler(20);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => setIsQuickLinksOpen(false));

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  // Memoize navbar classes
  const navbarClasses = useMemo(() => {
    const base = 'fixed w-full z-50 transition-all duration-300';
    const position = 'top-0';
    const style = scrolled 
      ? 'bg-dark-100/95 backdrop-blur-md shadow-lg border-b border-white/10' 
      : 'bg-dark-100/80 backdrop-blur-sm';
    return `${base} ${position} ${style}`;
  }, [scrolled]);

  return (
    <nav 
      className={navbarClasses}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.path} item={item} location={location} />
              ))}
              
              {/* Quick Links Dropdown */}
              <QuickLinksDropdown 
                isOpen={isQuickLinksOpen}
                setIsOpen={setIsQuickLinksOpen}
                dropdownRef={dropdownRef}
              />
            </div>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            <Link 
              to="/login" 
              className="px-4 py-2 text-base font-semibold rounded-lg border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 text-base font-semibold rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:opacity-90 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Sign Up
            </Link>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors focus:ring-2 focus:ring-primary-500"
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div id="mobile-menu">
          <MobileMenu 
            isOpen={isMobileOpen}
            setIsOpen={setIsMobileOpen}
            location={location}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;