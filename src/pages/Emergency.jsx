import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertTriangle, Phone, Heart, Shield, X, MapPin, CheckCircle, Clock, 
  Volume2, ArrowLeft, User, MessageCircle, Lock, Eye
} from 'lucide-react';

export default function Emergency() {
  // 🔐 Core states
  const [step, setStep] = useState('auth'); // 'auth' | 'initial' | 'location' | 'connecting' | 'calming' | 'connected' | 'misuse'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [locationConsent, setLocationConsent] = useState(null);
  const [misuseCount, setMisuseCount] = useState(2); // Simulated misuse
  const [connected, setConnected] = useState(false);
  const [chatMode, setChatMode] = useState('quick'); // 'quick' | 'direct' | 'emergency'
  const [session, setSession] = useState(null); // Simulated existing session

  // OTP input refs
  const otpInputsRef = useRef([]);

  // Check for existing session (logged-in user)
  useEffect(() => {
    // Simulate existing session (e.g., from localStorage)
    const savedSession = sessionStorage.getItem('bodhi_session');
    if (savedSession) {
      setSession(JSON.parse(savedSession));
      setIsAuthenticated(true);
      setStep('initial');
    } else {
      setStep('auth');
    }
  }, []);

  // Misuse lock
  useEffect(() => {
    if (misuseCount >= 3) {
      setStep('misuse');
    }
  }, [misuseCount]);

  // OTP auto-focus
  useEffect(() => {
    if (isOtpSent) {
      otpInputsRef.current[0]?.focus();
    }
  }, [isOtpSent]);

  // Handle OTP input
  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
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

  // Phone validation
  const isValidPhone = () => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10 && /^[6-9]/.test(digits);
  };

  // Send OTP
  const handleSendOtp = () => {
    if (isValidPhone()) {
      // Simulate OTP sent
      setIsOtpSent(true);
      alert(`OTP sent to +91 ${phone.slice(-5).padStart(10, '*')}`);
    }
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    if (otp.every(d => d)) {
      // Simulate auth success
      setIsAuthenticated(true);
      setStep('initial');
      
      // Save session (simulated)
      const newSession = {
        id: `sess_${Date.now()}`,
        phone: `+91${phone}`,
        mode: chatMode,
        startTime: new Date().toISOString()
      };
      setSession(newSession);
      sessionStorage.setItem('bodhi_session', JSON.stringify(newSession));
    }
  };

  // Emergency flow
  const handleEmergencyClick = (option) => {
    if (!isAuthenticated) {
      setChatMode('emergency');
      setStep('auth');
      return;
    }
    
    setSelectedOption(option);
    if (option === 'now') {
      setStep('location');
    } else if (option === 'unsure') {
      setStep('calming');
      const timer = setTimeout(() => {
        if (step === 'calming') {
          setStep('initial');
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  };

  const handleLocationConsent = (consent) => {
    setLocationConsent(consent);
    setStep('connecting');
    
    const connectTimer = setTimeout(() => {
      setConnected(true);
      setStep('connected');
    }, 5000);
    
    return () => clearTimeout(connectTimer);
  };

  const handleMisuseConfirm = () => {
    setMisuseCount(0);
    setStep('initial');
  };

  // Global back handler
  const goBack = () => {
    switch (step) {
      case 'auth':
        if (isOtpSent) {
          setIsOtpSent(false);
          setOtp(['', '', '', '', '', '']);
        } else {
          window.history.back(); // Go to previous page
        }
        break;
      case 'location':
        setStep('initial');
        setSelectedOption(null);
        break;
      case 'connecting':
        setStep('location');
        break;
      case 'calming':
        setStep('initial');
        break;
      case 'connected':
        setStep('initial');
        setConnected(false);
        break;
      case 'misuse':
        setStep('initial');
        break;
      default:
        window.history.back();
    }
  };

  // Render phone auth screen
  const renderAuthScreen = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-md w-full">
        <div className="w-16 h-16 bg-[#7C3AED] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-[#7C3AED]" />
        </div>
        
        <h1 className="text-2xl font-bold text-[#312E81] mb-2">
          {chatMode === 'emergency' ? 'Emergency Verification' : 'Secure Access'}
        </h1>
        <p className="text-[#6D28D9] opacity-90 mb-6">
          {chatMode === 'emergency' 
            ? 'For your safety, we need to verify your number before connecting to emergency support.'
            : 'Verify your number for secure, anonymous support.'}
        </p>

        {!isOtpSent ? (
          <div className="space-y-4">
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
              <p className="text-xs text-[#6D28D9] mt-1 opacity-80">
                We'll send a 6-digit OTP. Standard SMS rates apply.
              </p>
            </div>
            
            <button
              onClick={handleSendOtp}
              disabled={!isValidPhone()}
              className={`w-full py-4 px-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
                isValidPhone()
                  ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white'
                  : 'bg-[#F5F3FF] text-[#6D28D9] opacity-50'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              Send OTP
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#312E81] mb-2">Enter OTP</h2>
              <p className="text-[#6D28D9] opacity-90 mb-4">
                We sent a 6-digit code to <span className="font-medium">+91 {phone.slice(0,5)} ****{phone.slice(-2)}</span>
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
            
            <div className="flex gap-3">
              <button
                onClick={() => setIsOtpSent(false)}
                className="flex-1 py-3 px-4 bg-white border-2 border-[#DDD6FE] text-[#312E81] font-medium rounded-xl hover:bg-[#F5F3FF]"
              >
                Back
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={!otp.every(d => d)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium ${
                  otp.every(d => d)
                    ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white'
                    : 'bg-[#F5F3FF] text-[#6D28D9] opacity-50'
                }`}
              >
                Verify & Continue
              </button>
            </div>
            
            <div className="pt-4 border-t border-[#DDD6FE]">
              <p className="text-xs text-[#6D28D9] text-center">
                <Eye className="w-3 h-3 inline mr-1" />
                Your number is encrypted and never shared.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Misuse Lock Screen */}
      {step === 'misuse' && (
        <div className="flex flex-col h-screen bg-[#F5F3FF]">
          <div className="p-4">
            <button 
              onClick={goBack}
              className="flex items-center text-[#7C3AED] hover:text-[#312E81] font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Emergency Options
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#312E81] mb-4">Emergency Access Temporarily Paused</h1>
            <p className="text-[#312E81] opacity-90 max-w-md mb-6">
              To protect our psychologists, emergency access is limited after repeated non-urgent use.
            </p>
            
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-sm border border-amber-200">
              <div className="flex items-center mb-4 p-3 bg-amber-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-700 mr-2 flex-shrink-0" />
                <span className="text-sm text-amber-800 font-medium">
                  You've used Emergency Help {misuseCount} times recently.
                </span>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => {
                    setChatMode('quick');
                    window.location.href = '/quick-connect';
                  }}
                  className="w-full py-3 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium rounded-xl transition-colors"
                >
                  Talk Now (Anonymous Chat)
                </button>
                
                <button 
                  onClick={handleMisuseConfirm}
                  className="w-full py-3 px-4 bg-white border-2 border-[#DC2626] text-[#DC2626] font-medium rounded-xl hover:bg-[#FFF7FA] transition-colors"
                >
                  This Is a Real Emergency — Connect Me
                </button>
              </div>
              
              <p className="text-xs text-[#312E81] opacity-70 mt-4">
                ⚠️ Misuse may result in temporary suspension. Genuine emergencies are always prioritized.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-white border-t border-[#DDD6FE] text-center">
            <p className="text-xs text-[#6D28D9] opacity-80">
              Need immediate help? Call 112 or campus helpline: 91529 87821
            </p>
          </div>
        </div>
      )}

      {/* Main Emergency Flow */}
      {step !== 'misuse' && (
        <div className="flex flex-col h-screen">
          {/* Fixed Header with Back Button */}
          <header className={`fixed top-0 left-0 right-0 z-20 flex items-center p-4 shadow-sm ${
            step === 'auth' ? 'bg-[#F5F3FF] border-b border-[#DDD6FE]' : 'bg-[#DC2626] text-white'
          }`}>
            <button 
              onClick={goBack}
              className={`p-2 rounded-full mr-3 transition-colors ${
                step === 'auth' 
                  ? 'text-[#7C3AED] hover:bg-[#F5F3FF]' 
                  : 'text-white hover:bg-red-700'
              }`}
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            {step === 'auth' ? (
              <div className="flex items-center">
                <Lock className="w-5 h-5 text-[#7C3AED] mr-2" />
                <span className="font-bold text-[#312E81]">Secure Verification</span>
              </div>
            ) : (
              <div className="flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                <span className="font-bold">
                  {chatMode === 'emergency' ? 'EMERGENCY SUPPORT' : 
                   chatMode === 'direct' ? 'DIRECT CHAT' : 'QUICK CHAT'}
                </span>
              </div>
            )}
            
            <div className="ml-auto text-xs opacity-90">
              {step === 'initial' && 'Step 1 of 3'}
              {step === 'location' && 'Step 2 of 3'}
              {step === 'connecting' && 'Step 3 of 3'}
              {step === 'calming' && 'Calming Mode'}
              {step === 'connected' && 'Connected'}
              {step === 'auth' && isOtpSent ? 'OTP Verification' : 'Phone Verification'}
            </div>
          </header>

          {/* Main Content (with top padding for header) */}
          <main className="flex-1 overflow-y-auto pt-16">
            {/* Phone Auth Screen */}
            {step === 'auth' && renderAuthScreen()}

            {/* Emergency Flow */}
            {step === 'initial' && (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-[#DC2626] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-[#DC2626]" />
                  </div>
                  
                  <h1 className="text-2xl font-bold text-[#312E81] mb-2">
                    How can we support you right now?
                  </h1>
                  <p className="text-[#6D28D9] opacity-90 mb-8">
                    Choose what feels right for your needs today.
                  </p>
                  
                  <div className="space-y-4">
                    {/* Emergency Chat */}
                    <button
                      onClick={() => {
                        setChatMode('emergency');
                        handleEmergencyClick('now');
                      }}
                      className="w-full flex items-center justify-between p-5 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-xl shadow-lg transition-colors"
                    >
                      <div className="text-left">
                        <div className="font-bold text-lg">🆘 Emergency Help</div>
                        <div className="text-sm opacity-90 mt-1">For immediate distress or danger</div>
                      </div>
                      <AlertTriangle className="w-6 h-6" />
                    </button>
                    
                    {/* Direct Chat */}
                    <button
                      onClick={() => {
                        setChatMode('direct');
                        // Direct chat requires auth
                        if (!isAuthenticated) {
                          setStep('auth');
                        } else {
                          // Simulate direct chat connection
                          alert('✅ Connecting to your psychologist...');
                        }
                      }}
                      className="w-full flex items-center justify-between p-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl shadow-lg transition-colors"
                    >
                      <div className="text-left">
                        <div className="font-bold text-lg">💬 Direct Chat</div>
                        <div className="text-sm opacity-90 mt-1">With your assigned psychologist</div>
                      </div>
                      <User className="w-6 h-6" />
                    </button>
                    
                    {/* Quick Chat */}
                    <button
                      onClick={() => {
                        setChatMode('quick');
                        window.location.href = '/quick-connect';
                      }}
                      className="w-full flex items-center justify-between p-5 bg-[#F5F3FF] border-2 border-[#7C3AED]/20 text-[#312E81] rounded-xl hover:bg-[#EDE9FE] transition-colors"
                    >
                      <div className="text-left">
                        <div className="font-bold text-lg">🗨️ Quick Chat</div>
                        <div className="text-sm text-[#6D28D9] mt-1">Anonymous, no registration needed</div>
                      </div>
                      <MessageCircle className="w-6 h-6 text-[#7C3AED]" />
                    </button>
                  </div>
                  
                  <div className="mt-6 p-4 bg-[#F5F3FF] rounded-xl border border-[#DDD6FE]">
                    <div className="flex items-center mb-2">
                      <Phone className="w-4 h-4 text-[#7C3AED] mr-2" />
                      <span className="text-sm font-medium text-[#312E81]">Prefer a voice call?</span>
                    </div>
                    <p className="text-xs text-[#6D28D9] opacity-80">
                      After connecting, tap the phone icon to request an immediate call.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Remaining steps (location, connecting, etc.) remain unchanged from your original code */}
            {step === 'location' && (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Volume2 className="w-8 h-8 text-[#7C3AED] animate-pulse" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[#312E81] mb-2">
                    Help is on the way
                  </h2>
                  <p className="text-[#6D28D9] opacity-90 mb-6">
                    To help us support you better in emergencies, may we access your location?
                    <br /><span className="text-xs opacity-70">(Used only for safety, never for identification)</span>
                  </p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => handleLocationConsent(true)}
                      className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium rounded-xl transition-colors"
                    >
                      <MapPin className="w-5 h-5" />
                      Share Location (Recommended)
                    </button>
                    
                    <button
                      onClick={() => handleLocationConsent(false)}
                      className="w-full py-4 px-4 bg-white border-2 border-[#DDD6FE] text-[#312E81] font-medium rounded-xl hover:bg-[#F5F3FF] transition-colors"
                    >
                      Continue Without Location
                    </button>
                  </div>
                  
                  <p className="text-xs text-[#6D28D9] opacity-80 mt-4">
                    Your privacy is protected. Location is only shared with the on-call psychologist if needed.
                  </p>
                </div>
              </div>
            )}

            {step === 'connecting' && (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-12 h-12 border-4 border-t-[#7C3AED] border-r-[#7C3AED] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[#312E81] mb-2">
                    Connecting to On-Call Psychologist
                  </h2>
                  
                  <div className="mb-4">
                    <div className="w-full bg-[#F5F3FF] rounded-full h-2.5">
                      <div className="bg-[#7C3AED] h-2.5 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-sm text-[#6D28D9] opacity-90 mt-2">Expected: <span className="font-bold">≤5 seconds</span></p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-[#DDD6FE]">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="text-[#312E81]">
                          <span className="font-medium">Dr. Mehta</span> (Clinical Psychologist) is being alerted.
                        </p>
                        <p className="text-xs text-[#6D28D9] opacity-80 mt-1">
                          {locationConsent ? '📍 Location shared for safety' : '👤 Anonymous connection'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 'calming' && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F5F3FF] to-white">
                <div className="text-center max-w-md">
                  <button 
                    onClick={goBack}
                    className="mb-6 flex items-center text-[#7C3AED] hover:text-[#312E81] font-medium self-start"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Emergency Options
                  </button>
                  
                  <div className="w-16 h-16 bg-[#7C3AED] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-[#7C3AED]" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[#312E81] mb-4">
                    You're safe here
                  </h2>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Breathe in for 4 seconds...",
                      "Hold for 4 seconds...",
                      "Breathe out for 6 seconds...",
                      "You are not alone.",
                      "This feeling will pass.",
                      "Help is ready when you are."
                    ].map((text, i) => (
                      <div 
                        key={i} 
                        className="text-lg text-[#312E81] font-medium opacity-90 animate-fadeIn"
                        style={{ animationDelay: `${i * 1.2}s` }}
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-[#6D28D9] opacity-80 mb-6">
                    Calming for <span className="font-bold">10 seconds</span>...
                  </div>
                  
                  <div className="w-full bg-[#F5F3FF] rounded-full h-2">
                    <div 
                      className="bg-[#7C3AED] h-2 rounded-full" 
                      style={{ 
                        width: '100%', 
                        animation: 'calmProgress 10s linear forwards' 
                      }}
                    ></div>
                  </div>
                  
                  <div className="mt-8">
                    <button 
                      onClick={() => handleEmergencyClick('now')}
                      className="w-full py-3 px-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-medium rounded-xl mb-3"
                    >
                      Connect Now
                    </button>
                    <button 
                      onClick={() => setStep('initial')}
                      className="text-sm text-[#7C3AED] hover:underline font-medium"
                    >
                      ← I feel better — go back
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 'connected' && (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <button 
                  onClick={goBack}
                  className="mb-6 flex items-center text-[#7C3AED] hover:text-[#312E81] font-medium self-start"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Emergency Options
                </button>
                
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-[#7C3AED]" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[#312E81] mb-2">
                    Connected!
                  </h2>
                  <p className="text-[#6D28D9] opacity-90 mb-6">
                    Dr. Mehta is here to support you right now.
                  </p>
                  
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-[#DDD6FE] mb-6">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center mr-3">
                        <span className="text-white font-bold">DM</span>
                      </div>
                      <div>
                        <div className="font-bold text-[#312E81]">Dr. Mehta</div>
                        <div className="text-sm text-[#6D28D9] flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                          Online • {chatMode === 'emergency' ? 'Emergency Response Team' : 'Your Psychologist'}
                        </div>
                      </div>
                    </div>
                    <p className="text-[#312E81] italic">
                      "I'm here with you. Take your time — there's no rush."
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl">
                      <MessageCircle className="w-4 h-4" />
                      Start Chat
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-[#DDD6FE] text-[#312E81] rounded-xl hover:bg-[#F5F3FF]">
                      <Phone className="w-4 h-4" />
                      Request Call
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* Emergency Footer */}
          <div className="p-4 bg-[#312E81] text-white text-center">
            <p className="text-xs opacity-80">
              ⚠️ If you are in immediate physical danger, call <span className="font-bold">112</span> or your local emergency number.
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes calmProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
