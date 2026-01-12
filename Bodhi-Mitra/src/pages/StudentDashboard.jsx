import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Shield, Calendar, MessageCircle, AlertTriangle, Settings,
  LogOut, Edit3, Heart, CheckCircle, X, Phone, Mail, TrendingUp
} from 'lucide-react';

export default function StudentProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [moodHistory, setMoodHistory] = useState([
    { date: 'Jun 15', mood: 'Better', note: 'Used grounding technique' },
    { date: 'Jun 10', mood: 'Stressed', note: 'Exam anxiety' },
    { date: 'Jun 3', mood: 'Okay', note: '' }
  ]);
  const [sessionHistory] = useState([
    { id: 'sess_003', date: 'Jun 15', psychologist: 'Dr. Mehta', duration: '12 min', issue: 'Academic Stress' },
    { id: 'sess_002', date: 'Jun 10', psychologist: 'Dr. Sharma', duration: '24 min', issue: 'Relationship Issues' },
    { id: 'sess_001', date: 'Jun 3', psychologist: 'Dr. Desai', duration: '18 min', issue: 'Anxiety' }
  ]);

  // Get session data
  const session = JSON.parse(sessionStorage.getItem('bodhi_session')) || {};
  const { name = 'Friend', rollNumber = 'Not provided' } = session;

  const handleLogout = () => {
    sessionStorage.removeItem('bodhi_session');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#EDE9FE] pb-24">
      {/* 🔴 Emergency Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#FFF7FA] border-b border-[#DC2626]/20 p-2">
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

      {/* Main Content */}
      <main className="pt-16 px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          
          {/* 🌿 Profile Header */}
          <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-[#DDD6FE]">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-16 h-16 rounded-full bg-[#7C3AED] flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-[#312E81]">{name}</h1>
                <p className="text-[#6D28D9] mt-1">Roll No.: {rollNumber}</p>
                <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 bg-[#F5F3FF] text-[#7C3AED] text-sm rounded-full">
                    Verified Student
                  </span>
                  <span className="px-3 py-1 bg-[#EDE9FE] text-[#6D28D9] text-sm rounded-full">
                    Anonymous Mode
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto pb-2 mb-6 -mx-4 px-4">
            {[
              { id: 'profile', label: 'My Profile', icon: User },
              { id: 'sessions', label: 'Session History', icon: Calendar },
              { id: 'mood', label: 'Mood Tracker', icon: Heart },
              { id: 'privacy', label: 'Privacy & Safety', icon: Shield },
              { id: 'support', label: 'Support', icon: MessageCircle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center min-w-[80px] px-3 py-2 mr-2 rounded-lg whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#7C3AED] text-white'
                    : 'text-[#312E81] bg-white'
                }`}
              >
                <tab.icon className="w-4 h-4 mb-1" />
                <span className="text-xs">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#DDD6FE]">
                <h2 className="text-xl font-bold text-[#312E81] mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#312E81]">Full Name</span>
                    <span className="text-[#6D28D9]">{name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#312E81]">Roll Number</span>
                    <span className="text-[#6D28D9]">{rollNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#312E81]">Account Status</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      Active
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-[#6D28D9] italic">
                  Roll number is verified at registration and cannot be edited.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#DDD6FE]">
                <h2 className="text-xl font-bold text-[#312E81] mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate('/quick-connect')}
                    className="p-3 bg-[#F5F3FF] rounded-lg flex flex-col items-center hover:bg-[#EDE9FE]"
                  >
                    <MessageCircle className="w-5 h-5 text-[#7C3AED]" />
                    <span className="text-sm mt-1">Talk Now</span>
                  </button>
                  <button
                    onClick={() => navigate('/book-session')}
                    className="p-3 bg-[#F5F3FF] rounded-lg flex flex-col items-center hover:bg-[#EDE9FE]"
                  >
                    <Calendar className="w-5 h-5 text-[#7C3AED]" />
                    <span className="text-sm mt-1">Book Session</span>
                  </button>
                  <button
                    onClick={() => navigate('/emergency')}
                    className="p-3 bg-[#FFF7FA] rounded-lg flex flex-col items-center hover:bg-[#FFECEB]"
                  >
                    <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
                    <span className="text-sm mt-1">Emergency Help</span>
                  </button>
                  <button
                    onClick={() => navigate('/resources')}
                    className="p-3 bg-[#F5F3FF] rounded-lg flex flex-col items-center hover:bg-[#EDE9FE]"
                  >
                    <Heart className="w-5 h-5 text-[#7C3AED]" />
                    <span className="text-sm mt-1">Self-Help</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#DDD6FE]">
              <h2 className="text-xl font-bold text-[#312E81] mb-4">Session History</h2>
              <p className="text-[#6D28D9] text-sm mb-4">
                All conversations are confidential and encrypted. Metadata only shown below.
              </p>
              <div className="space-y-3">
                {sessionHistory.map((session, i) => (
                  <div key={i} className="p-3 bg-[#F5F3FF] rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium text-[#312E81]">{session.date}</span>
                      <span className="text-[#6D28D9] text-sm">{session.duration}</span>
                    </div>
                    <p className="text-[#6D28D9] text-sm mt-1">
                      With {session.psychologist} • {session.issue}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mood Tracker Tab */}
          {activeTab === 'mood' && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#DDD6FE]">
              <h2 className="text-xl font-bold text-[#312E81] mb-4">Mood Check-Ins</h2>
              <p className="text-[#6D28D9] text-sm mb-4">
                Optional reflections to track your emotional journey. Only you can see this.
              </p>
              <div className="space-y-3">
                {moodHistory.map((entry, i) => (
                  <div key={i} className="p-3 bg-[#F5F3FF] rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium text-[#312E81]">{entry.date}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        entry.mood === 'Better' ? 'bg-green-100 text-green-800' :
                        entry.mood === 'Stressed' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {entry.mood}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-[#6D28D9] text-sm mt-1">“{entry.note}”</p>
                    )}
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 bg-[#7C3AED] text-white rounded-lg">
                + Add New Check-In
              </button>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#DDD6FE]">
                <h2 className="text-xl font-bold text-[#312E81] mb-4">Your Privacy</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-[#7C3AED] mt-0.5 mr-3" />
                    <div>
                      <p className="text-[#312E81] font-medium">End-to-End Encryption</p>
                      <p className="text-[#6D28D9] text-sm">All messages are encrypted and never stored.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <User className="w-5 h-5 text-[#7C3AED] mt-0.5 mr-3" />
                    <div>
                      <p className="text-[#312E81] font-medium">Anonymous by Default</p>
                      <p className="text-[#6D28D9] text-sm">Psychologists see only your chosen nickname.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <X className="w-5 h-5 text-[#7C3AED] mt-0.5 mr-3" />
                    <div>
                      <p className="text-[#312E81] font-medium">Never Shared with College</p>
                      <p className="text-[#6D28D9] text-sm">Your data is never shared with GBU or hostel authorities.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#DDD6FE]">
                <h2 className="text-xl font-bold text-[#312E81] mb-4">Data Controls</h2>
                <div className="space-y-3">
                  <button className="w-full p-3 bg-[#F5F3FF] rounded-lg text-left hover:bg-[#EDE9FE]">
                    <div className="font-medium text-[#312E81]">Download My Data</div>
                    <p className="text-[#6D28D9] text-sm mt-1">Get a copy of your session metadata</p>
                  </button>
                  <button className="w-full p-3 bg-[#F5F3FF] rounded-lg text-left hover:bg-[#EDE9FE]">
                    <div className="font-medium text-[#312E81]">Delete My Account</div>
                    <p className="text-[#6D28D9] text-sm mt-1">Permanently erase all your data</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#DDD6FE]">
                <h2 className="text-xl font-bold text-[#312E81] mb-4">Get Help</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/emergency')}
                    className="w-full p-3 bg-[#FFF7FA] rounded-lg text-left border border-[#DC2626]/30 hover:bg-[#FFECEB]"
                  >
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-[#DC2626] mr-3" />
                      <span className="font-medium text-[#312E81]">Emergency Support</span>
                    </div>
                    <p className="text-[#6D28D9] text-sm mt-1">For immediate distress or danger</p>
                  </button>
                  <button className="w-full p-3 bg-[#F5F3FF] rounded-lg text-left hover:bg-[#EDE9FE]">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-[#7C3AED] mr-3" />
                      <span className="font-medium text-[#312E81]">Call Campus Helpline</span>
                    </div>
                    <p className="text-[#6D28D9] text-sm mt-1">91529 87821 (Mon-Sat, 9 AM - 9 PM)</p>
                  </button>
                  <button className="w-full p-3 bg-[#F5F3FF] rounded-lg text-left hover:bg-[#EDE9FE]">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-[#7C3AED] mr-3" />
                      <span className="font-medium text-[#312E81]">Email Support</span>
                    </div>
                    <p className="text-[#6D28D9] text-sm mt-1">support-Bodhi-Mitra@gbu.in</p>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#DDD6FE]">
                <h2 className="text-xl font-bold text-[#312E81] mb-4">Resources</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Grounding Techniques',
                    'Exam Anxiety Toolkit',
                    'Hostel Adjustment Guide',
                    'Breathing Exercises'
                  ].map((resource, i) => (
                    <button
                      key={i}
                      className="p-3 bg-[#F5F3FF] rounded-lg hover:bg-[#EDE9FE]"
                    >
                      <span className="text-sm text-[#312E81]">{resource}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <div className="mt-8 pt-6 border-t border-[#DDD6FE]">
            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-white border-2 border-[#DC2626] text-[#DC2626] font-medium rounded-xl hover:bg-[#FFF7FA]"
            >
              <LogOut className="w-4 h-4 inline mr-2" />
              Log Out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}