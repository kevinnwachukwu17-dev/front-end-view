import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Camera, Save, Lock, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    date_of_birth: '',
    exam_type: 'JAMB',
    subjects: [],
    learning_mode: 'Online'
  });
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const examTypes = ['JAMB', 'WAEC', 'NECO', 'IJMB', 'JUPEB'];
  const learningModes = ['Online', 'Physical', 'Hybrid'];
  const availableSubjects = [
    'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology',
    'Government', 'Economics', 'Literature', 'History', 'Geography',
    'Commerce', 'Accounting', 'CRS', 'IRS', 'Yoruba', 'Hausa', 'Igbo'
  ];

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const fetchStudentProfile = async () => {
    try {
      const response = await api.get('/student/profile');
      setFormData({
        full_name: response.data.full_name || '',
        phone: response.data.phone || '',
        address: response.data.address || '',
        date_of_birth: response.data.date_of_birth || '',
        exam_type: response.data.exam_type || 'JAMB',
        subjects: response.data.subjects || [],
        learning_mode: response.data.learning_mode || 'Online'
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/student/profile', formData);
      toast.success('Profile updated successfully!');
      updateUser(formData);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error('New passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.put('/auth/change-password', {
        current_password: passwordData.current_password,
        new_password: passwordData.new_password
      });
      toast.success('Password changed successfully!');
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectToggle = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 100 * 1024) {
      toast.error('Image must be less than 100KB');
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await api.put('/student/profile-picture', { profile_picture: reader.result });
        toast.success('Profile picture updated!');
        updateUser({ profile_picture: reader.result });
      } catch (error) {
        toast.error('Failed to upload picture');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
      >
        <h1 className="text-2xl font-bold text-white mb-6">My Profile</h1>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
              {user?.user_metadata?.profile_picture ? (
                <img src={user.user_metadata.profile_picture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-white">
                  {formData.full_name?.charAt(0) || 'U'}
                </span>
              )}
            </div>
            <label className="absolute bottom-0 right-0 p-2 bg-primary-600 rounded-full cursor-pointer hover:bg-primary-700 transition">
              <Camera className="w-4 h-4 text-white" />
              <input type="file" accept="image/*" className="hidden" onChange={handleProfilePictureUpload} disabled={uploading} />
            </label>
          </div>
          {uploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  placeholder="+234XXXXXXXXXX"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Exam Type</label>
              <select
                value={formData.exam_type}
                onChange={(e) => setFormData({ ...formData, exam_type: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500"
              >
                {examTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Learning Mode</label>
              <select
                value={formData.learning_mode}
                onChange={(e) => setFormData({ ...formData, learning_mode: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500"
              >
                {learningModes.map(mode => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows="2"
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  placeholder="Your address"
                />
              </div>
            </div>
          </div>

          {/* Subjects Selection */}
          <div>
            <label className="block text-gray-300 mb-3">Select Your Subjects</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableSubjects.map(subject => (
                <label key={subject} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject)}
                    onChange={() => handleSubjectToggle(subject)}
                    className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                  />
                  <span className="text-gray-300 text-sm">{subject}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary-600 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </motion.div>

      {/* Change Password Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Change Password
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-gray-300 mb-2">Current Password</label>
            <input
              type="password"
              value={passwordData.current_password}
              onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              value={passwordData.new_password}
              onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirm_password}
              onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary-600 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;