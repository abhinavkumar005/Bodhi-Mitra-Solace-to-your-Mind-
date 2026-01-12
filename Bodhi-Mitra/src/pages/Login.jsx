import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, Lock, ArrowRight, Shield, Heart, AlertTriangle,
  UserCheck, ArrowLeft, GraduationCap, CheckCircle
} from 'lucide-react';

export default function Login() {
  const [step, setStep] = useState('role'); // 'role' → 'login'
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);

  // OTP timer
  useEffect(() => {
    let interval;
    if (step === 'login' && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

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

  const handleResendOTP = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setOtpTimer(30);
      setOtp(['', '', '', '', '', '']);
    }, 1000);
  };

  const handleLogin = () => {
    if (email && otp.every(d => d)) {
      // Save session
      const session = {
        id: `sess_${Date.now()}`,
        email,
        role: selectedRole,
        timestamp: new Date().toISOString()
      };
      sessionStorage.setItem('bodhi_session', JSON.stringify(session));
      
      const paths = {
        student: '/dashboard',
        psychologist: '/psychologist',
        admin: '/admin'
      };
      window.location.href = paths[selectedRole] || '/dashboard';
    } else {
      alert('⚠️ Please enter email and full OTP.');
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep('login');
    setEmail('');
    setOtp(['', '', '', '', '', '']);
    setOtpTimer(30);
  };

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="min-h-screen bg-[#EDE9FE] flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 pt-8 pb-4 text-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-3">
            <img 
              src="/images/pschylogo.svg" 
              alt="Bodhi-Mitra Logo"
              className="w-16 h-auto rounded-full max-h-16 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-2 border-[#7C3AED]/20">
                    <img src="/images/logo.svg" alt="Bodhi-Mitra Logo" class="w-full h-full object-cover" />
                  </div>
                `;
              }}
            />
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
            <div className="bg-[#FFF5F5] border-b border-[#DC2626]/20 p-3">
              <div className="flex items-center justify-center text-[#DC2626] text-sm font-medium">
                <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                In crisis? 
                <button 
                  onClick={() => window.location.href = '/emergency'}
                  className="underline ml-1 hover:text-[#b3001d] flex items-center"
                >
                  Get Emergency Help Now
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Role Selection */}
              {step === 'role' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#312E81] mb-2">
                      Welcome to Bodhi-Mitra
                    </h2>
                    <p className="text-[#6D28D9] opacity-90">
                      Please select your role to continue
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
                        Email + OTP login
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
                        Email + OTP login
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
                          ? 'border-[#DC2626] bg-[#FFF5F5] shadow-md'
                          : 'border-[#DDD6FE] bg-white hover:bg-[#F9F7FE]'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        selectedRole === 'admin' ? 'bg-[#DC2626]' : 'bg-[#FFF5F5]'
                      }`}>
                        <Shield 
                          className={`w-6 h-6 ${
                            selectedRole === 'admin' ? 'text-white' : 'text-[#DC2626]'
                          }`} 
                        />
                      </div>
                      <h3 className="font-semibold text-[#312E81]">Admin</h3>
                      <p className="text-xs text-[#6D28D9] text-center mt-1 opacity-80">
                        Email + OTP login
                      </p>
                      {selectedRole === 'admin' && (
                        <CheckCircle className="w-5 h-5 text-[#DC2626] mt-1" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Email + OTP Login */}
              {step === 'login' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#312E81] mb-1">
                      {selectedRole === 'student' 
                        ? 'Hello, Student 🌱' 
                        : selectedRole === 'psychologist' 
                          ? 'Welcome, Psychologist 💙' 
                          : 'Admin Access 🔐'}
                    </h2>
                    <p className="text-[#6D28D9] opacity-90">
                      Enter your registered email to receive OTP
                    </p>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2">
                      Registered Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="w-4 h-4 text-[#7C3AED]" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={
                          selectedRole === 'student' 
                            ? 'you@gbu.ac.in' 
                            : selectedRole === 'psychologist' 
                              ? 'name@gbu.ac.in' 
                              : 'admin@gbu.ac.in'
                        }
                        className="w-full pl-10 pr-4 py-3.5 border border-[#DDD6FE] rounded-xl focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none"
                      />
                    </div>
                  </div>

                  {/* OTP Section */}
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2">
                      OTP (sent to {email || 'your email'})
                    </label>
                    <div className="flex justify-between gap-2 mb-2">
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

                    <div className="flex justify-between items-center text-sm">
                      {otpTimer > 0 ? (
                        <span className="text-[#312E81] opacity-80">
                          Resend in <span className="font-medium text-[#7C3AED]">{otpTimer}s</span>
                        </span>
                      ) : (
                        <button
                          onClick={handleResendOTP}
                          disabled={isResending || !isEmailValid()}
                          className="text-[#7C3AED] hover:underline font-medium disabled:opacity-50 flex items-center"
                        >
                          <ArrowLeft className="w-3 h-3 mr-1" />
                          {isResending ? 'Sending...' : 'Resend OTP'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    onClick={handleLogin}
                    disabled={!isEmailValid() || otp.some(d => !d)}
                    className={`w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-bold transition-colors ${
                      isEmailValid() && otp.every(d => d)
                        ? 'bg-[#7C3AED] hover:bg-[#6A2DCE] text-white shadow-md' 
                        : 'bg-[#F5F3FF] text-[#6D28D9] opacity-70 cursor-not-allowed'
                    }`}
                  >
                    <UserCheck className="w-5 h-5" />
                    Log In as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
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
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-[#6D28D9] opacity-80">
            <p className="mb-1">
              🔐 End-to-end encrypted • Data never sold • DPDP Act compliant
            </p>
            <p>🌱 Your well-being is our priority.</p>
          </div>
        </div>
      </main>
    </div>
  );
}