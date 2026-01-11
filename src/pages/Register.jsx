import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, GraduationCap, Mail, Phone, CheckCircle, AlertTriangle,
  ArrowLeft, Shield, Heart
} from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0=Basic, 1=Contact, 2=OTP, 3=Success
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    phone: '' // Optional - for info only
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = 'Please enter your name';
      if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
    } else if (step === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        newErrors.email = 'Valid university email required';
      }
    } else if (step === 2) {
      if (otp.some(d => !d)) newErrors.otp = 'Please enter full 6-digit OTP';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step === 1) {
        // Simulate OTP sent to email
        alert(`OTP sent to ${formData.email}`);
      }
      setStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };

  const handleOTPChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleOTPKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = () => {
    if (validateStep()) {
      // Save session
      const session = {
        id: `sess_${Date.now()}`,
        name: formData.name,
        rollNumber: formData.rollNumber,
        email: formData.email,
        phone: formData.phone || null,
        role: 'student'
      };
      sessionStorage.setItem('bodhi_session', JSON.stringify(session));
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE9FE] flex flex-col">
      {/* Emergency Banner */}
      <div className="bg-[#FFF7FA] border-b border-[#DC2626]/20 p-3">
        <div className="container mx-auto px-4 flex items-center justify-center text-[#312E81] text-sm font-medium">
          <AlertTriangle className="w-4 h-4 text-[#DC2626] mr-2" />
          In distress? 
          <button 
            onClick={() => navigate('/emergency')}
            className="underline ml-1 hover:text-[#DC2626] flex items-center"
          >
            Get Emergency Help Now
            <ArrowLeft className="w-3 h-3 ml-1 rotate-180" />
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 pt-6 pb-4 text-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center mb-3">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#312E81]">
            Bodhi<span className="text-[#7C3AED]">-Mitra</span>
          </h1>
          <p className="text-[#6D28D9] mt-1 font-medium">
            Create your account — 60 seconds, 100% confidential
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center">
          {[0, 1, 2].map((s) => (
            <React.Fragment key={s}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 ${
                step > s 
                  ? 'bg-[#7C3AED] text-white' 
                  : step === s 
                    ? 'bg-white border-2 border-[#7C3AED] text-[#7C3AED]' 
                    : 'bg-[#F5F3FF] text-[#7C3AED]'
              }`}>
                {s + 1}
              </div>
              {s < 2 && (
                <div className="flex-1 h-1 bg-[#DDD6FE] mx-2">
                  <div 
                    className={`h-full bg-[#7C3AED] rounded-full transition-all duration-500`}
                    style={{ width: step > s ? '100%' : step === s ? '50%' : '0%' }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between text-xs text-[#6D28D9] mt-2">
          <span>Basic Info</span>
          <span>Contact</span>
          <span>Verify</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-[#DDD6FE] overflow-hidden">
            <div className="p-6 md:p-8">
              
              {/* Step 0: Basic Info */}
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2 text-[#7C3AED]" />
                      Full Name <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g., Abhishek Prajapati"
                      className={`w-full px-4 py-3.5 border ${
                        errors.name ? 'border-[#DC2626]' : 'border-[#DDD6FE]'
                      } rounded-xl focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none`}
                    />
                    {errors.name && (
                      <p className="text-xs text-[#DC2626] mt-1 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2 flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-[#7C3AED]" />
                      Roll Number <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                      placeholder="e.g., 235UCS000"
                      className={`w-full px-4 py-3.5 border ${
                        errors.rollNumber ? 'border-[#DC2626]' : 'border-[#DDD6FE]'
                      } rounded-xl focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none`}
                    />
                    {errors.rollNumber && (
                      <p className="text-xs text-[#DC2626] mt-1 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" /> {errors.rollNumber}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleBack}
                      disabled={step === 0}
                      className="flex-1 py-3 px-4 border border-[#DDD6FE] rounded-xl text-[#312E81] font-medium hover:bg-[#F5F3FF] disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 bg-[#7C3AED] hover:bg-[#6A2DCE] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      Next
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 1: Contact Info (Email + Optional Phone) */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-[#7C3AED]" />
                      University Email <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="you@gmail.com or @gbu.ac.in"
                      className={`w-full px-4 py-3.5 border ${
                        errors.email ? 'border-[#DC2626]' : 'border-[#DDD6FE]'
                      } rounded-xl focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none`}
                    />
                    <p className="text-xs text-[#6D28D9] mt-1 opacity-80">
                      We'll send a verification OTP to this email
                    </p>
                    {errors.email && (
                      <p className="text-xs text-[#DC2626] mt-1 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-[#7C3AED]" />
                      Mobile Number<span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="flex">
                      <div className="bg-[#F5F3FF] border border-r-0 border-[#DDD6FE] px-4 py-3.5 rounded-l-xl flex items-center text-[#6D28D9] font-medium">
                        +91
                      </div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210"
                        className="flex-1 px-4 py-3.5 border border-[#DDD6FE] rounded-r-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED]"
                        maxLength="10"
                      />
                    </div>
                    <p className="text-xs text-[#6D28D9] mt-1 opacity-80">
                      Used only for emergency contact (never shared)
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#DDD6FE]">
                    <div className="flex items-start">
                      <Shield className="w-4 h-4 text-[#7C3AED] mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-xs text-[#312E81]">
                        <span className="font-medium">Privacy assured:</span> Your data is encrypted and never shared with your college.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleBack}
                      className="flex-1 py-3 px-4 border border-[#DDD6FE] rounded-xl text-[#312E81] font-medium hover:bg-[#F5F3FF]"
                    >
                      <ArrowLeft className="w-4 h-4 inline mr-1" />
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 bg-[#7C3AED] hover:bg-[#6A2DCE] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      Send OTP
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: OTP Verification */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mail className="w-6 h-6 text-[#7C3AED]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#312E81]">Check Your Email</h3>
                    <p className="text-[#6D28D9] opacity-90 mt-1">
                      We sent a 6-digit code to:
                      <br />
                      <span className="font-medium">{formData.email}</span>
                    </p>
                  </div>

                  <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOTPChange(e.target.value, index)}
                        onKeyDown={(e) => handleOTPKeyDown(e, index)}
                        className="w-11 h-13 text-center text-lg font-bold border-2 border-[#DDD6FE] rounded-xl focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 outline-none"
                      />
                    ))}
                  </div>

                  {errors.otp && (
                    <p className="text-center text-sm text-[#DC2626] flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 mr-1" /> {errors.otp}
                    </p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleBack}
                      className="flex-1 py-3 px-4 border border-[#DDD6FE] rounded-xl text-[#312E81] font-medium hover:bg-[#F5F3FF]"
                    >
                      <ArrowLeft className="w-4 h-4 inline mr-1" />
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={otp.some(d => !d)}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                        otp.every(d => d)
                          ? 'bg-[#4C1D95] hover:bg-[#3d177b] text-white'
                          : 'bg-[#F5F3FF] text-[#6D28D9] opacity-70 cursor-not-allowed'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Complete Registration
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#7C3AED]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#312E81] mb-3">Welcome to Bodhi-Mitra!</h3>
                  <p className="text-[#6D28D9] opacity-90 mb-6">
                    Your safe, confidential space is ready, {formData.name || 'friend'} 🌱
                  </p>
                  
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="w-full bg-[#7C3AED] hover:bg-[#6A2DCE] text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    Go to Your Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className="container mx-auto px-4 pb-6 text-center text-xs text-[#6D28D9] opacity-80">
        <p className="mb-1">
          🔐 End-to-end encrypted • Data never sold • DPDP Act compliant
        </p>
        <p>💙 You’re not alone. We’re here for you.</p>
      </div>
    </div>
  );
}