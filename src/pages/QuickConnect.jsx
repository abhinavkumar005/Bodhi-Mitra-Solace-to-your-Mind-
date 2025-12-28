import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Add this
import { 
  MessageCircle, 
  User, 
  Clock, 
  Shield, 
  AlertTriangle, 
  ArrowLeft, 
  PhoneCall,
  Send,
  Plus,
  CheckCircle
} from 'lucide-react';

// ✅ Renamed component
export default function QuickConnect() {
  const navigate = useNavigate(); // ✅ For safe navigation
  const [step, setStep] = useState('form');
  const [nickname, setNickname] = useState('');
  const [issue, setIssue] = useState('');
  const [isHighRisk, setIsHighRisk] = useState(false);
  const [reconnectOption, setReconnectOption] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      sender: 'system', 
      text: 'You are connected anonymously. A psychologist will join shortly.', 
      time: 'Now'
    }
  ]);

  const issueOptions = [
    'Stress',
    'Anxiety',
    'Depression',
    'Relationship Issues',
    'Academic Pressure',
    'Loneliness',
    'Family Conflict',
    'Suicidal Thoughts',
    'Panic Attack',
    'Unknown / Can\'t Describe'
  ];

  useEffect(() => {
    const highRiskIssues = ['Depression', 'Suicidal Thoughts', 'Panic Attack'];
    setIsHighRisk(highRiskIssues.includes(issue));
  }, [issue]);

  const handleStartChat = () => {
    setStep('connecting');
    const delay = isHighRisk ? 800 : 2000;
    setTimeout(() => {
      const newMsg = {
        id: 2,
        sender: 'psychologist',
        text: `Hi${nickname ? `, ${nickname}` : ''}, I'm Dr. Mehta, a clinical psychologist. I'm here to listen — no judgment, no pressure. Take your time.`,
        time: 'Just now'
      };
      setChatMessages(prev => [...prev, newMsg]);
      setStep('chat');
    }, delay);
  };

  const handleSendMessage = () => {
    if (!nickname.trim() && !issue) setNickname('Anonymous');
    handleStartChat();
  };

  const handleReconnect = (option) => {
    setReconnectOption(option);
    setTimeout(() => {
      const newMsg = {
        id: chatMessages.length + 1,
        sender: 'system',
        text: option === 'callback' 
          ? '✅ Callback scheduled. A psychologist will call you within 15 minutes.' 
          : '✅ Reconnected! Dr. Sharma is joining now...',
        time: 'Now'
      };
      setChatMessages(prev => [...prev, newMsg]);
      setStep('chat');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F2F7FA]">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex items-center">
        <button 
          onClick={() => navigate(-1)} // ✅ Fixed: use navigate(-1) instead of window.history.back()
          className="flex items-center text-[#3A6EA5] hover:text-[#1B2A41] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <div className="flex items-center space-x-2 ml-auto">
          <div className="w-8 h-8 bg-[#3A6EA5] rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-[#1B2A41]">Anonymous Session</span>
        </div>
      </header>

      {step === 'form' && (
        <main className="container mx-auto px-4 py-6 max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#EDF5F0] rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-[#3A6EA5]" />
            </div>
            <h1 className="text-2xl font-bold text-[#1B2A41] mb-2">Talk to a Psychologist Now</h1>
            <p className="text-[#1B2A41] opacity-80">
              No login • Fully anonymous • 24/7 support
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#3A6EA5]/10">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#1B2A41] mb-1">
                  Nickname (Optional)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="e.g., Sam, A, or leave blank"
                    className="w-full pl-10 pr-4 py-3 border border-[#3A6EA5]/20 rounded-xl focus:ring-2 focus:ring-[#3A6EA5]/30 focus:border-[#3A6EA5] outline-none transition"
                  />
                </div>
                <p className="text-xs text-[#1B2A41] opacity-70 mt-1">
                  Your identity stays private. Psychologist sees only this name.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B2A41] mb-1">
                  What would you like to talk about? (Optional)
                </label>
                <div className="relative">
                  <select
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className="w-full pl-4 pr-8 py-3 border border-[#3A6EA5]/20 rounded-xl focus:ring-2 focus:ring-[#3A6EA5]/30 focus:border-[#3A6EA5] outline-none appearance-none bg-white transition"
                  >
                    <option value="">Select an issue (or skip)</option>
                    {issueOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {isHighRisk && (
                  <div className="mt-2 p-2 bg-red-50 border-l-3 border-[#D90429] rounded-r">
                    <p className="text-xs text-[#D90429] font-medium flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Your concern has been marked high-priority for faster response.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleSendMessage}
                className="w-full bg-[#3A6EA5] hover:bg-[#2d5a8a] text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                Start Anonymous Chat
              </button>

              <p className="text-center text-xs text-[#1B2A41] opacity-70">
                ⏱️ Expected wait time: <span className="font-medium">{isHighRisk ? '<15 sec' : '15–45 sec'}</span>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#1B2A41] opacity-80">
              Prefer voice? After connecting, tap <PhoneCall className="w-3 h-3 inline mx-1" /> to request a call.
            </p>
          </div>
        </main>
      )}

      {step === 'connecting' && (
        <main className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-[#EDF5F0] rounded-full flex items-center justify-center mx-auto mb-6">
              {isHighRisk ? (
                <AlertTriangle className="w-10 h-10 text-[#D90429]" />
              ) : (
                <Clock className="w-10 h-10 text-[#3A6EA5] animate-spin" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-[#1B2A41] mb-2">
              {isHighRisk ? 'Prioritizing your request...' : 'Connecting you...'}
            </h2>
            
            <p className="text-[#1B2A41] opacity-90 mb-6">
              {isHighRisk 
                ? 'A psychologist is being alerted urgently for you.' 
                : 'Matching you with an available counselor.'}
            </p>
            
            <div className="w-full bg-[#F2F7FA] rounded-full h-2.5 mb-4">
              <div 
                className="bg-[#3A6EA5] h-2.5 rounded-full animate-pulse" 
                style={{ width: isHighRisk ? '75%' : '40%' }}
              ></div>
            </div>
            
            <p className="text-sm text-[#1B2A41] opacity-70">
              {isHighRisk ? 'Expected: <15 seconds' : 'Expected: 15–45 seconds'}
            </p>
            
            <div className="mt-8">
              <button 
                onClick={() => setStep('reconnect')}
                className="text-sm text-[#3A6EA5] hover:underline font-medium"
              >
                Not connecting? Try reconnect options
              </button>
            </div>
          </div>
        </main>
      )}

      {step === 'reconnect' && (
        <main className="container mx-auto px-4 py-8 max-w-md">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#3A6EA5]/10">
            <h2 className="text-xl font-bold text-[#1B2A41] text-center mb-4">Need Another Option?</h2>
            <p className="text-[#1B2A41] opacity-80 text-center mb-6">
              No problem. Choose what works best for you:
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => handleReconnect('immediate')}
                className="w-full flex items-center p-4 border-2 border-[#3A6EA5]/20 rounded-xl hover:bg-[#F2F7FA] transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-[#EDF5F0] flex items-center justify-center mr-3">
                  <MessageCircle className="w-5 h-5 text-[#3A6EA5]" />
                </div>
                <div>
                  <div className="font-medium text-[#1B2A41]">Try Again Now</div>
                  <div className="text-sm text-[#1B2A41] opacity-70">Reconnect to next available psychologist</div>
                </div>
              </button>
              
              <button
                onClick={() => handleReconnect('callback')}
                className="w-full flex items-center p-4 border-2 border-[#74C69D]/20 rounded-xl hover:bg-[#EDF5F0] transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-[#E8F5ED] flex items-center justify-center mr-3">
                  <PhoneCall className="w-5 h-5 text-[#74C69D]" />
                </div>
                <div>
                  <div className="font-medium text-[#1B2A41]">Request a Callback</div>
                  <div className="text-sm text-[#1B2A41] opacity-70">Get a call within 15 minutes</div>
                </div>
              </button>
            </div>
            
            <button
              onClick={() => setStep('form')}
              className="w-full mt-6 py-3 text-[#3A6EA5] font-medium hover:underline"
            >
              ← Back to Quick Connect
            </button>
          </div>
        </main>
      )}

      {step === 'chat' && (
        <div className="flex flex-col h-screen">
          {/* Chat Header */}
          <div className="bg-white border-b border-[#3A6EA5]/10 p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#74C69D] flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">
                {nickname ? nickname.charAt(0).toUpperCase() : 'A'}
              </span>
            </div>
            <div>
              <div className="font-bold text-[#1B2A41]">
                {nickname || 'Anonymous User'}
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-[#74C69D]">Dr. Mehta • Online</span>
              </div>
            </div>
            <div className="ml-auto flex space-x-2">
              <button className="p-2 text-[#3A6EA5] hover:bg-[#F2F7FA] rounded-full">
                <PhoneCall className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#3A6EA5] hover:bg-[#F2F7FA] rounded-full">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F2F7FA]">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'psychologist' ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                    msg.sender === 'psychologist' 
                      ? 'bg-white text-[#1B2A41] rounded-tl-none' 
                      : 'bg-[#3A6EA5] text-white rounded-tr-none'
                  }`}
                >
                  {msg.sender === 'system' ? (
                    <div className="text-center">
                      <div className="inline-flex items-center bg-[#EDF5F0] text-[#3A6EA5] text-xs px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3 mr-1" />
                        {msg.text}
                      </div>
                    </div>
                  ) : (
                    <p>{msg.text}</p>
                  )}
                  <div className={`text-xs mt-1 ${
                    msg.sender === 'psychologist' ? 'text-gray-500' : 'text-blue-100'
                  }`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            
            {reconnectOption === 'callback' && (
              <div className="flex justify-center">
                <div className="bg-green-50 text-green-800 px-3 py-2 rounded-full text-sm flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Callback scheduled • 15 min
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="bg-white border-t border-[#3A6EA5]/10 p-3">
            <div className="flex">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-[#3A6EA5]/20 rounded-l-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#3A6EA5]"
              />
              <button className="bg-[#3A6EA5] text-white px-4 rounded-r-xl flex items-center">
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-between mt-2">
              <button className="text-xs text-[#3A6EA5] hover:underline">
                Share location (optional)
              </button>
              <button className="text-xs text-[#3A6EA5] hover:underline flex items-center">
                <Plus className="w-3 h-3 mr-1" />
                Complete Profile Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (Mobile) */}
      {step === 'chat' && (
        <div className="fixed bottom-20 right-4 md:hidden">
          <button className="w-14 h-14 bg-[#74C69D] text-white rounded-full shadow-lg flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
