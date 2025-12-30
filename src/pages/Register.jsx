import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Calendar, GraduationCap, Home, Mail, Phone, CheckCircle, AlertTriangle,
  Wifi, ArrowLeft, Shield, Heart, X as XIcon
} from 'lucide-react';

export default function Register() {
  // ✅ Steps: 0=Basic, 1=University, 2=Contact, 3=Consent, 4=OTP, 5=Success
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    gender: '',
    ageGroup: '',
    school: '',
    hostel: '',
    email: '',
    phone: ''  // ← Stores ONLY raw digits (e.g., "9876543210")
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isDetecting, setIsDetecting] = useState(true);
  const [detectedSchool, setDetectedSchool] = useState('');
  const [detectedHostel, setDetectedHostel] = useState('');
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState({
    confidential: false,
    notShared: false,
    locationEmergency: false
  });

  // Simulate campus detection
  useEffect(() => {
    const timer = setTimeout(() => {
      const schools = [
        'University School of Engineering',
        'University School of Law, Justice & Governance',
        'University School of Management'
      ];
      const hostelsFemale = [
        'Savitri Bai Phule Girls Hostel',
        'Rani Laxmi Bai Girls Hostel',
        'Rama Bai Ambedkar Girls Hostel',
        'Mahamaya Girls Hostel',
        'Mahadevi Verma Girls Hostel',
        'Ismat Chughtai Girls Hostel'
      ];
      const hostelsMale = [
        'Maharshi Valmiki Boys Hostel',
        'Malik Mohammad Jaisi Boys Hostel',
        'Raheem Boys Hostel',
        'Tulsidas Boys Hostel',
        'Guru Ghasi Das Boys Hostel',
        'Ram Sharan Das Boys Hostel',
        'Shree Narayan Guru Boys Hostel',
        'Birsa Munda Boys Hostel',
        'Sant Ravidas Boys Hostel',
        'Sant Kabir Das Boys Hostel'
      ];
      
      const random = Math.random();
      if (random > 0.4) {
        setDetectedSchool(schools[Math.floor(Math.random() * schools.length)]);
        if (random > 0.7) {
          setDetectedHostel(hostelsFemale[Math.floor(Math.random() * hostelsFemale.length)]);
        } else {
          setDetectedHostel(hostelsMale[Math.floor(Math.random() * hostelsMale.length)]);
        }
      }
      setIsDetecting(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const schools = [
    'University School of Engineering',
    'University School of Management',
    'University School of Information & Communication Technology',
    'University School of Biotechnology',
    'University School of Humanities & Social Sciences',
    'University School of Vocational Studies & Applied Sciences',
    'University School of Law, Justice & Governance',
    'University School of Buddhist Studies & Civilization',
  ];

  const hostels = [
    { label: '— Female Hostels —', disabled: true },
    'Savitri Bai Phule Girls Hostel',
    'Rani Laxmi Bai Girls Hostel',
    'Rama Bai Ambedkar Girls Hostel',
    'Mahamaya Girls Hostel',
    'Mahadevi Verma Girls Hostel',
    'Ismat Chughtai Girls Hostel',
    { label: '— Male Hostels —', disabled: true },
    'Maharshi Valmiki Boys Hostel',
    'Malik Mohammad Jaisi Boys Hostel',
    'Raheem Boys Hostel',
    'Tulsidas Boys Hostel',
    'Guru Ghasi Das Boys Hostel',
    'Ram Sharan Das Boys Hostel',
    'Shree Narayan Guru Boys Hostel',
    'Birsa Munda Boys Hostel',
    'Sant Ravidas Boys Hostel',
    'Sant Kabir Das Boys Hostel',
  ];

  const ageGroups = ['15-19', '20-24', '25-29', '30+', 'Prefer not to say'];

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
      if (!formData.gender) newErrors.gender = 'Please select gender';
      if (!formData.ageGroup) newErrors.ageGroup = 'Please select age group';
    } else if (step === 1) {
      if (!formData.school) newErrors.school = 'School is required';
      if (!formData.hostel) newErrors.hostel = 'Hostel is required';
    } else if (step === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        newErrors.email = 'Valid email required';
      }
      // ✅ FIXED: 10-digit Indian number validation
      const phoneRegex = /^[789]\d{9}$/;
      if (!formData.phone || !phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Enter 10-digit mobile number (starting with 7, 8, or 9)';
      }
    } else if (step === 3) {
      if (!consent.confidential) newErrors.confidential = true;
      if (!consent.notShared) newErrors.notShared = true;
      if (!consent.locationEmergency) newErrors.locationEmergency = true;
    } else if (step === 4) {
      if (otp.some(d => !d)) newErrors.otp = 'Please enter full 6-digit OTP';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, 5));
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

  const handleConsentChange = (field) => {
    setConsent(prev => ({ ...prev, [field]: !prev[field] }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = () => {
    if (validateStep()) {
      setStep(5); // Success
      // In real app: API call → redirect to /dashboard
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE9FE] flex flex-col">
      {/* Emergency Banner */}
      <div className="bg-[#FFF5F5] border-b border-[#DC2626]/20 p-3">
        <div className="container mx-auto px-4 flex items-center justify-center text-[#DC2626] text-sm font-medium">
          <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
          In distress? 
          <button 
            onClick={() => window.location.href = '/emergency'}
            className="underline ml-1 hover:text-[#b3001d] flex items-center"
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
            <img 
    src="/images/pschylogo.svg" 
    alt="Bodhi-Mitra Logo"
    className="w-15 h-auto rounded-full max-h-16 object-contain"
    onError={(e) => {
      e.target.style.display = 'none';
      e.target.parentElement.innerHTML = `
        <div class="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </div>
      `;
    }}
  />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#312E81]">
            Bodhi<span className="text-[#7C3AED]">-Mitra</span>
          </h1>
          <p className="text-[#6D28D9] mt-1 font-medium">
            Create your account — 30 seconds, 100% confidential
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((s) => (
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
              {s < 4 && (
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
          <span>Basic</span>
          <span>University</span>
          <span>Contact</span>
          <span>Consent</span>
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

                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2 text-[#7C3AED]" />
                      Gender <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Male', 'Female', 'Other/Prefer not to say'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => handleInputChange('gender', g)}
                          className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition-colors ${
                            formData.gender === g
                              ? 'bg-[#F5F3FF] border-[#7C3AED] text-[#7C3AED]'
                              : 'bg-white border-[#DDD6FE] text-[#312E81] hover:bg-[#F9F7FE]'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                    {errors.gender && (
                      <p className="text-xs text-[#DC2626] mt-1 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" /> {errors.gender}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-[#7C3AED]" />
                      Age Group <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {ageGroups.map(age => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => handleInputChange('ageGroup', age)}
                          className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition-colors ${
                            formData.ageGroup === age
                              ? 'bg-[#F5F3FF] border-[#7C3AED] text-[#7C3AED]'
                              : 'bg-white border-[#DDD6FE] text-[#312E81] hover:bg-[#F9F7FE]'
                          }`}
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                    {errors.ageGroup && (
                      <p className="text-xs text-[#DC2626] mt-1 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" /> {errors.ageGroup}
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

              {/* Step 1: University Info */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2 flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-[#7C3AED]" />
                      School <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="relative">
                      {isDetecting ? (
                        <div className="w-full px-4 py-3.5 border border-[#DDD6FE] rounded-xl bg-[#F5F3FF] flex items-center">
                          <Wifi className="w-4 h-4 text-[#7C3AED] mr-2 animate-pulse" />
                          <span className="text-[#312E81] opacity-80">Detecting your school...</span>
                        </div>
                      ) : detectedSchool ? (
                        <div className="w-full px-4 py-3.5 border-2 border-[#7C3AED]/30 rounded-xl bg-[#F5F3FF] flex items-center">
                          <CheckCircle className="w-4 h-4 text-[#7C3AED] mr-2" />
                          <span className="text-[#312E81]">
                            Detected: <span className="font-medium">{detectedSchool}</span>
                          </span>
                          <button 
                            type="button"
                            onClick={() => setDetectedSchool('')}
                            className="ml-auto text-[#7C3AED] hover:text-[#312E81]"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <select
                          value={formData.school}
                          onChange={(e) => handleInputChange('school', e.target.value)}
                          className={`w-full px-4 py-3.5 border ${
                            errors.school ? 'border-[#DC2626]' : 'border-[#DDD6FE]'
                          } rounded-xl focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none appearance-none bg-white`}
                        >
                          <option value="">Select your school</option>
                          {schools.map(school => (
                            <option key={school} value={school}>{school}</option>
                          ))}
                        </select>
                      )}
                    </div>
                    {errors.school && (
                      <p className="text-xs text-[#DC2626] mt-1 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" /> {errors.school}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2 flex items-center">
                      <Home className="w-4 h-4 mr-2 text-[#7C3AED]" />
                      Hostel <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="relative">
                      {detectedHostel ? (
                        <div className="w-full px-4 py-3.5 border-2 border-[#7C3AED]/30 rounded-xl bg-[#F5F3FF] flex items-center">
                          <CheckCircle className="w-4 h-4 text-[#7C3AED] mr-2" />
                          <span className="text-[#312E81]">
                            Detected: <span className="font-medium">{detectedHostel}</span>
                          </span>
                          <button 
                            type="button"
                            onClick={() => setDetectedHostel('')}
                            className="ml-auto text-[#7C3AED] hover:text-[#312E81]"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <select
                          value={formData.hostel}
                          onChange={(e) => handleInputChange('hostel', e.target.value)}
                          className={`w-full px-4 py-3.5 border ${
                            errors.hostel ? 'border-[#DC2626]' : 'border-[#DDD6FE]'
                          } rounded-xl focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none appearance-none bg-white`}
                        >
                          <option value="">Select your hostel</option>
                          {hostels.map((hostel, i) =>
                            typeof hostel === 'string' ? (
                              <option key={i} value={hostel}>{hostel}</option>
                            ) : (
                              <optgroup key={i} label={hostel.label} />
                            )
                          )}
                        </select>
                      )}
                    </div>
                    {errors.hostel && (
                      <p className="text-xs text-[#DC2626] mt-1 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" /> {errors.hostel}
                      </p>
                    )}
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
                      Next
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Info — ✅ FIXED PHONE INPUT */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-[#7C3AED]" />
                      Email <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="e.g., example@gbu.ac.in"
                      className={`w-full px-4 py-3.5 border ${
                        errors.email ? 'border-[#DC2626]' : 'border-[#DDD6FE]'
                      } rounded-xl focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none`}
                    />
                    {errors.email && (
                      <p className="text-xs text-[#DC2626] mt-1 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* ✅ FIXED: Robust 10-digit phone input */}
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-[#7C3AED]" />
                      Mobile Number <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="flex">
                      {/* Fixed +91 prefix */}
                      <div className="bg-[#F5F3FF] border border-r-0 border-[#DDD6FE] px-4 py-3.5 rounded-l-xl flex items-center text-[#6D28D9] font-medium">
                        +91
                      </div>
                      {/* User types 10 digits only */}
                      <input
                        type="tel"
                        // ✅ Format on render: "98765 43210"
                        value={formData.phone.length > 5 ? `${formData.phone.slice(0,5)} ${formData.phone.slice(5,10)}` : formData.phone}
                        onChange={(e) => {
                          // ✅ Extract digits only, allow up to 10
                          const raw = e.target.value.replace(/\D/g, '');
                          if (raw.length <= 10) {
                            handleInputChange('phone', raw); // Store raw digits
                          }
                        }}
                        placeholder="98765 43210"
                        className={`flex-1 px-4 py-3.5 border ${
                          errors.phone ? 'border-[#DC2626]' : 'border-[#DDD6FE]'
                        } rounded-r-xl focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none`}
                        inputMode="numeric"
                      />
                    </div>
                    <p className="text-xs text-[#6D28D9] mt-1 opacity-80">
                      We'll send OTP to this number for verification
                    </p>
                    {errors.phone && (
                      <p className="text-xs text-[#DC2626] mt-1 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" /> {errors.phone}
                      </p>
                    )}
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
                      Next
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Consent */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-6 h-6 text-[#7C3AED]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#312E81]">Your Privacy Matters</h3>
                    <p className="text-[#6D28D9] opacity-90 mt-1">
                      Please confirm these key points before proceeding
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { 
                        id: 'confidential', 
                        text: 'I understand my data is confidential and protected under Indian privacy laws',
                        error: errors.confidential
                      },
                      { 
                        id: 'notShared', 
                        text: 'My information will NOT be shared with my college, hostel, or university',
                        error: errors.notShared
                      },
                      { 
                        id: 'locationEmergency', 
                        text: 'Location access is requested ONLY during life-threatening emergencies (with my consent)',
                        error: errors.locationEmergency
                      }
                    ].map(({ id, text, error }) => (
                      <label 
                        key={id}
                        className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${
                          error 
                            ? 'border-[#DC2626] bg-[#FFF5F5]' 
                            : consent[id] 
                              ? 'border-[#7C3AED]/30 bg-[#F5F3FF]' 
                              : 'border-[#DDD6FE] bg-white hover:bg-[#F9F7FE]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={consent[id]}
                          onChange={() => handleConsentChange(id)}
                          className="mt-1 w-4 h-4 text-[#7C3AED] rounded focus:ring-[#7C3AED]/30"
                        />
                        <span className="ml-3 text-[#312E81] text-sm">{text}</span>
                      </label>
                    ))}
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
                      disabled={!consent.confidential || !consent.notShared || !consent.locationEmergency}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                        consent.confidential && consent.notShared && consent.locationEmergency
                          ? 'bg-[#7C3AED] hover:bg-[#6A2DCE] text-white'
                          : 'bg-[#F5F3FF] text-[#6D28D9] opacity-70 cursor-not-allowed'
                      }`}
                    >
                      Confirm & Verify
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: OTP Verification */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-6 h-6 text-[#7C3AED]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#312E81]">Verify Your Identity</h3>
                    <p className="text-[#6D28D9] opacity-90 mt-1">
                      We sent a 6-digit code to:
                      <br />
                      <span className="font-medium">{formData.email}</span> and 
                      <span className="font-medium"> +91 {formData.phone.length > 5 ? `${formData.phone.slice(0,5)} ${formData.phone.slice(5,10)}` : formData.phone}</span>
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

              {/* Step 5: Success */}
              {step === 5 && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#7C3AED]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#312E81] mb-3">Registration Complete!</h3>
                  <p className="text-[#6D28D9] opacity-90 mb-6">
                    Welcome to Bodhi-Mitra, {formData.name || 'friend'} 🌱
                    <br />
                    Your safe, confidential space is ready.
                  </p>
                  
                  <div className="bg-[#F5F3FF] rounded-xl p-4 mb-6">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-[#7C3AED] rounded-full mt-2 mr-3"></div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-[#312E81]">You can now:</p>
                        <ul className="text-xs text-[#6D28D9] mt-1 space-y-1 opacity-90">
                          <li>• Start anonymous chat with psychologists</li>
                          <li>• Track mood & journal (optional)</li>
                          <li>• Access 24/7 crisis support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => window.location.href = '/dashboard'}
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
          🔐 End-to-end encrypted • Data never sold • GDPR & India DPDP Act compliant
        </p>
        <p>💙 You’re not alone. We’re here for you.</p>
      </div>
    </div>
  );
}