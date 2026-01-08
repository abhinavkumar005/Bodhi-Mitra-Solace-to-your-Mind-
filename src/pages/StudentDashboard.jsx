import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, MessageCircle, Calendar, Heart, Shield, Settings,
  Mail, BookOpen, TrendingUp, CheckCircle, Clock, User,
  Smile, Meh, Frown, Zap, X, ChevronDown
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
  const [selectedSupport, setSelectedSupport] = useState(null); // ✅ New state

  const [upcomingAppointments] = useState([
    { 
      id: 'apt_001', 
      date: 'Today, 4:00 PM', 
      psychologist: 'Dr. Rajiv Sharma',
      type: 'Video Chat'
    }
  ]);

  const [recentSessions] = useState([
    { id: 'sess_003', date: '12 May 2025', psychologist: 'Dr. Priya Desai', status: 'completed' },
    { id: 'sess_002', date: '5 May 2025', psychologist: 'Dr. Arjun Patel', status: 'follow-up' }
  ]);

  const [resources] = useState([
    { title: '5-Minute Stress Relief', desc: 'Guided breathing', icon: Heart },
    { title: 'Exam Anxiety Toolkit', desc: 'Coping strategies', icon: BookOpen },
    { title: 'Feeling Lonely in Hostel?', desc: 'Connection tips', icon: User },
    { title: 'Grounding Techniques', desc: 'For panic moments', icon: Zap }
  ]);

  const [notifications] = useState([
    { id: 'notif_1', text: 'Dr. Ananya replied to your message', time: '5 min ago' }
  ]);

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
    setShowMoodInput(false);
    setMoodNote('');
  };

  // ✅ Modal close handler
  const closeSupportModal = () => {
    setSelectedSupport(null);
  };

  return (
    <div className="min-h-screen bg-[#EDE9FE] pb-24">
      {/* 🔴 Improved Emergency Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#FFF7FA] border-b border-[#DC2626]/20 py-3 px-4">
        <div className="flex items-center justify-center text-sm text-[#312E81]">
          <AlertTriangle className="w-4 h-4 text-[#DC2626] mr-2 flex-shrink-0" />
          <span className="font-medium">
            If you feel unsafe right now, tap here for immediate support
          </span>
          <button 
            onClick={() => window.location.href = '/emergency'}
            className="ml-3 bg-[#DC2626] text-white font-bold px-4 py-1.5 rounded-full flex items-center hover:bg-[#B91C1C] transition-colors"
          >
            Emergency Help
            <ChevronDown className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>

      <main className="pt-20 px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          
          {/* 🌿 Improved Welcome */}
          <div className="mb-6 animate-fade-slide opacity-0 translate-y-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-[#312E81]">Bodhi-Mitra</h1>
            </div>
            <div className="bg-white rounded-xl p-4 border border-[#DDD6FE] shadow-sm">
              <p className="text-lg text-[#312E81] font-medium">
                You don’t have to go through this alone.
              </p>
              <p className="text-[#6D28D9] opacity-90 mt-1">
                We’re here with you — quietly, safely, and without judgment.
              </p>
            </div>
          </div>

          {/* 😌 Improved Mood Check */}
          <section className="mb-6 animate-fade-slide opacity-0 translate-y-4">
            <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm">
              <h2 className="font-bold text-[#312E81] mb-3 flex items-center text-base">
                <Smile className="w-4 h-4 text-[#6D28D9] mr-2" />
                How are you feeling right now?
              </h2>
              
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { value: 'okay', label: 'Okay', icon: Smile },
                  { value: 'neutral', label: 'Neutral', icon: Meh },
                  { value: 'stressed', label: 'Stressed', icon: Frown },
                  { value: 'very-low', label: 'Very low', icon: Frown }
                ].map((m) => (
                  <button
                    key={m.value}
                    onClick={() => handleMoodSelect(m.value)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-lg border transition-all ${
                      mood === m.value
                        ? 'border-[#7C3AED] bg-[#F5F3FF]'
                        : 'border-[#DDD6FE] bg-white hover:bg-[#F9F7FE]'
                    }`}
                  >
                    <m.icon className={`w-5 h-5 ${mood === m.value ? 'text-[#7C3AED]' : 'text-[#6D28D9]'}`} />
                    <span className="text-[10px] mt-1 text-[#312E81]">{m.label}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setShowMoodInput(!showMoodInput)}
                className="text-xs text-[#7C3AED] hover:underline"
              >
                {showMoodInput ? 'Close' : 'Skip for now or share more...'}
              </button>

              {showMoodInput && (
                <div className="mt-3 p-3 bg-[#F5F3FF] rounded-lg">
                  <textarea
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                    placeholder="Anything you'd like to share? (optional)"
                    className="w-full px-3 py-2 text-sm border border-[#DDD6FE] rounded-lg focus:ring-1 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none"
                    rows="2"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleMoodSubmit}
                      className="px-3 py-1 bg-[#7C3AED] text-white text-xs rounded"
                    >
                      Share
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 💬 Improved Primary Actions */}
          <section className="mb-6 animate-fade-slide opacity-0 translate-y-4">
            <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm">
              <h2 className="font-bold text-[#312E81] mb-3 text-base">What would help right now?</h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => window.location.href = '/quick-connect'}
                  className="w-full flex flex-col items-center justify-center p-4 bg-[#7C3AED] hover:bg-[#6A2DCE] text-white rounded-lg transition-colors active:scale-[0.98] shadow-md"
                >
                  <MessageCircle className="w-6 h-6 mb-1" />
                  <span className="font-bold text-base">Talk Now (Anonymous)</span>
                  <span className="text-xs opacity-90 mt-0.5">Connect in under 1 minute</span>
                </button>
                
                {activeSession && (
                  <button
                    onClick={() => window.location.href = `/session/${activeSession.id}`}
                    className="w-full flex items-center justify-between p-3 bg-white border border-[#DDD6FE] hover:bg-[#F5F3FF] rounded-lg transition-colors active:scale-[0.99]"
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="font-medium">Continue Chat</span>
                    </div>
                    <span className="text-sm text-[#6D28D9]">{activeSession.psychologist}</span>
                  </button>
                )}
                
                <button
                  onClick={() => window.location.href = '/book-session'}
                  className="w-full flex items-center justify-center p-3 bg-[#F5F3FF] border-2 border-[#DDD6FE] hover:border-[#7C3AED] rounded-lg transition-colors active:scale-[0.99]"
                >
                  <Calendar className="w-5 h-5 text-[#6D28D9] mr-2" />
                  <span className="text-sm font-medium text-[#312E81]">Book a Session</span>
                </button>
              </div>
            </div>
          </section>

          {/* 🌿 NEW: Quiet Moments of Support */}
          <section className="mb-6 animate-fade-slide opacity-0 translate-y-4">
            <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm">
              <h2 className="font-bold text-[#312E81] mb-2 flex items-center">
                <Heart className="w-5 h-5 text-[#7C3AED] mr-2" />
                Quiet Moments of Support
              </h2>
              <p className="text-[#6D28D9] text-sm mb-4">
                Small steps to help you feel a little better right now.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'breathing', title: '5-Minute Stress Relief', desc: 'Guided breathing', icon: Heart },
                  { id: 'exam', title: 'Exam Anxiety Toolkit', desc: 'Coping strategies', icon: BookOpen },
                  { id: 'lonely', title: 'Feeling Lonely?', desc: 'Connection tips', icon: User },
                  { id: 'grounding', title: 'Grounding Techniques', desc: 'For panic moments', icon: Zap }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSupport(item.id)}
                    className="bg-[#F5F3FF] rounded-lg p-3 border border-[#DDD6FE] hover:bg-white transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-[#7C3AED] mb-2 mx-auto" />
                    <h3 className="font-medium text-[#312E81] text-xs">{item.title}</h3>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 📊 Sessions & Appointments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <section className="animate-fade-slide opacity-0 translate-y-4">
              <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm h-full">
                <h2 className="font-bold text-[#312E81] mb-3 text-base flex items-center">
                  <Clock className="w-4 h-4 text-[#6D28D9] mr-2" />
                  Active Session
                </h2>
                
                {activeSession ? (
                  <div className="p-3 bg-[#F5F3FF] rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-[#312E81]">{activeSession.psychologist}</p>
                        <p className="text-xs text-[#6D28D9]">{activeSession.lastActive}</p>
                      </div>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full">
                        Live now
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#6D28D9] text-sm">No active session</p>
                )}
              </div>
            </section>

            <section className="animate-fade-slide opacity-0 translate-y-4">
              <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm h-full">
                <h2 className="font-bold text-[#312E81] mb-3 text-base flex items-center">
                  <Calendar className="w-4 h-4 text-[#6D28D9] mr-2" />
                  Upcoming Appointment
                </h2>
                
                {upcomingAppointments.length > 0 ? (
                  <div className="p-3 bg-[#F5F3FF] rounded-lg">
                    <p className="text-sm font-medium text-[#312E81]">{upcomingAppointments[0].psychologist}</p>
                    <p className="text-xs text-[#6D28D9]">{upcomingAppointments[0].date}</p>
                    <button className="w-full mt-2 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-medium rounded">
                      Join Session
                    </button>
                  </div>
                ) : (
                  <p className="text-[#6D28D9] text-sm">No upcoming appointments</p>
                )}
              </div>
            </section>
          </div>

          {/* 🔔 Notifications & Safety */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="animate-fade-slide opacity-0 translate-y-4">
              <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm h-full">
                <h2 className="font-bold text-[#312E81] mb-3 text-base flex items-center">
                  <Mail className="w-4 h-4 text-[#6D28D9] mr-2" />
                  Updates
                </h2>
                
                <div className="space-y-2">
                  {notifications.slice(0,1).map((notif) => (
                    <div key={notif.id} className="p-2 bg-[#F5F3FF] rounded">
                      <p className="text-sm text-[#312E81]">{notif.text}</p>
                      <p className="text-[10px] text-[#6D28D9]">{notif.time}</p>
                    </div>
                  ))}
                  <button className="text-xs text-[#7C3AED] hover:underline mt-1">
                    View all updates
                  </button>
                </div>
              </div>
            </section>

            <section className="animate-fade-slide opacity-0 translate-y-4">
              <div className="bg-white rounded-xl p-5 border border-[#DDD6FE] shadow-sm h-full">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-[#6D28D9] mr-2" />
                  <h2 className="font-bold text-[#312E81] text-base">Your Safety</h2>
                </div>
                <p className="text-sm text-[#6D28D9] mt-2">
                  All conversations are private and encrypted. 
                  <br /><span className="font-medium">Your data is never shared with your college.</span>
                </p>
              </div>
            </section>
          </div>

          {/* 🌼 Minimal footer */}
          <div className="mt-6 pt-4 border-t border-[#DDD6FE] text-center">
            <p className="text-xs text-[#6D28D9]">
              💙 You are safe here. Take all the time you need.
            </p>
          </div>

          {/* 🌸 Quiet Moments Modal */}
          {selectedSupport && (
            <div 
              className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-50 p-4"
              onClick={closeSupportModal}
            >
              <div 
                className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-[#DDD6FE] flex justify-between items-center">
                  <h3 className="font-bold text-[#312E81] text-lg">
                    {selectedSupport === 'breathing' && '5-Minute Stress Relief'}
                    {selectedSupport === 'exam' && 'Exam Anxiety Toolkit'}
                    {selectedSupport === 'lonely' && 'Feeling Lonely?'}
                    {selectedSupport === 'grounding' && 'Grounding Techniques'}
                  </h3>
                  <button 
                    onClick={closeSupportModal}
                    className="p-1 hover:bg-[#F5F3FF] rounded"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-[#6D28D9]" />
                  </button>
                </div>

                <div className="p-4 md:p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                  {/* 🌬️ Breathing */}
                  {selectedSupport === 'breathing' && (
                    <div className="space-y-4">
                      <p className="text-[#312E81]">
                        Let’s breathe together. Place one hand on your chest, one on your belly.
                      </p>
                      
                      {[
                        { step: 1, text: 'Breathe in slowly through your nose for 4 seconds', time: '4s' },
                        { step: 2, text: 'Hold gently for 4 seconds', time: '4s' },
                        { step: 3, text: 'Breathe out through your mouth for 6 seconds', time: '6s' }
                      ].map((step, i) => (
                        <div key={i} className="flex items-start p-3 bg-[#F5F3FF] rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-xs mr-3 flex-shrink-0">
                            {step.step}
                          </div>
                          <div>
                            <p className="text-[#312E81]">{step.text}</p>
                            <p className="text-xs text-[#6D28D9] mt-1">{step.time}</p>
                          </div>
                        </div>
                      ))}

                      <div className="pt-2">
                        <p className="text-[#6D28D9] italic">
                          "This too shall pass. You are safe right here, right now."
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 📚 Exam Anxiety */}
                  {selectedSupport === 'exam' && (
                    <div className="space-y-4">
                      <p className="text-[#312E81]">
                        Feeling overwhelmed by exams? Let’s ground ourselves first.
                      </p>
                      
                      {[
                        'Name 3 things you can see around you',
                        'Name 2 things you can hear right now',
                        'Name 1 thing you can touch',
                        'Take one slow breath — you’ve got this'
                      ].map((tip, i) => (
                        <div key={i} className="p-3 bg-[#F5F3FF] rounded-lg">
                          <p className="text-[#312E81]">
                            <span className="font-medium">{i + 1}.</span> {tip}
                          </p>
                        </div>
                      ))}

                      <div className="pt-2">
                        <p className="text-[#6D28D9]">
                          When you’re ready, try the <span className="font-medium">“Talk Now”</span> button — no pressure, just support.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 👥 Loneliness */}
                  {selectedSupport === 'lonely' && (
                    <div className="space-y-4">
                      <p className="text-[#312E81]">
                        Hostel life can feel isolating. You’re not alone in feeling this way.
                      </p>
                      
                      {[
                        'Text one friend “Thinking of you” (no reply needed)',
                        'Step outside for 2 minutes — feel the sun or breeze',
                        'Write one kind thing you’d say to a friend feeling this way',
                        'You matter — exactly as you are, right now'
                      ].map((tip, i) => (
                        <div key={i} className="p-3 bg-[#F5F3FF] rounded-lg">
                          <p className="text-[#312E81]">
                            <span className="font-medium">{i + 1}.</span> {tip}
                          </p>
                        </div>
                      ))}

                      <div className="pt-2">
                        <p className="text-[#6D28D9] italic">
                          Connection starts with small steps. You don’t have to do it all at once.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 🌍 Grounding */}
                  {selectedSupport === 'grounding' && (
                    <div className="space-y-4">
                      <p className="text-[#312E81]">
                        When things feel overwhelming, let’s anchor in the present.
                      </p>
                      
                      <div className="p-4 bg-[#FFF7FA] rounded-lg border border-[#DC2626]/20">
                        <p className="font-medium text-[#312E81] mb-2">5-4-3-2-1 Technique:</p>
                        <ul className="space-y-1 text-sm">
                          <li><span className="font-medium">5</span> things you can see</li>
                          <li><span className="font-medium">4</span> things you can touch</li>
                          <li><span className="font-medium">3</span> things you can hear</li>
                          <li><span className="font-medium">2</span> things you can smell</li>
                          <li><span className="font-medium">1</span> thing you can taste</li>
                        </ul>
                      </div>

                      <p className="text-[#6D28D9]">
                        There’s no “right way” to do this. Just be here, with yourself, for a moment.
                      </p>
                    </div>
                  )}

                  {/* 🌸 Closing Actions */}
                  <div className="pt-4 border-t border-[#DDD6FE]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <button
                        onClick={closeSupportModal}
                        className="w-full py-2 px-3 bg-[#F5F3FF] text-[#312E81] rounded-lg text-sm"
                      >
                        Close for now
                      </button>
                      <button
                        onClick={() => {
                          closeSupportModal();
                          window.location.href = '/quick-connect';
                        }}
                        className="w-full py-2 px-3 bg-[#7C3AED] text-white rounded-lg text-sm font-medium"
                      >
                        Talk to a Psychologist
                      </button>
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedSupport(null);
                        const next = ['breathing', 'exam', 'lonely', 'grounding'].find(x => x !== selectedSupport) || 'breathing';
                        setTimeout(() => setSelectedSupport(next), 100);
                      }}
                      className="w-full mt-2 py-2 px-3 text-[#7C3AED] hover:bg-[#F5F3FF] rounded-lg text-sm"
                    >
                      Try another exercise
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}