// src/components/layout/ProfileMenu.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';

export default function ProfileMenu({ user, onLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const goToDashboard = () => {
    if (user.role === 'student') {
      navigate('/dashboard');
    } else if (user.role === 'psychologist') {
      navigate('/psychologist');
    } else if (user.role === 'admin') {
      navigate('/admin');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-[#312E81] hover:text-[#7C3AED] transition-colors"
      >
        <User className="w-5 h-5" />
        <span className="hidden md:inline text-sm font-medium">
          {user.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#DDD6FE] z-50">
          <div className="px-4 py-3 border-b border-[#DDD6FE]">
            <p className="text-sm font-medium text-[#312E81]">{user.name}</p>
            <p className="text-xs text-[#6D28D9] truncate">{user.email}</p>
          </div>
          <div className="py-1">
            <button
              onClick={goToDashboard}
              className="w-full text-left px-4 py-2 text-sm text-[#312E81] hover:bg-[#F5F3FF] flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-[#DC2626] hover:bg-[#FFF5F5] flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}