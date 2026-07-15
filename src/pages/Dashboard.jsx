// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard | JEO Digital Solutions';
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
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
                Dashboard
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Welcome to your dashboard. Manage your account and track your progress.
            </p>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Services</span>
                  <span className="text-white font-bold">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Active Registrations</span>
                  <span className="text-white font-bold">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Messages</span>
                  <span className="text-white font-bold">0</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/register" className="block w-full px-4 py-2 bg-primary-500 text-white rounded-lg text-center hover:bg-primary-600 transition-colors">
                  Register for a Service
                </Link>
                <Link to="/contact" className="block w-full px-4 py-2 bg-white/10 text-white rounded-lg text-center hover:bg-white/20 transition-colors">
                  Contact Support
                </Link>
                <button className="block w-full px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-center hover:bg-green-500/30 transition-colors">
                  View Blog
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <p className="text-gray-400 text-sm">No recent activity to display.</p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mt-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl p-6 border border-white/10">
            <p className="text-gray-300 text-center">
              Welcome to JEO Digital Solutions. We're here to help you achieve your educational and career goals.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;