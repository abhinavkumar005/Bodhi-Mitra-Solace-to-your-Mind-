import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageCircle, AlertTriangle, Phone, Shield, X, CheckCircle,
  ArrowLeft, Send, User, Lock
} from 'lucide-react';

export default function QuickConnect() {
  const navigate = useNavigate();
  const [step, setStep] = useState('otp'); // 'otp' | 'chat'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [nickname, setNickname] = useState('');
  const otpInputsRef = useRef([]);

  // Auto-focus OTP inputs
  useEffect(() => {
    if (isOtpSent) {
      otpInputsRef.current[0]?.focus();
    }
  }, [isOtpSent]);

  const isValidPhone = () => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10 && /^[6-9]/.test(digits);
  };

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

  const handleSendOtp = () => {
    if (isValidPhone()) {
      setIsOtpSent(true);
      // In real app: API call to /send-otp
      console.log('OTP sent to +91', phone);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.every(d => d)) {
      setIsVerified(true);
      // In real app: API call to /verify-otp
      setTimeout(() => setStep('chat'), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE9FE] flex flex-col">
      {/* 🔴 Emergency Banner (Always Visible) */}
      <div className="bg-[#FFF7FA] border-b border-[#DC2626]/20 p-2">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-[#DC2626] mr-2 flex-shrink-0" />
          <p className="text-[10px] md:text-xs text-[#312E81] font-medium">
            In immediate danger? 
            <button 
              onClick={() => navigate('/emergency')}
              className="ml-1 underline hover:text-[#DC2626]"
            >
              Get Emergency Help Now
            </button>
          </p>
        </div>
      </div>

      {/* 🌿 Header */}
      <header className="container mx-auto px-4 pt-4 pb-2 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 text-[#7C3AED] hover:bg-[#F5F3FF] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex-1 flex flex-col items-center">
          <div className="w-10 h-10 bg-[#7C3AED] rounded-full flex items-center justify-center mb-1">
            <span className="text-white text-sm font-bold">B</span>
          </div>
          <h1 className="text-lg font-bold text-[#312E81]">Quick Connect</h1>
        </div>
        
        <div className="w-10"></div> {/* Spacer for symmetry */}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          {/* 💬 Hero */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-[#7C3AED]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#312E81] mb-2">
              Talk to a Psychologist — Right Now
            </h2>
            <p className="text-[#6D28D9] opacity-90">
              No registration. No judgment. Just support.
            </p>
          </div>

          {/* 📱 OTP Flow */}
          {step === 'otp' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#DDD6FE]">
              {!isOtpSent ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-2 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-[#7C3AED]" />
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

                  <div className="pt-2">
                    <button
                      onClick={handleSendOtp}
                      disabled={!isValidPhone()}
                      className={`w-full py-4 px-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
                        isValidPhone()
                          ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white'
                          : 'bg-[#F5F3FF] text-[#6D28D9] opacity-50'
                      }`}
                    >
                      <Send className="w-5 h-5" />
                      Send OTP
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#312E81] mb-2">Enter OTP</h3>
                    <p className="text-[#6D28D9] opacity-90 mb-4">
                      We sent a code to <span className="font-medium">+91 {phone.slice(0,5)} ****{phone.slice(-2)}</span>
                    </p>
                    
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
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={handleVerifyOtp}
                      disabled={!otp.every(d => d)}
                      className={`w-full py-4 rounded-xl font-medium ${
                        otp.every(d => d)
                          ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white'
                          : 'bg-[#F5F3FF] text-[#6D28D9] opacity-50'
                      }`}
                    >
                      {isVerified ? (
                        <span className="flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Verified — Starting Chat...
                        </span>
                      ) : (
                        'Verify & Start Chat'
                      )}
                    </button>
                    
                    <button
                      onClick={() => setIsOtpSent(false)}
                      className="w-full py-3 text-[#7C3AED] font-medium"
                    >
                      ← Edit Number
                    </button>
                  </div>
                </div>
              )}
              
              {/* 🛡️ Privacy Notes */}
              <div className="mt-6 pt-4 border-t border-[#DDD6FE]">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Shield className="w-4 h-4 text-[#7C3AED] mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-xs text-[#6D28D9]">
                      <span className="font-medium">Anonymous & confidential:</span> Your number is encrypted and never shared with your college.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <User className="w-4 h-4 text-[#7C3AED] mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-xs text-[#6D28D9]">
                      <span className="font-medium">Optional nickname:</span> You can add one after verification (or stay anonymous).
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Lock className="w-4 h-4 text-[#7C3AED] mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-xs text-[#6D28D9]">
                      <span className="font-medium">No pressure:</span> You can end the chat anytime. Register later if you choose.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 💬 Chat Preview (After Verification) */}
          {step === 'chat' && (
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#DDD6FE]">
              <div className="p-4 border-b border-[#DDD6FE]">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">DM</span>
                  </div>
                  <div>
                    <div className="font-bold text-[#312E81]">Dr. Mehta</div>
                    <div className="text-xs text-[#6D28D9] flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Online • Clinical Psychologist
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 h-48 bg-[#F5F3FF] overflow-y-auto">
                <div className="flex justify-start mb-4">
                  <div className="max-w-xs bg-white rounded-2xl px-4 py-3 text-[#312E81]">
                    <p className="text-sm">
                      Hi{nickname ? `, ${nickname}` : ''}, I'm Dr. Mehta. I'm here to listen — no judgment, no pressure.
                    </p>
                    <p className="text-xs text-[#6D28D9] mt-2">Just now</p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="bg-[#EDE9FE] text-[#7C3AED] text-xs px-3 py-1.5 rounded-full flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified • Anonymous session
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-t border-[#DDD6FE]">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-[#DDD6FE] rounded-l-xl focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  />
                  <button className="bg-[#7C3AED] text-white px-4 rounded-r-xl">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mt-3 flex justify-between">
                  <button className="text-xs text-[#7C3AED] hover:underline">
                    Add nickname
                  </button>
                  <button className="text-xs text-[#7C3AED] hover:underline">
                    Start voice call
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 💬 Floating Emergency Button (Mobile) */}
      <button
        onClick={() => navigate('/emergency')}
        className="fixed bottom-6 right-6 z-10 w-14 h-14 bg-[#DC2626] text-white rounded-full shadow-lg flex items-center justify-center md:hidden animate-pulse"
        aria-label="Emergency help"
      >
        <AlertTriangle className="w-6 h-6" />
      </button>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}