import React, { useState, useEffect, useRef } from 'react';
import {
  Phone, AlertTriangle, X, Mic, Send, Flag, Shield, Clock, MapPin, Volume2
} from 'lucide-react';

export default function Chat() {
  // 🔐 Simulated session state (in real app: from auth context or API)
  const [userRole, setUserRole] = useState('student'); // 'student' | 'psychologist'
  const [session, setSession] = useState({
    id: 'sess_001',
    psychologist: {
      name: 'Dr. Ananya Mehta',
      title: 'Clinical Psychologist',
      isTyping: false
    },
    student: {
      isTyping: false,
      anonymousId: 'Anonymous #4829'
    },
    isEmergency: false,
    location: null,
    startTime: new Date()
  });

  const [messages, setMessages] = useState([
    { id: 1, role: 'psychologist', text: 'Hello, I’m here with you. How are you feeling right now?', time: '10:02 AM' },
    { id: 2, role: 'student', text: 'I’m really overwhelmed… I had a panic attack during my exam.', time: '10:03 AM' },
    { id: 3, role: 'psychologist', text: 'Thank you for sharing that. You’re safe now. Let’s take a moment to breathe together.', time: '10:03 AM' }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showMisuseModal, setShowMisuseModal] = useState(false);
  const [showEndSessionModal, setShowEndSessionModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate typing indicators
  useEffect(() => {
    if (session.psychologist.isTyping) {
      const timer = setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: Date.now(), role: 'psychologist', text: 'I’m here. Would you like to try a grounding technique?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
        setSession(prev => ({ ...prev, psychologist: { ...prev.psychologist, isTyping: false } }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [session.psychologist.isTyping]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now(),
        role: userRole,
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');

      // Simulate psychologist typing (student role only)
      if (userRole === 'student') {
        setTimeout(() => {
          setSession(prev => ({ ...prev, psychologist: { ...prev.psychologist, isTyping: true } }));
        }, 1000);
      }
    }
  };

  const handleEmergencyClick = () => {
    if (userRole === 'student') {
      setShowEmergencyModal(true);
    }
  };

  const handleConfirmEmergency = () => {
    setShowEmergencyModal(false);
    setSession(prev => ({ 
      ...prev, 
      isEmergency: true,
      location: 'Near Admin Building, GBU' // Simulated
    }));
  };

  const handleEndSession = () => {
    setShowEndSessionModal(true);
  };

  const handleConfirmEndSession = () => {
    setShowEndSessionModal(false);
    if (userRole === 'student') {
      setShowFeedback(true);
    } else {
      // In real app: navigate to session report
      alert('✅ Session ended. Thank you for your support.');
    }
  };

  const handleFeedbackSubmit = () => {
    setShowFeedback(false);
    window.location.href = '/dashboard';
  };

  const handleCallStart = () => {
    setShowCallModal(true);
    setCallDuration(0);
    // Simulate call timer
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  };

  const handleCallEnd = () => {
    setShowCallModal(false);
  };

  // Format call duration (mm:ss)
  const formatCallTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-screen bg-[#EDE9FE]">
      {/* 🔴 Emergency Overlay (Student Only) */}
      {session.isEmergency && userRole === 'student' && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-[#DC2626] animate-pulse"></div>
      )}

      {/* 🧭 Fixed Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-3 px-4 shadow-sm transition-colors ${
          session.isEmergency ? 'bg-[#FFF7FA] border-b border-[#DC2626]/20' : 'bg-[#F5F3FF] border-b border-[#DDD6FE]'
        }`}
      >
        {/* Logo + Title */}
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center mr-2">
            <span className="text-white text-xs font-bold">B</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#312E81]">Bodhi-Mitra</h1>
            {userRole === 'student' ? (
              <p className="text-xs text-[#6D28D9] mt-0.5">
                {session.psychologist.name} • {session.psychologist.title}
              </p>
            ) : (
              <div className="flex items-center">
                <p className="text-xs text-[#312E81] font-medium">
                  {session.student.anonymousId}
                </p>
                {session.isEmergency && (
                  <span className="ml-2 px-1.5 py-0.5 bg-[#FFF7FA] text-[#DC2626] text-[10px] rounded-full flex items-center">
                    <AlertTriangle className="w-2.5 h-2.5 mr-1" />
                    Emergency
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-2">
          {/* 🎤 Call Button */}
          <button
            onClick={handleCallStart}
            className="p-2 text-[#7C3AED] hover:bg-[#F5F3FF] rounded-lg transition-colors"
            aria-label="Start voice call"
          >
            <Phone className="w-4 h-4" />
          </button>

          {/* 🔴 Emergency Button (Student Only) */}
          {userRole === 'student' && (
            <button
              onClick={handleEmergencyClick}
              className="p-2 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] transition-colors"
              aria-label="Emergency help"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          )}

          {/* 🚩 Flag Misuse (Psychologist Only) */}
          {userRole === 'psychologist' && (
            <button
              onClick={() => setShowMisuseModal(true)}
              className="p-2 text-[#DC2626] hover:bg-[#FFF7FA] rounded-lg transition-colors"
              aria-label="Flag misuse"
            >
              <Flag className="w-4 h-4" />
            </button>
          )}

          {/* ⛔ End Session */}
          <button
            onClick={handleEndSession}
            className="p-2 text-[#312E81] hover:bg-[#F5F3FF] rounded-lg transition-colors"
            aria-label="End session"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 📜 Session Safety Banner */}
      <div className="fixed top-14 left-0 right-0 z-10 bg-[#F5F3FF] border-b border-[#DDD6FE] p-2">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <Shield className="w-3 h-3 text-[#6D28D9] mr-2" />
          <p className="text-[10px] text-[#6D28D9] text-center">
            This conversation is private and confidential. Your data is never shared.
          </p>
        </div>
      </div>

      {/* 📱 Main Chat Area */}
      <main className="flex-1 pt-20 pb-24 px-3 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Location Info (Psychologist Emergency Only) */}
          {userRole === 'psychologist' && session.isEmergency && session.location && (
            <div className="mb-3 p-2 bg-[#FFF7FA] rounded-lg border border-[#DC2626]/20 flex items-center">
              <MapPin className="w-3 h-3 text-[#DC2626] mr-2 flex-shrink-0" />
              <span className="text-[10px] text-[#312E81]">
                <span className="font-medium">{session.student.anonymousId}</span> is near: {session.location}
              </span>
            </div>
          )}

          {/* Messages */}
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'student' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.role === 'student'
                      ? 'bg-[#7C3AED] text-white ml-12'
                      : 'bg-white text-[#312E81] border border-[#DDD6FE] mr-12'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`mt-1 text-[10px] ${msg.role === 'student' ? 'text-white/80' : 'text-[#6D28D9]'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Typing Indicator */}
          {session.psychologist.isTyping && userRole === 'student' && (
            <div className="flex justify-start mb-2">
              <div className="bg-white rounded-2xl px-4 py-2 border border-[#DDD6FE] mr-12">
                <p className="text-[10px] text-[#6D28D9] flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full mr-1.5 animate-pulse"></span>
                  Psychologist is typing...
                </p>
              </div>
            </div>
          )}

          {session.student.isTyping && userRole === 'psychologist' && (
            <div className="flex justify-end mb-2">
              <div className="bg-white rounded-2xl px-4 py-2 border border-[#DDD6FE] ml-12">
                <p className="text-[10px] text-[#6D28D9] flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full mr-1.5 animate-pulse"></span>
                  Student is typing...
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ✍️ Message Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-[#DDD6FE] p-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end space-x-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here…"
              className="flex-1 min-h-[44px] max-h-32 px-4 py-3 text-[#312E81] bg-[#F5F3FF] rounded-xl border border-[#DDD6FE] focus:outline-none focus:ring-1 focus:ring-[#7C3AED] resize-none"
              rows="1"
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`p-3 rounded-xl ${
                newMessage.trim()
                  ? 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]'
                  : 'bg-[#DDD6FE] text-[#6D28D9]'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 🚨 Emergency Confirmation Modal (Student) */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="bg-[#FFF7FA] p-4 border-b border-[#DC2626]/20">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-[#DC2626] mr-2" />
                <h2 className="text-lg font-bold text-[#312E81]">Are you feeling unsafe right now?</h2>
              </div>
            </div>
            <div className="p-5">
              <p className="text-[#312E81] mb-6">
                Your safety is our priority. If you're in immediate danger, we’ll connect you to the nearest support.
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleConfirmEmergency}
                  className="w-full py-3 px-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-medium rounded-xl"
                >
                  Yes, I need help now
                </button>
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="w-full py-3 px-4 bg-white border-2 border-[#DDD6FE] text-[#312E81] font-medium rounded-xl hover:bg-[#F5F3FF]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🚩 Misuse Flag Modal (Psychologist) */}
      {showMisuseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="bg-[#F5F3FF] p-4 border-b border-[#DDD6FE]">
              <h2 className="text-lg font-bold text-[#312E81]">Flag Misuse</h2>
            </div>
            <div className="p-5">
              <div className="flex items-start mb-4">
                <input
                  type="checkbox"
                  id="misuse"
                  className="mt-1 mr-2 h-4 w-4 text-[#DC2626] rounded"
                />
                <label htmlFor="misuse" className="text-[#312E81]">
                  <span className="font-medium">Emergency misuse</span>
                  <p className="text-xs text-[#6D28D9] mt-1">
                    Student used emergency button without urgent need
                  </p>
                </label>
              </div>
              <textarea
                placeholder="Optional: Brief note (max 100 chars)"
                className="w-full px-3 py-2 text-sm border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                rows="2"
                maxLength="100"
              />
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => setShowMisuseModal(false)}
                  className="flex-1 py-2 px-4 text-[#312E81] font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('✅ Misuse flagged. Student will be notified after review.');
                    setShowMisuseModal(false);
                  }}
                  className="flex-1 py-2 px-4 bg-[#DC2626] text-white font-medium rounded-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ⛔ End Session Modal */}
      {showEndSessionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="bg-[#F5F3FF] p-4 border-b border-[#DDD6FE]">
              <h2 className="text-lg font-bold text-[#312E81]">End Session</h2>
            </div>
            <div className="p-5 text-center">
              <p className="text-[#312E81] mb-6">
                Are you sure you want to end this session?
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleConfirmEndSession}
                  className="w-full py-3 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium rounded-xl"
                >
                  Yes, End Session
                </button>
                <button
                  onClick={() => setShowEndSessionModal(false)}
                  className="w-full py-3 px-4 bg-white border-2 border-[#DDD6FE] text-[#312E81] font-medium rounded-xl hover:bg-[#F5F3FF]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📞 Voice Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="bg-[#F5F3FF] p-4 border-b border-[#DDD6FE] flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center mr-2">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-[#312E81]">
                  {userRole === 'student' 
                    ? `Call with ${session.psychologist.name}` 
                    : `Call with ${session.student.anonymousId}`}
                </h2>
              </div>
              <div className="text-sm text-[#6D28D9] font-mono">{formatCallTime(callDuration)}</div>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-[#F5F3FF] rounded-full flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-[#7C3AED] rounded-full flex items-center justify-center animate-pulse">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-[#312E81] mb-6">
                Audio call in progress. Your conversation is encrypted and private.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleCallEnd}
                  className="w-16 h-16 rounded-full bg-[#DC2626] flex items-center justify-center hover:bg-[#B91C1C] transition-colors"
                >
                  <Phone className="w-6 h-6 text-white rotate-135" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 👍 Feedback Modal (Student Only) */}
      {showFeedback && (
        <div className="fixed inset-0 bg-white flex flex-col z-50">
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-[#7C3AED]" />
            </div>
            <h2 className="text-2xl font-bold text-[#312E81] mb-2">How do you feel now?</h2>
            <p className="text-[#6D28D9] mb-8 text-center max-w-md">
              Your feedback helps us improve. No pressure — just your honest feeling.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={handleFeedbackSubmit}
                className="p-4 bg-[#F5F3FF] border-2 border-[#DDD6FE] rounded-xl hover:bg-white transition-colors"
              >
                <div className="w-10 h-10 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-lg">👍</span>
                </div>
                <span className="text-[#312E81] font-medium">Better</span>
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className="p-4 bg-[#F5F3FF] border-2 border-[#DDD6FE] rounded-xl hover:bg-white transition-colors"
              >
                <div className="w-10 h-10 mx-auto bg-amber-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-lg">😐</span>
                </div>
                <span className="text-[#312E81] font-medium">Same</span>
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className="p-4 bg-[#F5F3FF] border-2 border-[#DDD6FE] rounded-xl hover:bg-white transition-colors"
              >
                <div className="w-10 h-10 mx-auto bg-red-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-lg">👎</span>
                </div>
                <span className="text-[#312E81] font-medium">Worse</span>
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className="p-4 bg-[#F5F3FF] border-2 border-[#DDD6FE] rounded-xl hover:bg-white transition-colors"
              >
                <div className="w-10 h-10 mx-auto bg-[#7C3AED] rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-lg">🙏</span>
                </div>
                <span className="text-[#312E81] font-medium">Grateful</span>
              </button>
            </div>
            
            <textarea
              placeholder="Optional: One thing that helped (or didn’t)"
              className="w-full max-w-md px-4 py-3 text-[#312E81] border border-[#DDD6FE] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
              rows="2"
            />
          </div>
          
          <div className="p-4 border-t border-[#DDD6FE]">
            <button
              onClick={handleFeedbackSubmit}
              className="w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium rounded-xl"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
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

// Helper Heart icon
const Heart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);