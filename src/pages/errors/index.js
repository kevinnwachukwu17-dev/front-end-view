import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProfessionalChatbot from './components/ProfessionalChatbot';
import ErrorBoundary from './components/ErrorBoundary';

// Main Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import IELTS from './pages/IELTS';

// Legal Pages
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';

// Error Pages
import {
  NotFound,
  ServerError,
  Maintenance,
  Forbidden,
  NetworkError,
  ServiceUnavailable,
  PaymentRequired,
  TimeoutError,
  TooManyRequests
} from './pages/errors';

// ============================================================
// SCROLL TO TOP
// ============================================================
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ============================================================
// LAYOUT WRAPPER - Hides Navbar/Footer on Error Pages
// ============================================================
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isErrorPage = location.pathname.startsWith('/error');
  
  return (
    <div className="flex flex-col min-h-screen">
      {!isErrorPage && <Navbar />}
      <main className={`flex-grow ${!isErrorPage ? 'pt-16 md:pt-20' : ''}`}>
        {children}
      </main>
      {!isErrorPage && <Footer />}
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleChatTrigger = () => {
    setIsChatOpen(true);
  };

  if (!isOnline) {
    return <NetworkError />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <LayoutWrapper>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/ielts" element={<IELTS />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Legal Pages */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            
            {/* Error Pages - No Navbar/Footer */}
            <Route path="/error/404" element={<NotFound />} />
            <Route path="/error/500" element={<ServerError />} />
            <Route path="/error/503" element={<Maintenance />} />
            <Route path="/error/403" element={<Forbidden />} />
            <Route path="/error/network" element={<NetworkError />} />
            <Route path="/error/unavailable" element={<ServiceUnavailable />} />
            <Route path="/error/402" element={<PaymentRequired />} />
            <Route path="/error/408" element={<TimeoutError />} />
            <Route path="/error/429" element={<TooManyRequests />} />
            
            {/* Catch-all - MUST BE LAST */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LayoutWrapper>
        
        {/* Global Chatbot */}
        <ProfessionalChatbot 
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onOpen={() => setIsChatOpen(true)}
        />
        
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
            },
          }}
        />
      </Router>
    </ErrorBoundary>
  );
}

export default App;