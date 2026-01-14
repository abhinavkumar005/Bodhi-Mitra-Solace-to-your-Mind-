// src/pages/psychologist/Dashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, MessageCircle, User, GraduationCap, Mail, Phone, 
  Clock, CheckCircle, X, Heart, Calendar, Shield, LogOut, Camera, 
  ToggleLeft, ToggleRight, Edit3, Save, Upload
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';

export default function PsychologistDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const socket = useSocket();
  
  const [pendingEmergencies, setPendingEmergencies] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [pastSessions, setPastSessions] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    specialization: '',
    phone: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Initialize profile data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        specialization: user.specialization || '',
        phone: user.phone || ''
      });
      setImagePreview(user.profileImage || '');
    }
  }, [user]);

  // Fetch emergencies and sessions on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get pending emergencies
        const pendingRes = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/emergencies`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const pendingData = await pendingRes.json();
        const pending = pendingData.data.filter(e => e.status === 'pending');
        setPendingEmergencies(pending);

        // Get active session (assigned emergencies)
        const activeRes = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/emergencies/assigned`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const activeData = await activeRes.json();
        const active = activeData.data.find(e => e.status === 'assigned');
        if (active) {
          setActiveSession(active);
          
          // Load chat history
          const chatRes = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/chats/${active._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          const chatData = await chatRes.json();
          setChatMessages(chatData.data);
        }

        // Get past sessions (closed emergencies)
        const past = activeData.data.filter(e => e.status === 'closed');
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

    // When new emergency arrives
    socket.on('new-emergency', (data) => {
      if (isAvailable) {
        setPendingEmergencies(prev => [...prev, data]);
      }
    });

    // When new message arrives
    socket.on('new-message', (msg) => {
      if (activeSession && msg.emergencyId === activeSession._id) {
        setChatMessages(prev => [...prev, msg]);
      }
    });

    // When emergency is closed by student
    socket.on('emergency-closed', (data) => {
      if (activeSession && data.emergencyId === activeSession._id) {
        setActiveSession(null);
        setChatMessages([]);
        // Refresh past sessions
        fetchPastSessions();
      }
    });

    return () => {
      socket.off('new-emergency');
      socket.off('new-message');
      socket.off('emergency-closed');
    };
  }, [socket, activeSession, isAvailable]);

  const fetchPastSessions = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/emergencies/assigned`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      const past = data.data.filter(e => e.status === 'closed');
      setPastSessions(past);
    } catch (err) {
      console.error('Failed to refresh sessions:', err);
    }
  };

  const handleAcceptEmergency = async (emergencyId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/emergencies/${emergencyId}/accept`, {
        method: 'PATCH',
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (res.ok) {
        const acceptedEmergency = await res.json();
        setActiveSession(acceptedEmergency.data);
        setChatMessages([]);
        // Remove from pending list
        setPendingEmergencies(prev => prev.filter(e => e._id !== emergencyId));
      }
    } catch (err) {
      alert('Failed to accept emergency request.');
    }
  };

  const handleEndSession = async () => {
    if (!activeSession) return;
    
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/v1/emergencies/${activeSession._id}/close`, {
        method: 'PATCH',
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setActiveSession(null);
      setChatMessages([]);
      // Refresh past sessions
      fetchPastSessions();
    } catch (err) {
      console.error('Failed to close session:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeSession) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/chats`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emergencyId: activeSession._id,
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('specialization', profileData.specialization);
      formData.append('phone', profileData.phone);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/update-profile`, {
        method: 'PATCH',
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (res.ok) {
        const updatedUser = await res.json();
        // Update local storage and context
        localStorage.setItem('user', JSON.stringify(updatedUser.data.user));
        alert('Profile updated successfully!');
        setShowProfileEdit(false);
      }
    } catch (err) {
      alert('Failed to update profile.');
    }
  };

  const toggleAvailability = async () => {
    const newStatus = !isAvailable;
    setIsAvailable(newStatus);
    
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/update-availability`, {
        method: 'PATCH',
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isAvailable: newStatus })
      });
    } catch (err) {
      console.error('Failed to update availability:', err);
      // Revert if failed
      setIsAvailable(!newStatus);
    }
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
                <p className="text-sm text-[#6D28D9]">Psychologist Dashboard</p>
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
          {/* Left Column - Profile & Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-3">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Profile" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-[#7C3AED]" />
                    )}
                  </div>
                  {showProfileEdit && (
                    <label className="absolute bottom-0 right-0 bg-[#7C3AED] text-white p-1 rounded-full cursor-pointer">
                      <Upload className="w-3 h-3" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-bold text-[#312E81]">{user?.name}</h2>
                <p className="text-[#6D28D9] opacity-90">{user?.specialization}</p>
              </div>
              
              {!showProfileEdit ? (
                <div className="space-y-3">
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
                  <button
                    onClick={() => setShowProfileEdit(true)}
                    className="w-full mt-4 bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#7C3AED] font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-[#DDD6FE] rounded-lg focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-1">Specialization</label>
                    <input
                      type="text"
                      value={profileData.specialization}
                      onChange={(e) => setProfileData({...profileData, specialization: e.target.value})}
                      className="w-full px-3 py-2 border border-[#DDD6FE] rounded-lg focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-1">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-[#DDD6FE] rounded-lg focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setShowProfileEdit(false)}
                      className="flex-1 bg-[#DDD6FE] hover:bg-[#C4B5FD] text-[#312E81] font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 bg-[#7C3AED] hover:bg-[#6A2DCE] text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Availability Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
              <h3 className="text-lg font-bold text-[#312E81] mb-4">Availability Status</h3>
              
              <div className="flex items-center justify-between">
                <span className="text-[#312E81] font-medium">
                  {isAvailable ? 'Available for emergencies' : 'Not available'}
                </span>
                <button
                  onClick={toggleAvailability}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isAvailable ? 'bg-[#7C3AED]' : 'bg-[#DDD6FE]'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAvailable ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <p className="text-xs text-[#6D28D9] opacity-80 mt-2">
                {isAvailable 
                  ? 'You will receive emergency notifications' 
                  : 'You will not receive new emergency requests'}
              </p>
            </div>

            {/* Pending Emergencies */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
              <h3 className="text-lg font-bold text-[#312E81] mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-[#DC2626]" />
                Pending Emergencies
              </h3>
              
              {pendingEmergencies.length === 0 ? (
                <p className="text-[#6D28D9] opacity-80 text-center py-4">
                  No pending emergencies
                </p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {pendingEmergencies.map((emergency) => (
                    <div key={emergency._id} className="border border-[#DDD6FE] rounded-lg p-3 hover:bg-[#F5F3FF] transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-[#312E81]">Student Request</p>
                          <p className="text-xs text-[#6D28D9] opacity-80">
                            {new Date(emergency.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAcceptEmergency(emergency._id)}
                          className="bg-[#7C3AED] hover:bg-[#6A2DCE] text-white text-xs font-medium py-1 px-2 rounded-full flex items-center gap-1 transition-colors"
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Active Session & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Session */}
            {activeSession ? (
              <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#312E81] flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-[#7C3AED]" />
                    Active Session with Student
                  </h3>
                  <div className="flex items-center text-green-600 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    In Session
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
                          className={`flex ${msg.sender?.role === 'psychologist' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                              msg.sender?.role === 'psychologist' 
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
                
                <button
                  onClick={handleEndSession}
                  className="w-full mt-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                  End Session
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-[#7C3AED]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#312E81] mb-2">No Active Session</h3>
                  <p className="text-[#6D28D9] opacity-80">
                    Accept a pending emergency to start a session
                  </p>
                </div>
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
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {pastSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#F5F3FF] rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-[#7C3AED]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#312E81]">
                            Student Session
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
    </div>
  );
}