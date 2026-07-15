import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Cookies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Cookie Policy | JEO Digital Solutions';
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
                Cookie Policy
              </span>
            </h1>
            <p className="text-gray-400 text-sm">Last Updated: July 2026</p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies?</h2>
              <p className="leading-relaxed">
                Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, understand how you use the site, and improve your experience.
              </p>
              <p className="mt-3">Cookies can be:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain on your device for a set period</li>
                <li><strong>First-Party Cookies:</strong> Set by our website</li>
                <li><strong>Third-Party Cookies:</strong> Set by external services (e.g., Google Analytics)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Types of Cookies We Use</h2>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-4">
                <h3 className="text-xl font-semibold text-primary-400 mb-2">2.1 Essential Cookies (Necessary)</h3>
                <p className="text-gray-400 text-sm">These cookies are required for our website to function properly.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                  <li><strong>Purpose:</strong> Enable basic features like page navigation and secure access</li>
                  <li><strong>Examples:</strong> Session cookies, authentication cookies</li>
                  <li><strong>Consent Required:</strong> No (exempt from consent requirements)</li>
                  <li><strong>Duration:</strong> Session-based</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-4">
                <h3 className="text-xl font-semibold text-primary-400 mb-2">2.2 Functional Cookies</h3>
                <p className="text-gray-400 text-sm">These cookies enhance your experience by remembering your preferences.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                  <li><strong>Purpose:</strong> Remember language preferences, form data, and user settings</li>
                  <li><strong>Examples:</strong> Preference cookies, user interface customization</li>
                  <li><strong>Consent Required:</strong> Yes</li>
                  <li><strong>Duration:</strong> Up to 12 months</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-4">
                <h3 className="text-xl font-semibold text-primary-400 mb-2">2.3 Analytics Cookies</h3>
                <p className="text-gray-400 text-sm">These cookies help us understand how visitors use our website.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                  <li><strong>Purpose:</strong> Track page visits, time on site, and user interactions</li>
                  <li><strong>Examples:</strong> Google Analytics cookies (_ga, _gid, _gat)</li>
                  <li><strong>Consent Required:</strong> Yes</li>
                  <li><strong>Duration:</strong> Up to 24 months</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-4">
                <h3 className="text-xl font-semibold text-primary-400 mb-2">2.4 Marketing Cookies</h3>
                <p className="text-gray-400 text-sm">These cookies are used to deliver relevant advertisements.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                  <li><strong>Purpose:</strong> Track user behavior to show personalized ads</li>
                  <li><strong>Examples:</strong> Advertising cookies from Facebook, Google Ads</li>
                  <li><strong>Consent Required:</strong> Yes</li>
                  <li><strong>Duration:</strong> Up to 24 months</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-primary-400 mb-2">2.5 Social Media Cookies</h3>
                <p className="text-gray-400 text-sm">These cookies enable social media integration.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                  <li><strong>Purpose:</strong> Allow sharing content on social platforms</li>
                  <li><strong>Examples:</strong> Social media plugins</li>
                  <li><strong>Consent Required:</strong> Yes</li>
                  <li><strong>Duration:</strong> Up to 24 months</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Cookies</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Remember Your Preferences:</strong> Language settings, form data</li>
                <li><strong>Analyze Website Usage:</strong> Improve user experience and content</li>
                <li><strong>Deliver Targeted Content:</strong> Show relevant information</li>
                <li><strong>Enable Social Media Integration:</strong> Share content on social platforms</li>
                <li><strong>Measure Marketing Effectiveness:</strong> Understand how you find us</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Specific Cookies Used</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="p-3 text-left text-white">Cookie Name</th>
                      <th className="p-3 text-left text-white">Type</th>
                      <th className="p-3 text-left text-white">Purpose</th>
                      <th className="p-3 text-left text-white">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="p-3">session_id</td>
                      <td className="p-3">Essential</td>
                      <td className="p-3">Maintains your session</td>
                      <td className="p-3">Session</td>
                    </tr>
                    <tr>
                      <td className="p-3">csrf_token</td>
                      <td className="p-3">Essential</td>
                      <td className="p-3">Protects against CSRF attacks</td>
                      <td className="p-3">Session</td>
                    </tr>
                    <tr>
                      <td className="p-3">language_preference</td>
                      <td className="p-3">Functional</td>
                      <td className="p-3">Stores language selection</td>
                      <td className="p-3">12 months</td>
                    </tr>
                    <tr>
                      <td className="p-3">cookie_consent</td>
                      <td className="p-3">Functional</td>
                      <td className="p-3">Records cookie consent status</td>
                      <td className="p-3">12 months</td>
                    </tr>
                    <tr>
                      <td className="p-3">_ga</td>
                      <td className="p-3">Analytics</td>
                      <td className="p-3">Google Analytics</td>
                      <td className="p-3">24 months</td>
                    </tr>
                    <tr>
                      <td className="p-3">_gid</td>
                      <td className="p-3">Analytics</td>
                      <td className="p-3">Google Analytics</td>
                      <td className="p-3">24 hours</td>
                    </tr>
                    <tr>
                      <td className="p-3">_fbp</td>
                      <td className="p-3">Marketing</td>
                      <td className="p-3">Facebook Pixel</td>
                      <td className="p-3">3 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. How to Control Cookies</h2>

              <h3 className="text-xl font-semibold text-primary-400 mb-3">5.1 Cookie Consent Banner</h3>
              <p>When you first visit our website, you will see a cookie consent banner. You can:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Accept all cookies</li>
                <li>Decline non-essential cookies</li>
                <li>Customize cookie preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-400 mt-4 mb-3">5.2 Browser Settings</h3>
              <p>You can control cookies through your browser settings:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies</li>
                <li><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies</li>
                <li><strong>Apple Safari:</strong> Preferences → Privacy → Cookies</li>
                <li><strong>Microsoft Edge:</strong> Settings → Privacy → Cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
              <p className="mb-3">Under NDPR and GDPR, you have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Know what cookies are stored</li>
                <li><strong>Deletion:</strong> Remove stored cookies</li>
                <li><strong>Withdraw Consent:</strong> Change your cookie preferences</li>
                <li><strong>Opt-Out:</strong> Decline non-essential cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
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

export default Cookies;