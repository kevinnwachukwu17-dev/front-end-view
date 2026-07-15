import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { 
  BookOpen, 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  Download
} from 'lucide-react';

const CourseRegistration = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [learningMode, setLearningMode] = useState('Online');
  const [classSchedule, setClassSchedule] = useState('');

  useEffect(() => {
    fetchSubjects();
    fetchTimetable();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await api.get('/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      toast.error('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const fetchTimetable = async () => {
    try {
      const response = await api.get('/timetable');
      setTimetable(response.data);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };

  const handleSubjectSelect = (subjectId) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleRegister = async () => {
    if (selectedSubjects.length === 0) {
      toast.error('Please select at least one subject');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/courses/register', {
        subjects: selectedSubjects,
        learning_mode: learningMode,
        class_schedule: classSchedule
      });
      toast.success('Successfully registered for courses!');
      // Redirect to dashboard or show success
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredSubjects = subjects.filter(subject => {
    const matchesFilter = filter === 'ALL' || subject.exam_type === filter;
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Course Registration</h1>
        <p className="text-gray-400">Select your preferred subjects and learning mode</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Subject Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-4 border border-white/10"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                />
              </div>
              <div className="flex gap-2">
                {['ALL', 'JAMB', 'WAEC', 'NECO'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-lg transition ${
                      filter === type 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Subjects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Available Subjects</h2>
            {loading ? (
              <div className="text-center py-8">Loading subjects...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredSubjects.map((subject) => (
                  <label
                    key={subject.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                      selectedSubjects.includes(subject.id)
                        ? 'bg-primary-600/20 border border-primary-500'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(subject.id)}
                      onChange={() => handleSubjectSelect(subject.id)}
                      className="w-4 h-4 text-primary-500 rounded"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium">{subject.name}</p>
                      <p className="text-gray-400 text-xs">{subject.exam_type}</p>
                    </div>
                    <BookOpen className="w-4 h-4 text-gray-400" />
                  </label>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Registration Summary */}
        <div className="space-y-6">
          {/* Learning Mode Selection */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Learning Mode</h2>
            <div className="space-y-3">
              {['Online', 'Physical', 'Hybrid'].map(mode => (
                <label
                  key={mode}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                    learningMode === mode
                      ? 'bg-primary-600/20 border border-primary-500'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="learningMode"
                    checked={learningMode === mode}
                    onChange={() => setLearningMode(mode)}
                    className="w-4 h-4 text-primary-500"
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium">{mode}</p>
                    <p className="text-gray-400 text-xs">
                      {mode === 'Online' && 'Learn from anywhere via Zoom/Google Meet'}
                      {mode === 'Physical' && 'In-person classes at our center'}
                      {mode === 'Hybrid' && 'Mix of online and physical classes'}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Class Schedule */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Preferred Schedule</h2>
            <select
              value={classSchedule}
              onChange={(e) => setClassSchedule(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500"
            >
              <option value="">Select schedule</option>
              <option value="Morning">Morning (8AM - 12PM)</option>
              <option value="Afternoon">Afternoon (1PM - 5PM)</option>
              <option value="Evening">Evening (6PM - 9PM)</option>
              <option value="Weekend">Weekend (Saturday & Sunday)</option>
            </select>
          </motion.div>

          {/* Registration Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Registration Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Selected Subjects:</span>
                <span className="text-white font-semibold">{selectedSubjects.length}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Learning Mode:</span>
                <span className="text-white">{learningMode}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Schedule:</span>
                <span className="text-white">{classSchedule || 'Not selected'}</span>
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between text-gray-400">
                  <span>Total Fee:</span>
                  <span className="text-white font-bold">₦{selectedSubjects.length * 15000}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleRegister}
              disabled={submitting || selectedSubjects.length === 0}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
            >
              {submitting ? 'Registering...' : 'Register Now'}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Timetable Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Sample Timetable</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 text-gray-400">Time</th>
                <th className="text-left py-3 text-gray-400">Monday</th>
                <th className="text-left py-3 text-gray-400">Tuesday</th>
                <th className="text-left py-3 text-gray-400">Wednesday</th>
                <th className="text-left py-3 text-gray-400">Thursday</th>
                <th className="text-left py-3 text-gray-400">Friday</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-3 text-white">9:00 - 11:00</td>
                <td className="py-3 text-gray-300">Mathematics</td>
                <td className="py-3 text-gray-300">English</td>
                <td className="py-3 text-gray-300">Physics</td>
                <td className="py-3 text-gray-300">Chemistry</td>
                <td className="py-3 text-gray-300">Biology</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 text-white">11:00 - 13:00</td>
                <td className="py-3 text-gray-300">Break</td>
                <td className="py-3 text-gray-300">Break</td>
                <td className="py-3 text-gray-300">Break</td>
                <td className="py-3 text-gray-300">Break</td>
                <td className="py-3 text-gray-300">Break</td>
              </tr>
              <tr>
                <td className="py-3 text-white">14:00 - 16:00</td>
                <td className="py-3 text-gray-300">Government</td>
                <td className="py-3 text-gray-300">Economics</td>
                <td className="py-3 text-gray-300">Literature</td>
                <td className="py-3 text-gray-300">History</td>
                <td className="py-3 text-gray-300">Geography</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseRegistration;