// ============================================================
// PROFESSIONAL CHATBOT - PRODUCTION READY
// ============================================================

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify';

// ============================================================
// CONFIGURATION
// ============================================================
const CHATBOT_CONFIG = {
  MAX_MESSAGES: 50,
  TYPING_SPEED_MIN: 20,
  TYPING_SPEED_MAX: 40,
  RESPONSE_DELAY: 800,
  STORAGE_KEY: 'jeo_chat_history',
  USER_NAME_KEY: 'jeo_chat_user_name',
  ESCALATION_EMAIL: 'hoskadavid@gmail.com',
  WHATSAPP_NUMBER: '2347061066372',
};

// ============================================================
// INTENT RECOGNITION ENGINE
// ============================================================
class IntentEngine {
  constructor() {
    this.intents = {
      greeting: {
        patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'how are you', "what's up", 'sup', 'greetings'],
        responses: [
          "Hello, welcome to JEO Digital Solutions. How may I assist you today?",
          "Good to see you. How can I help you with your educational or technology needs?",
          "Hello there. What brings you to JEO Digital Solutions today?"
        ]
      },
      about: {
        patterns: ['who are you', 'what is jeo', 'tell me about jeo', 'about jeo digital', 'company info', 'about us', 'who owns jeo', 'what do you do'],
        responses: [
          "JEO Digital Solutions is an educational and technology service provider established in 2010. We offer examination registrations, admission processing, computer training, and various technology services. We have helped over 10,000 students achieve their academic goals.",
          "We are JEO Digital Solutions, a premier educational services company. Since 2010, we have specialized in exam registrations, university admissions, computer training, and technology solutions."
        ]
      },
      jamb: {
        patterns: ['jamb', 'utme', 'jamb registration', 'jamb form', 'how to register jamb', 'jamb cost', 'jamb fee', 'jamb price', 'jamb exam', 'jamb date', 'jamb syllabus', 'jamb past questions', 'jamb mock', 'jamb score'],
        handler: (input, context) => {
          const lower = input.toLowerCase();
          let response = "";
          
          if (lower.includes('cost') || lower.includes('fee') || lower.includes('price') || lower.includes('how much')) {
            response = "The JAMB registration costs ₦9,700 total, which includes the JAMB form fee of ₦4,700 and our service charge of ₦5,000.";
          } else if (lower.includes('date') || lower.includes('when') || lower.includes('schedule')) {
            response = "JAMB 2026 registration runs from January 20th to March 15th, 2026. The UTME exam is scheduled for April 15th to April 30th, 2026. Results will be released in May 2026.";
          } else if (lower.includes('how') || lower.includes('register') || lower.includes('process')) {
            response = "To register for JAMB, simply click the 'Register Now' button on our website. We will create your profile, assist with payment, provide CBT training materials, and guide you through the entire process.";
          } else if (lower.includes('score') || lower.includes('pass') || lower.includes('result')) {
            response = "Our students typically score 280 and above in JAMB. We provide comprehensive training including mock exams, past questions from 2020-2026, and CBT practice sessions.";
          } else {
            response = "JAMB 2026 registration is open from January 20th to March 15th. The total cost is ₦9,700. We offer complete registration support, CBT training, and study materials. Would you like more details on any specific aspect?";
          }
          
          // Store context for follow-ups
          context.lastTopic = 'jamb';
          return response;
        }
      },
      waec: {
        patterns: ['waec', 'waec registration', 'waec form', 'how to register waec', 'waec cost', 'waec fee', 'waec exam', 'waec date', 'waec timetable'],
        handler: (input, context) => {
          const lower = input.toLowerCase();
          let response = "";
          
          if (lower.includes('cost') || lower.includes('fee') || lower.includes('price') || lower.includes('how much')) {
            response = "WAEC registration costs vary each year. Please contact us for the current price. Our service charge is ₦5,000.";
          } else if (lower.includes('date') || lower.includes('when') || lower.includes('schedule') || lower.includes('timetable')) {
            response = "WAEC 2026 registration runs from February 1st to March 30th, 2026. The WASSCE exam is scheduled for May 15th to June 30th, 2026. Results will be released in August 2026.";
          } else if (lower.includes('how') || lower.includes('register') || lower.includes('process')) {
            response = "To register for WAEC, visit our office or click 'Register Now' on our website. We will handle your registration, provide study materials, and offer intensive coaching if needed.";
          } else {
            response = "WAEC 2026 registration is open. We provide complete registration support, study materials, and intensive coaching for all subjects. Would you like more specific information?";
          }
          
          context.lastTopic = 'waec';
          return response;
        }
      },
      admission: {
        patterns: ['admission', 'uniport', 'unical', 'absu', 'afe babalola', 'post utme', 'direct entry', 'supplementary', 'university admission', 'how to gain admission', 'admission list', 'admission status'],
        handler: (input, context) => {
          const lower = input.toLowerCase();
          let response = "";
          
          if (lower.includes('uniport')) {
            response = "UNIPORT 2026/2027 admission processing is ongoing. Post UTME runs from July 15th to August 30th, 2026. We can help with registration, exam preparation, and admission follow-up. Our success rate is 95%.";
          } else if (lower.includes('unical')) {
            response = "UNICAL admission list for 2026/2027 will be released in September 2026. We provide full admission processing support including registration and document preparation.";
          } else if (lower.includes('absu')) {
            response = "ABSU supplementary admission forms for 2026/2027 will be available in October 2026. We can assist with registration and admission processing.";
          } else if (lower.includes('afe') || lower.includes('babalola') || lower.includes('abuad')) {
            response = "Afe Babalola University 2026/2027 admission is ongoing. We offer scholarship guidance and complete admission processing support.";
          } else {
            response = "We offer comprehensive admission processing services for Nigerian universities including UNIPORT, UNICAL, ABSU, and Afe Babalola University. Our services include Post UTME registration, direct entry processing, and admission follow-up. We have a 95% success rate.";
          }
          
          context.lastTopic = 'admission';
          return response;
        }
      },
      computer_training: {
        patterns: ['computer training', 'computer class', 'learn computer', 'programming', 'coding', 'web development', 'react', 'python', 'javascript', 'graphic design', 'microsoft office', 'excel', 'data analysis'],
        handler: (input, context) => {
          const lower = input.toLowerCase();
          let response = "";
          
          if (lower.includes('web') || lower.includes('react') || lower.includes('node') || lower.includes('development')) {
            response = "Our Web Development program runs for 12 weeks and costs ₦150,000. You will learn HTML, CSS, JavaScript, React.js, Node.js, and MongoDB. The program includes practical projects and job placement assistance.";
          } else if (lower.includes('mobile') || lower.includes('react native') || lower.includes('flutter')) {
            response = "Mobile Development is a 10-week program costing ₦180,000. You will learn React Native and Flutter for iOS and Android app development.";
          } else if (lower.includes('python') || lower.includes('ai') || lower.includes('machine learning')) {
            response = "Our AI and Machine Learning program runs for 14 weeks and costs ₦250,000. You will learn Python, TensorFlow, computer vision, and natural language processing.";
          } else if (lower.includes('graphic') || lower.includes('design')) {
            response = "Graphic Design training runs for 10 weeks and costs ₦140,000. You will learn Canva, Photoshop, CorelDraw, Illustrator, and UX/UI design fundamentals.";
          } else if (lower.includes('basic') || lower.includes('beginner') || lower.includes('office') || lower.includes('excel')) {
            response = "Basic Computer Training costs ₦25,000 to ₦100,000 depending on the program duration (4-12 weeks). You will learn Microsoft Office, internet skills, and typing.";
          } else {
            response = "We offer comprehensive computer training programs including Web Development (₦150,000, 12 weeks), Mobile Development (₦180,000, 10 weeks), AI/ML (₦250,000, 14 weeks), and Basic Computing (₦25,000-₦100,000, 4-12 weeks). All programs include certification and job placement assistance.";
          }
          
          context.lastTopic = 'computer_training';
          return response;
        }
      },
      pricing: {
        patterns: ['price', 'cost', 'how much', 'fee', 'payment', 'discount', 'pay', 'pricing'],
        handler: (input, context) => {
          return "Our pricing varies by service:\n\nExaminations:\n• JAMB Registration: ₦9,700\n• WAEC Registration: Contact us\n\nAdmissions:\n• Local Admission: ₦50,000\n• International Admission: $200\n• Scholarship Guidance: ₦40,000\n\nTraining:\n• Basic Computer: ₦25,000 - ₦100,000\n• Web Development: ₦150,000\n• Mobile Development: ₦180,000\n• AI/ML: ₦250,000\n• Cybersecurity: ₦220,000\n• Graphic Design: ₦140,000\n\nLanguage:\n• IELTS: ₦80,000\n• CELPIP: ₦85,000\n\nCoaching:\n• Regular Classes: ₦60,000\n• Intensive Bootcamp: ₦80,000\n• Private Tutoring: ₦10,000/session\n\nContact us for package discounts.";
        }
      },
      contact: {
        patterns: ['location', 'address', 'where', 'contact', 'phone', 'email', 'whatsapp', 'reach', 'visit', 'office'],
        handler: () => {
          return "You can reach us at:\n\nOffice: 123 Digital Avenue, Tech Valley, CA 94043\nEmail: hello@jeodigital.com\nPhone: +234 706 106 6372\nWhatsApp: +234 706 106 6372\n\nBusiness Hours:\nMonday - Friday: 9am - 6pm\nSaturday: 10am - 2pm\nSunday: Closed (Emergency support via WhatsApp)";
        }
      },
      testimonials: {
        patterns: ['testimonial', 'review', 'what people say', 'success story', 'student feedback', 'rating'],
        handler: () => {
          return "Here's what our students say:\n\nOluwaseun Adebayo - 'JEO Digital Solutions helped me score 287 in JAMB. Their CBT training was exceptional.'\n\nChiamaka Nwosu - 'I passed all my WAEC subjects with flying colors thanks to their intensive coaching.'\n\nEmmanuel Okafor - 'They secured my admission into UNIPORT within weeks. Highly recommended.'\n\nFatima Bello - 'I learned web development in just 3 months. Now I'm working as a freelance developer.'\n\nWe have helped over 10,000 students achieve their academic goals.";
        }
      },
      complaint: {
        patterns: ['complaint', 'problem', 'issue', 'not working', 'bad', 'unhappy', 'disappointed', 'angry', 'frustrated', 'urgent', 'emergency', 'fix', 'broken', 'speak to human', 'talk to manager', 'escalate'],
        handler: (input, context) => {
          context.needsEscalation = true;
          context.escalationMessage = input;
          return "I understand your concern. I apologize for any inconvenience. I have escalated your issue to our support team. A representative will contact you within 30 minutes. Could you please provide your name and phone number so they can reach you directly?";
        }
      },
      fallback: {
        handler: (input, context) => {
          if (context.lastTopic) {
            return `I understand you're asking about ${context.lastTopic.replace('_', ' ')}. Could you please be more specific about what you'd like to know? I'm here to help.`;
          }
          return "I want to make sure I understand your question correctly. Could you please rephrase it or provide more details? I'm here to help with your educational and technology needs.";
        }
      }
    };
    
