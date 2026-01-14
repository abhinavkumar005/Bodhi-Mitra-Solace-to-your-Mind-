// src/pages/QuickConnect.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MessageCircle, Users, Clock, Shield, ArrowLeft } from 'lucide-react';

export default function QuickConnect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F3FF] pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-[#312E81] hover:text-[#7C3AED] mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="ml-1">Back</span>
        </button>

        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-[#312E81] mb-4">
            Quick Connect
          </h1>
          
          <p className="text-lg text-[#6D28D9] mb-8">
            Talk to a certified psychologist anonymously in under 60 seconds.
          </p>

          <div className="bg-white p-8 rounded-xl border border-[#DDD6FE] mb-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#F5F3FF] rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-[#312E81] text-lg">Completely Anonymous</h3>
                  <p className="text-[#6D28D9] text-sm mt-1">
                    No name, email, or phone number required to start chatting.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#F5F3FF] rounded-full flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-[#312E81] text-lg">Fast Connection</h3>
                  <p className="text-[#6D28D9] text-sm mt-1">
                    Get matched with a psychologist in under 60 seconds.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#F5F3FF] rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-[#312E81] text-lg">Safe & Confidential</h3>
                  <p className="text-[#6D28D9] text-sm mt-1">
                    End-to-end encrypted conversations that are never stored.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/register')}
            className="w-full bg-[#7C3AED] hover:bg-[#6A2DCE] text-white font-bold py-4 px-6 rounded-xl transition-colors"
          >
            Start Anonymous Chat
          </button>

          <p className="text-sm text-[#312E81] mt-6 opacity-80">
            By clicking "Start Anonymous Chat", you agree to our{' '}
            <Link to="/privacy" className="text-[#7C3AED] hover:underline">
              Terms of Use
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-[#7C3AED] hover:underline">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}