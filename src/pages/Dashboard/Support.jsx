import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { 
  MessageCircle, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Phone,
  Mail,
  HelpCircle,
  FileText
} from 'lucide-react';

const Support = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState('new');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/support/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!subject || !newMessage) {
      toast.error('Please fill in all fields');
      return;
    }

    setSending(true);
    try {
      const response = await api.post('/support/messages', {
        subject,
        message: newMessage
      });
      setMessages([response.data, ...messages]);
      setSubject('');
      setNewMessage('');
      toast.success('Message sent successfully!');
      setActiveTab('history');
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'resolved':
        return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Resolved</span>;
      case 'replied':
        return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs flex items-center gap-1"><MessageCircle className="w-3 h-3" /> Replied</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      default:
        return <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
      >
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-primary-500" />
          Support Center
        </h1>
        <p className="text-gray-400">Get help with your courses, payments, or technical issues</p>
      </motion.div>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center hover:border-primary-500/30 transition">
          <Phone className="w-8 h-8 text-primary-500 mx-auto mb-2" />
          <h3 className="text-white font-medium">Call Us</h3>
          <p className="text-gray-400 text-sm">+234 706 106 6372</p>
          <p className="text-gray-500 text-xs">Mon-Fri, 9AM-5PM</p>
        </div>
        <div className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center hover:border-primary-500/30 transition">
          <Mail className="w-8 h-8 text-primary-500 mx-auto mb-2" />
          <h3 className="text-white font-medium">Email Us</h3>
          <p className="text-gray-400 text-sm">support@jeodigital.com</p>
          <p className="text-gray-500 text-xs">24/7 response within 24hrs</p>
        </div>
        <div className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center hover:border-primary-500/30 transition">
          <HelpCircle className="w-8 h-8 text-primary-500 mx-auto mb-2" />
          <h3 className="text-white font-medium">FAQ</h3>
          <p className="text-gray-400 text-sm">Frequently asked questions</p>
          <p className="text-gray-500 text-xs">Browse our knowledge base</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('new')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'new'
              ? 'bg-primary-600 text-white'
              : 'bg-white/10 text-gray-400 hover:bg-white/20'
          }`}
        >
          New Message
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'history'
              ? 'bg-primary-600 text-white'
              : 'bg-white/10 text-gray-400 hover:bg-white/20'
          }`}
        >
          Message History
        </button>
      </div>

      {activeTab === 'new' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
        >
          <form onSubmit={sendMessage} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Payment Issue, Technical Problem, Course Access"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows="6"
                placeholder="Describe your issue in detail. Include any relevant information like screenshots, error messages, etc."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                required
              />
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
              <p className="text-yellow-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                We typically respond within 24 hours on business days
              </p>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="px-6 py-2 bg-primary-600 rounded-lg text-white hover:bg-primary-700 transition disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
        >
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-500 opacity-50" />
              <p className="text-gray-400">No messages yet</p>
              <p className="text-gray-500 text-sm">Send a message to get support</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white font-medium">{message.subject}</h3>
                      <p className="text-gray-400 text-sm mt-1">{message.message}</p>
                    </div>
                    {getStatusBadge(message.status)}
                  </div>
                  {message.admin_response && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="flex items-start gap-2">
                        <div className="bg-primary-500/20 rounded-full p-1">
                          <MessageCircle className="w-4 h-4 text-primary-400" />
                        </div>
                        <div>
                          <p className="text-primary-400 text-sm font-medium">Support Team</p>
                          <p className="text-gray-300 text-sm mt-1">{message.admin_response}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-500 text-xs">
                      {new Date(message.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Support;