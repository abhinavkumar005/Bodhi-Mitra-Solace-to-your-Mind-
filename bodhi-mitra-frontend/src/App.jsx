// src/App.jsx
import React from 'react';
import { Navigate, BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Emergency from './pages/Emergency';
import QuickConnect from './pages/QuickConnect';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';
import PrivacySafety from './pages/PrivacySafety';
import OurExperts from './pages/OurExperts';
import Unauthorized from './pages/Unauthorized';

// Protected Pages
import StudentDashboard from './pages/student/Dashboard';
import PsychologistDashboard from './pages/psychologist/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';

// Separate component to wrap AuthProvider with router context
function AppWithProviders() {
  const navigate = useNavigate();
  
  return (
    <AuthProvider navigate={navigate}>
      <SocketProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/quick-connect" element={<QuickConnect />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<PrivacySafety />} />
              <Route path="/experts" element={<OurExperts />} />
              
              {/* Protected Routes */}
              <Route 
                path="/student/*" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/psychologist/*" 
                element={
                  <ProtectedRoute allowedRoles={['psychologist']}>
                    <PsychologistDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Error Routes */}
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<Navigate to="/unauthorized" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SocketProvider>
    </AuthProvider>
  );
}

// Main App component with BrowserRouter
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppWithProviders />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;