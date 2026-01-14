// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, GraduationCap, Mail, Phone, Shield, AlertTriangle, 
  CheckCircle, X, Heart, Calendar, LogOut, Plus, Trash2, 
  Eye, Filter, Search, Activity, Users, BarChart3
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  
  const [psychologists, setPsychologists] = useState([]);
  const [students, setStudents] = useState([]);
  const [abuseReports, setAbuseReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPsychologist, setShowAddPsychologist] = useState(false);
  const [newPsychologist, setNewPsychologist] = useState({
    name: '',
    email: '',
    specialization: '',
    password: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [abuseStatusFilter, setAbuseStatusFilter] = useState('all');

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get psychologists
        const psychRes = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/psychologists`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const psychData = await psychRes.json();
        setPsychologists(psychData.data || []);

        // Get students
        const studentRes = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/students`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const studentData = await studentRes.json();
        setStudents(studentData.data || []);

        // Get abuse reports
        const abuseRes = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/abuse-reports`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const abuseData = await abuseRes.json();
        setAbuseReports(abuseData.data || []);
        
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddPsychologist = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/psychologists`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPsychologist)
      });
      
      if (res.ok) {
        const addedPsych = await res.json();
        setPsychologists(prev => [...prev, addedPsych.data]);
        setNewPsychologist({ name: '', email: '', specialization: '', password: '' });
        setShowAddPsychologist(false);
        alert('Psychologist added successfully!');
      } else {
        const error = await res.json();
        alert(error.message || 'Failed to add psychologist');
      }
    } catch (err) {
      alert('Failed to add psychologist. Please try again.');
    }
  };

  const handleDeactivateUser = async (userId, userType) => {
    if (!window.confirm('Are you sure you want to deactivate this user? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/users/${userId}/deactivate`, {
        method: 'PATCH',
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (res.ok) {
        if (userType === 'psychologist') {
          setPsychologists(prev => prev.filter(p => p._id !== userId));
        } else {
          setStudents(prev => prev.filter(s => s._id !== userId));
        }
        alert('User deactivated successfully!');
      }
    } catch (err) {
      alert('Failed to deactivate user.');
    }
  };

  const handleResolveAbuseReport = async (reportId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/abuse-reports/${reportId}/resolve`, {
        method: 'PATCH',
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (res.ok) {
        setAbuseReports(prev => prev.map(report => 
          report._id === reportId ? { ...report, status: 'resolved' } : report
        ));
        alert('Abuse report resolved successfully!');
      }
    } catch (err) {
      alert('Failed to resolve abuse report.');
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = userTypeFilter === 'all' || 
                       (userTypeFilter === 'active' && student.isActive) ||
                       (userTypeFilter === 'inactive' && !student.isActive);
    return matchesSearch && matchesType;
  });

  const filteredAbuseReports = abuseReports.filter(report => {
    return abuseStatusFilter === 'all' || report.status === abuseStatusFilter;
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3FF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#312E81]">Loading admin dashboard...</p>
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
                <p className="text-sm text-[#6D28D9]">Admin Dashboard</p>
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
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6D28D9] opacity-80 text-sm">Total Psychologists</p>
                <p className="text-2xl font-bold text-[#312E81]">{psychologists.length}</p>
              </div>
              <Shield className="w-8 h-8 text-[#7C3AED]" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6D28D9] opacity-80 text-sm">Active Students</p>
                <p className="text-2xl font-bold text-[#312E81]">
                  {students.filter(s => s.isActive).length}
                </p>
              </div>
              <Users className="w-8 h-8 text-[#7C3AED]" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6D28D9] opacity-80 text-sm">Pending Reports</p>
                <p className="text-2xl font-bold text-[#312E81]">
                  {abuseReports.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-[#DC2626]" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6D28D9] opacity-80 text-sm">Active Sessions</p>
                <p className="text-2xl font-bold text-[#312E81]">12</p>
              </div>
              <Activity className="w-8 h-8 text-[#7C3AED]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Psychologist Management */}
          <div className="lg:col-span-1 space-y-6">
            {/* Add Psychologist Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#312E81] flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-[#7C3AED]" />
                  Add Psychologist
                </h3>
                <button
                  onClick={() => setShowAddPsychologist(!showAddPsychologist)}
                  className="text-[#7C3AED] hover:text-[#6A2DCE]"
                >
                  {showAddPsychologist ? 'Cancel' : 'Add New'}
                </button>
              </div>
              
              {showAddPsychologist && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={newPsychologist.name}
                      onChange={(e) => setNewPsychologist({...newPsychologist, name: e.target.value})}
                      placeholder="Dr. Priya Mehta"
                      className="w-full px-3 py-2 border border-[#DDD6FE] rounded-lg focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-1">Email</label>
                    <input
                      type="email"
                      value={newPsychologist.email}
                      onChange={(e) => setNewPsychologist({...newPsychologist, email: e.target.value})}
                      placeholder="priya.mehta@university.edu"
                      className="w-full px-3 py-2 border border-[#DDD6FE] rounded-lg focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-1">Specialization</label>
                    <select
                      value={newPsychologist.specialization}
                      onChange={(e) => setNewPsychologist({...newPsychologist, specialization: e.target.value})}
                      className="w-full px-3 py-2 border border-[#DDD6FE] rounded-lg focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none"
                    >
                      <option value="">Select specialization</option>
                      <option value="Clinical Psychology">Clinical Psychology</option>
                      <option value="Counseling Psychology">Counseling Psychology</option>
                      <option value="Child Psychology">Child Psychology</option>
                      <option value="Educational Psychology">Educational Psychology</option>
                      <option value="Forensic Psychology">Forensic Psychology</option>
                      <option value="Health Psychology">Health Psychology</option>
                      <option value="Industrial-Organizational Psychology">Industrial-Organizational Psychology</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#312E81] mb-1">Password</label>
                    <input
                      type="password"
                      value={newPsychologist.password}
                      onChange={(e) => setNewPsychologist({...newPsychologist, password: e.target.value})}
                      placeholder="Set initial password"
                      className="w-full px-3 py-2 border border-[#DDD6FE] rounded-lg focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none"
                    />
                  </div>
                  
                  <button
                    onClick={handleAddPsychologist}
                    disabled={!newPsychologist.name || !newPsychologist.email || !newPsychologist.password}
                    className="w-full bg-[#7C3AED] hover:bg-[#6A2DCE] text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>

            {/* Psychologist List */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
              <h3 className="text-lg font-bold text-[#312E81] mb-4">Psychologists ({psychologists.length})</h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {psychologists.map((psych) => (
                  <div key={psych._id} className="border border-[#DDD6FE] rounded-lg p-3 hover:bg-[#F5F3FF] transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#312E81]">{psych.name}</p>
                        <p className="text-xs text-[#6D28D9] opacity-80">{psych.specialization}</p>
                        <p className="text-xs text-[#6D28D9] opacity-80">{psych.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeactivateUser(psych._id, 'psychologist')}
                          className="text-red-600 hover:text-red-800"
                          title="Deactivate"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Student Management & Abuse Reports */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Management */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#312E81] flex items-center">
                  <Users className="w-5 h-5 mr-2 text-[#7C3AED]" />
                  Student Management
                </h3>
                
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6D28D9]" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search students..."
                      className="pl-10 pr-4 py-2 border border-[#DDD6FE] rounded-lg focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none"
                    />
                  </div>
                  
                  <select
                    value={userTypeFilter}
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    className="px-3 py-2 border border-[#DDD6FE] rounded-lg focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none"
                  >
                    <option value="all">All Students</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div key={student._id} className="border border-[#DDD6FE] rounded-lg p-3 hover:bg-[#F5F3FF] transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#312E81]">{student.name}</p>
                        <p className="text-xs text-[#6D28D9] opacity-80">Roll: {student.rollNumber}</p>
                        <p className="text-xs text-[#6D28D9] opacity-80">{student.email}</p>
                        <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                          student.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeactivateUser(student._id, 'student')}
                          className={`${
                            student.isActive ? 'text-red-600 hover:text-red-800' : 'text-gray-400'
                          }`}
                          title={student.isActive ? "Deactivate" : "Already inactive"}
                          disabled={!student.isActive}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Abuse Reports */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#DDD6FE] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#312E81] flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-[#DC2626]" />
                  Abuse Reports
                </h3>
                
                <select
                  value={abuseStatusFilter}
                  onChange={(e) => setAbuseStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-[#DDD6FE] rounded-lg focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none"
                >
                  <option value="all">All Reports</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              
              {filteredAbuseReports.length === 0 ? (
                <p className="text-[#6D28D9] opacity-80 text-center py-4">
                  No abuse reports found
                </p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredAbuseReports.map((report) => (
                    <div key={report._id} className={`border rounded-lg p-4 ${
                      report.status === 'pending' 
                        ? 'border-yellow-200 bg-yellow-50' 
                        : 'border-green-200 bg-green-50'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              report.status === 'pending' 
                                ? 'bg-yellow-200 text-yellow-800' 
                                : 'bg-green-200 text-green-800'
                            }`}>
                              {report.status === 'pending' ? 'Pending' : 'Resolved'}
                            </span>
                            <span className="text-xs text-[#6D28D9] opacity-80">
                              {new Date(report.createdAt).toLocaleString()}
                            </span>
                          </div>
                          
                          <p className="text-[#312E81] mb-2">
                            <strong>Reporter:</strong> {report.reporter?.name || 'Anonymous'}
                          </p>
                          <p className="text-[#312E81] mb-2">
                            <strong>Reported User:</strong> {report.reportedUser?.name || 'Unknown'}
                          </p>
                          <p className="text-[#312E81] mb-3">
                            <strong>Reason:</strong> {report.reason}
                          </p>
                          <p className="text-[#6D28D9] text-sm bg-white p-2 rounded border border-[#DDD6FE]">
                            {report.description}
                          </p>
                        </div>
                        
                        {report.status === 'pending' && (
                          <button
                            onClick={() => handleResolveAbuseReport(report._id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Resolve
                          </button>
                        )}
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