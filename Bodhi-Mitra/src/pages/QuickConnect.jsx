import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, AlertTriangle, Shield, CheckCircle, X, ArrowLeft 
} from 'lucide-react';

export default function QuickConnect() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Check login status on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check for active session
        const session = sessionStorage.getItem('bodhi_session');
        if (session) {
          const parsed = JSON.parse(session);
          if (parsed.role === 'student') {
            setShowConfirmation(true);
          } else {
            // Non-student? Redirect to login
            navigate('/login');
          }
        } else {
          // No session → redirect to register
          navigate('/register');
        }
      } catch (e) {
        // Invalid session → redirect to register
        navigate('/register');
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleConfirmChat = () => {
    // In real app: API call to create session
    navigate('/chat');
  };

  if (isChecking) {
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
    <div className="min-h-screen bg-[#EDE9FE] flex flex-col">
      {/* 🔴 Emergency Banner */}
      <div className="bg-[#FFF7FA] border-b border-[#DC2626]/20 p-2">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-[#DC2626] mr-2" />
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
          className="p-2 text-[#7C3AED] hover:bg-[#F5F3FF] rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex-1 flex flex-col items-center">
          <div className="w-10 h-10 bg-[#7C3AED] rounded-full flex items-center justify-center mb-1">
            <span className="text-white text-sm font-bold">B</span>
          </div>
          <h1 className="text-lg font-bold text-[#312E81]">Quick Connect</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-[#7C3AED]" />
            </div>
            <h2 className="text-2xl font-bold text-[#312E81] mb-2">
              Ready to Talk?
            </h2>
            <p className="text-[#6D28D9] opacity-90">
              Connect with a psychologist in under 1 minute.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#DDD6FE]">
            <div className="flex items-start mb-4 p-3 bg-[#F5F3FF] rounded-lg">
              <Shield className="w-4 h-4 text-[#7C3AED] mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-[#312E81]">
                Your session will be <span className="font-medium">anonymous and confidential</span>. 
                No data is shared with your college.
              </p>
            </div>

            <button
              onClick={handleConfirmChat}
              className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <CheckCircle className="w-5 h-5" />
              Start Anonymous Chat
            </button>

            <p className="text-xs text-[#6D28D9] mt-4 text-center opacity-80">
              By continuing, you agree to our{' '}
              <button 
                onClick={() => navigate('/privacy')}
                className="text-[#7C3AED] underline"
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* 💬 Floating Emergency Button (Mobile) */}
      <button
        onClick={() => navigate('/emergency')}
        className="fixed bottom-6 right-6 z-10 w-14 h-14 bg-[#DC2626] text-white rounded-full shadow-lg flex items-center justify-center md:hidden"
      >
        <AlertTriangle className="w-6 h-6" />
      </button>
    </div>
  );
}