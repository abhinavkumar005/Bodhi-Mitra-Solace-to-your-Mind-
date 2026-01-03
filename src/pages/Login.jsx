import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, Phone, Lock, ArrowRight, Shield, Heart, AlertTriangle,
  User, X, ArrowLeft, GraduationCap, CheckCircle, Key, UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Added

export default function Login() {
  const navigate = useNavigate(); // ✅ For safe navigation
  const [step, setStep] = useState('role'); // 'role' → 'phone' → 'otp' → 'success'
  const [selectedRole, setSelectedRole] = useState(null); // 'student' | 'psychologist' | 'admin'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);
  
  const otpInputsRef = useRef([]);

  // OTP auto-focus
  useEffect(() => {
    if (step === 'otp') {
      otpInputsRef.current[0]?.focus();
    }
  }, [step]);

  // OTP countdown
  useEffect(() => {
    let interval;
    if (step === 'otp' && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  // Handle OTP input
  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        otpInputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Send OTP (simulated)
  const handleSendOtp = () => {
    if (isValidPhone()) {
      setStep('otp');
      setOtpTimer(30);
      // In real app: API call to /send-otp
      console.log('OTP sent to +91', phone);
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setOtpTimer(30);
      // In real app: API call to /resend-otp
    }, 1000);
  };

  // Verify OTP & Login
  const handleLogin = () => {
    if (otp.every(d => d)) {
      // In real app: API call to /verify-otp
      alert(`✅ Logged in as ${selectedRole}!`);
      
      const paths = {
        student: '/dashboard',
        psychologist: '/psychologist',
        admin: '/admin'
      };
      navigate(paths[selectedRole] || '/dashboard');
    } else {
      alert('⚠️ Please enter the full 6-digit OTP.');
    }
  };

  // Role selection
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep('phone');
    setPhone('');
    setOtp(['', '', '', '', '', '']);
    setOtpTimer(30);
  };

  // Phone validation
  const isValidPhone = () => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10 && /^[6-9]/.test(digits);
  };

  return (
    <div className="min-h-screen bg-[#EDE9FE] flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 pt-8 pb-4 text-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-3">
            <div className="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">B</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#312E81]">
            Bodhi<span className="text-[#7C3AED]">-Mitra</span>
          </h1>
          <p className="text-[#6D28D9] mt-1 font-medium">
            Your safe mental health space
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-[#DDD6FE] overflow-hidden">
            {/* Emergency Banner */}
            <div className="bg-[#FFF7FA] border-b border-[#DC2626]/20 p-3">
              <div className="flex items-center justify-center text-[#DC2626] text-sm font-medium">
                <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                In crisis? 
                <button 
                  onClick={() => navigate('/emergency')}
                  className="underline ml-1 hover:text-[#b3001d] flex items-center"
                >
                  Get Emergency Help Now
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Step 1: Role Selection */}
              {step === 'role' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#312E81] mb-2">
                      Welcome to Bodhi-Mitra
                    </h2>
                    <p className="text-[#6D28D9] opacity-90">
                      Select your role to continue
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Student */}
                    <button
                      onClick={() => handleRoleSelect('student')}
                      className={`flex flex-col items-center p-5 rounded-2xl border-2 transition-all duration-200 ${
                        selectedRole === 'student'
                          ? 'border-[#7C3AED] bg-[#F5F3FF] shadow-md'
                          : 'border-[#DDD6FE] bg-white hover:bg-[#F9F7FE]'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        selectedRole === 'student' ? 'bg-[#7C3AED]' : 'bg-[#F5F3FF]'
                      }`}>
                        <GraduationCap 
                          className={`w-6 h-6 ${
                            selectedRole === 'student' ? 'text-white' : 'text-[#7C3AED]'
                          }`} 
                        />
                      </div>
                      <h3 className="font-semibold text-[#312E81]">Student</h3>
                      <p className="text-xs text-[#6D28D9] text-center mt-1 opacity-80">
                        Anonymous chat, journal, support
                      </p>
                      {selectedRole === 'student' && (
                        <CheckCircle className="w-5 h-5 text-[#7C3AED] mt-1" />
                      )}
                    </button>

                    {/* Psychologist */}
                    <button
                      onClick={() => handleRoleSelect('psychologist')}
                      className={`flex flex-col items-center p-5 rounded-2xl border-2 transition-all duration-200 ${
                        selectedRole === 'psychologist'
                          ? 'border-[#4C1D95] bg-[#F5F3FF] shadow-md'
                          : 'border-[#DDD6FE] bg-white hover:bg-[#F9F7FE]'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        selectedRole === 'psychologist' ? 'bg-[#4C1D95]' : 'bg-[#F5F3FF]'
                      }`}>
                        <Heart 
                          className={`w-6 h-6 ${
                            selectedRole === 'psychologist' ? 'text-white' : 'text-[#4C1D95]'
                          }`} 
                        />
                      </div>
                      <h3 className="font-semibold text-[#312E81]">Psychologist</h3>
                      <p className="text-xs text-[#6D28D9] text-center mt-1 opacity-80">
                        Manage sessions, case notes
                      </p>
                      {selectedRole === 'psychologist' && (
                        <CheckCircle className="w-5 h-5 text-[#4C1D95] mt-1" />
                      )}
                    </button>

                    {/* Admin */}
                    <button
                      onClick={() => handleRoleSelect('admin')}
                      className={`flex flex-col items-center p-5 rounded-2xl border-2 transition-all duration-200 ${
                        selectedRole === 'admin'
                          ? 'border-[#DC2626] bg-[#FFF7FA] shadow-md'
                          : 'border-[#DDD6FE] bg-white hover:bg-[#F9F7FE]'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        selectedRole === 'admin' ? 'bg-[#DC2626]' : 'bg-[#FFF7FA]'
                      }`}>
                        <Shield 
                          className={`w-6 h-6 ${
                            selectedRole === 'admin' ? 'text-white' : 'text-[#DC2626]'
                          }`} 
                        />
                      </div>
                      <h3 className="font-semibold text-[#312E81]">Admin</h3>
                      <p className="text-xs text-[#6D28D9] text-center mt-1 opacity-80">
                        Platform management, analytics
                      </p>
                      {selectedRole === 'admin' && (
                        <CheckCircle className="w-5 h-5 text-[#DC2626] mt-1" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Phone Input */}
              {step === 'phone' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#312E81] mb-1">
                      {selectedRole === 'student' ? 'Hello, Student 🌱' :
                       selectedRole === 'psychologist' ? 'Welcome, Psychologist 💙' : 'Admin Access 🔐'}
                    </h2>
                    <p className="text-[#6D28D9] opacity-90">
                      Enter your mobile number for OTP verification
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2">
                      Mobile Number (India)
                    </label>
                    <div className="flex">
                      <div className="bg-[#F5F3FF] border border-r-0 border-[#DDD6FE] px-4 py-3.5 rounded-l-xl flex items-center text-[#6D28D9] font-medium">
                        +91
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210"
                        className="flex-1 px-4 py-3.5 border border-[#DDD6FE] rounded-r-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED]"
                        maxLength="10"
                      />
                    </div>
                    <p className="text-xs text-[#6D28D9] mt-2 opacity-80">
                      We'll send a 6-digit OTP. Standard SMS rates apply.
                    </p>
                  </div>

                  <button
                    onClick={handleSendOtp}
                    disabled={!isValidPhone()}
                    className={`w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-bold transition-colors ${
                      isValidPhone()
                        ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-md' 
                        : 'bg-[#F5F3FF] text-[#6D28D9] opacity-70 cursor-not-allowed'
                    }`}
                  >
                    <Phone className="w-5 h-5" />
                    Send OTP
                  </button>

                  <button
                    onClick={() => setStep('role')}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-[#DDD6FE] rounded-xl text-[#312E81] hover:bg-[#F5F3FF]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Change Role
                  </button>
                </div>
              )}

              {/* Step 3: OTP Verification */}
              {step === 'otp' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#312E81] mb-2">
                      Verify Your Identity
                    </h2>
                    <p className="text-[#6D28D9] opacity-90">
                      We sent a 6-digit code to <span className="font-medium">+91 {phone.slice(0,5)} ****{phone.slice(-2)}</span>
                    </p>
                  </div>

                  <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={el => otpInputsRef.current[index] = el}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        className="w-12 h-14 text-center text-lg font-bold border-2 border-[#DDD6FE] rounded-xl focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 outline-none"
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    {otpTimer > 0 ? (
                      <span className="text-[#312E81] opacity-80">
                        Resend in <span className="font-medium text-[#7C3AED]">{otpTimer}s</span>
                      </span>
                    ) : (
                      <button
                        onClick={handleResendOtp}
                        disabled={isResending}
                        className="text-[#7C3AED] hover:underline font-medium disabled:opacity-50 flex items-center"
                      >
                        <ArrowLeft className="w-3 h-3 mr-1" />
                        {isResending ? 'Sending...' : 'Resend OTP'}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={handleLogin}
                    disabled={!otp.every(d => d)}
                    className={`w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-bold transition-colors ${
                      otp.every(d => d)
                        ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-md' 
                        : 'bg-[#F5F3FF] text-[#6D28D9] opacity-70 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Verify & Log In
                  </button>

                  <button
                    onClick={() => setStep('phone')}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-[#DDD6FE] rounded-xl text-[#312E81] hover:bg-[#F5F3FF]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Edit Number
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-[#6D28D9] opacity-80">
            <p className="mb-1">
              🔐 Your number is encrypted and never shared with your college.
            </p>
            <p>🌱 Your well-being is our priority.</p>
          </div>
        </div>
      </main>
    </div>
  );
}