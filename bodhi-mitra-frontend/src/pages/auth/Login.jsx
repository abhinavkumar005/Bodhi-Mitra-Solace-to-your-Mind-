// src/pages/auth/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mail, Lock, User, GraduationCap, Shield, Heart, AlertTriangle
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { verifyOTP, login as loginAPI } from '../../api/auth';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const [role, setRole] = useState('student'); // 'student', 'psychologist', 'admin'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (role === 'student') {
      if (showOTP && !formData.otp.trim()) {
        newErrors.otp = 'OTP is required';
      }
    } else {
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (role === 'student') {
        if (!showOTP) {
          // Request OTP
          const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/request-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email })
          });
          
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
          
          setShowOTP(true);
        } else {
          // Verify OTP
          const res = await verifyOTP(formData.email, formData.otp);
          if (!res.success) throw new Error(res.message);
          
          login(res);
          navigate('/student');
        }
      } else {
        // Psychologist or Admin login
        const res = await loginAPI(formData.email, formData.password);
        if (!res.success) throw new Error(res.message);
        
        login(res);
        
        // Redirect based on role
        if (role === 'psychologist') {
          navigate('/psychologist');
        } else {
          navigate('/admin');
        }
      }
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setFormData({ email: '', password: '', otp: '' });
    setErrors({});
    setShowOTP(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#DDD6FE] flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-[#312E81] hover:text-[#7C3AED] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            <span className="ml-1 font-medium">Back</span>
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#7C3AED] rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#312E81]">
              Bodhi<span className="text-[#7C3AED]">-Mitra</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-[#DDD6FE] overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <h1 className="text-2xl font-bold text-[#312E81]">Welcome Back</h1>
                <p className="text-[#6D28D9] opacity-90 mt-1">
                  Sign in to your account
                </p>
              </div>

              {/* Role Toggle */}
              <div className="mb-6">
                <div className="flex bg-[#F5F3FF] rounded-xl p-1">
                  {[
                    { value: 'student', label: 'Student', icon: GraduationCap },
                    { value: 'psychologist', label: 'Psychologist', icon: Shield },
                    { value: 'admin', label: 'Admin', icon: User }
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleRoleChange(value)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        role === value
                          ? 'bg-white text-[#7C3AED] shadow-sm'
                          : 'text-[#6D28D9] hover:text-[#312E81]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* General Error */}
              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-[#312E81] mb-2">
                    Email Address <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6D28D9]" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="you@university.edu"
                      className={`w-full pl-10 pr-4 py-3 border ${
                        errors.email ? 'border-[#DC2626]' : 'border-[#DDD6FE]'
                      } rounded-xl focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none transition-colors`}
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-[#DC2626] mt-1 flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Conditional Fields */}
                {role === 'student' ? (
                  showOTP ? (
                    <div>
                      <label className="block text-sm font-medium text-[#312E81] mb-2">
                        Verification Code <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.otp}
                        onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="Enter 6-digit code"
                        className={`w-full px-4 py-3 border ${
                          errors.otp ? 'border-[#DC2626]' : 'border-[#DDD6FE]'
                        } rounded-xl focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none transition-colors`}
                        maxLength="6"
                        required
                      />
                      {errors.otp && (
                        <p className="text-xs text-[#DC2626] mt-1 flex items-center">
                          <AlertTriangle className="w-3 h-3 mr-1" /> {errors.otp}
                        </p>
                      )}
                      <p className="text-xs text-[#6D28D9] mt-2 opacity-80">
                        We sent a code to your email
                      </p>
                    </div>
                  ) : null
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2">
                      Password <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6D28D9]" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-4 py-3 border ${
                          errors.password ? 'border-[#DC2626]' : 'border-[#DDD6FE]'
                        } rounded-xl focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none transition-colors`}
                        required
                      />
                    </div>
                    {errors.password && (
                      <p className="text-xs text-[#DC2626] mt-1 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" /> {errors.password}
                      </p>
                    )}
                  </div>
                )}

                {/* Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7C3AED] hover:bg-[#6A2DCE] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70 mt-2"
                >
                  {loading ? (
                    'Processing...'
                  ) : role === 'student' && showOTP ? (
                    'Verify & Sign In'
                  ) : role === 'student' ? (
                    'Send Verification Code'
                  ) : (
                    'Sign In'
                  )}
                </button>

                {/* Student OTP Toggle */}
                {role === 'student' && !showOTP && (
                  <div className="text-center mt-2">
                    <button
                      type="button"
                      onClick={() => setShowOTP(true)}
                      className="text-sm text-[#7C3AED] hover:text-[#6A2DCE] font-medium"
                    >
                      Already have an OTP? Enter it here
                    </button>
                  </div>
                )}

                {/* Privacy Notice */}
                <div className="pt-4 border-t border-[#DDD6FE]">
                  <div className="flex items-start">
                    <Shield className="w-4 h-4 text-[#7C3AED] mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-xs text-[#312E81]">
                      <span className="font-medium">Secure & Private:</span> Your credentials are encrypted and never shared.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <div className="mt-6 text-center text-xs text-[#6D28D9] opacity-80">
            <p className="mb-1">🔒 End-to-end encrypted • Data never sold • DPDP Act compliant</p>
            <p>💙 You're not alone. We're here for you.</p>
          </div>
        </div>
      </main>
    </div>
  );
}