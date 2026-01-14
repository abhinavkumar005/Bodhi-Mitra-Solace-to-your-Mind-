// src/pages/auth/Register.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, GraduationCap, Mail, Phone, CheckCircle, AlertTriangle,
  ArrowLeft, Shield, Heart
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { registerStudent, verifyOTP } from '../../api/auth';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    phone: ''
  });
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid university email required';
    }

    if (showOTP && !otp.trim()) {
      newErrors.otp = 'Please enter the 6-digit OTP';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (!showOTP) {
        // Step 1: Register student and send OTP
        const res = await registerStudent({
          name: formData.name,
          rollNumber: formData.rollNumber,
          phone: formData.phone,
          email: formData.email
        });

        if (!res.success) {
          throw new Error(res.message);
        }
        
        setShowOTP(true);
      } else {
        // Step 2: Verify OTP and login
        const res = await verifyOTP(formData.email, otp);
        
        if (!res.success) {
          throw new Error(res.message);
        }

        login(res);
        setSuccess(true);
        setTimeout(() => navigate('/student'), 2000);
      }
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#DDD6FE] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-[#DDD6FE] p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-[#7C3AED]" />
          </div>
          <h2 className="text-2xl font-bold text-[#312E81] mb-2">Registration Complete!</h2>
          <p className="text-[#6D28D9] opacity-90">
            Welcome to Bodhi-Mitra, {formData.name}! Redirecting to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#DDD6FE] flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-[#312E81] hover:text-[#7C3AED] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
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
                <h1 className="text-2xl font-bold text-[#312E81]">Create Your Account</h1>
                <p className="text-[#6D28D9] opacity-90 mt-1">
                  {showOTP ? 'Enter your verification code' : 'Get started in 60 seconds'}
                </p>
              </div>

              {/* General Error */}
              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                {!showOTP ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#312E81] mb-2">
                        Full Name <span className="text-[#DC2626]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6D28D9]" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="e.g., Abhishek Prajapati"
                          className={`w-full pl-10 pr-4 py-3 border ${
                            errors.name ? 'border-[#DC2626]' : 'border-[#DDD6FE]'
                          } rounded-xl focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none transition-colors`}
                          required
                        />
                      </div>
                      {errors.name && (
                        <p className="text-xs text-[#DC2626] mt-1 flex items-center">
                          <AlertTriangle className="w-3 h-3 mr-1" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#312E81] mb-2">
                        Roll Number <span className="text-[#DC2626]">*</span>
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6D28D9]" />
                        <input
                          type="text"
                          value={formData.rollNumber}
                          onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                          placeholder="e.g., 235UCS000"
                          className={`w-full pl-10 pr-4 py-3 border ${
                            errors.rollNumber ? 'border-[#DC2626]' : 'border-[#DDD6FE]'
                          } rounded-xl focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none transition-colors`}
                          required
                        />
                      </div>
                      {errors.rollNumber && (
                        <p className="text-xs text-[#DC2626] mt-1 flex items-center">
                          <AlertTriangle className="w-3 h-3 mr-1" /> {errors.rollNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#312E81] mb-2">
                        University Email <span className="text-[#DC2626]">*</span>
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

                    <div>
                      <label className="block text-sm font-medium text-[#312E81] mb-2">
                        Mobile Number <span className="text-[#DC2626]">*</span>
                      </label>
                      <div className="flex">
                        <div className="bg-[#F5F3FF] border border-r-0 border-[#DDD6FE] px-4 py-3 rounded-l-xl flex items-center text-[#6D28D9] font-medium">
                          +91
                        </div>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                          placeholder="98765 43210"
                          className="flex-1 px-4 py-3 border border-[#DDD6FE] rounded-r-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] transition-colors"
                          maxLength="10"
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2">
                      Verification Code <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
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
                      We sent a code to: <span className="font-medium">{formData.email}</span>
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-[#DDD6FE]">
                  <div className="flex items-start">
                    <Shield className="w-4 h-4 text-[#7C3AED] mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-xs text-[#312E81]">
                      <span className="font-medium">Privacy assured:</span> Your data is encrypted and never shared.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7C3AED] hover:bg-[#6A2DCE] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70 mt-6"
                >
                  {loading ? (
                    'Processing...'
                  ) : showOTP ? (
                    'Verify & Complete Registration'
                  ) : (
                    'Send Verification Code'
                  )}
                </button>
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