// src/pages/student/Dashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, MessageCircle, User, GraduationCap, Mail, Phone, 
  Clock, CheckCircle, X, Heart, BookOpen, Calendar, Shield, LogOut, HelpCircle
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const socket = useSocket();
  
  const [activeEmergency, setActiveEmergency] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSelfHelp, setShowSelfHelp] = useState(false);
  const [pastSessions, setPastSessions] = useState([]);

  // Fetch active emergency and past sessions on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get active emergency
        const emergencyRes = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/emergencies/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const emergencies = await emergencyRes.json();
        
        // Find active (assigned) emergency
        const active = emergencies.data.find(e => e.status === 'assigned');
        if (active) {
          setActiveEmergency(active);
          
          // Load chat history
          const chatRes = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/chats/${active._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          const chatData = await chatRes.json();
          setChatMessages(chatData.data);
        }
        
        // Get past sessions (closed emergencies)
        const past = emergencies.data.filter(e => e.status === 'closed');
        setPastSessions(past);
        
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Listen for realtime events
  useEffect(() => {
    if (!socket) return;

    // When psychologist accepts emergency
    socket.on('psychologist-accepted', (data) => {
      setActiveEmergency({
        _id: data.emergencyId,
        psychologist: { _id: data.psychologistId, name: data.psychologistName },
        status: 'assigned'
      });
      setChatMessages([]); // Clear any previous messages
    });

    // When new message arrives
    socket.on('new-message', (msg) => {
      if (activeEmergency && msg.emergencyId === activeEmergency._id) {
        setChatMessages(prev => [...prev, msg]);
      }
    });

    // When emergency is closed
    socket.on('emergency-closed', (data) => {
      if (activeEmergency && data.emergencyId === activeEmergency._id) {
        setActiveEmergency(null);
        setChatMessages([]);
        // Refresh past sessions
        fetchPastSessions();
      }
    });

    return () => {
      socket.off('psychologist-accepted');
      socket.off('new-message');
      socket.off('emergency-closed');
    };
  }, [socket, activeEmergency]);

  const fetchPastSessions = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/emergencies/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      const past = data.data.filter(e => e.status === 'closed');
      setPastSessions(past);
    } catch (err) {
      console.error('Failed to refresh sessions:', err);
    }
  };

  const handleEmergencyRequest = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/emergencies`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        const emergency = await res.json();
        alert('Emergency request sent! A psychologist will contact you shortly.');
      }
    } catch (err) {
      alert('Failed to send emergency request. Please try again.');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeEmergency) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/chats`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emergencyId: activeEmergency._id,
          message: newMessage
        })
      });

      if (res.ok) {
        // Message will appear via socket event
        setNewMessage('');
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const closeActiveSession = async () => {
    if (!activeEmergency) return;
    
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/v1/emergencies/${activeEmergency._id}/close`, {
        method: 'PATCH',
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Session will be closed by psychologist, but student can also close
    } catch (err) {
      console.error('Failed to close session:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3FF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#312E81]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Indian Mental Health Helplines
  const helplines = [
    {
      name: "Vandrevala Foundation",
      number: "9999 666 555",
      description: "24/7 mental health support",
      category: "General"
    },
    {
      name: "iCall",
      number: "91529 87821",
      description: "Email & phone counseling (Mon-Sat, 10AM-8PM)",
      category: "Students"
    },
    {
      name: "Roshni Helpline",
      number: "040 6620 2000",
      description: "Suicide prevention & crisis support",
      category: "Crisis"
    },
    {
      name: "Sneha Foundation",
      number: "044 2464 0050",
      description: "Suicide prevention (24/7)",
      category: "Crisis"
    },
    {
      name: "Manas Foundation",
      number: "011 2338 9111",
      description: "Mental health counseling",
      category: "General"
    },
    {
      name: "National Institute of Mental Health",
      number: "080 4680 4680",
      description: "Government mental health services",
      category: "Government"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3FF]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#DDD6FE]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#7C3AED] rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#312E81]">Bodhi-Mitra</h1>
                <p className="text-sm text-[#6D28D9]">Student Dashboard</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile, Emergency & Helplines */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-[#7C3AED]" />
                </div>
                <h2 className="text-xl font-bold text-[#312E81]">{user?.name}</h2>
                <p className="text-[#6D28D9] opacity-90">Student</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-[#312E81]">
                  <GraduationCap className="w-4 h-4 mr-3 text-[#7C3AED]" />
                  <span className="font-medium">Roll No:</span>
                  <span className="ml-2">{user?.rollNumber}</span>
                </div>
                <div className="flex items-center text-[#312E81]">
                  <Mail className="w-4 h-4 mr-3 text-[#7C3AED]" />
                  <span className="font-medium">Email:</span>
                  <span className="ml-2 break-all">{user?.email}</span>
                </div>
                <div className="flex items-center text-[#312E81]">
                  <Phone className="w-4 h-4 mr-3 text-[#7C3AED]" />
                  <span className="font-medium">Phone:</span>
                  <span className="ml-2">{user?.phone}</span>
                </div>
              </div>
            </div>

            {/* Emergency Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
              <h3 className="text-lg font-bold text-[#312E81] mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-[#DC2626]" />
                Emergency Status
              </h3>
              
              {activeEmergency ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-medium text-green-800">Connected!</span>
                    </div>
                    <p className="text-green-700 text-sm">
                      You're chatting with <span className="font-medium">{activeEmergency.psychologist?.name}</span>
                    </p>
                  </div>
                  
                  <button
                    onClick={closeActiveSession}
                    className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    End Session
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="font-medium text-yellow-800">Ready for Help</span>
                    </div>
                    <p className="text-yellow-700 text-sm">
                      Click below to request immediate support
                    </p>
                  </div>
                  
                  <button
                    onClick={handleEmergencyRequest}
                    className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
                  >
                    <AlertTriangle className="w-5 h-5" />
                    Request Emergency Help
                  </button>
                </div>
              )}
            </div>

            {/* Self-Help Resources */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
              <h3 className="text-lg font-bold text-[#312E81] mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-[#7C3AED]" />
                Self-Help Resources
              </h3>
              
              <button
                onClick={() => setShowSelfHelp(true)}
                className="w-full bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#7C3AED] font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Heart className="w-5 h-5" />
                Calm During Panic & Anxiety
              </button>
            </div>

            {/* Mental Health Helplines */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
              <h3 className="text-lg font-bold text-[#312E81] mb-4 flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-[#7C3AED]" />
                Mental Health Helplines (India)
              </h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {helplines.map((helpline, index) => (
                  <div key={index} className="border border-[#DDD6FE] rounded-lg p-3 hover:bg-[#F5F3FF] transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-[#312E81] text-sm">{helpline.name}</h4>
                        <p className="text-xs text-[#6D28D9] opacity-80 mt-1">{helpline.description}</p>
                      </div>
                      <span className="bg-[#F5F3FF] text-[#7C3AED] text-xs font-medium px-2 py-1 rounded-full">
                        {helpline.category}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <Phone className="w-3 h-3 text-[#7C3AED] mr-1" />
                      <a 
                        href={`tel:${helpline.number.replace(/\s/g, '')}`} 
                        className="text-[#7C3AED] font-medium text-sm hover:text-[#6A2DCE] transition-colors"
                      >
                        {helpline.number}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-[#FFF7FA] border border-[#DC2626]/20 rounded-lg">
                <p className="text-xs text-[#DC2626] text-center">
                  <strong>Emergency:</strong> Call 112 or go to nearest hospital if in immediate danger
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Chat & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Chat */}
            {activeEmergency && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#312E81] flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-[#7C3AED]" />
                    Chat with {activeEmergency.psychologist?.name}
                  </h3>
                  <div className="flex items-center text-green-600 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </div>
                </div>
                
                <div className="bg-[#F9FAFB] rounded-xl p-4 h-96 overflow-y-auto mb-4">
                  {chatMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-[#6D28D9] opacity-70">
                      <MessageCircle className="w-8 h-8 mr-2" />
                      Start your conversation...
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {chatMessages.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`flex ${msg.sender?.role === 'student' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                              msg.sender?.role === 'student' 
                                ? 'bg-[#7C3AED] text-white rounded-br-none' 
                                : 'bg-[#F5F3FF] text-[#312E81] rounded-bl-none'
                            }`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-[#DDD6FE] rounded-xl focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="bg-[#7C3AED] hover:bg-[#6A2DCE] text-white px-4 py-2 rounded-xl font-medium disabled:opacity-50"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}

            {/* Past Sessions */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
              <h3 className="text-lg font-bold text-[#312E81] mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#7C3AED]" />
                Previous Sessions
              </h3>
              
              {pastSessions.length === 0 ? (
                <p className="text-[#6D28D9] opacity-80 text-center py-4">
                  No previous sessions yet
                </p>
              ) : (
                <div className="space-y-3">
                  {pastSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#F5F3FF] rounded-full flex items-center justify-center mr-3">
                          <Shield className="w-5 h-5 text-[#7C3AED]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#312E81]">
                            {session.psychologist?.name || 'Psychologist'}
                          </p>
                          <p className="text-xs text-[#6D28D9] opacity-80">
                            {new Date(session.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Completed
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Self-Help Modal */}
      {showSelfHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#DDD6FE]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#312E81] flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-[#7C3AED]" />
                  Calm During Panic & Anxiety
                </h2>
                <button 
                  onClick={() => setShowSelfHelp(false)}
                  className="text-[#6D28D9] hover:text-[#312E81]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl p-4">
                <h3 className="font-bold text-[#312E81] mb-2">Grounding Technique (5-4-3-2-1)</h3>
                <ol className="list-decimal list-inside space-y-2 text-[#312E81]">
                  <li><strong>5 things</strong> you can see around you</li>
                  <li><strong>4 things</strong> you can touch</li>
                  <li><strong>3 things</strong> you can hear</li>
                  <li><strong>2 things</strong> you can smell</li>
                  <li><strong>1 thing</strong> you can taste</li>
                </ol>
              </div>
              
              <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl p-4">
                <h3 className="font-bold text-[#312E81] mb-2">Breathing Exercise</h3>
                <p className="text-[#312E81]">
                  Breathe in slowly through your nose for 4 seconds → Hold for 4 seconds → 
                  Breathe out slowly through your mouth for 6 seconds. Repeat 5 times.
                </p>
              </div>
              
              <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl p-4">
                <h3 className="font-bold text-[#312E81] mb-2">Positive Affirmations</h3>
                <ul className="list-disc list-inside space-y-1 text-[#312E81]">
                  <li>"This feeling will pass"</li>
                  <li>"I am safe right now"</li>
                  <li>"I can handle this"</li>
                  <li>"I am stronger than my anxiety"</li>
                </ul>
              </div>
              
              <div className="bg-[#FFF7FA] border border-[#DC2626]/20 rounded-xl p-4">
                <h3 className="font-bold text-[#DC2626] mb-2 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  When to Seek Immediate Help
                </h3>
                <p className="text-[#312E81]">
                  If you feel like harming yourself or others, please call emergency services (112) 
                  or go to the nearest hospital immediately.
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-[#DDD6FE]">
              <button
                onClick={() => setShowSelfHelp(false)}
                className="w-full bg-[#7C3AED] hover:bg-[#6A2DCE] text-white font-bold py-3 px-4 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}