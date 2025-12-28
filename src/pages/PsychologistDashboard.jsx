import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  MessageCircle, 
  AlertTriangle, 
  Shield, 
  Clock, 
  User, 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  X, 
  Eye, 
  FileText, 
  Settings,
  Phone,
  Mic,
  Star,
  MapPin,
  Flag,
  Award,
  Mail,
  Globe,
  HeartPulse,
  CalendarDays,
  Users,
  BarChart3,
  Menu,
  ChevronLeft
} from 'lucide-react';

export default function PsychologistDashboard() {
  const [activeTab, setActiveTab] = useState('requests');
  const [availability, setAvailability] = useState('available');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showMisuseModal, setShowMisuseModal] = useState(false);
  const [selectedMisuseLevel, setSelectedMisuseLevel] = useState(1);
  const [showSessionReport, setShowSessionReport] = useState(false);
  const [emergencyCount, setEmergencyCount] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock data
  const chatRequests = [
    { id: 'req-001', type: 'emergency', student: 'Anonymous #4829', issue: 'Panic Attack', time: 'Just now', status: 'urgent', location: 'Near Admin Building' },
    { id: 'req-002', type: 'normal', student: 'Rahul S.', issue: 'Academic Pressure', time: '2 min ago', status: 'waiting' },
    { id: 'req-003', type: 'normal', student: 'Priya M.', issue: 'Relationship Issues', time: '5 min ago', status: 'waiting' },
    { id: 'req-004', type: 'priority', student: 'Anonymous #3150', issue: 'Depression', time: '8 min ago', status: 'new' }
  ];

  const doctorProfile = {
    name: 'Dr. Ananya Mehta',
    title: 'Clinical Psychologist',
    license: 'RCI-IN/2023/7845',
    experience: '8 years',
    specialties: ['Anxiety Disorders', 'Student Mental Health', 'Crisis Intervention'],
    languages: ['English', 'Hindi', 'Marathi'],
    education: 'Ph.D. Clinical Psychology,Gautam Buddha University',
    certifications: ['Certified CBT Practitioner', 'ASIST Suicide Prevention'],
    availability: 'Available',
    stats: {
      sessionsToday: 6,
      emergenciesHandled: 2,
      avgResponseTime: '24 sec',
      studentSatisfaction: 4.9
    },
    misuseIncidents: [
      { date: 'Jun 12', student: 'Anonymous #7721', level: 2, action: 'Emergency access disabled (7 days)' }
    ]
  };

  // Simulate emergency arrival
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Math.random() > 0.7) setEmergencyCount(prev => prev + 1);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptRequest = (request) => {
    setSelectedRequest(request);
    setTimeout(() => alert(`✅ Accepted ${request.type} request from ${request.student}`), 300);
  };

  const handleMarkMisuse = () => setShowMisuseModal(true);
  const handleConfirmMisuse = () => {
    alert(`✅ Student marked as Misuse Level ${selectedMisuseLevel}`);
    setShowMisuseModal(false);
  };

  const handleEndSession = () => setShowSessionReport(true);
  const handleSubmitReport = () => {
    alert('✅ Session report submitted');
    setShowSessionReport(false);
    setSelectedRequest(null);
  };

  return (
    <div className="flex h-screen bg-[#F2F7FA]">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Doctor Profile Sidebar */}
      <div 
        className={`fixed lg:static z-50 bg-white border-r border-[#3A6EA5]/10 flex flex-col transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0 w-80' : '-translate-x-full w-80 lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className="p-4 lg:p-5 border-b border-[#3A6EA5]/10 bg-gradient-to-r from-[#3A6EA5] to-[#2A5A8A] text-white">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white flex items-center justify-center mr-2 lg:mr-3">
                <span className="text-[#3A6EA5] font-bold text-sm lg:text-lg">AM</span>
              </div>
              <div>
                <div className="font-bold text-base lg:text-lg">{doctorProfile.name}</div>
                <div className="text-xs lg:text-sm opacity-90">{doctorProfile.title}</div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-white/20 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-white/20 rounded-lg p-2">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                availability === 'available' ? 'bg-green-400 animate-pulse' :
                availability === 'busy' ? 'bg-yellow-400' : 'bg-gray-400'
              }`}></div>
              <span className="text-xs lg:text-sm font-medium capitalize">{availability}</span>
            </div>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="bg-white text-[#1B2A41] text-xs px-2 py-1 rounded border-0 focus:ring-0"
            >
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-4 space-y-3 border-b border-[#3A6EA5]/10">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {[
              { icon: CalendarDays, label: 'Sessions Today', value: doctorProfile.stats.sessionsToday },
              { icon: AlertTriangle, label: 'Emergencies', value: doctorProfile.stats.emergenciesHandled, color: '#D90429' },
              { icon: Clock, label: 'Avg. Response', value: doctorProfile.stats.avgResponseTime },
              { icon: Star, label: 'Satisfaction', value: `${doctorProfile.stats.studentSatisfaction}/5.0` }
            ].map((stat, i) => (
              <div key={i} className="flex items-center p-3 bg-[#F2F7FA] rounded-lg">
                <div className={`p-2 rounded-lg mr-3 ${
                  stat.color ? `bg-[${stat.color}] bg-opacity-10` : 'bg-[#3A6EA5]/10'
                }`}>
                  <stat.icon className={`w-4 h-4 ${
                    stat.color || '#3A6EA5'
                  }`} />
                </div>
                <div>
                  <div className="text-xs lg:text-sm text-[#1B2A41] opacity-70">{stat.label}</div>
                  <div className="font-bold text-[#1B2A41] text-sm lg:text-base">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="font-bold text-[#1B2A41] mb-3 flex items-center text-sm lg:text-base">
            <Award className="w-4 h-4 mr-2 text-[#3A6EA5]" />
            Credentials
          </h3>
          
          <div className="space-y-3 text-xs lg:text-sm">
            <div>
              <div className="text-[#1B2A41] opacity-70">License No.</div>
              <div className="font-medium text-[#1B2A41] break-all">{doctorProfile.license}</div>
            </div>
            <div>
              <div className="text-[#1B2A41] opacity-70">Experience</div>
              <div className="font-medium text-[#1B2A41]">{doctorProfile.experience}</div>
            </div>
            <div>
              <div className="text-[#1B2A41] opacity-70">Education</div>
              <div className="font-medium text-[#1B2A41]">{doctorProfile.education}</div>
            </div>
            <div>
              <div className="text-[#1B2A41] opacity-70">Specialties</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {doctorProfile.specialties.map((spec, i) => (
                  <span key={i} className="px-2 py-1 bg-[#EDF5F0] text-[#3A6EA5] text-xs rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[#1B2A41] opacity-70">Languages</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {doctorProfile.languages.map((lang, i) => (
                  <span key={i} className="px-2 py-1 bg-[#E8F5ED] text-[#74C69D] text-xs rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[#1B2A41] opacity-70">Certifications</div>
              <div className="space-y-1 mt-1">
                {doctorProfile.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center text-xs">
                    <CheckCircle className="w-3 h-3 text-[#74C69D] mr-1" />
                    <span className="text-[#1B2A41]">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Misuse History */}
          <div className="mt-4 lg:mt-6">
            <h3 className="font-bold text-[#1B2A41] mb-3 flex items-center text-sm lg:text-base">
              <Shield className="w-4 h-4 mr-2 text-amber-500" />
              Misuse Incidents
            </h3>
            {doctorProfile.misuseIncidents.length > 0 ? (
              <div className="space-y-2">
                {doctorProfile.misuseIncidents.map((incident, i) => (
                  <div key={i} className="p-2 bg-amber-50 rounded-lg text-xs">
                    <div className="font-medium text-amber-800">{incident.date}</div>
                    <div className="text-amber-700">• {incident.student}</div>
                    <div className="text-amber-700">• Level {incident.level}: {incident.action}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs lg:text-sm text-[#1B2A41] opacity-70">No misuse incidents reported.</p>
            )}
          </div>

          {/* Emergency Protocol Button */}
          <div className="mt-4 lg:mt-6 p-3 bg-[#FFF5F5] rounded-lg border border-[#D90429]/30">
            <div className="flex items-start">
              <AlertTriangle className="w-4 h-4 text-[#D90429] mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <div className="font-bold text-[#1B2A41] text-xs lg:text-sm">Emergency Protocol</div>
                <button className="text-xs text-[#D90429] font-medium underline mt-1">
                  View Guidelines
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-[#3A6EA5]/10 p-3 lg:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 mr-2 text-[#3A6EA5] hover:bg-[#F2F7FA] rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <nav className="hidden lg:flex space-x-1">
                {[
                  { id: 'requests', label: 'Requests', icon: MessageCircle },
                  { id: 'emergencies', label: 'Emergencies', icon: AlertTriangle, count: emergencyCount },
                  { id: 'sessions', label: 'Sessions', icon: Calendar },
                  { id: 'reports', label: 'Reports', icon: FileText },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center px-3 py-2 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm font-medium ${
                      activeTab === item.id
                        ? 'bg-[#3A6EA5] text-white'
                        : 'text-[#1B2A41] hover:bg-[#F2F7FA]'
                    }`}
                  >
                    <item.icon className={`w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 ${activeTab === item.id ? 'text-white' : 'text-[#3A6EA5]'}`} />
                    <span className="hidden xs:inline">{item.label}</span>
                    {item.count && item.count > 0 && (
                      <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] lg:text-xs font-bold ${
                        item.id === 'emergencies' ? 'bg-[#D90429] text-white' : 'bg-[#74C69D] text-white'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <button className="p-2 text-[#3A6EA5] hover:bg-[#F2F7FA] rounded-lg">
                <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-[#3A6EA5] flex items-center justify-center">
                <span className="text-white font-bold text-sm">AM</span>
              </div>
            </div>
          </div>
          
          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mt-3 overflow-x-auto pb-2">
            <div className="flex space-x-2 min-w-max">
              {[
                { id: 'requests', label: 'Requests', icon: MessageCircle },
                { id: 'emergencies', label: 'Emergencies', icon: AlertTriangle, count: emergencyCount },
                { id: 'sessions', label: 'Sessions', icon: Calendar },
                { id: 'reports', label: 'Reports', icon: FileText },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center justify-center min-w-[60px] px-2 py-2 rounded-lg text-xs ${
                    activeTab === item.id
                      ? 'bg-[#3A6EA5] text-white'
                      : 'text-[#1B2A41] bg-[#F2F7FA]'
                  }`}
                >
                  <item.icon className={`w-4 h-4 mb-1 ${activeTab === item.id ? 'text-white' : 'text-[#3A6EA5]'}`} />
                  <span>{item.label}</span>
                  {item.count && item.count > 0 && (
                    <span className={`absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full text-[10px] font-bold ${
                      item.id === 'emergencies' ? 'bg-[#D90429] text-white' : 'bg-[#74C69D] text-white'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-3 lg:p-6">
          {activeTab === 'requests' && (
            <div>
              <div className="flex justify-between items-center mb-4 lg:mb-6">
                <h2 className="text-base lg:text-lg font-semibold text-[#1B2A41]">New Chat Requests</h2>
                <div className="text-xs lg:text-sm text-[#1B2A41] opacity-70">
                  {chatRequests.filter(r => r.type !== 'emergency').length} waiting
                </div>
              </div>

              <div className="space-y-3 lg:space-y-4">
                {chatRequests.map((request) => (
                  <div 
                    key={request.id}
                    className={`bg-white rounded-xl p-3 lg:p-4 border-l-4 ${
                      request.type === 'emergency' 
                        ? 'border-[#D90429] shadow-md' 
                        : request.type === 'priority'
                        ? 'border-[#FFA500]' 
                        : 'border-[#3A6EA5]'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center mb-2 gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] lg:text-xs font-medium ${
                            request.type === 'emergency'
                              ? 'bg-[#D90429] text-white'
                              : request.type === 'priority'
                              ? 'bg-[#FFA500] text-gray-800'
                              : 'bg-[#3A6EA5] text-white'
                          }`}>
                            {request.type === 'emergency' ? '🚨 EMERGENCY' : 
                             request.type === 'priority' ? '⚠️ Priority' : '💬 Chat'}
                          </span>
                          <span className="text-xs lg:text-sm text-[#1B2A41] opacity-80">{request.time}</span>
                        </div>
                        
                        <h3 className="font-medium text-[#1B2A41] text-sm lg:text-base">{request.student}</h3>
                        <p className="text-[#1B2A41] opacity-80 text-xs lg:text-sm">Issue: {request.issue}</p>
                        
                        {request.location && (
                          <div className="flex items-center mt-2 text-xs text-[#1B2A41] opacity-70">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span className="break-all">{request.location}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 mt-3 lg:mt-0 ml-0 lg:ml-4">
                        <button
                          onClick={() => handleAcceptRequest(request)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] lg:text-xs font-medium ${
                            request.type === 'emergency'
                              ? 'bg-[#D90429] hover:bg-[#b3001d] text-white'
                              : 'bg-[#3A6EA5] hover:bg-[#2d5a8a] text-white'
                          }`}
                        >
                          Accept
                        </button>
                        <button
                          onClick={handleMarkMisuse}
                          className="p-1.5 text-[#D90429] hover:bg-[#FFF5F5] rounded-lg"
                          title="Mark as misuse"
                        >
                          <Flag className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'emergencies' && (
            <div>
              <div className="mb-4 p-3 lg:p-4 bg-[#FFF5F5] border-l-4 border-[#D90429] rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-[#D90429] mt-0.5 mr-2 lg:mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#1B2A41] text-sm lg:text-base">Emergency Protocol Active</h3>
                    <p className="text-xs lg:text-sm text-[#1B2A41] opacity-90 mt-1">
                      Target response: <span className="font-medium">≤30 seconds</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
                <div className="bg-white rounded-xl p-4 lg:p-5 border border-[#D90429]/20">
                  <h3 className="font-bold text-[#1B2A41] mb-3 flex items-center text-sm lg:text-base">
                    <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-[#D90429] mr-2" />
                    Active Emergency
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-2 h-2 lg:w-3 lg:h-3 bg-[#D90429] rounded-full mr-2 animate-pulse"></span>
                      <span className="text-xs lg:text-sm font-medium text-[#1B2A41]">Anonymous #4829</span>
                    </div>
                    <p className="text-xs lg:text-sm text-[#1B2A41] opacity-80">
                      <span className="font-medium">Issue:</span> Panic Attack<br />
                      <span className="font-medium">Location:</span> Near Admin Building<br />
                      <span className="font-medium">Duration:</span> 2 min 18 sec
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-2 py-1.5 lg:px-3 lg:py-1.5 bg-[#D90429] hover:bg-[#b3001d] text-white text-[10px] lg:text-xs rounded-lg flex items-center">
                        <Phone className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                        <span className="hidden xs:inline">Call Now</span>
                        <span className="xs:hidden">Call</span>
                      </button>
                      <button 
                        onClick={() => handleAcceptRequest(chatRequests[0])}
                        className="px-2 py-1.5 lg:px-3 lg:py-1.5 bg-[#3A6EA5] hover:bg-[#2d5a8a] text-white text-[10px] lg:text-xs rounded-lg"
                      >
                        Join Chat
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <h3 className="font-bold text-[#1B2A41] mb-3 text-sm lg:text-base">Quick Crisis Responses</h3>
                  <div className="space-y-2">
                    {[
                      'Stay with me. You are safe.',
                      'I\'m here. Breathe with me: in 4, hold 4, out 6.',
                      'You are not alone in this. I\'m listening.',
                      'It\'s okay to feel this way. Let\'s take it one step at a time.'
                    ].map((response, i) => (
                      <button
                        key={i}
                        className="w-full text-left p-2 bg-[#F2F7FA] hover:bg-[#EDF5F0] rounded-lg text-xs lg:text-sm text-[#1B2A41]"
                      >
                        {response}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div>
              <h2 className="text-base lg:text-lg font-semibold text-[#1B2A41] mb-4 lg:mb-6">Past Sessions</h2>
              
              <div className="space-y-3 lg:space-y-4">
                {[
                  { student: 'Anonymous #4829', date: 'Today, 10:02 AM', duration: '12 min', moodBefore: '😟', moodAfter: '🙂', summary: 'Panic attack during exams. Used grounding techniques.', misuse: false },
                  { student: 'Rahul S.', date: 'Yesterday, 3:15 PM', duration: '18 min', moodBefore: '😞', moodAfter: '😐', summary: 'Overwhelmed with assignments. Created study plan.', misuse: false },
                  { student: 'Anonymous #7721', date: 'Jun 12, 2:30 PM', duration: '8 min', moodBefore: '😡', moodAfter: '😠', summary: 'Hostel conflict. Escalated to misuse level 2.', misuse: true }
                ].map((session, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 lg:p-4 border border-[#3A6EA5]/10">
                    <div className="flex flex-col lg:flex-row lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-1 flex-wrap gap-2">
                          <span className="font-medium text-[#1B2A41] text-sm lg:text-base">{session.student}</span>
                          {session.misuse && (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] lg:text-xs rounded-full">
                              Misuse Level 2
                            </span>
                          )}
                        </div>
                        <div className="text-xs lg:text-sm text-[#1B2A41] opacity-80 mb-2">
                          {session.date} • {session.duration}
                        </div>
                        <div className="flex items-center space-x-2 lg:space-x-4 mb-2">
                          <div className="flex items-center">
                            <span className="text-base lg:text-lg mr-1">{session.moodBefore}</span>
                            <span className="text-xs lg:text-sm text-[#1B2A41] opacity-70">Before</span>
                          </div>
                          <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-[#74C69D]" />
                          <div className="flex items-center">
                            <span className="text-base lg:text-lg ml-1">{session.moodAfter}</span>
                            <span className="text-xs lg:text-sm text-[#1B2A41] opacity-70">After</span>
                          </div>
                        </div>
                        <p className="text-xs lg:text-sm text-[#1B2A41] opacity-90">{session.summary}</p>
                      </div>
                      <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 mt-3 lg:mt-0">
                        <button className="p-1.5 lg:p-2 text-[#3A6EA5] hover:bg-[#F2F7FA] rounded-lg">
                          <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                        <button 
                          onClick={handleMarkMisuse}
                          className="p-1.5 lg:p-2 text-[#D90429] hover:bg-[#FFF5F5] rounded-lg"
                        >
                          <Flag className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <h2 className="text-base lg:text-lg font-semibold text-[#1B2A41] mb-4 lg:mb-6">Session Reports</h2>
              
              <div className="bg-white rounded-xl p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 lg:mb-6">
                  <div>
                    <h3 className="text-base lg:text-lg font-bold text-[#1B2A41]">Weekly Report Summary</h3>
                    <p className="text-xs lg:text-sm text-[#1B2A41] opacity-80">Jun 10 - Jun 16, 2025</p>
                  </div>
                  <button className="mt-2 lg:mt-0 px-3 py-1.5 lg:px-4 lg:py-2 bg-[#3A6EA5] hover:bg-[#2d5a8a] text-white rounded-lg text-xs lg:text-sm">
                    Export PDF
                  </button>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4 lg:mb-6">
                  {[
                    { label: 'Sessions', value: '24', change: '+12%', icon: Calendar },
                    { label: 'Emergencies', value: '3', change: '0%', icon: AlertTriangle },
                    { label: 'Avg Duration', value: '14 min', change: '+2 min', icon: Clock },
                    { label: 'Misuse', value: '2', change: '-1', icon: Shield }
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#EDF5F0] rounded-lg p-3 lg:p-4">
                      <div className="flex items-center mb-1 lg:mb-2">
                        <stat.icon className="w-3 h-3 lg:w-5 lg:h-5 text-[#3A6EA5] mr-1 lg:mr-2" />
                        <span className="text-xs lg:text-sm text-[#1B2A41] opacity-80">{stat.label}</span>
                      </div>
                      <div className="text-lg lg:text-2xl font-bold text-[#1B2A41]">{stat.value}</div>
                      <div className={`text-[10px] lg:text-xs ${
                        stat.change.includes('+') ? 'text-[#74C69D]' : 
                        stat.change.includes('-') ? 'text-[#D90429]' : 'text-[#3A6EA5]'
                      }`}>
                        {stat.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-base lg:text-lg font-semibold text-[#1B2A41] mb-4 lg:mb-6">Performance Analytics</h2>
              
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
                <div className="bg-white rounded-xl p-4 lg:p-6">
                  <h3 className="font-bold text-[#1B2A41] mb-3 lg:mb-4 text-sm lg:text-base">Session Trends</h3>
                  <div className="h-32 lg:h-48 bg-[#F2F7FA] rounded-lg flex items-end justify-center space-x-1 lg:space-x-2 p-2">
                    {[12, 18, 8, 24, 15, 20].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-[#3A6EA5] rounded-t" 
                          style={{ height: `${Math.max(10, val * 1.2)}px` }}
                        ></div>
                        <span className="text-[10px] lg:text-xs text-[#1B2A41] mt-1">Jun {10 + i}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 lg:p-6">
                  <h3 className="font-bold text-[#1B2A41] mb-3 lg:mb-4 text-sm lg:text-base">Issue Distribution</h3>
                  <div className="space-y-2 lg:space-y-3">
                    {[
                      { label: 'Academic Pressure', value: 42, color: '#3A6EA5' },
                      { label: 'Anxiety', value: 28, color: '#74C69D' },
                      { label: 'Relationships', value: 18, color: '#FFA500' },
                      { label: 'Depression', value: 12, color: '#D90429' }
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[10px] lg:text-sm mb-1">
                          <span className="text-[#1B2A41]">{item.label}</span>
                          <span className="font-medium text-[#1B2A41]">{item.value}%</span>
                        </div>
                        <div className="w-full bg-[#F2F7FA] rounded-full h-1.5 lg:h-2">
                          <div 
                            className="h-1.5 lg:h-2 rounded-full" 
                            style={{ width: `${item.value}%`, backgroundColor: item.color }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Misuse Modal */}
      {showMisuseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 lg:p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
            <div className="bg-amber-500 p-3 lg:p-4">
              <h2 className="text-white font-bold text-base lg:text-lg flex items-center">
                <Shield className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Mark Student as Misuse
              </h2>
            </div>
            
            <div className="p-4 lg:p-6">
              <p className="text-[#1B2A41] opacity-90 mb-4 lg:mb-6 text-sm">
                Select the misuse level based on student behavior.
              </p>
              
              <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                {[
                  { level: 1, title: 'Level 1: Warning', desc: 'First-time misuse. Student receives warning.' },
                  { level: 2, title: 'Level 2: Limit Account', desc: 'Repeated misuse. Emergency access disabled for 7 days.' },
                  { level: 3, title: 'Level 3: Temporary Ban', desc: 'Severe misuse. Account restricted for 30 days.' }
                ].map((item) => (
                  <label key={item.level} className="flex items-start p-2 lg:p-3 border border-[#3A6EA5]/20 rounded-lg hover:bg-[#F2F7FA] cursor-pointer">
                    <input
                      type="radio"
                      name="misuseLevel"
                      checked={selectedMisuseLevel === item.level}
                      onChange={() => setSelectedMisuseLevel(item.level)}
                      className="mt-1 mr-2 lg:mr-3 h-4 w-4 text-[#3A6EA5]"
                    />
                    <div>
                      <div className="font-medium text-[#1B2A41] text-sm lg:text-base">{item.title}</div>
                      <div className="text-xs lg:text-sm text-[#1B2A41] opacity-70">{item.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="flex flex-col-reverse lg:flex-row justify-end space-y-2 lg:space-y-0 lg:space-x-3">
                <button
                  onClick={() => setShowMisuseModal(false)}
                  className="px-3 py-1.5 lg:px-4 lg:py-2 text-[#1B2A41] hover:bg-[#F2F7FA] rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmMisuse}
                  className="px-3 py-1.5 lg:px-4 lg:py-2 bg-[#D90429] hover:bg-[#b3001d] text-white rounded-lg font-medium text-sm"
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Report Modal */}
      {showSessionReport && selectedRequest && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="bg-[#3A6EA5] text-white p-3 lg:p-4 flex items-center">
            <button 
              onClick={() => setShowSessionReport(false)}
              className="p-1 mr-2 hover:bg-blue-700 rounded"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-base lg:text-lg font-bold">Session Report</h2>
            <button 
              onClick={() => setShowSessionReport(false)}
              className="ml-auto p-1 hover:bg-blue-700 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 lg:p-6">
            <div className="space-y-4 lg:space-y-6">
              <div>
                <h3 className="font-medium text-[#1B2A41] mb-2 text-sm lg:text-base">Student Information</h3>
                <div className="bg-[#F2F7FA] rounded-lg p-3 lg:p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                    <div>
                      <span className="text-xs lg:text-sm text-[#1B2A41] opacity-70">Student</span>
                      <div className="font-medium text-[#1B2A41] text-sm lg:text-base">{selectedRequest.student}</div>
                    </div>
                    <div>
                      <span className="text-xs lg:text-sm text-[#1B2A41] opacity-70">Issue</span>
                      <div className="font-medium text-[#1B2A41] text-sm lg:text-base">{selectedRequest.issue}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block font-medium text-[#1B2A41] mb-2 text-sm lg:text-base">
                  Session Summary (Required)
                </label>
                <textarea 
                  placeholder="Brief summary of key points discussed..."
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#3A6EA5]/20 rounded-xl focus:ring-2 focus:ring-[#3A6EA5]/30 focus:border-[#3A6EA5] outline-none transition text-sm"
                />
              </div>
              
              <div>
                <label className="block font-medium text-[#1B2A41] mb-2 text-sm lg:text-base">
                  Student Emotional Status
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
                  {[
                    { value: 'stable', label: 'Stable', color: '#74C69D' },
                    { value: 'improving', label: 'Improving', color: '#3A6EA5' },
                    { value: 'concerning', label: 'Concerning', color: '#FFA500' },
                    { value: 'critical', label: 'Critical', color: '#D90429' }
                  ].map((status) => (
                    <button
                      key={status.value}
                      className={`py-1.5 px-2 lg:py-2 lg:px-3 rounded-lg text-white text-[10px] lg:text-sm font-medium`}
                      style={{ backgroundColor: status.color }}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block font-medium text-[#1B2A41] mb-2 text-sm lg:text-base">
                  Recommendations
                </label>
                <div className="space-y-2">
                  {[
                    'Schedule follow-up in 3 days',
                    'Refer to campus counseling cell',
                    'Suggest mindfulness resources',
                    'Monitor for escalation signs'
                  ].map((rec, i) => (
                    <label key={i} className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-2 h-4 w-4 text-[#3A6EA5]" />
                      <span className="text-[#1B2A41] text-sm">{rec}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-2 h-4 w-4 text-[#D90429]" 
                  />
                  <span className="text-[#1B2A41] font-medium text-sm">Misuse observed during session</span>
                </label>
                <p className="text-xs lg:text-sm text-[#1B2A41] opacity-70 mt-1">
                  If checked, you'll be prompted to submit misuse details.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-3 lg:p-4 border-t border-[#3A6EA5]/10 bg-white flex justify-end">
            <button
              onClick={handleSubmitReport}
              className="px-4 py-2 lg:px-6 lg:py-2 bg-[#3A6EA5] hover:bg-[#2d5a8a] text-white rounded-lg font-medium text-sm"
            >
              Submit Report
            </button>
          </div>
        </div>
      )}

      {/* Active Session Indicator */}
      {selectedRequest && (
        <div className="fixed bottom-3 right-3 lg:bottom-4 lg:right-4 bg-[#3A6EA5] text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl shadow-lg flex items-center z-40">
          <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white rounded-full mr-1.5 lg:mr-2 animate-pulse"></div>
          <span className="font-medium text-xs lg:text-sm">Active: {selectedRequest.student}</span>
          <button 
            onClick={handleEndSession}
            className="ml-2 p-0.5 lg:p-1 hover:bg-blue-700 rounded"
          >
            <X className="w-3 h-3 lg:w-4 lg:h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
