import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../utils/api';
import EmailConfirmationModal from '../components/EmailConfirmationModal';

const Register = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: '',
    email: '',
    phone: '',
    sex: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    profilePicture: '',  // This will store the URL or base64
    
    // Account Information
    password: '',
    confirmPassword: '',
    interestedService: '',
    
    // Acceptance
    acceptTerms: false
  });
  const [profilePreview, setProfilePreview] = useState(null);
const [uploading, setUploading] = useState(false);
const [loading, setLoading] = useState(false);
const [showTermsModal, setShowTermsModal] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [showEmailModal, setShowEmailModal] = useState(false);  
const [registeredEmail, setRegisteredEmail] = useState('');   
const [passwordStrength, setPasswordStrength] = useState({
  score: 0,
  message: '',
  color: '',
  width: '0%'
});

  const checkPasswordStrength = (password) => {
    let score = 0;
    let message = '';
    let color = '';
    let width = '0%';

    if (!password) {
      setPasswordStrength({ score: 0, message: '', color: '', width: '0%' });
      return;
    }

    // Check length
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Check for lowercase letters
    if (/[a-z]/.test(password)) score += 1;

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) score += 1;

    // Check for numbers
    if (/[0-9]/.test(password)) score += 1;

    // Check for special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    // Determine strength based on score
    if (score <= 2) {
      message = 'Weak';
      color = 'bg-red-500';
      width = '33%';
    } else if (score <= 4) {
      message = 'Medium';
      color = 'bg-yellow-500';
      width = '66%';
    } else {
      message = 'Strong';
      color = 'bg-green-500';
      width = '100%';
    }

    setPasswordStrength({
      score,
      message,
      color,
      width
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  // Handle profile picture upload
// Handle profile picture upload with strict 100KB limit
const handleProfilePictureUpload = (e) => {
  const file = e.target.files[0];
  
  // Check if file exists
  if (!file) {
    return;
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    toast.error('❌ Please upload a valid image file (JPEG, PNG, GIF, or WEBP)');
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    return;
  }

  // Check file size - STRICT 100KB limit
  const maxSizeInBytes = 100 * 1024; // 100KB = 102,400 bytes
  const fileSizeInKB = file.size / 1024;
  
  console.log(`File size: ${fileSizeInKB.toFixed(2)}KB`); // For debugging
  
  if (file.size > maxSizeInBytes) {
    toast.error(`❌ Image size is ${fileSizeInKB.toFixed(2)}KB. Please use an image smaller than 100KB. Compress your image and try again.`);
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    return;
  }

  setUploading(true);

  // Convert to base64 for preview and storage
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64String = reader.result;
    setProfilePreview(base64String);
    setFormData({
      ...formData,
      profilePicture: base64String
    });
    setUploading(false);
    toast.success(`✅ Photo attached successfully! (${fileSizeInKB.toFixed(2)}KB)`);
  };
  
  reader.onerror = () => {
    toast.error('Error reading file');
    setUploading(false);
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  reader.readAsDataURL(file);
};

  // Remove profile picture
  const removeProfilePicture = () => {
    setProfilePreview(null);
    setFormData({
      ...formData,
      profilePicture: ''
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Photo removed');
  };

  const validatePassword = (password) => {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!isLongEnough) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasLetters) {
      return 'Password must contain letters';
    }
    if (!hasNumbers) {
      return 'Password must contain numbers';
    }
    if (!hasSpecialChars) {
      return 'Password must contain special characters (!@#$%^&* etc.)';
    }
    if (!hasUpperCase) {
      return 'Password must contain uppercase letters';
    }
    if (!hasLowerCase) {
      return 'Password must contain lowercase letters';
    }
    return null;
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Check if terms are accepted
  if (!formData.acceptTerms) {
    toast.error('Please accept the Terms and Conditions to continue');
    return;
  }

  // Validate sex selection
  if (!formData.sex) {
    toast.error('Please select your gender');
    return;
  }

  // Validate interested service selection
  if (!formData.interestedService) {
    toast.error('Please select a service you are interested in');
    return;
  }

  // Validate email format
  if (!validateEmail(formData.email)) {
    toast.error('Please enter a valid email address');
    return;
  }

  // Validate phone number
  if (!validatePhoneNumber(formData.phone)) {
    toast.error('Please enter a valid phone number (10-15 digits, optional + prefix)');
    return;
  }

  // Validate emergency contact
  if (formData.emergencyContact && !validatePhoneNumber(formData.emergencyContact)) {
    toast.error('Please enter a valid emergency contact number');
    return;
  }

  // Validate date of birth (user must be at least 10 years old)
  if (formData.dateOfBirth) {
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 10) {
      toast.error('You must be at least 10 years old to register');
      return;
    }
  }

  // Validate password strength
  const passwordError = validatePassword(formData.password);
  if (passwordError) {
    toast.error(passwordError);
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  setLoading(true);
  
  // Prepare data for API submission with snake_case
  const userData = {
    email: formData.email,
    password: formData.password,
    full_name: formData.fullName,
    phone: formData.phone,
    sex: formData.sex,
    date_of_birth: formData.dateOfBirth,
    address: formData.address,
    emergency_contact: formData.emergencyContact,
    interested_service: formData.interestedService,
    profile_picture: formData.profilePicture
  };
  
  try {
    const response = await api.post('/auth/signup', userData);
    
    if (response.data) {
      // Show email confirmation modal instead of toast
      setRegisteredEmail(formData.email);
      setShowEmailModal(true);
      setLoading(false);
    }
  } catch (error) {
    console.error('Registration error:', error);
    const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
    
    // Handle email already registered error
    if (errorMessage.includes('User already registered') || errorMessage.includes('already registered')) {
      toast.custom((t) => (
        <div className="bg-dark-200 border border-yellow-500/30 rounded-lg p-6 max-w-md shadow-2xl">
          <div className="text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-white mb-2">Account Already Exists</h3>
            <p className="text-gray-300 mb-4">
              An account with <span className="text-yellow-400 font-semibold">{formData.email}</span> already exists.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-300">
                Please login to your existing account instead.
              </p>
            </div>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                navigate('/login');
              }}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 py-2 rounded-lg font-semibold text-white transition-all"
            >
              Go to Login
            </button>
          </div>
        </div>
      ), { 
        duration: Infinity,
        position: 'top-center'
      });
    } else {
      toast.error(errorMessage);
    }
    setLoading(false);
  }
};

  // Get password requirements status
  const getRequirementStatus = (requirement) => {
    const password = formData.password;
    switch(requirement) {
      case 'length':
        return password.length >= 8;
      case 'uppercase':
        return /[A-Z]/.test(password);
      case 'lowercase':
        return /[a-z]/.test(password);
      case 'number':
        return /[0-9]/.test(password);
      case 'special':
        return /[!@#$%^&*(),.?":{}|<>]/.test(password);
      default:
        return false;
    }
  };

  // Terms and Conditions Content
  const TermsContent = () => (
    <div className="space-y-4 text-sm">
      <h3 className="text-xl font-bold text-white mb-4">Terms and Conditions</h3>
      
      <div>
        <h4 className="text-primary-500 font-semibold mb-2">1. Acceptance of Terms</h4>
        <p className="text-gray-400">By registering for JEO Digital Solutions services, you agree to comply with these terms and conditions.</p>
      </div>

      <div>
        <h4 className="text-primary-500 font-semibold mb-2">2. Services Provided</h4>
        <p className="text-gray-400">JEO Digital Solutions provides examination registration, admission processing, computer training, and other related educational services.</p>
      </div>

      <div>
        <h4 className="text-primary-500 font-semibold mb-2">3. User Obligations</h4>
        <p className="text-gray-400">You agree to provide accurate information, maintain confidentiality of your account, and use our services responsibly.</p>
      </div>

      <div>
        <h4 className="text-primary-500 font-semibold mb-2">4. Payment Terms</h4>
        <p className="text-gray-400">All service fees must be paid in full before service delivery. Fees are non-refundable once services have been rendered.</p>
      </div>

      <div>
        <h4 className="text-primary-500 font-semibold mb-2">5. Privacy Policy</h4>
        <p className="text-gray-400">Your personal information will be protected and used only for service delivery and communication purposes.</p>
      </div>

      <div>
        <h4 className="text-primary-500 font-semibold mb-2">6. Limitation of Liability</h4>
        <p className="text-gray-400">JEO Digital Solutions is not liable for any indirect damages arising from the use of our services.</p>
      </div>

      <div>
        <h4 className="text-primary-500 font-semibold mb-2">7. Modification of Terms</h4>
        <p className="text-gray-400">We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of modified terms.</p>
      </div>

      <div>
        <h4 className="text-primary-500 font-semibold mb-2">8. Contact Information</h4>
        <p className="text-gray-400">For questions about these terms, contact us at +234 706 106 6372 or info@jeodigital.com.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl w-full"
      >
        <div className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-400 mt-2">Join JEO Digital Solutions today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="+2348123456789"
                    required
                  />
                </div>

                <div>
  <label className="block text-gray-300 mb-2">Profile Picture</label>
  <div className="flex items-center gap-4">
    {/* Photo Preview */}
    {profilePreview && (
      <div className="relative">
        <img 
          src={profilePreview} 
          alt="Profile preview" 
          className="w-20 h-20 rounded-full object-cover border-2 border-primary-500"
        />
        <button
          type="button"
          onClick={removeProfilePicture}
          className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 hover:bg-red-700 transition"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    )}
    
    {/* Hidden file input */}
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleProfilePictureUpload}
      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
      className="hidden"
    />
    
    {/* Attach Passport Button */}
    <button
      type="button"
      onClick={() => fileInputRef.current?.click()}
      disabled={uploading}
      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition disabled:opacity-50 flex items-center gap-2"
    >
      {uploading ? (
        <>
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Uploading...</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span>Attach Passport</span>
        </>
      )}
    </button>
  </div>
  
  {/* Size warning text */}
 {/* Size warning text - More prominent */}
<div className="mt-3">
  {!profilePreview && (
    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2">
      <p className="text-xs text-red-400 flex items-center gap-1">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-semibold">Important:</span> Picture MUST be 100KB or less
      </p>
      <p className="text-xs text-gray-400 mt-1 ml-5">
        Allowed formats: JPG, PNG, GIF, WEBP | Max size: 100KB
      </p>
      {/* ADD THE TIP TEXT HERE - RIGHT AFTER THE FORMATS LINE */}
      <p className="text-xs text-gray-500 mt-1 ml-5">
        💡 Tip: Use 
        <a 
          href="https://tinypng.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary-500 hover:underline ml-1"
        >
          TinyPNG
        </a> 
        or any image compressor to reduce file size
      </p>
    </div>
  )}
  {profilePreview && (
    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2">
      <p className="text-xs text-green-400 flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Photo attached successfully!
      </p>
      <p className="text-xs text-gray-400 mt-1 ml-5">
        You can click "Change Photo" to upload a different image
      </p>
    </div>
  )}
</div>
</div>

                <div>
                  <label className="block text-gray-300 mb-2">Emergency Contact</label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="+2348123456789"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Gender *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sex"
                        value="Male"
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-white/20 bg-white/10"
                      />
                      <span className="text-gray-300">Male</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sex"
                        value="Female"
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-white/20 bg-white/10"
                      />
                      <span className="text-gray-300">Female</span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Enter your full address"
                  />
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Service Information</h3>
              <div>
                <label className="block text-gray-300 mb-2">Select Service *</label>
                <div className="relative">
                  <select
                    name="interestedService"
                    value={formData.interestedService}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled className="bg-dark-200">...Select service</option>
                    <option value="WAEC Registration" className="bg-dark-200">WAEC Registration</option>
                    <option value="JAMB Registration" className="bg-dark-200">JAMB Registration</option>
                    <option value="Admissions" className="bg-dark-200">Admissions</option>
                    <option value="WAEC/JAMB Lessons" className="bg-dark-200">WAEC/JAMB Lessons</option>
                    <option value="Computer training" className="bg-dark-200">Computer training</option>
                    <option value="General Computer Services" className="bg-dark-200">General Computer Services</option>
                    <option value="Enquiry" className="bg-dark-200">Enquiry</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors pr-12"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  {/* Password Strength Bar */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">Password Strength:</span>
                        <span className={`text-xs font-semibold ${
                          passwordStrength.message === 'Weak' ? 'text-red-500' :
                          passwordStrength.message === 'Medium' ? 'text-yellow-500' :
                          'text-green-500'
                        }`}>
                          {passwordStrength.message}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: passwordStrength.width }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Confirm Password *</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors pr-12"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>
              </div>

              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2">Password must contain:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        getRequirementStatus('length') ? 'bg-green-500' : 'bg-white/20'
                      }`}>
                        {getRequirementStatus('length') && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">Min. 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        getRequirementStatus('uppercase') ? 'bg-green-500' : 'bg-white/20'
                      }`}>
                        {getRequirementStatus('uppercase') && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">Uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        getRequirementStatus('lowercase') ? 'bg-green-500' : 'bg-white/20'
                      }`}>
                        {getRequirementStatus('lowercase') && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">Lowercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        getRequirementStatus('number') ? 'bg-green-500' : 'bg-white/20'
                      }`}>
                        {getRequirementStatus('number') && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">Number (0-9)</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        getRequirementStatus('special') ? 'bg-green-500' : 'bg-white/20'
                      }`}>
                        {getRequirementStatus('special') && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">Special character (!@#$%^&*)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 bg-white/10 border border-white/20 rounded focus:ring-primary-500 focus:ring-2 text-primary-500 cursor-pointer"
              />
              <label className="text-gray-300 text-sm">
                I have read and agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-primary-500 hover:text-primary-400 underline font-semibold"
                >
                  Terms and Conditions
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.acceptTerms}
              className={`w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${
                !formData.acceptTerms ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-primary-500 hover:text-primary-400 transition-colors">
              Already have an account? Login Here
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-dark-100 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/10 shadow-2xl"
          >
            <div className="sticky top-0 bg-dark-100 p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  Terms and Conditions
                </h2>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <TermsContent />
            </div>
            
            <div className="sticky bottom-0 bg-dark-100 p-6 border-t border-white/10">
              <button
                onClick={() => {
                  setFormData({ ...formData, acceptTerms: true });
                  setShowTermsModal(false);
                  toast.success('You have accepted the Terms and Conditions');
                }}
                className="w-full btn-primary py-3"
              >
                I Accept the Terms and Conditions
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {/* Email Confirmation Modal - ADD THIS BLOCK */}
          {showEmailModal && (
            <EmailConfirmationModal 
              email={registeredEmail}
              onConfirm={() => {
                setShowEmailModal(false);
                navigate('/login');
              }}
            />
          )}
    </div>
  );
};

export default Register;