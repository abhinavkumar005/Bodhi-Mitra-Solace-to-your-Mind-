// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Users, AlertTriangle, Shield, User, MessageCircle, Clock,
  BarChart3, FileText, Settings, X, CheckCircle, Search, Filter,
  Calendar, TrendingUp, TrendingDown, Star, Phone, Mail, GraduationCap,
  Flag, Eye, Ban, Trash2, Edit3, Plus, Download, ChevronDown
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminRole, setAdminRole] = useState('super');
  const [showUserDetails, setShowUserDetails] = useState(null);
  const [showPsychologistForm, setShowPsychologistForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const observerRef = useRef(null);

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Mock data (unchanged)
  const psychologists = [
    { id: 'psy-001', name: 'Dr. Ananya Mehta', specialty: 'Student Mental Health', status: 'online', sessions: 84, emergencies: 12, rating: 4.9, misuseReports: 0 },
    { id: 'psy-002', name: 'Dr. Rajiv Sharma', specialty: 'Crisis Intervention', status: 'in-session', sessions: 127, emergencies: 24, rating: 4.8, misuseReports: 1 },
    { id: 'psy-003', name: 'Dr. Priya Desai', specialty: 'Academic Stress', status: 'on-break', sessions: 63, emergencies: 8, rating: 4.7, misuseReports: 0 },
    { id: 'psy-004', name: 'Dr. Arjun Patel', specialty: 'Severe Depression', status: 'offline', sessions: 156, emergencies: 31, rating: 4.9, misuseReports: 2 }
  ];

  const misuseReports = [
    { id: 'mis-001', student: 'Anonymous #4829', psychologist: 'Dr. Mehta', time: 'Today, 10:02 AM', type: 'Fake Emergency', count: 3, status: 'Blocked' },
    { id: 'mis-002', student: 'Rahul S.', psychologist: 'Dr. Sharma', time: 'Yesterday, 3:15 PM', type: 'Abusive Language', count: 1, status: 'Warning' },
    { id: 'mis-003', student: 'Anonymous #7721', psychologist: 'Dr. Desai', time: 'Jun 12, 2:30 PM', type: 'Prank Call', count: 2, status: 'Restricted' }
  ];

  const students = [
    { id: 'stu-001', name: 'Priya M.', ageGroup: '20-24', college: 'School of Law', sessions: 3, emergencies: 0, misuse: 0 },
    { id: 'stu-002', name: 'Rahul S.', ageGroup: '15-19', college: 'School of Engineering', sessions: 5, emergencies: 1, misuse: 1 },
    { id: 'stu-003', name: 'Anonymous #4829', ageGroup: '20-24', college: 'Hostel B', sessions: 1, emergencies: 1, misuse: 3 }
  ];

  const analyticsData = {
    dailySessions: [24, 31, 18, 42, 29, 35, 22],
    emergencyCalls: [3, 2, 1, 5, 2, 4, 1],
    avgResponseTime: [24, 28, 32, 18, 26, 22, 30],
    issueDistribution: [
      { label: 'Academic Stress', value: 42 },
      { label: 'Anxiety', value: 28 },
      { label: 'Relationships', value: 18 },
      { label: 'Depression', value: 12 }
    ]
  };

  const adminRoles = [
    { id: 'super', name: 'Super Admin', permissions: 'Full system access' },
    { id: 'operations', name: 'Operations Admin', permissions: 'Manage psychologists & users' },
    { id: 'content', name: 'Content Admin', permissions: 'Blog & resource management' },
    { id: 'crisis', name: 'Crisis Admin', permissions: 'Emergency monitoring only' }
  ];

  const handleAction = (action, id) => {
    alert(`✅ ${action} performed for ID: ${id}`);
  };

  // Responsive sidebar toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#EDE9FE]">
      {/* Responsive Sidebar */}
      <div
        className={`fixed md:sticky md:top-0 left-0 md:left-auto z-40 h-full bg-white border-r border-[#DDD6FE] transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64 translate-x-0' : 'w-20 md:w-64 -translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 md:p-5 border-b border-[#DDD6FE]">
          <div className="flex items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#7C3AED] flex items-center justify-center mr-2 md:mr-3">
              <span className="text-white font-bold text-xs md:text-sm">A</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <div className="font-bold text-[#312E81] text-sm md:text-base">
                  Bodhi<span className="text-[#7C3AED]">-Mitra</span> Admin
                </div>
                <div className="text-xs text-[#6D28D9] capitalize">{adminRole} Role</div>
              </div>
            )}
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-2 md:p-4">
          <ul className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'psychologists', label: 'Psychologist Mgmt', icon: Users },
              { id: 'misuse', label: 'Misuse Monitoring', icon: AlertTriangle, count: 2 },
              { id: 'abuse', label: 'Abuse Reports', icon: Shield, count: 1 },
              { id: 'students', label: 'Student Mgmt', icon: User },
              { id: 'sessions', label: 'Session Logs', icon: Clock },
              { id: 'emergency', label: 'Emergency Logs', icon: Phone },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'content', label: 'Content Mgmt', icon: FileText },
              { id: 'settings', label: 'System Settings', icon: Settings },
              { id: 'security', label: 'Security & Roles', icon: Shield }
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 md:px-4 md:py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#7C3AED] text-white'
                      : 'text-[#4C1D95] hover:bg-[#F5F3FF]'
                  }`}
                >
                  <item.icon className={`w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 ${
                    activeTab === item.id ? 'text-white' : 'text-[#7C3AED]'
                  }`} />
                  {sidebarOpen && (
                    <>
                      <span className="truncate">{item.label}</span>
                      {item.count && item.count > 0 && (
                        <span className={`ml-auto px-1.5 py-0.5 md:px-2 md:py-0.5 text-xs rounded-full ${
                          activeTab === item.id
                            ? 'bg-white text-[#DC2626]'
                            : 'bg-[#DC2626] text-white'
                        }`}>
                          {item.count}
                        </span>
                      )}
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Role Switcher (visible on desktop only) */}
        <div className="p-3 md:p-4 border-t border-[#DDD6FE] hidden md:block">
          <select
            value={adminRole}
            onChange={(e) => setAdminRole(e.target.value)}
            className="w-full text-xs md:text-sm bg-[#F5F3FF] text-[#312E81] px-2 py-1 md:px-3 md:py-2 rounded border-0 focus:ring-0"
          >
            {adminRoles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
          <p className="text-[10px] md:text-xs text-[#312E81] opacity-70 mt-1 hidden md:block">
            {adminRoles.find(r => r.id === adminRole)?.permissions}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-20 lg:ml-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#DDD6FE] p-3 md:p-4 flex items-center justify-between">
          {/* Mobile Sidebar Toggle */}
          <button
            className="md:hidden p-1 mr-2 text-[#312E81] hover:bg-[#F5F3FF] rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="text-base md:text-xl font-bold text-[#312E81] capitalize truncate">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-[#7C3AED] absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 md:pl-10 pr-3 md:pr-4 py-1.5 md:py-2 text-xs md:text-sm border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
              />
            </div>
            {/* Role switcher for mobile */}
            <select
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value)}
              className="md:hidden text-xs bg-[#F5F3FF] text-[#312E81] px-2 py-1 rounded border-0 focus:ring-0"
            >
              {adminRoles.map(role => (
                <option key={role.id} value={role.id}>{role.name.substring(0, 3)}.</option>
              ))}
            </select>
            <div className="flex items-center space-x-1 md:space-x-2">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#7C3AED] flex items-center justify-center">
                <span className="text-white font-bold text-[10px] md:text-sm">A</span>
              </div>
              <span className="hidden md:inline text-sm text-[#312E81]">Admin</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-3 md:p-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="animate-on-scroll">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-6">
                {[
                  { label: 'Active Psychologists', value: '12', change: '+2', icon: Users },
                  { label: 'Today\'s Sessions', value: '47', change: '+12', icon: MessageCircle },
                  { label: 'Emergency Cases', value: '3', change: '0', icon: AlertTriangle, color: '#DC2626' },
                  { label: 'Avg. Response Time', value: '26 sec', change: '-4 sec', icon: Clock }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg md:rounded-xl p-3 md:p-5 border border-[#DDD6FE] hover:shadow-md transition-shadow"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex items-center mb-2 md:mb-3">
                      <stat.icon className={`w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 ${
                        stat.color ? stat.color : '#7C3AED'
                      }`} />
                      <span className="text-[10px] md:text-sm text-[#312E81] opacity-70 truncate">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline">
                      <div className="text-lg md:text-2xl font-bold text-[#312E81] mr-1 md:mr-2">{stat.value}</div>
                      <div className={`text-[10px] md:text-xs ${
                        stat.change.includes('+') ? 'text-[#7C3AED]' :
                        stat.change.includes('-') ? 'text-[#DC2626]' : 'text-[#6D28D9]'
                      }`}>
                        {stat.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 animate-on-scroll">
                  <h3 className="font-bold text-[#312E81] text-sm md:text-base mb-3 md:mb-4">Misuse Alerts</h3>
                  <div className="space-y-2 md:space-y-3">
                    {misuseReports.slice(0, 3).map((report) => (
                      <div key={report.id} className="flex items-start p-2 md:p-3 bg-[#F5F3FF] rounded-lg">
                        <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-[#DC2626] mt-0.5 mr-2 md:mr-3 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-[#DC2626] text-xs md:text-sm truncate">{report.student}</div>
                          <div className="text-[10px] md:text-xs text-[#6D28D9]">{report.type} • {report.count} incidents</div>
                        </div>
                        <span className={`px-1.5 py-0.5 md:px-2 md:py-0.5 text-[10px] md:text-xs font-medium rounded-full whitespace-nowrap ${
                          report.status === 'Blocked' ? 'bg-[#FFF5F5] text-[#DC2626]' :
                          report.status === 'Restricted' ? 'bg-amber-100 text-amber-800' :
                          'bg-[#F5F3FF] text-[#6D28D9]'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 animate-on-scroll">
                  <h3 className="font-bold text-[#312E81] text-sm md:text-base mb-3 md:mb-4">System Status</h3>
                  <div className="space-y-3 md:space-y-4">
                    {[
                      { label: 'Psychologists Online', value: '8/12', status: 'good' },
                      { label: 'Avg. Queue Time', value: '28 sec', status: 'good' },
                      { label: 'Emergency Response', value: '24 sec', status: 'good' },
                      { label: 'System Uptime', value: '99.98%', status: 'good' }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-[#312E81] opacity-80 text-xs md:text-sm">{item.label}</span>
                        <div className="flex items-center text-xs md:text-sm">
                          {item.status === 'good' && (
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#7C3AED] mr-1 md:mr-2" />
                          )}
                          <span className="font-medium text-[#312E81]">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Psychologist Management */}
          {activeTab === 'psychologists' && (
            <div className="animate-on-scroll">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <h2 className="text-base md:text-lg font-semibold text-[#312E81]">Psychologist Management</h2>
                <button
                  onClick={() => setShowPsychologistForm(true)}
                  className="flex items-center justify-center px-3 py-2 md:px-4 md:py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg text-xs md:text-sm"
                >
                  <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  <span className="whitespace-nowrap">Add Psychologist</span>
                </button>
              </div>

              <div className="bg-white rounded-lg md:rounded-xl overflow-hidden border border-[#DDD6FE] animate-on-scroll">
                <div className="hidden md:grid md:grid-cols-6 gap-3 md:gap-4 p-3 md:p-4 bg-[#F5F3FF] font-medium text-[10px] md:text-sm text-[#312E81]">
                  <div>Name</div>
                  <div>Specialty</div>
                  <div>Status</div>
                  <div>Sessions</div>
                  <div>Emergencies</div>
                  <div>Actions</div>
                </div>
                {psychologists.map((psy, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 p-3 md:p-4 border-t border-[#DDD6FE] text-[10px] md:text-sm"
                  >
                    <div className="md:col-span-2 font-medium text-[#312E81]">{psy.name}</div>
                    <div className="md:col-span-2 text-[#312E81] opacity-80 truncate">{psy.specialty}</div>
                    <div className="col-span-1">
                      <span className={`px-1.5 py-0.5 md:px-2 md:py-0.5 text-[8px] md:text-xs font-medium rounded-full whitespace-nowrap ${
                        psy.status === 'online' ? 'bg-[#7C3AED] text-white' :
                        psy.status === 'in-session' ? 'bg-[#6D28D9] text-white' :
                        psy.status === 'on-break' ? 'bg-amber-500 text-white' :
                        'bg-gray-300 text-[#312E81]'
                      }`}>
                        {psy.status}
                      </span>
                    </div>
                    <div className="col-span-1 text-[#312E81]">{psy.sessions}</div>
                    <div className="hidden md:grid md:col-span-1 text-[#312E81]">{psy.emergencies}</div>
                    <div className="col-span-1 md:col-span-1 flex justify-end md:justify-start space-x-1 md:space-x-2">
                      <button className="p-1 text-[#7C3AED] hover:bg-[#F5F3FF] rounded" title="View Details">
                        <Eye className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <button className="p-1 text-[#DC2626] hover:bg-[#FFF5F5] rounded" title="Suspend">
                        <Ban className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Misuse Monitoring */}
          {activeTab === 'misuse' && (
            <div className="animate-on-scroll">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <h2 className="text-base md:text-lg font-semibold text-[#312E81]">Emergency Misuse Monitoring</h2>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 md:px-4 md:py-2 bg-[#F5F3FF] text-[#7C3AED] rounded-lg text-xs md:text-sm flex items-center">
                    <Filter className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    <span className="whitespace-nowrap">Filter</span>
                  </button>
                  <button className="px-3 py-1.5 md:px-4 md:py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg text-xs md:text-sm flex items-center">
                    <Download className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    <span className="whitespace-nowrap">Export</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg md:rounded-xl overflow-hidden border border-[#DC2626]/20 animate-on-scroll">
                <div className="hidden md:grid md:grid-cols-6 gap-3 md:gap-4 p-3 md:p-4 bg-[#FFF5F5] font-medium text-[10px] md:text-sm text-[#312E81]">
                  <div>Student</div>
                  <div>Psychologist</div>
                  <div>Time</div>
                  <div>Type</div>
                  <div>Count</div>
                  <div>Actions</div>
                </div>
                {misuseReports.map((report, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 p-3 md:p-4 border-t border-[#DC2626]/10 text-[10px] md:text-sm"
                  >
                    <div className="md:col-span-2 font-medium text-[#312E81] truncate">{report.student}</div>
                    <div className="md:col-span-2 text-[#312E81] opacity-80">{report.psychologist}</div>
                    <div className="col-span-1 text-[#312E81] opacity-80 sm:hidden">{report.time}</div>
                    <div className="hidden sm:col-span-1 sm:block text-[#312E81] opacity-80">{report.time}</div>
                    <div className="col-span-2 text-[#DC2626] font-medium truncate">{report.type}</div>
                    <div className="hidden md:col-span-1 font-bold ${
                      report.count >= 3 ? 'text-[#DC2626]' :
                      report.count >= 2 ? 'text-amber-600' : 'text-[#7C3AED]'
                    }">
                      {report.count}
                    </div>
                    <div className="col-span-2 md:col-span-1 flex flex-wrap gap-1">
                      <button
                        onClick={() => handleAction('Review', report.id)}
                        className="flex-1 px-1.5 py-0.5 md:px-2 md:py-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[8px] md:text-xs rounded whitespace-nowrap"
                      >
                        Review
                      </button>
                      {report.status === 'Warning' && (
                        <button
                          onClick={() => handleAction('Restrict', report.id)}
                          className="flex-1 px-1.5 py-0.5 md:px-2 md:py-1 bg-amber-500 hover:bg-amber-600 text-white text-[8px] md:text-xs rounded whitespace-nowrap"
                        >
                          Restrict
                        </button>
                      )}
                      {report.status === 'Restricted' && (
                        <button
                          onClick={() => handleAction('Block', report.id)}
                          className="flex-1 px-1.5 py-0.5 md:px-2 md:py-1 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-[8px] md:text-xs rounded whitespace-nowrap"
                        >
                          Block
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    icon: AlertTriangle,
                    color: 'amber-500',
                    bg: 'amber-200',
                    label: 'Warning Threshold',
                    desc: '2 misuse incidents: Emergency access restricted for 7 days'
                  },
                  {
                    icon: X,
                    color: 'red-500',
                    bg: 'red-200',
                    label: 'Block Threshold',
                    desc: '3+ misuse incidents: Account restricted for 30 days'
                  },
                  {
                    icon: Shield,
                    color: 'indigo-500',
                    bg: 'indigo-200',
                    label: 'Genuine Emergency',
                    desc: '0 misuse incidents: Full access with priority routing'
                  }
                ].map((card, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 border border-opacity-30 animate-on-scroll"
                    style={{
                      borderColor: `rgba(${card.color === 'amber-500' ? '245, 158, 11' : card.color === 'red-500' ? '220, 38, 38' : '88, 28, 135'}, 0.2)`,
                      animationDelay: `${(i + 3) * 0.1}s`
                    }}
                  >
                    <h3 className="font-bold text-[#312E81] text-xs md:text-sm mb-2 flex items-center">
                      <card.icon className={`w-3 h-3 md:w-4 md:h-4 text-${card.color} mr-1 md:mr-2`} />
                      {card.label}
                    </h3>
                    <p className="text-[10px] md:text-xs text-[#312E81] opacity-80 mb-1 md:mb-2">
                      {card.desc}
                    </p>
                    <div className={`w-full bg-${card.bg} rounded-full h-1`}>
                      <div
                        className={`h-1 rounded-full ${
                          card.color === 'amber-500' ? 'bg-amber-500' :
                          card.color === 'red-500' ? 'bg-[#DC2626]' : 'bg-[#7C3AED]'
                        }`}
                        style={{ width: i === 0 ? '66%' : i === 1 ? '100%' : '33%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Student Management */}
          {activeTab === 'students' && (
            <div className="animate-on-scroll">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <h2 className="text-base md:text-lg font-semibold text-[#312E81]">Student Management</h2>
                <button className="px-3 py-1.5 md:px-4 md:py-2 bg-[#F5F3FF] text-[#7C3AED] rounded-lg text-xs md:text-sm flex items-center">
                  <Filter className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  <span className="whitespace-nowrap">Filter</span>
                </button>
              </div>

              <div className="bg-white rounded-lg md:rounded-xl overflow-hidden border border-[#DDD6FE] animate-on-scroll">
                <div className="hidden md:grid md:grid-cols-7 gap-3 md:gap-4 p-3 md:p-4 bg-[#F5F3FF] font-medium text-[10px] md:text-sm text-[#312E81]">
                  <div>Student</div>
                  <div>Age Group</div>
                  <div>College</div>
                  <div>Sessions</div>
                  <div>Emergencies</div>
                  <div>Misuse</div>
                  <div>Actions</div>
                </div>
                {students.map((student, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-7 gap-2 md:gap-4 p-3 md:p-4 border-t border-[#DDD6FE] text-[10px] md:text-sm"
                  >
                    <div
                      className="md:col-span-2 font-medium text-[#312E81] cursor-pointer hover:text-[#7C3AED] truncate"
                      onClick={() => setShowUserDetails(student)}
                    >
                      {student.name}
                    </div>
                    <div className="text-[#312E81] opacity-80">{student.ageGroup}</div>
                    <div className="text-[#312E81] opacity-80 hidden md:block">{student.college}</div>
                    <div className="text-[#312E81]">{student.sessions}</div>
                    <div className="text-[#312E81]">{student.emergencies}</div>
                    <div className={`font-bold ${
                      student.misuse >= 3 ? 'text-[#DC2626]' :
                      student.misuse >= 2 ? 'text-amber-600' : 'text-[#7C3AED]'
                    }`}>
                      {student.misuse}
                    </div>
                    <div className="flex justify-end md:justify-start space-x-1">
                      <button className="p-1 text-[#7C3AED] hover:bg-[#F5F3FF] rounded" title="View Details">
                        <Eye className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <button className="p-1 text-[#DC2626] hover:bg-[#FFF5F5] rounded" title="Restrict">
                        <Ban className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics */}
          {activeTab === 'analytics' && (
            <div className="animate-on-scroll">
              <h2 className="text-base md:text-lg font-semibold text-[#312E81] mb-4 md:mb-6">Analytics & Insights</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 animate-on-scroll">
                  <h3 className="font-bold text-[#312E81] text-sm md:text-base mb-3 md:mb-4">Daily Sessions (Last 7 Days)</h3>
                  <div className="h-32 md:h-48 bg-[#F5F3FF] rounded-lg flex items-end justify-center space-x-1 md:space-x-2 p-2">
                    {analyticsData.dailySessions.map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-gradient-to-t from-[#7C3AED] to-[#6D28D9] rounded-t"
                          style={{ height: `${val * 1.2}px` }}
                        ></div>
                        <span className="text-[8px] md:text-xs text-[#312E81] mt-1">Day {i+1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 animate-on-scroll">
                  <h3 className="font-bold text-[#312E81] text-sm md:text-base mb-3 md:mb-4">Issue Distribution</h3>
                  <div className="space-y-2 md:space-y-3">
                    {analyticsData.issueDistribution.map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[10px] md:text-sm mb-1">
                          <span className="text-[#312E81] truncate">{item.label}</span>
                          <span className="font-medium text-[#312E81]">{item.value}%</span>
                        </div>
                        <div className="w-full bg-[#F5F3FF] rounded-full h-1.5 md:h-2">
                          <div
                            className="h-1.5 md:h-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9]"
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Peak Hours', data: ['7-9 PM: 42%', '10-12 PM: 28%', '2-4 PM: 18%'] },
                  { title: 'Psychologist Load', data: psychologists.slice(0, 3).map(p => `${p.name.split(' ')[0]}: ${p.sessions} sessions`) },
                  { title: 'Response Times', data: ['Quick Chat: 24 sec', 'Emergency: 18 sec', 'Priority: 32 sec'] }
                ].map((card, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 animate-on-scroll"
                    style={{ animationDelay: `${(i + 6) * 0.1}s` }}
                  >
                    <h4 className="font-bold text-[#312E81] text-xs md:text-sm mb-2 md:mb-3">{card.title}</h4>
                    <div className="space-y-1 md:space-y-2">
                      {card.data.map((item, j) => (
                        <div key={j} className="flex justify-between text-[10px] md:text-sm">
                          <span className="text-[#312E81] opacity-80">{item.split(':')[0]}</span>
                          <span className="font-medium text-[#312E81]">{item.split(':')[1]?.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security & Roles */}
          {activeTab === 'security' && (
            <div className="animate-on-scroll">
              <h2 className="text-base md:text-lg font-semibold text-[#312E81] mb-4 md:mb-6">Security & Admin Roles</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 animate-on-scroll">
                  <h3 className="font-bold text-[#312E81] text-sm md:text-base mb-3 md:mb-4">Admin Roles</h3>
                  <div className="space-y-3 md:space-y-4">
                    {adminRoles.map((role) => (
                      <div key={role.id} className="p-3 md:p-4 bg-[#F5F3FF] rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-[#312E81] text-xs md:text-sm">{role.name}</h4>
                          <div className="flex space-x-1">
                            <button className="p-0.5 md:p-1 text-[#7C3AED] hover:bg-[#F5F3FF] rounded">
                              <Edit3 className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                            <button className="p-0.5 md:p-1 text-[#DC2626] hover:bg-[#FFF5F5] rounded">
                              <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-[10px] md:text-sm text-[#312E81] opacity-80">{role.permissions}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 animate-on-scroll">
                  <h3 className="font-bold text-[#312E81] text-sm md:text-base mb-3 md:mb-4">Security Settings</h3>
                  <div className="space-y-3 md:space-y-4">
                    {[
                      { label: 'Data Retention', value: '30 days', desc: 'Chat logs auto-delete after' },
                      { label: 'Emergency Cooldown', value: '2 times/day', desc: 'Per student limit' },
                      { label: 'Session Timeout', value: '30 minutes', desc: 'Max session duration' },
                      { label: 'Misuse Threshold', value: '3 incidents', desc: 'For temporary ban' }
                    ].map((setting, i) => (
                      <div key={i} className="p-2 md:p-3 border border-[#DDD6FE] rounded-lg">
                        <div className="flex justify-between">
                          <span className="font-medium text-[#312E81] text-[10px] md:text-sm">{setting.label}</span>
                          <span className="text-[#7C3AED] font-medium text-[10px] md:text-sm">{setting.value}</span>
                        </div>
                        <p className="text-[8px] md:text-xs text-[#312E81] opacity-70 mt-1">{setting.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* User Details Modal */}
      {showUserDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-xl w-full max-w-md md:max-w-lg overflow-hidden animate-scale-in">
            <div className="bg-[#7C3AED] p-4 md:p-5 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-base md:text-xl font-bold">Student Profile</h2>
                <button
                  onClick={() => setShowUserDetails(null)}
                  className="text-white hover:bg-[#6D28D9] rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-3 md:space-y-4">
                <div>
                  <h3 className="font-bold text-[#312E81] text-sm md:text-base mb-1">Basic Information</h3>
                  <div className="space-y-1 md:space-y-2 text-sm">
                    <div><span className="text-[#312E81] opacity-70">Name:</span> <span className="font-medium">{showUserDetails.name}</span></div>
                    <div><span className="text-[#312E81] opacity-70">Age Group:</span> <span className="font-medium">{showUserDetails.ageGroup}</span></div>
                    <div><span className="text-[#312E81] opacity-70">College:</span> <span className="font-medium">{showUserDetails.college}</span></div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-[#312E81] text-sm md:text-base mb-2">Activity Summary</h3>
                  <div className="grid grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
                    {[
                      { label: 'Total Sessions', value: showUserDetails.sessions, bg: 'F5F3FF', color: '312E81' },
                      { label: 'Emergency Uses', value: showUserDetails.emergencies, bg: 'FFF5F5', color: 'DC2626' },
                      { label: 'Misuse Reports', value: showUserDetails.misuse, 
                        bg: showUserDetails.misuse >= 3 ? 'FFF5F5' : showUserDetails.misuse >= 2 ? 'FEF9C3' : 'F5F3FF',
                        color: showUserDetails.misuse >= 3 ? 'DC2626' : showUserDetails.misuse >= 2 ? 'amber-700' : '7C3AED'
                      },
                      { label: 'Avg. Session Time', value: '18 min', bg: 'F5F3FF', color: '312E81' }
                    ].map((item, i) => (
                      <div key={i} className={`p-2 md:p-3 rounded-lg bg-[#${item.bg}]`}>
                        <div className="text-[10px] md:text-xs text-[#312E81] opacity-70">{item.label}</div>
                        <div className={`font-bold text-[#${item.color}]`}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-[#312E81] text-sm md:text-base mb-2">Session History (Metadata)</h3>
                  <div className="space-y-2 text-[10px] md:text-xs">
                    {[
                      { date: 'Jun 15', psychologist: 'Dr. Mehta', issue: 'Academic Stress', duration: '12 min' },
                      { date: 'Jun 10', psychologist: 'Dr. Sharma', issue: 'Relationship', duration: '24 min' },
                      { date: 'Jun 3', psychologist: 'Dr. Desai', issue: 'Anxiety', duration: '18 min' }
                    ].map((session, i) => (
                      <div key={i} className="p-2 bg-[#F5F3FF] rounded">
                        <div className="font-medium">{session.date}</div>
                        <div className="text-[#312E81] opacity-80">{session.psychologist} • {session.issue}</div>
                        <div className="text-[#312E81] opacity-70">{session.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 md:pt-4 border-t border-[#DDD6FE]">
                  <h3 className="font-bold text-[#312E81] text-sm md:text-base mb-2">Admin Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAction('Warning', showUserDetails.id)}
                      className="px-2 py-1.5 md:px-3 md:py-2 bg-[#F5F3FF] text-[#7C3AED] rounded-lg text-[10px] md:text-sm"
                    >
                      Send Warning
                    </button>
                    <button
                      onClick={() => handleAction('Restrict', showUserDetails.id)}
                      className="px-2 py-1.5 md:px-3 md:py-2 bg-amber-100 text-amber-700 rounded-lg text-[10px] md:text-sm"
                    >
                      Restrict Emergency
                    </button>
                    <button
                      onClick={() => handleAction('Block', showUserDetails.id)}
                      className="px-2 py-1.5 md:px-3 md:py-2 bg-[#FFF5F5] text-[#DC2626] rounded-lg text-[10px] md:text-sm"
                    >
                      Block Account
                    </button>
                    <button
                      onClick={() => handleAction('Review', showUserDetails.id)}
                      className="px-2 py-1.5 md:px-3 md:py-2 bg-[#7C3AED] text-white rounded-lg text-[10px] md:text-sm"
                    >
                      Full Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Psychologist Form Modal */}
      {showPsychologistForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-xl w-full max-w-md md:max-w-lg overflow-hidden animate-scale-in">
            <div className="bg-[#7C3AED] p-4 md:p-5 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-base md:text-xl font-bold">Add New Psychologist</h2>
                <button
                  onClick={() => setShowPsychologistForm(false)}
                  className="text-white hover:bg-[#6D28D9] rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 md:p-6 max-h-[80vh] overflow-y-auto">
              <form className="space-y-3 md:space-y-4">
                {[
                  { label: 'Full Name', type: 'text' },
                  { label: 'Qualification', type: 'text' },
                  { label: 'Specialization', type: 'text' },
                  { label: 'Experience (Years)', type: 'number' },
                  { label: 'Email', type: 'email' },
                  { label: 'Phone', type: 'tel' }
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block text-[10px] md:text-sm font-medium text-[#312E81] mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      className="w-full px-3 md:px-4 py-2 text-sm border border-[#DDD6FE] rounded-lg focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] md:text-sm font-medium text-[#312E81] mb-1">
                    Shift Timings
                  </label>
                  <select className="w-full px-3 md:px-4 py-2 text-sm border border-[#DDD6FE] rounded-lg focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none">
                    <option>9 AM - 5 PM</option>
                    <option>12 PM - 8 PM</option>
                    <option>5 PM - 1 AM</option>
                    <option>Custom Schedule</option>
                  </select>
                </div>
                <div className="pt-3 md:pt-4 flex flex-col sm:flex-row justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPsychologistForm(false)}
                    className="px-3 py-1.5 md:px-4 md:py-2 text-[#312E81] hover:bg-[#F5F3FF] rounded-lg text-[10px] md:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg text-[10px] md:text-sm"
                  >
                    Add Psychologist
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-up { animation: fadeUp 0.6s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.3s ease-out; }
        .sidebar-enter { opacity: 0; transform: translateX(-100%); }
        .sidebar-enter-active { opacity: 1; transform: translateX(0); transition: all 0.3s ease; }
        .sidebar-exit { opacity: 1; transform: translateX(0); }
        .sidebar-exit-active { opacity: 0; transform: translateX(-100%); transition: all 0.3s ease; }
      `}</style>
    </div>
  );
}

// Add Menu icon (was missing in imports)
const Menu = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);