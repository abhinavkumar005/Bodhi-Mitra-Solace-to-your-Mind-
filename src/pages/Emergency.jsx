import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Phone, 
  Heart, 
  Shield, 
  X, 
  MapPin,
  CheckCircle,
  Clock,
  Volume2,
  ArrowLeft
} from 'lucide-react';

export default function Emergency() {
  const [step, setStep] = useState('initial'); // 'initial' | 'connecting' | 'calming' | 'connected' | 'misuse'
  const [selectedOption, setSelectedOption] = useState(null);
  const [locationConsent, setLocationConsent] = useState(null);
  const [misuseCount, setMisuseCount] = useState(2); // Simulating 2/3 strikes
  const [connected, setConnected] = useState(false);

  // Simulate emergency misuse state
  useEffect(() => {
    if (misuseCount >= 3) {
      setStep('misuse');
    }
  }, [misuseCount]);

  const handleEmergencyClick = (option) => {
    setSelectedOption(option);
    if (option === 'now') {
      // Go to location consent step first
      setStep('location');
    } else if (option === 'unsure') {
      setStep('calming');
      // Auto return after 10s unless user acts
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
    
    // Simulate connection
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

  const goBack = () => {
    if (step === 'location') {
      setStep('initial');
      setSelectedOption(null);
    } else if (step === 'connecting') {
      setStep('location');
    } else if (step === 'calming') {
      setStep('initial');
    } else if (step === 'connected') {
      setStep('initial');
      setConnected(false);
    } else if (step === 'misuse') {
      setStep('initial');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Misuse Lock Screen */}
      {step === 'misuse' && (
        <div className="flex flex-col h-screen bg-[#F2F7FA]">
          {/* Back Button */}
          <div className="p-4">
            <button 
              onClick={goBack}
              className="flex items-center text-[#3A6EA5] hover:text-[#1B2A41] font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Emergency Options
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#1B2A41] mb-4">Emergency Access Temporarily Paused</h1>
            <p className="text-[#1B2A41] opacity-90 max-w-md mb-6">
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
                  onClick={() => window.location.href = '/quick-connect'}
                  className="w-full py-3 px-4 bg-[#3A6EA5] hover:bg-[#2d5a8a] text-white font-medium rounded-xl transition-colors"
                >
                  Talk Now (Anonymous Chat)
                </button>
                
                <button 
                  onClick={handleMisuseConfirm}
                  className="w-full py-3 px-4 bg-white border-2 border-[#D90429] text-[#D90429] font-medium rounded-xl hover:bg-[#FFF5F5] transition-colors"
                >
                  This Is a Real Emergency — Connect Me
                </button>
              </div>
              
              <p className="text-xs text-[#1B2A41] opacity-70 mt-4">
                ⚠️ Misuse may result in temporary suspension. Genuine emergencies are always prioritized.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-white border-t border-[#3A6EA5]/10 text-center">
            <p className="text-xs text-[#1B2A41] opacity-70">
              Need immediate help? Call 112 or campus helpline: 9152987821
            </p>
          </div>
        </div>
      )}

      {/* Main Emergency Flow */}
      {step !== 'misuse' && (
        <div className="flex flex-col h-screen">
          {/* Header with Back Button */}
          <header className="bg-[#D90429] text-white p-4 flex items-center">
            <button 
              onClick={goBack}
              className="p-2 hover:bg-red-700 rounded-full mr-3 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              <span className="font-bold">EMERGENCY SUPPORT</span>
            </div>
            <div className="ml-auto text-xs opacity-90">
              {step === 'initial' && 'Step 1 of 3'}
              {step === 'location' && 'Step 2 of 3'}
              {step === 'connecting' && 'Step 3 of 3'}
              {step === 'calming' && 'Calming Mode'}
              {step === 'connected' && 'Connected'}
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            {step === 'initial' && (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-[#D90429] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-[#D90429]" />
                  </div>
                  
                  <h1 className="text-2xl font-bold text-[#1B2A41] mb-2">
                    Are you safe right now?
                  </h1>
                  <p className="text-[#1B2A41] opacity-80 mb-8">
                    Your safety is our priority. Choose what feels right.
                  </p>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => handleEmergencyClick('now')}
                      className="w-full flex items-center justify-between p-5 bg-[#D90429] hover:bg-[#b3001d] text-white rounded-xl shadow-lg transition-colors"
                    >
                      <div className="text-left">
                        <div className="font-bold text-lg">I need help NOW</div>
                        <div className="text-sm opacity-90 mt-1">Connect in under 5 seconds</div>
                      </div>
                      <AlertTriangle className="w-6 h-6" />
                    </button>
                    
                    <button
                      onClick={() => handleEmergencyClick('unsure')}
                      className="w-full flex items-center justify-between p-5 bg-[#EDF5F0] border-2 border-[#74C69D]/30 text-[#1B2A41] rounded-xl hover:bg-[#E0F0E6] transition-colors"
                    >
                      <div className="text-left">
                        <div className="font-bold text-lg">I'm not sure</div>
                        <div className="text-sm text-[#74C69D] mt-1">Let me calm down first</div>
                      </div>
                      <Heart className="w-6 h-6 text-[#74C69D]" />
                    </button>
                  </div>
                  
                  <div className="mt-6 p-4 bg-[#F2F7FA] rounded-xl border border-[#3A6EA5]/20">
                    <div className="flex items-center mb-2">
                      <Phone className="w-4 h-4 text-[#3A6EA5] mr-2" />
                      <span className="text-sm font-medium text-[#1B2A41]">Prefer a voice call?</span>
                    </div>
                    <p className="text-xs text-[#1B2A41] opacity-70">
                      After connecting, tap the phone icon to request an immediate call.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 'location' && (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-[#EDF5F0] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Volume2 className="w-8 h-8 text-[#3A6EA5] animate-pulse" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[#1B2A41] mb-2">
                    Help is on the way
                  </h2>
                  <p className="text-[#1B2A41] opacity-90 mb-6">
                    To help us support you better in emergencies, may we access your location?
                    <br /><span className="text-xs opacity-70">(Used only for safety, never for identification)</span>
                  </p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => handleLocationConsent(true)}
                      className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-[#3A6EA5] hover:bg-[#2d5a8a] text-white font-medium rounded-xl transition-colors"
                    >
                      <MapPin className="w-5 h-5" />
                      Share Location (Recommended)
                    </button>
                    
                    <button
                      onClick={() => handleLocationConsent(false)}
                      className="w-full py-4 px-4 bg-white border-2 border-[#3A6EA5]/20 text-[#1B2A41] font-medium rounded-xl hover:bg-[#F2F7FA] transition-colors"
                    >
                      Continue Without Location
                    </button>
                  </div>
                  
                  <p className="text-xs text-[#1B2A41] opacity-70 mt-4">
                    Your privacy is protected. Location is only shared with the on-call psychologist if needed.
                  </p>
                </div>
              </div>
            )}

            {step === 'connecting' && (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-[#EDF5F0] rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-12 h-12 border-4 border-t-[#3A6EA5] border-r-[#3A6EA5] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[#1B2A41] mb-2">
                    Connecting to On-Call Psychologist
                  </h2>
                  
                  <div className="mb-4">
                    <div className="w-full bg-[#F2F7FA] rounded-full h-2.5">
                      <div className="bg-[#3A6EA5] h-2.5 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-sm text-[#1B2A41] opacity-70 mt-2">Expected: <span className="font-bold">≤5 seconds</span></p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-[#3A6EA5]/10">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="text-[#1B2A41]">
                          <span className="font-medium">Dr. Mehta</span> (Clinical Psychologist) is being alerted.
                        </p>
                        <p className="text-xs text-[#1B2A41] opacity-70 mt-1">
                          {locationConsent ? '📍 Location shared for safety' : '👤 Anonymous connection'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 'calming' && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#EDF5F0] to-white">
                <div className="text-center max-w-md">
                  <button 
                    onClick={goBack}
                    className="mb-6 flex items-center text-[#3A6EA5] hover:text-[#1B2A41] font-medium self-start"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Emergency Options
                  </button>
                  
                  <div className="w-16 h-16 bg-[#74C69D] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-[#74C69D]" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[#1B2A41] mb-4">
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
                        className="text-lg text-[#1B2A41] font-medium opacity-90 animate-fadeIn"
                        style={{ animationDelay: `${i * 1.2}s` }}
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-[#1B2A41] opacity-70 mb-6">
                    Calming for <span className="font-bold">10 seconds</span>...
                  </div>
                  
                  <div className="w-full bg-[#F2F7FA] rounded-full h-2">
                    <div 
                      className="bg-[#74C69D] h-2 rounded-full" 
                      style={{ 
                        width: '100%', 
                        animation: 'calmProgress 10s linear forwards' 
                      }}
                    ></div>
                  </div>
                  
                  <div className="mt-8">
                    <button 
                      onClick={() => handleEmergencyClick('now')}
                      className="w-full py-3 px-4 bg-[#D90429] text-white font-medium rounded-xl mb-3"
                    >
                      Connect Now
                    </button>
                    <button 
                      onClick={() => setStep('initial')}
                      className="text-sm text-[#3A6EA5] hover:underline font-medium"
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
                  className="mb-6 flex items-center text-[#3A6EA5] hover:text-[#1B2A41] font-medium self-start"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Emergency Options
                </button>
                
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-[#EDF5F0] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-[#74C69D]" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[#1B2A41] mb-2">
                    Connected!
                  </h2>
                  <p className="text-[#1B2A41] opacity-90 mb-6">
                    Dr. Mehta is here to support you right now.
                  </p>
                  
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-[#3A6EA5]/10 mb-6">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#3A6EA5] flex items-center justify-center mr-3">
                        <span className="text-white font-bold">DM</span>
                      </div>
                      <div>
                        <div className="font-bold text-[#1B2A41]">Dr. Mehta</div>
                        <div className="text-sm text-[#74C69D] flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                          Online • Emergency Response Team
                        </div>
                      </div>
                    </div>
                    <p className="text-[#1B2A41] italic">
                      "I'm here with you. Take your time — there's no rush."
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#3A6EA5] text-white rounded-xl">
                      <MessageCircle className="w-4 h-4" />
                      Start Chat
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-[#3A6EA5]/20 text-[#1B2A41] rounded-xl hover:bg-[#F2F7FA]">
                      <Phone className="w-4 h-4" />
                      Request Call
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* Emergency Footer */}
          <div className="p-4 bg-[#1B2A41] text-white text-center">
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

// Helper component for MessageCircle (to avoid external dependency issues)
const MessageCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);
