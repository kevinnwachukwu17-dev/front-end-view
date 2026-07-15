import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Video,
  Calendar,
  CreditCard,
  Bell,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    registeredSubjects: 0,
    nextClass: null,
    outstandingPayment: 0,
    completedTests: 0,
    attendance: 0,
    upcomingClasses: []
  });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch student stats
      const statsResponse = await api.get('/dashboard/stats');
      const notificationsResponse = await api.get('/notifications');
      
      setStats(statsResponse.data);
      setNotifications(notificationsResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Registered Subjects',
      value: stats.registeredSubjects,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      link: '/dashboard/courses'
    },
    {
      title: 'Next Live Class',
      value: stats.nextClass?.title || 'No class',
      subtitle: stats.nextClass?.time,
      icon: Video,
      color: 'from-purple-500 to-purple-600',
      link: '/dashboard/live-classes'
    },
    {
      title: 'Outstanding Payment',
      value: `₦${stats.outstandingPayment?.toLocaleString() || 0}`,
      icon: CreditCard,
      color: 'from-red-500 to-red-600',
      link: '/dashboard/payments'
    },
    {
      title: 'Practice Tests',
      value: stats.completedTests,
      icon: Award,
      color: 'from-green-500 to-green-600',
      link: '/dashboard/cbt'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl p-6 border border-white/10"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.user_metadata?.full_name || 'Student'}!
        </h1>
        <p className="text-gray-400">
          Ready to excel in your exams? Your next milestone awaits!
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <Link to={stat.link}>
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-white/20 rounded-xl p-3`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/60 text-sm">View →</span>
              </div>
              <h3 className="text-white/80 text-sm mb-1">{stat.title}</h3>
              <p className="text-white text-2xl font-bold">{stat.value}</p>
              {stat.subtitle && (
                <p className="text-white/60 text-xs mt-1">{stat.subtitle}</p>
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Upcoming Classes & Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Classes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Upcoming Classes</h2>
              <Link to="/dashboard/live-classes" className="text-primary-500 text-sm hover:underline">
                View All
              </Link>
            </div>
            {stats.upcomingClasses.length > 0 ? (
              <div className="space-y-3">
                {stats.upcomingClasses.map((class_, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition">
                    <div className="bg-primary-500/20 rounded-xl p-3">
                      <Calendar className="w-5 h-5 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{class_.title}</h3>
                      <p className="text-gray-400 text-sm">{class_.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm">{class_.time}</p>
                      <p className="text-gray-500 text-xs">{class_.date}</p>
                    </div>
                    <button className="px-3 py-1 bg-primary-600 rounded-lg text-sm hover:bg-primary-700 transition">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No upcoming classes scheduled</p>
              </div>
            )}
          </motion.div>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <Link to="/dashboard/courses" className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-4 text-center hover:bg-dark-100/70 transition border border-white/10">
              <BookOpen className="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <span className="text-white text-sm">Register</span>
            </Link>
            <Link to="/dashboard/learning" className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-4 text-center hover:bg-dark-100/70 transition border border-white/10">
              <Video className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <span className="text-white text-sm">Learn</span>
            </Link>
            <Link to="/dashboard/cbt" className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-4 text-center hover:bg-dark-100/70 transition border border-white/10">
              <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <span className="text-white text-sm">Practice</span>
            </Link>
            <Link to="/dashboard/payments" className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-4 text-center hover:bg-dark-100/70 transition border border-white/10">
              <CreditCard className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <span className="text-white text-sm">Pay</span>
            </Link>
          </motion.div>
        </div>

        {/* Right Column - Notifications & Payment Status */}
        <div className="space-y-6">
          {/* Payment Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Payment Status</h2>
            {stats.outstandingPayment > 0 ? (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-400 font-medium">Outstanding Balance</span>
                </div>
                <p className="text-2xl font-bold text-white">₦{stats.outstandingPayment.toLocaleString()}</p>
                <Link to="/dashboard/payments" className="mt-3 inline-block px-4 py-2 bg-red-600 rounded-lg text-sm hover:bg-red-700 transition">
                  Make Payment
                </Link>
              </div>
            ) : (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-400">All payments up to date!</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Notifications</h2>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notif, index) => (
                  <div key={index} className="p-3 bg-white/5 rounded-xl">
                    <p className="text-white text-sm font-medium">{notif.title}</p>
                    <p className="text-gray-400 text-xs mt-1">{notif.message}</p>
                    <span className="text-gray-500 text-xs mt-2 block">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No new notifications</p>
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <Link to="/dashboard/notifications" className="block text-center text-primary-500 text-sm mt-4 hover:underline">
                View All
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;