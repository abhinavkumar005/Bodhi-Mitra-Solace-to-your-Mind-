// src/pages/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Home } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#DDD6FE] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-[#DDD6FE] p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-[#7C3AED]" />
        </div>
        <h2 className="text-2xl font-bold text-[#312E81] mb-2">Access Restricted</h2>
        <p className="text-[#6D28D9] opacity-90 mb-6">
          You don't have permission to access this resource.
        </p>
        <div className="space-y-3">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6A2DCE] text-white font-medium py-2 px-6 rounded-lg transition-colors w-full"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
          <Link 
            to="/login" 
            className="inline-flex items-center justify-center gap-2 border border-[#7C3AED] text-[#7C3AED] hover:bg-[#F5F3FF] font-medium py-2 px-6 rounded-lg transition-colors w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Sign In to Continue
          </Link>
        </div>
      </div>
    </div>
  );
}