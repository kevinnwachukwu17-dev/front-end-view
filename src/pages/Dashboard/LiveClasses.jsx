import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  Link as LinkIcon,
  Copy,
  Check,
  Bell,
  Play,
  Download,
  ZoomIn
} from 'lucide-react';

const LiveClasses = () => {
  const [classes, setClasses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [recordedClasses, setRecordedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const [upcomingRes, recordedRes] = await Promise.all([
        api.get('/classes/upcoming'),
        api.get('/classes/recorded')
      ]);
      setUpcomingClasses(upcomingRes.data);
      setRecordedClasses(recordedRes.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast.error('Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  const copyMeetingLink = (link, id) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    toast.success('Meeting link copied!');
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const joinMeeting = (meetingLink) => {
    window.open(meetingLink, '_blank');
  };

  const setReminder = async (classId) => {
    try {
      await api.post(`/classes/${classId}/reminder`);
      toast.success('Reminder set! You will be notified 30 minutes before class.');
    } catch (error) {
      toast.error('Failed to set reminder');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const isClassLive = (scheduleTime) => {
    const now = new Date();
    const classTime = new Date(scheduleTime);
    const diffMinutes = (classTime - now) / 1000 / 60;
    return diffMinutes <= 0 && diffMinutes >= -120; // Class started within last 2 hours
  };

  const isClassSoon = (scheduleTime) => {
    const now = new Date();
    const classTime = new Date(scheduleTime);
    const diffMinutes = (classTime - now) / 1000 / 60;
    return diffMinutes > 0 && diffMinutes <= 30;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Live Classes</h1>
        <p className="text-gray-400">Join your scheduled classes and access recordings</p>
      </motion.div>

      {/* Upcoming Classes Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary-500" />
          Upcoming Classes
        </h2>
        {upcomingClasses.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No upcoming classes scheduled</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingClasses.map((class_) => (
              <div
                key={class_.id}
                className={`rounded-xl p-4 border transition-all ${
                  isClassSoon(class_.schedule_time)
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-white/5 border-white/10 hover:border-primary-500/30'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {isClassLive(class_.schedule_time) && (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs flex items-center gap-1">
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                          LIVE NOW
                        </span>
                      )}
                      {isClassSoon(class_.schedule_time) && !isClassLive(class_.schedule_time) && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                          Starting Soon
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{class_.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{class_.subject}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(class_.schedule_time)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatTime(class_.schedule_time)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {class_.enrolled_count} / {class_.capacity} enrolled
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {class_.meeting_link && (
                      <>
                        <button
                          onClick={() => copyMeetingLink(class_.meeting_link, class_.id)}
                          className="px-4 py-2 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 transition flex items-center gap-2"
                        >
                          {copiedLink === class_.id ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          Copy Link
                        </button>
                        <button
                          onClick={() => joinMeeting(class_.meeting_link)}
                          className="px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition flex items-center gap-2"
                        >
                          <Video className="w-4 h-4" />
                          Join Class
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setReminder(class_.id)}
                      className="px-4 py-2 bg-primary-600 rounded-lg text-white hover:bg-primary-700 transition flex items-center gap-2"
                    >
                      <Bell className="w-4 h-4" />
                      Remind Me
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Recorded Classes Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-primary-500" />
          Recorded Classes
        </h2>
        {recordedClasses.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Download className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No recorded classes available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recordedClasses.map((class_) => (
              <div key={class_.id} className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition">
                <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                  <Play className="w-12 h-12 text-primary-500" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium mb-1">{class_.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{class_.subject}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">{class_.duration} min</span>
                    <button
                      onClick={() => joinMeeting(class_.recording_url)}
                      className="px-3 py-1 bg-primary-600 rounded-lg text-sm text-white hover:bg-primary-700 transition"
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LiveClasses;