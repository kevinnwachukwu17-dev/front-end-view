import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy | JEO Digital Solutions';
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            <p className="text-gray-400 text-sm">Last Updated: July 2026</p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-gray-300">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                JEO Digital Solutions ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-primary-400 mb-3">2.1 Personal Information You Provide</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Contact Information:</strong> Full name, email address, phone number</li>
                <li><strong>Service Preferences:</strong> Information about services you are interested in</li>
                <li><strong>Communication Data:</strong> Messages sent via contact forms, chatbot interactions, and email correspondence</li>
                <li><strong>Registration Data:</strong> Information provided when registering for our services</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-400 mt-4 mb-3">2.2 Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Usage Data:</strong> Pages visited, time spent, links clicked</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                <li><strong>Location Data:</strong> General geographic location based on IP address</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-400 mt-4 mb-3">2.3 Information from Third Parties</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Social media platforms (when you interact with our social media profiles)</li>
                <li>Analytics providers (Google Analytics)</li>
                <li>Advertising partners</li>
              </ul>
            </section>

            {/* How We Collect Information */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Collect Information</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Contact Forms:</strong> When you submit inquiries through our website</li>
                <li><strong>Chatbot Interactions:</strong> When you interact with our AI assistant</li>
                <li><strong>Newsletter Signups:</strong> When you subscribe to our mailing list</li>
                <li><strong>Service Registrations:</strong> When you register for our services</li>
                <li><strong>Cookies and Tracking Technologies:</strong> As described in our Cookie Policy</li>
                <li><strong>Direct Communication:</strong> When you email or call us</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Provide Services:</strong> Process registrations, deliver our services, and manage your account</li>
                <li><strong>Communicate:</strong> Respond to inquiries, send service updates, and provide customer support</li>
                <li><strong>Marketing:</strong> Send promotional materials (you may opt out at any time)</li>
                <li><strong>Improve Services:</strong> Analyze usage patterns to enhance user experience</li>
                <li><strong>Legal Compliance:</strong> Fulfill legal obligations and prevent fraud</li>
                <li><strong>Personalization:</strong> Tailor content and recommendations to your preferences</li>
              </ul>
            </section>

            {/* Legal Basis */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Legal Basis for Processing (GDPR Compliance)</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Consent:</strong> Where you have given explicit consent (e.g., newsletter subscription)</li>
                <li><strong>Contract:</strong> To fulfill our contractual obligations (e.g., service delivery)</li>
                <li><strong>Legitimate Interest:</strong> For business purposes that do not override your rights</li>
                <li><strong>Legal Obligation:</strong> Where required by law (e.g., tax records)</li>
              </ul>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Data Protection Measures</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Encryption:</strong> SSL/TLS encryption for data transmission</li>
                <li><strong>Access Controls:</strong> Restricted access to personal data</li>
                <li><strong>Secure Storage:</strong> Data stored on secure servers with firewalls</li>
                <li><strong>Regular Audits:</strong> Periodic security assessments and vulnerability testing</li>
                <li><strong>Staff Training:</strong> All employees are trained on data protection practices</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Data Retention</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Active Users:</strong> Duration of your engagement with our services</li>
                <li><strong>Financial Records:</strong> As required by tax laws (typically 7 years)</li>
                <li><strong>Marketing Data:</strong> Until you unsubscribe or request deletion</li>
                <li><strong>Legal Compliance:</strong> As required by applicable laws and regulations</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Your Rights</h2>
              <p className="mb-3">Under NDPR (Nigeria Data Protection Regulation) and GDPR, you have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your data ("Right to be forgotten")</li>
                <li><strong>Restriction:</strong> Limit how we use your data</li>
                <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to data processing for marketing purposes</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time (where applicable)</li>
              </ul>
              <p className="mt-3">To exercise these rights, contact us at: <a href="mailto:hello@jeodigital.com" className="text-primary-500 hover:text-primary-400 transition-colors">hello@jeodigital.com</a></p>
            </section>

            {/* Third-Party Sharing */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Third-Party Sharing</h2>
              <p className="mb-3">We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Third-party vendors who assist in service delivery</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In the event of merger, acquisition, or sale</li>
              </ul>
              <p className="mt-3">We do not sell your personal data to third parties.</p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Information</h2>
              <p className="mb-2">For privacy-related questions, concerns, or to exercise your rights, please contact:</p>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="font-semibold text-white">JEO Digital Solutions</p>
                <p className="text-gray-400">Email: <a href="mailto:hello@jeodigital.com" className="text-primary-500 hover:text-primary-400 transition-colors">hello@jeodigital.com</a></p>
                <p className="text-gray-400">Phone: +234 706 106 6372</p>
                <p className="text-gray-400">Address: No 1 Nicholas street, By Brass Junction, Aba, Abia State, Nigeria.</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;