// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import QuickConnect from './pages/QuickConnect';
import Emergency from './pages/Emergency';
import Register from './pages/Register';
import Chat from './pages/Chat';
import PsychologistDashboard from './pages/PsychologistDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs';
import PrivacySafety from './pages/PrivacySafety';
import FAQ from './pages/FAQ';
import ContactUs from './pages/ContactUs';
import StudentDashboard from './pages/StudentDashboard';
import OurExperts from './pages/OurExperts';
<Route 
  path="/admin" 
  element={
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  } 
/>

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/quick-connect" element={<Layout><QuickConnect /></Layout>} />
        <Route path="/emergency" element={<Layout><Emergency /></Layout>} />
        <Route path="/about" element={<Layout><AboutUs /></Layout>} />
        <Route path="/privacy" element={<Layout><PrivacySafety /></Layout>} />
        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
        <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
        <Route path="/our-experts" element={<Layout><OurExperts /></Layout>} />

        {/* Protected Routes — will need auth later */}
        
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/dashboard" element={<Layout><StudentDashboard /></Layout>} />
        <Route path="/psychologist" element={<Layout><PsychologistDashboard /></Layout>} />
        <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}