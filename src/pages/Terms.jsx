import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms of Service | JEO Digital Solutions';
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
                Terms of Service
              </span>
            </h1>
            <p className="text-gray-400 text-sm">Last Updated: July 2026</p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing or using our website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Our Services</h2>
              <p className="mb-3">JEO Digital Solutions provides the following services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Web Development:</strong> Custom website and web application development</li>
                <li><strong>Cloud Solutions:</strong> Cloud infrastructure, migration, and management</li>
                <li><strong>Mobile App Development:</strong> Native and cross-platform mobile applications</li>
                <li><strong>AI / Machine Learning Services:</strong> AI-powered solutions and ML implementations</li>
                <li><strong>Cybersecurity Services:</strong> Security assessments, penetration testing, and compliance</li>
              </ul>
              <p className="mt-3 text-gray-400 text-sm">We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
              
              <h3 className="text-xl font-semibold text-primary-400 mb-3">3.1 Account Registration</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Update your information promptly</li>
                <li>Keep your login credentials secure</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-400 mt-4 mb-3">3.2 Account Termination</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You violate these Terms of Service</li>
                <li>You provide false or misleading information</li>
                <li>We suspect fraudulent or illegal activity</li>
                <li>We receive a court order to do so</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. User Responsibilities</h2>
              
              <h3 className="text-xl font-semibold text-primary-400 mb-3">4.1 Acceptable Use</h3>
              <p className="mb-3">You agree to use our services only for lawful purposes and in compliance with all applicable laws. You must not:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use our services for illegal activities</li>
                <li>Transmit harmful or malicious code</li>
                <li>Interfere with the operation of our website or services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our services to harass, abuse, or harm others</li>
                <li>Infringe on intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-primary-400 mb-3">5.1 Our Content</h3>
              <p>All content on our website, including text, graphics, logos, images, software, and code, is the property of JEO Digital Solutions and is protected by copyright, trademark, and other intellectual property laws.</p>

              <h3 className="text-xl font-semibold text-primary-400 mt-4 mb-3">5.2 Your Content</h3>
              <p>You retain ownership of content you submit. However, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, and reproduce your content as necessary to provide our services.</p>

              <h3 className="text-xl font-semibold text-primary-400 mt-4 mb-3">5.3 Trademarks</h3>
              <p>"JEO Digital Solutions" and our logo are trademarks of JEO Digital Solutions. You may not use our trademarks without prior written consent.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Payment and Fees</h2>
              
              <h3 className="text-xl font-semibold text-primary-400 mb-3">6.1 Service Fees</h3>
              <p>All fees for our services are stated in Naira (₦) unless otherwise noted. Fees are subject to change with 30 days' notice.</p>

              <h3 className="text-xl font-semibold text-primary-400 mt-4 mb-3">6.2 Payment Terms</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Payment is required before services are rendered (unless otherwise agreed)</li>
                <li>We accept bank transfers, card payments, and USSD</li>
                <li>Late payments may incur interest charges</li>
                <li>All payments are non-refundable unless otherwise stated</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
              
              <h3 className="text-xl font-semibold text-primary-400 mb-3">7.1 No Warranty</h3>
              <p>Our services are provided "as is" and "as available." We make no warranties, express or implied, regarding fitness for a particular purpose, uninterrupted or error-free service, accuracy of results, or security of data.</p>

              <h3 className="text-xl font-semibold text-primary-400 mt-4 mb-3">7.2 Limitation of Liability</h3>
              <p>To the maximum extent permitted by law, JEO Digital Solutions shall not be liable for indirect, incidental, or consequential damages; loss of profits, revenue, or business opportunities; data loss or corruption; or damages exceeding the total fees paid in the previous 12 months.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Governing Law</h2>
              <p>These Terms are governed by the laws of <strong>Nigeria</strong>. Any disputes arising from these Terms shall be resolved in the courts of Nigeria.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Information</h2>
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

export default Terms;