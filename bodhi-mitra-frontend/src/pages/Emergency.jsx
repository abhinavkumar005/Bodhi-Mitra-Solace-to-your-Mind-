// src/pages/Emergency.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AlertTriangle, Phone, MessageCircle, Shield, ArrowLeft, User, LogIn, UserPlus } from 'lucide-react';

export default function Emergency() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle emergency request for logged-in students
  const handleEmergencyRequest = async () => {
    if (!user || user.role !== 'student') {
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    setError('');
    
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/emergencies`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        setShowSuccess(true);
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Failed to send emergency request. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Redirect to dashboard if student has active session
  useEffect(() => {
    if (user && user.role === 'student') {
      // Check if student has active emergency session
      const checkActiveSession = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/emergencies/me`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          const data = await res.json();
          const activeSession = data.data.find(e => e.status === 'assigned');
          if (activeSession) {
            navigate('/student');
          }
        } catch (err) {
          console.error('Failed to check active session:', err);
        }
      };
      
      checkActiveSession();
    }
  }, [user, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FFF7FA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#312E81]">Checking your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF7FA] pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-[#312E81] hover:text-[#7C3AED] mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="ml-1">Back</span>
        </button>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#DC2626] rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#312E81] mb-4">
              Emergency Mental Health Support
            </h1>
            <p className="text-lg text-[#6D28D9]">
              You're not alone. Help is available right now.
            </p>
          </div>

          {/* Guest User - Show Login/Register */}
          {!user && (
            <div className="bg-white p-8 rounded-xl border border-[#DDD6FE] mb-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <h2 className="text-xl font-bold text-[#312E81] mb-2">Please Sign In</h2>
                <p className="text-[#6D28D9] opacity-90">
                  To get immediate emergency support, please log in or register first.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  to="/login" 
                  className="flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6A2DCE] text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center justify-center gap-2 bg-white border-2 border-[#7C3AED]/30 hover:bg-[#F5F3FF] text-[#312E81] font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  <UserPlus className="w-5 h-5 text-[#7C3AED]" />
                  Register
                </Link>
              </div>
            </div>
          )}

          {/* Logged-in Student - Show Emergency Button */}
          {user && user.role === 'student' && (
            <div className="space-y-6">
              {!showSuccess ? (
                <>
                  <div className="bg-white p-6 rounded-xl border border-[#DDD6FE]">
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 bg-[#F5F3FF] rounded-full flex items-center justify-center mr-4">
                        <Phone className="w-6 h-6 text-[#DC2626]" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#312E81]">Immediate Help Available</h2>
                        <p className="text-[#6D28D9] mt-1">
                          Your emergency request will be sent to all available psychologists immediately.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-[#FFF7FA] border border-[#DC2626]/20 rounded-lg p-4">
                      <p className="text-[#312E81] text-sm">
                        <strong>Important:</strong> If you are in immediate danger or experiencing a life-threatening crisis, 
                        please call emergency services at <strong>112</strong> or go to your nearest hospital.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleEmergencyRequest}
                    disabled={isProcessing}
                    className={`w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                      isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5" />
                        Request Emergency Help Now
                      </>
                    )}
                  </button>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white p-8 rounded-xl border border-[#DDD6FE] text-center">
                  <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-[#7C3AED]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#312E81] mb-3">Request Sent Successfully!</h2>
                  <p className="text-[#6D28D9] opacity-90 mb-4">
                    Your emergency request has been sent to all available psychologists.
                  </p>
                  <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-lg p-4 mb-4">
                    <p className="text-[#312E81]">
                      <strong>Please wait.</strong> A psychologist will accept your request shortly and 
                      you'll be connected for a live chat session.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/student')}
                    className="bg-[#7C3AED] hover:bg-[#6A2DCE] text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Go to My Dashboard
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Non-student users */}
          {user && user.role !== 'student' && (
            <div className="bg-white p-8 rounded-xl border border-[#DDD6FE] text-center">
              <div className="w-12 h-12 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-[#7C3AED]" />
              </div>
              <h2 className="text-xl font-bold text-[#312E81] mb-2">Access Restricted</h2>
              <p className="text-[#6D28D9] opacity-90">
                This emergency feature is only available for student users.
              </p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 bg-[#7C3AED] hover:bg-[#6A2DCE] text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Go to Homepage
              </button>
            </div>
          )}

          {/* Safety Information */}
          <div className="mt-12 p-6 bg-[#F5F3FF] rounded-xl border border-[#DDD6FE]">
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-[#7C3AED] mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[#312E81] mb-2">Your Safety Matters</h3>
                <p className="text-[#6D28D9]">
                  All conversations on Bodhi-Mitra are end-to-end encrypted and completely anonymous. 
                  Your privacy is our top priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}