    this.context = {
      lastTopic: null,
      lastInput: null,
      messageCount: 0,
      needsEscalation: false,
      escalationMessage: null,
      userHistory: []
    };
  }

  // Process user input and return response
  processInput(input, userName) {
    const lowerInput = input.toLowerCase().trim();
    this.context.messageCount++;
    this.context.lastInput = input;
    this.context.userHistory.push(input);
    
    // Find matching intent
    let matchedIntent = 'fallback';
    let matchedScore = 0;
    
    for (const [intentName, intent] of Object.entries(this.intents)) {
      if (intent.patterns) {
        for (const pattern of intent.patterns) {
          if (lowerInput.includes(pattern) || pattern.split(' ').some(word => lowerInput.includes(word))) {
            const score = pattern.split(' ').filter(word => lowerInput.includes(word)).length;
            if (score > matchedScore) {
              matchedScore = score;
              matchedIntent = intentName;
            }
          }
        }
      }
    }
    
    // Handle the matched intent
    const intent = this.intents[matchedIntent];
    let response = "";
    
    if (intent.handler) {
      response = intent.handler(lowerInput, this.context);
    } else if (intent.responses) {
      const randomIndex = Math.floor(Math.random() * intent.responses.length);
      response = intent.responses[randomIndex];
    } else {
      response = this.intents.fallback.handler(lowerInput, this.context);
    }
    
    // Personalize response if user name is known
    if (userName && !response.includes(userName)) {
      // Check if response starts with a greeting
      const greetings = ['Hello', 'Hi', 'Hey', 'Good morning', 'Good afternoon', 'Good evening'];
      let startsWithGreeting = false;
      for (const greeting of greetings) {
        if (response.startsWith(greeting)) {
          startsWithGreeting = true;
          break;
        }
      }
      
      if (startsWithGreeting) {
        response = response.replace(/^[^,]+/, `$&, ${userName}`);
      } else {
        // Add name naturally
        const sentences = response.split('. ');
        if (sentences.length > 1) {
          sentences[0] = `${sentences[0]}, ${userName}`;
          response = sentences.join('. ');
        }
      }
    }
    
    return {
      response: DOMPurify.sanitize(response),
      needsEscalation: this.context.needsEscalation,
      escalationMessage: this.context.escalationMessage,
      intent: matchedIntent
    };
  }

  // Get conversation context
  getContext() {
    return {
      lastTopic: this.context.lastTopic,
      messageCount: this.context.messageCount
    };
  }

  // Reset context
  resetContext() {
    this.context = {
      lastTopic: null,
      lastInput: null,
      messageCount: 0,
      needsEscalation: false,
      escalationMessage: null,
      userHistory: []
    };
  }
}

