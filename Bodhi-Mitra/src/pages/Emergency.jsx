import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, Heart, Shield, X, ArrowLeft, MessageCircle 
} from 'lucide-react';

export default function Emergency() {
  const navigate = useNavigate();
  const [step, setStep] = useState('checking'); // 'checking' | 'confirm' | 'redirecting'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const session = sessionStorage.getItem('bodhi_session');
        if (session) {
          const parsed = JSON.parse(session);
          if (parsed.role === 'student') {
            setIsAuthenticated(true);
            setStep('confirm');
            return;
          }
        }
        // Not authenticated → redirect to register
        setStep('redirecting');
        navigate('/register', { replace: true });
      } catch (e) {
        setStep('redirecting');
        navigate('/register', { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  const handleConfirmChat = () => {
    // Create emergency session
    const session = JSON.parse(sessionStorage.getItem('bodhi_session'));
    const emergencySession = {
      ...session,
      mode: 'emergency',
      startTime: new Date().toISOString()
    };
    sessionStorage.setItem('bodhi_session', JSON.stringify(emergencySession));
    navigate('/chat', { state: { session: emergencySession } });
  };

  const goBack = () => {
    navigate(-1);
  };

  if (step !== 'confirm') {
    return (
      <div className="min-h-screen bg-[#EDE9FE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-[#7C3AED] border-r-[#7C3AED] border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#312E81]">Checking your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 🔴 Emergency Banner */}
      <div className="bg-[#FFF7FA] border-b border-[#DC2626]/20 p-2">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-[#DC2626] mr-2" />
          <p className="text-xs text-[#312E81]">
            In immediate danger? Call <span className="font-bold">112</span>
          </p>
        </div>
      </div>

      {/* 🧭 Header */}
      <header className="bg-[#DC2626] text-white p-4 flex items-center">
        <button 
          onClick={goBack}
          className="p-2 hover:bg-red-700 rounded-full mr-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2" />
          <span className="font-bold">Emergency Support</span>
        </div>
      </header>

      <main className="flex-1 pt-16 px-4 pb-24">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-[#DC2626] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-[#DC2626]" />
          </div>
          
          <h1 className="text-2xl font-bold text-[#312E81] mb-4">
            Do you need emergency support right now?
          </h1>
          
          <p className="text-[#6D28D9] opacity-90 mb-8 px-2">
            A psychologist will be alerted immediately.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handleConfirmChat}
              className="w-full flex items-center justify-center p-5 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-xl shadow-lg"
            >
              <MessageCircle className="w-6 h-6 mr-2" />
              <span className="font-bold text-lg">Yes, Connect Me Now</span>
            </button>
            
            <button
              onClick={goBack}
              className="w-full py-4 px-4 bg-[#F5F3FF] border-2 border-[#7C3AED]/20 text-[#312E81] rounded-xl hover:bg-[#EDE9FE]"
            >
              ← I'm okay for now
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-[#F5F3FF] rounded-xl border border-[#DDD6FE]">
            <div className="flex items-start">
              <Shield className="w-4 h-4 text-[#7C3AED] mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-xs text-[#312E81]">
                <span className="font-medium">Confidential & anonymous:</span> Your data is never shared with your college.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}