import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { 
  Bell, 
  Check, 
  Trash2,
  Mail,
  Calendar,
  CreditCard,
  Award,
  MessageCircle,
  Info,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchNotifications();
    // Real-time polling every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === id ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.post('/notifications/mark-all-read');
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, is_read: true }))
      );
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all as read');
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(notif => notif.id !== id));
      toast.success('Notification deleted');
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'class':
        return <Calendar className="w-5 h-5 text-purple-400" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-green-400" />;
      case 'exam':
        return <Award className="w-5 h-5 text-yellow-400" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-blue-400" />;
      case 'reminder':
        return <Bell className="w-5 h-5 text-orange-400" />;
      default:
        return <Info className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.is_read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Bell className="w-6 h-6 text-primary-500" />
              Notifications
              {unreadCount > 0 && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h1>
            <p className="text-gray-400">Stay updated with your learning journey</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-primary-600 rounded-lg text-white hover:bg-primary-700 transition"
            >
              Mark all as read
            </button>
          )}
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-white/10 text-gray-400 hover:bg-white/20'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'unread'
              ? 'bg-primary-600 text-white'
              : 'bg-white/10 text-gray-400 hover:bg-white/20'
          }`}
        >
          Unread {unreadCount > 0 && `(${unreadCount})`}
        </button>
      </div>

      {/* Notifications List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-12 border border-white/10 text-center">
          <Bell className="w-16 h-16 mx-auto mb-4 text-gray-500 opacity-50" />
          <p className="text-gray-400">No notifications to display</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-dark-100/50 backdrop-blur-md rounded-2xl border-l-4 ${getPriorityColor(notif.priority)} p-4 hover:bg-white/5 transition ${
                !notif.is_read ? 'bg-primary-500/5' : ''
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{notif.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{notif.message}</p>
                    </div>
                    <div className="flex gap-2">
                      {!notif.is_read && (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="p-1 text-primary-400 hover:text-primary-300"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notif.id)}
                        className="p-1 text-gray-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500">
                      {new Date(notif.created_at).toLocaleString()}
                    </span>
                    {notif.action_url && (
                      <a
                        href={notif.action_url}
                        className="text-xs text-primary-400 hover:underline"
                      >
                        View Details
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;