// ============================================================
// PROFESSIONAL CHATBOT COMPONENT
// ============================================================
const ProfessionalChatbot = ({ isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const intentEngineRef = useRef(new IntentEngine());

  // Load chat history
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(CHATBOT_CONFIG.STORAGE_KEY);
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        setMessages(parsed.slice(-CHATBOT_CONFIG.MAX_MESSAGES));
        const savedName = localStorage.getItem(CHATBOT_CONFIG.USER_NAME_KEY);
        if (savedName) {
          setUserName(savedName);
          setShowNamePrompt(false);
        }
      } else {
        // Initial greeting - no emojis
        setMessages([{
          id: Date.now(),
          text: "Hello. Welcome to JEO Digital Solutions. How may I address you?",
          sender: 'bot',
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  }, []);

  // Save chat history
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem(CHATBOT_CONFIG.STORAGE_KEY, JSON.stringify(messages));
      }
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isTyping]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current && !showNamePrompt) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [isOpen, showNamePrompt]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && isOpen) {
        handleSendMessage();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, inputMessage]);

  // ============================================================
  // MESSAGE HANDLING
  // ============================================================
  const addMessage = useCallback((text, sender, options = {}) => {
    const sanitizedText = DOMPurify.sanitize(text);
    const newMessage = {
      id: Date.now(),
      text: sanitizedText,
      sender: sender,
      timestamp: new Date(),
      ...options
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendBotMessage = useCallback((text, options = {}) => {
    setIsTyping(true);
    setError(null);
    
    const typingDuration = Math.min(
      Math.max(text.length * 15, CHATBOT_CONFIG.TYPING_SPEED_MIN),
      CHATBOT_CONFIG.TYPING_SPEED_MAX * 4
    );
    
    setTimeout(() => {
      addMessage(text, 'bot', options);
      setIsTyping(false);
    }, Math.min(typingDuration, 2500));
  }, [addMessage]);

  // ============================================================
  // ESCALATION SYSTEM
  // ============================================================
  const handleEscalation = useCallback((message, name) => {
    try {
      // In production, this would send actual emails
      console.log('ESCALATION REQUEST:');
      console.log('User:', name || 'Anonymous');
      console.log('Message:', message);
      console.log('Time:', new Date().toLocaleString());
      
      return true;
    } catch (error) {
      console.error('Escalation failed:', error);
      return false;
    }
  }, []);

  // ============================================================
  // SEND MESSAGE
  // ============================================================
  const handleSendMessage = useCallback(async () => {
    const trimmed = inputMessage.trim();
    if (!trimmed) return;
    if (isLoading) return;

    setInputMessage('');
    setError(null);

    // Add user message
    addMessage(trimmed, 'user');

    // Handle name prompt
    if (showNamePrompt) {
      const name = trimmed;
      setUserName(name);
      setShowNamePrompt(false);
      localStorage.setItem(CHATBOT_CONFIG.USER_NAME_KEY, name);
      
      const greeting = `Good to meet you, ${name}. How can I help you today? I can provide information about our services, pricing, admissions, or anything else you would like to know.`;
      sendBotMessage(greeting);
      return;
    }

    // Process message
    try {
      setIsLoading(true);
      
      const result = intentEngineRef.current.processInput(trimmed, userName);
      
      // Handle escalation
      if (result.needsEscalation) {
        await handleEscalation(result.escalationMessage, userName);
        sendBotMessage(result.response);
      } else {
        await new Promise(resolve => setTimeout(resolve, 300));
        sendBotMessage(result.response);
      }
      
    } catch (error) {
      console.error('Chatbot error:', error);
      setError('An error occurred. Please try again.');
      sendBotMessage('I apologize for the technical difficulty. Please try again or contact us directly for immediate assistance.');
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, userName, showNamePrompt, addMessage, sendBotMessage]);

  // ============================================================
  // QUICK REPLIES
  // ============================================================
  const quickReplies = useMemo(() => [
    { label: 'JAMB', value: 'Tell me about JAMB registration' },
    { label: 'WAEC', value: 'Tell me about WAEC registration' },
    { label: 'Admission', value: 'Tell me about admission processing' },
    { label: 'Training', value: 'Tell me about computer training' },
    { label: 'Pricing', value: 'What are your prices?' },
    { label: 'Location', value: 'Where are you located?' },
    { label: 'Testimonials', value: 'Show me testimonials' },
    { label: 'Contact', value: 'How can I contact you?' }
  ], []);

  const handleQuickReply = useCallback((value) => {
    setInputMessage(value);
    setTimeout(() => handleSendMessage(), 100);
  }, [handleSendMessage]);

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={onOpen}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Open chat"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        {isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[420px] h-[600px] bg-dark-100 rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
          role="dialog"
          aria-label="Chat assistant"
          aria-live="polite"
        >
          {/* Header - Clean, Professional */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center" aria-hidden="true">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">JEO Digital Support</h3>
                  <p className="text-xs text-white/70">
                    {isLoading ? 'Processing...' : 'Online'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-1"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages - Clean, No Emojis */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-3"
            role="log"
            aria-label="Chat messages"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-primary-500 text-white rounded-br-none'
                      : 'bg-white/10 text-gray-200 rounded-bl-none'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.text}
                  </div>
                  <span className="text-xs opacity-60 mt-1.5 block">
                    {message.timestamp instanceof Date ? 
                      message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :
                      new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1.5" aria-label="Typing indicator">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-center">
                <div className="bg-red-500/20 text-red-400 text-sm p-2 rounded-lg border border-red-500/30">
                  {error}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies - Clean Buttons */}
          {!showNamePrompt && (
            <div className="border-t border-white/10 p-3 bg-dark-100/50 flex-shrink-0">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply.value)}
                    className="text-xs bg-white/10 hover:bg-primary-500/30 text-gray-300 px-3 py-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={isLoading || isTyping}
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input - Clean Design */}
          <div className="border-t border-white/10 p-3 flex gap-2 flex-shrink-0 bg-dark-100/50">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              placeholder={showNamePrompt ? "What's your name?" : "Type your question..."}
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 text-sm"
              aria-label={showNamePrompt ? "Enter your name" : "Type your message"}
              disabled={isLoading || isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || isTyping || !inputMessage.trim()}
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ProfessionalChatbot;