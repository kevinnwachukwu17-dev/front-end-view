import React, { useState, useContext } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  User,
  BookOpen,
  CreditCard,
  Award,
  Video,
  Bell,
  MessageCircle,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/profile', icon: User, label: 'My Profile' },
    { path: '/dashboard/courses', icon: BookOpen, label: 'Course Registration' },
    { path: '/dashboard/payments', icon: CreditCard, label: 'Payments' },
    { path: '/dashboard/cbt', icon: Award, label: 'CBT Portal' },
    { path: '/dashboard/live-classes', icon: Video, label: 'Live Classes' },
    { path: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
    { path: '/dashboard/support', icon: MessageCircle, label: 'Support' },
    { path: '/dashboard/results', icon: BarChart3, label: 'Results' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-200 to-dark-100">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-primary-600 rounded-lg text-white"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className={`fixed top-0 left-0 h-full w-72 bg-dark-100/95 backdrop-blur-md border-r border-white/10 z-40 overflow-y-auto ${
              window.innerWidth < 1024 && !sidebarOpen ? 'hidden' : ''
            }`}
          >
            <div className="p-6">
              {/* Logo */}
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">J</span>
                </div>
                <span className="text-white font-bold text-xl">JEO Digital</span>
              </div>

              {/* User Info */}
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {user?.user_metadata?.full_name || 'Student'}
                    </p>
                    <p className="text-gray-400 text-sm truncate">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl transition ${
                        isActive
                          ? 'bg-primary-600/20 text-primary-400 border-l-2 border-primary-500'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4" />}
                    </Link>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 mt-6 rounded-xl text-red-400 hover:bg-red-500/10 transition"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${window.innerWidth >= 1024 ? 'lg:ml-72' : ''}`}>
        <div className="p-6 pt-24 lg:pt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;