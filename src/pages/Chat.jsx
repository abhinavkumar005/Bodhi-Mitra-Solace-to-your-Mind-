import React, { useState, useEffect, useRef } from 'react';
import {
  Phone, AlertTriangle, X, Mic, Send, Flag, Shield, Clock, MapPin, Volume2, Plus
} from 'lucide-react';

export default function Chat() {
  const [userRole, setUserRole] = useState('student'); // 'student' | 'psychologist'
  const [session, setSession] = useState({
    id: 'sess_001',
    psychologist: {
      name: 'Dr. Ananya Mehta',
      title: 'Clinical Psychologist',
      isTyping: false,
      avatar: 'DM'
    },
    student: {
      isTyping: false,
      anonymousId: 'Anonymous #4829',
      avatar: 'A'
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

  // Simulate typing
  useEffect(() => {
    if (session.psychologist.isTyping) {
      const timer = setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { 
            id: Date.now(), 
            role: 'psychologist', 
            text: 'I’m here. Would you like to try a grounding technique?', 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          }
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
      location: 'Near Admin Building, GBU'
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
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  };

  const handleCallEnd = () => {
    setShowCallModal(false);
  };

  const formatCallTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-screen bg-[#EDE9FE]">
      {/* 🔴 Emergency Banner (only if emergency) */}
      {session.isEmergency && userRole === 'student' && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-[#DC2626] animate-pulse z-50"></div>
      )}

      {/* 🧭 Header (NO NAVBAR - ONLY CHAT HEADER) */}
      <header className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 shadow-sm ${
        session.isEmergency ? 'bg-[#FFF7FA]' : 'bg-white'
      }`}>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
            userRole === 'student' ? 'bg-[#7C3AED]' : 'bg-[#4C1D95]'
          }`}>
            <span className="text-white font-bold">
              {userRole === 'student' ? session.student.avatar : session.psychologist.avatar}
            </span>
          </div>
          
          <div>
            <h1 className="font-bold text-[#312E81]">
              {userRole === 'student' ? session.psychologist.name : session.student.anonymousId}
            </h1>
            <p className="text-xs text-[#6D28D9] flex items-center">
              <div className={`w-2 h-2 rounded-full mr-1 ${
                userRole === 'student' ? 'bg-green-500' : session.isEmergency ? 'bg-red-500' : 'bg-gray-400'
              }`}></div>
              {userRole === 'student' ? 'Online' : session.isEmergency ? 'Emergency' : 'Active'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCallStart}
            className="p-2 text-[#7C3AED] hover:bg-[#F5F3FF] rounded-full"
            aria-label="Voice call"
          >
            <Phone className="w-5 h-5" />
          </button>
          
          {userRole === 'student' && (
            <button
              onClick={handleEmergencyClick}
              className="p-2 bg-[#DC2626] text-white rounded-full hover:bg-[#B91C1C]"
              aria-label="Emergency help"
            >
              <AlertTriangle className="w-5 h-5" />
            </button>
          )}
          
          {userRole === 'psychologist' && (
            <button
              onClick={() => setShowMisuseModal(true)}
              className="p-2 text-[#DC2626] hover:bg-[#FFF7FA] rounded-full"
              aria-label="Flag misuse"
            >
              <Flag className="w-5 h-5" />
            </button>
          )}
          
          <button
            onClick={handleEndSession}
            className="p-2 text-[#312E81] hover:bg-[#F5F3FF] rounded-full"
            aria-label="End session"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 📜 Safety Banner */}
      <div className="fixed top-16 left-0 right-0 z-30 bg-[#F5F3FF] border-b border-[#DDD6FE] p-2">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <Shield className="w-3 h-3 text-[#6D28D9] mr-2" />
          <p className="text-[10px] text-[#6D28D9]">
            This conversation is private and confidential.
          </p>
        </div>
      </div>

      {/* 💬 Main Chat Area */}
      <main className="flex-1 pt-24 pb-24 px-3 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {userRole === 'psychologist' && session.isEmergency && session.location && (
            <div className="mb-3 p-2 bg-[#FFF7FA] rounded-lg border border-[#DC2626]/20 flex items-center">
              <MapPin className="w-3 h-3 text-[#DC2626] mr-2 flex-shrink-0" />
              <span className="text-[10px] text-[#312E81]">
                <span className="font-medium">{session.student.anonymousId}</span> is near: {session.location}
              </span>
            </div>
          )}

          <div className="space-y-3">
            {messages.map((msg) => (
              <React.Fragment key={msg.id}>
                <div className={`flex ${msg.role === 'student' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role !== 'student' && (
                    <div className="mr-2 mt-1">
                      <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{session.psychologist.avatar}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] rounded-3xl px-4 py-2 ${
                    msg.role === 'student'
                      ? 'bg-[#7C3AED] text-white rounded-tr-none'
                      : 'bg-white text-[#312E81] border border-[#DDD6FE] rounded-tl-none'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  
                  {msg.role === 'student' && (
                    <div className="ml-2 mt-1">
                      <div className="w-8 h-8 rounded-full bg-[#4C1D95] flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Y</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={`text-[10px] text-[#6D28D9] ${msg.role === 'student' ? 'text-right' : 'text-left'} -mt-1`}>
                  {msg.time}
                </div>
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Typing Indicator */}
          {session.psychologist.isTyping && userRole === 'student' && (
            <div className="flex justify-start mb-2">
              <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center mr-2">
                <span className="text-white text-xs font-bold">{session.psychologist.avatar}</span>
              </div>
              <div className="bg-white rounded-3xl px-4 py-2 border border-[#DDD6FE] rounded-tl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#7C3AED] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#7C3AED] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-[#7C3AED] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ✍️ Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#DDD6FE] p-3">
        <div className="max-w-2xl mx-auto flex items-end space-x-2">
          <button className="p-2 text-[#7C3AED] hover:bg-[#F5F3FF] rounded-full" aria-label="Attach">
            <Plus className="w-5 h-5" />
          </button>
          
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 min-h-[44px] max-h-24 px-4 py-2 text-[#312E81] bg-[#F5F3FF] rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#7C3AED] resize-none"
            rows="1"
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
          />
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full ${
              newMessage.trim() ? 'bg-[#7C3AED] text-white' : 'bg-[#DDD6FE] text-[#6D28D9]'
            }`}
            aria-label="Send"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modals (Emergency, Misuse, End Session, Call, Feedback) - unchanged */}
      
      {/* 🚨 Emergency Modal */}
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

      {/* 🚩 Misuse Modal */}
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

      {/* 📞 Call Modal */}
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

      {/* 👍 Feedback Modal */}
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
              {[
                { emoji: '👍', label: 'Better' },
                { emoji: '😐', label: 'Same' },
                { emoji: '👎', label: 'Worse' },
                { emoji: '🙏', label: 'Grateful' }
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={handleFeedbackSubmit}
                  className="p-4 bg-[#F5F3FF] border-2 border-[#DDD6FE] rounded-xl hover:bg-white transition-colors"
                >
                  <div className="w-10 h-10 mx-auto bg-[#7C3AED] rounded-full flex items-center justify-center mb-2">
                    <span className="text-white text-lg">{item.emoji}</span>
                  </div>
                  <span className="text-[#312E81] font-medium">{item.label}</span>
                </button>
              ))}
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

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce {
          animation: bounce 1.2s infinite;
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