// src/components/layout/Layout.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ProfileMenu from './ProfileMenu'; // We'll create this next

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        // Invalid user data - clear it
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onLogout={() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      }} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}