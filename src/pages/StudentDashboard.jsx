import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  MessageCircle, 
  Calendar, 
  Heart, 
  Shield, 
  Settings,
  Mail,
  BookOpen,
  TrendingUp,
  CheckCircle,
  Clock,
  User,
  Smile,
  Meh,
  Frown,
  Zap,
  X,
  ChevronDown
} from 'lucide-react';

export default function StudentDashboard() {
  const [mood, setMood] = useState(null);
  const [showMoodInput, setShowMoodInput] = useState(false);
  const [moodNote, setMoodNote] = useState('');
  const [activeSession, setActiveSession] = useState({
    id: 'sess_001',
    psychologist: 'Dr. Ananya Mehta',
    status: 'ongoing',
    lastActive: '2 min ago'
  });

  const [upcomingAppointments] = useState([
    { 
      id: 'apt_001', 
      date: 'Today, 4:00 PM', 
      psychologist: 'Dr. Rajiv Sharma',
      type: 'Video Chat'
    }
  ]);

  const [recentSessions] = useState([
    { 
      id: 'sess_003', 
      date: '12 May 2025', 
      psychologist: 'Dr. Priya Desai', 
      status: 'completed' 
    },
    { 
      id: 'sess_002', 
      date: '5 May 2025', 
      psychologist: 'Dr. Arjun Patel', 
      status: 'follow-up' 
    }
  ]);

  const [resources] = useState([
    { title: '5-Minute Stress Relief', desc: 'Guided breathing', icon: Heart },
    { title: 'Exam Anxiety Toolkit', desc: 'Coping strategies', icon: BookOpen },
    { title: 'Feeling Lonely in Hostel?', desc: 'Connection tips', icon: User },
    { title: 'Grounding Techniques', desc: 'For panic moments', icon: Zap }
  ]);

  const [notifications] = useState([
    { id: 'notif_1', text: 'Dr. Ananya replied to your message', time: '5 min ago' },
    { id: 'notif_2', text: 'Your session is scheduled for today, 4:00 PM', time: '1 hr ago' }
  ]);

  // Gentle staggered animation on mount
  useEffect(() => {
    const cards = document.querySelectorAll('.animate-fade-slide');
    cards.forEach((card, i) => {
      const delay = i * 100;
      card.style.animationDelay = `${delay}ms`;
      setTimeout(() => card.classList.add('opacity-100', 'translate-y-0'), 50);
    });
  }, []);

  const handleMoodSelect = (value) => {
    setMood(value);
    if (value === 'very-low') {
      setShowMoodInput(true);
    } else {
      setShowMoodInput(false);
    }
  };

  const handleMoodSubmit = () => {
    // In real app: send to backend
    setShowMoodInput(false);
    setMoodNote('');
  };

  return (
    <div className="min-h-screen bg-[#EDE9FE] pb-24">
      {/* 🔴 Permanent Emergency Banner (sticky) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#DC2626] text-white py-3 px-4 shadow-lg">
        <div className="flex items-center justify-center text-sm font-medium">
          <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>In crisis? Tap below for instant help</span>
          <button 
            onClick={() => window.location.href = '/emergency'}
            className="ml-3 bg-white text-[#DC2626] font-bold px-4 py-1.5 rounded-full flex items-center hover:bg-[#f9fafb] transition-colors"
          >
            Emergency Help
            <ChevronDown className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>

      {/* Main Content (pushed down by sticky header) */}
      <main className="pt-20 px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          
          {/* 🎓 Header: Warm & Human */}
          <div className="mb-6 animate-fade-slide opacity-0 translate-y-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center">
                <img 
    src="/images/logo.svg" 
    alt="Bodhi-Mitra Logo"
    className="w-15 h-auto rounded-full max-h-16 object-contain"
    onError={(e) => {
      e.target.style.display = 'none';
      e.target.parentElement.innerHTML = `
        <div class="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </div>
      `;
    }}
  />
              </div>
              <h1 className="text-2xl font-bold text-[#312E81]">Bodhi-Mitra</h1>
            </div>
            <div className="bg-white rounded-xl p-4 border border-[#DDD6FE] shadow-sm">
              <p className="text-lg text-[#312E81] font-medium">
                👋 Hi {activeSession?.psychologist.split(' ')[1] || 'there'}, we’re here for you.
              </p>
              <p className="text-[#6D28D9] opacity-90 mt-1">
                You’re not alone today. How are you feeling?
              </p>
            </div>
          </div>

          {/* 😊 Mood Check-In */}
          <section className="mb-6 animate-fade-slide opacity-0 translate-y-4">
            <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm">
              <h2 className="font-bold text-[#312E81] mb-3 flex items-center">
                <Smile className="w-5 h-5 text-[#7C3AED] mr-2" />
                How are you feeling today?
              </h2>
              
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { value: 'okay', label: 'Okay', icon: Smile, color: '#7C3AED' },
                  { value: 'neutral', label: 'Neutral', icon: Meh, color: '#6D28D9' },
                  { value: 'stressed', label: 'Stressed', icon: Frown, color: '#DC2626' },
                  { value: 'very-low', label: 'Very low', icon: Frown, color: '#B91C1C' }
                ].map((m) => (
                  <button
                    key={m.value}
                    onClick={() => handleMoodSelect(m.value)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                      mood === m.value
                        ? `border-[${m.color}] bg-[${m.color}]/10`
                        : 'border-[#DDD6FE] bg-[#F5F3FF] hover:bg-white'
                    }`}
                  >
                    <m.icon className={`w-6 h-6 ${mood === m.value ? `text-[${m.color}]` : 'text-[#6D28D9]'}`} />
                    <span className="text-xs mt-1 font-medium text-[#312E81]">{m.label}</span>
                  </button>
                ))}
              </div>

              {showMoodInput && (
                <div className="mt-4 p-3 bg-[#FFF7FA] rounded-lg border border-[#DC2626]/30">
                  <p className="text-sm text-[#312E81] mb-2 flex items-center">
                    <AlertTriangle className="w-3 h-3 text-[#DC2626] mr-1" />
                    We’re here to listen. Want to share more?
                  </p>
                  <textarea
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                    placeholder="e.g., 'Overwhelmed with exams' or 'Just tired'"
                    className="w-full px-3 py-2 text-sm border border-[#DDD6FE] rounded-lg focus:ring-1 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none"
                    rows="2"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleMoodSubmit}
                      className="px-3 py-1.5 bg-[#7C3AED] text-white text-sm rounded-lg"
                    >
                      Share & Continue
                    </button>
                    <button
                      onClick={() => setShowMoodInput(false)}
                      className="px-3 py-1.5 text-[#6D28D9] text-sm"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 💬 Talk to a Psychologist (Core Action) */}
          <section className="mb-6 animate-fade-slide opacity-0 translate-y-4">
            <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm">
              <h2 className="font-bold text-[#312E81] mb-3 flex items-center">
                <MessageCircle className="w-5 h-5 text-[#7C3AED] mr-2" />
                Talk to a Psychologist
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => window.location.href = '/quick-connect'}
                  className="flex flex-col items-center justify-center p-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg transition-colors active:scale-95"
                >
                  <MessageCircle className="w-6 h-6 mb-2" />
                  <span className="font-medium">Talk Now</span>
                  <span className="text-xs opacity-90 mt-1">Anonymous Chat</span>
                </button>
                
                <button
                  onClick={() => window.location.href = '/book-session'}
                  className="flex flex-col items-center justify-center p-4 bg-white border-2 border-[#DDD6FE] hover:border-[#7C3AED] hover:bg-[#F5F3FF] rounded-lg transition-colors active:scale-95"
                >
                  <Calendar className="w-6 h-6 text-[#7C3AED] mb-2" />
                  <span className="font-medium">Book Session</span>
                  <span className="text-xs text-[#6D28D9] mt-1">30-min video call</span>
                </button>
                
                {activeSession && (
                  <button
                    onClick={() => window.location.href = `/session/${activeSession.id}`}
                    className="flex flex-col items-center justify-center p-4 bg-[#F5F3FF] border-2 border-[#7C3AED] rounded-lg transition-colors active:scale-95"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mb-2"></div>
                    <span className="font-medium">Continue Chat</span>
                    <span className="text-xs text-[#6D28D9] mt-1">{activeSession.psychologist}</span>
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* 📊 My Sessions & Appointments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* My Sessions */}
            <section className="animate-fade-slide opacity-0 translate-y-4">
              <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm h-full">
                <h2 className="font-bold text-[#312E81] mb-3 flex items-center">
                  <Clock className="w-5 h-5 text-[#7C3AED] mr-2" />
                  My Sessions
                </h2>
                
                {activeSession && (
                  <div className="mb-4 p-3 bg-[#F5F3FF] rounded-lg border border-[#7C3AED]/30">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-[#312E81]">{activeSession.psychologist}</p>
                        <p className="text-xs text-[#6D28D9]">{activeSession.lastActive}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Ongoing
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {recentSessions.map((session) => (
                    <div 
                      key={session.id} 
                      className="flex justify-between items-center p-3 bg-[#F5F3FF] rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#312E81]">{session.psychologist}</p>
                        <p className="text-xs text-[#6D28D9]">{session.date}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        session.status === 'completed' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {session.status === 'completed' ? 'Completed' : 'Follow-up'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Upcoming Appointments */}
            <section className="animate-fade-slide opacity-0 translate-y-4">
              <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm h-full">
                <h2 className="font-bold text-[#312E81] mb-3 flex items-center">
                  <Calendar className="w-5 h-5 text-[#7C3AED] mr-2" />
                  Upcoming Appointment
                </h2>
                
                {upcomingAppointments.length > 0 ? (
                  <div className="p-4 bg-[#F5F3FF] rounded-lg border border-[#DDD6FE]">
                    <p className="text-sm font-medium text-[#312E81]">{upcomingAppointments[0].psychologist}</p>
                    <p className="text-xs text-[#6D28D9] mb-2">{upcomingAppointments[0].date} • {upcomingAppointments[0].type}</p>
                    <button className="w-full mt-2 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium rounded-lg">
                      Join Session
                    </button>
                  </div>
                ) : (
                  <p className="text-[#6D28D9] text-sm">No upcoming appointments</p>
                )}
              </div>
            </section>
          </div>

          {/* 🧠 Self-Help Resources */}
          <section className="mb-6 animate-fade-slide opacity-0 translate-y-4">
            <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm">
              <h2 className="font-bold text-[#312E81] mb-3 flex items-center">
                <BookOpen className="w-5 h-5 text-[#7C3AED] mr-2" />
                Self-Help & Resources
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {resources.map((resource, i) => (
                  <div 
                    key={i}
                    className="bg-[#F5F3FF] rounded-lg p-3 border border-[#DDD6FE] hover:bg-white transition-colors cursor-pointer"
                  >
                    <resource.icon className="w-5 h-5 text-[#7C3AED] mb-2" />
                    <h3 className="font-medium text-[#312E81] text-sm">{resource.title}</h3>
                    <p className="text-xs text-[#6D28D9] mt-1">{resource.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 🔔 Notifications & Safety */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notifications */}
            <section className="animate-fade-slide opacity-0 translate-y-4">
              <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm h-full">
                <h2 className="font-bold text-[#312E81] mb-3 flex items-center">
                  <Mail className="w-5 h-5 text-[#7C3AED] mr-2" />
                  Notifications
                </h2>
                
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex items-start p-3 bg-[#F5F3FF] rounded-lg">
                      <div className="w-2 h-2 bg-[#7C3AED] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm text-[#312E81]">{notif.text}</p>
                        <p className="text-xs text-[#6D28D9] mt-0.5">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Safety & Profile */}
            <div className="space-y-6">
              {/* Safety Shortcut */}
              <section className="animate-fade-slide opacity-0 translate-y-4">
                <div 
                  onClick={() => window.location.href = '/privacy'}
                  className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm h-full cursor-pointer hover:bg-[#F5F3FF] transition-colors"
                >
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-[#7C3AED] mr-2" />
                    <h2 className="font-bold text-[#312E81]">Your Safety</h2>
                  </div>
                  <p className="text-sm text-[#6D28D9] mt-2">
                    All chats are anonymous, encrypted, and confidential. Your data is never shared.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-[#F5F3FF] text-[#7C3AED] text-xs rounded-full flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" /> Anonymous
                    </span>
                    <span className="px-2 py-1 bg-[#F5F3FF] text-[#7C3AED] text-xs rounded-full flex items-center">
                      <LockIcon className="w-3 h-3 mr-1" /> Encrypted
                    </span>
                  </div>
                </div>
              </section>

              {/* Profile & Settings */}
              <section className="animate-fade-slide opacity-0 translate-y-4">
                <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-[#312E81] flex items-center">
                      <Settings className="w-5 h-5 text-[#7C3AED] mr-2" />
                      Settings
                    </h2>
                    <button className="text-[#7C3AED] hover:text-[#312E81]">
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[#312E81]">Nickname</span>
                      <span className="text-[#6D28D9]">You</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#312E81]">Notifications</span>
                      <button className="w-10 h-5 bg-[#7C3AED] rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                      </button>
                    </div>
                    <button className="w-full py-2 text-center text-[#DC2626] font-medium text-sm">
                      Logout
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* 📝 Feedback & Support */}
          <section className="mt-6 animate-fade-slide opacity-0 translate-y-4">
            <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm">
              <h2 className="font-bold text-[#312E81] mb-3">Need Help?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Give Feedback', icon: Heart },
                  { label: 'Report Issue', icon: AlertTriangle },
                  { label: 'Technical Help', icon: Settings }
                ].map((item, i) => (
                  <button
                    key={i}
                    className="flex flex-col items-center justify-center p-3 bg-[#F5F3FF] rounded-lg border border-[#DDD6FE] hover:bg-white transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-[#7C3AED] mb-1" />
                    <span className="text-sm text-[#312E81]">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Global Animations */}
      <style jsx>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(12px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-slide {
          animation: fadeSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-hover {
          @apply transition-all duration-300;
        }
        .card-hover:hover {
          @apply transform -translate-y-0.5 shadow-md;
        }
      `}</style>
    </div>
  );
}

// Inline Lock icon (since Lucide Lock is too bold)
const LockIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
  </svg>
);