// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Bell, 
  User, 
  LogIn, 
  Menu, 
  X,
  Info,
  HelpCircle,
  Shield,
  Mail,
  Users2
} from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleMeetExperts = () => {
    navigate('/experts');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-[#DDD6FE] sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Updated with random calming wellness image */}
          <Link to="/" className="flex items-center space-x-2 group">
          <img 
    src="/images/logo.svg" 
    alt="Bodhi-Mitra Logo"
    className="w-12 h-auto rounded-full max-h-16 object-contain"
    onError={(e) => {
      e.target.style.display = 'none';
      e.target.parentElement.innerHTML = `
        <div class="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </div>
      `;
    }}
  />
          <div className="w-px h-10 bg-[#DDD6FE] mx-3"></div>
            <div className="w-13 h-12 rounded-full overflow-hidden flex items-center justify-center border-2 border-[#ffffff]/20">
              <img 
    src="/images/pschylogo.svg" 
    alt="Bodhi-Mitra Logo"
    className="w-14 h-auto rounded-full max-h-16 object-contain"
    onError={(e) => {
      e.target.style.display = 'none';
      e.target.parentElement.innerHTML = `
        <div class="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </div>
      `;
    }}
  />
            </div>
            <img 
    src="/images/bodhi-logo.svg" 
    alt="Bodhi-Mitra Logo"
    className="w-15 h-10 rounded-full max-h-16 object-contain"
    onError={(e) => {
      e.target.style.display = 'none';
      e.target.parentElement.innerHTML = `
        <div class="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </div>
      `;
    }}
  />


          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Updated Links with Palette Colors */}
            <Link 
              to="/about" 
              className="flex items-center gap-1 text-[#4C1D95] hover:text-[#7C3AED] font-medium transition-colors group"
            >
              <Info className="w-4 h-4 text-[#6D28D9] group-hover:text-[#7C3AED] group-hover:scale-110 transition-transform" />
              <span>About Us</span>
            </Link>
            
            <Link 
              to="/faq"
              className="flex items-center gap-1 text-[#4C1D95] hover:text-[#7C3AED] font-medium transition-colors group"
            >
              <HelpCircle className="w-4 h-4 text-[#6D28D9] group-hover:text-[#7C3AED] group-hover:scale-110 transition-transform" />
              <span>FAQ</span>
            </Link>
            
            <Link 
              to="/privacy"
              className="flex items-center gap-1 text-[#4C1D95] hover:text-[#7C3AED] font-medium transition-colors group"
            >
              <Shield className="w-4 h-4 text-[#6D28D9] group-hover:text-[#7C3AED] group-hover:scale-110 transition-transform" />
              <span>Privacy</span>
            </Link>
            
            <Link 
              to="/contact"
              className="flex items-center gap-1 text-[#4C1D95] hover:text-[#7C3AED] font-medium transition-colors group"
            >
              <Mail className="w-4 h-4 text-[#6D28D9] group-hover:text-[#7C3AED] group-hover:scale-110 transition-transform" />
              <span>Contact</span>
            </Link>

            {/* NEW: Meet Our Experts */}
            <Link 
              to="/our-experts"
              className="flex items-center gap-1 text-[#4C1D95] hover:text-[#7C3AED] font-medium transition-colors group"
            >
              <Users2 className="w-4 h-4 text-[#6D28D9] group-hover:text-[#7C3AED] group-hover:scale-110 transition-transform" />
              <span>Meet Our Experts</span>
            </Link>

            <div className="w-px h-6 bg-[#DDD6FE] mx-3"></div>

            <button 
              className="p-2 text-[#4C1D95] hover:bg-[#F5F3FF] rounded-full relative transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-[#6D28D9]" />
              <span className="absolute -top-1 -right-1 w-3 h-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#DC2626] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DC2626]"></span>
              </span>
            </button>

            <button 
              onClick={handleLogin} 
              className="flex items-center gap-1 text-[#4C1D95] hover:text-[#7C3AED] font-medium transition-colors group"
            >
              <LogIn className="w-4 h-4 text-[#6D28D9] group-hover:text-[#7C3AED]" />
              Login
            </button>
            
            <button 
              onClick={handleRegister} 
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm hover:shadow"
            >
              Register
            </button>
            
            
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-[#4C1D95] hover:bg-[#F5F3FF] rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#6D28D9]" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#DDD6FE]">
            <div className="flex flex-col space-y-2">
              {/* Mobile Links — Updated Palette */}
              <Link 
                to="/about"
                className="flex items-center gap-3 p-3 text-[#4C1D95] hover:bg-[#F5F3FF] rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="w-5 h-5 text-[#6D28D9]" />
                About Bodhi-Mitra
              </Link>
              
              <Link 
                to="/faq"
                className="flex items-center gap-3 p-3 text-[#4C1D95] hover:bg-[#F5F3FF] rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <HelpCircle className="w-5 h-5 text-[#6D28D9]" />
                FAQs
              </Link>
              
              <Link 
                to="/privacy"
                className="flex items-center gap-3 p-3 text-[#4C1D95] hover:bg-[#F5F3FF] rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="w-5 h-5 text-[#6D28D9]" />
                Privacy & Safety
              </Link>
              
              <Link 
                to="/contact"
                className="flex items-center gap-3 p-3 text-[#4C1D95] hover:bg-[#F5F3FF] rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail className="w-5 h-5 text-[#6D28D9]" />
                Contact Us
              </Link>

              {/* NEW Mobile: Meet Our Experts */}
              <Link 
                to="/our-experts"
                className="flex items-center gap-3 p-3 text-[#4C1D95] hover:bg-[#F5F3FF] rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users2 className="w-5 h-5 text-[#6D28D9]" />
                Meet Our Experts
              </Link>

              <div className="border-t border-[#DDD6FE] my-2"></div>

              <button 
                className="flex items-center gap-3 p-3 text-[#4C1D95] hover:bg-[#F5F3FF] rounded-lg"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-[#6D28D9]" />
                Notifications
                <span className="ml-auto w-2 h-2 bg-[#DC2626] rounded-full"></span>
              </button>
              
              <button
                onClick={() => { handleLogin(); setIsMenuOpen(false); }}
                className="flex items-center gap-3 p-3 text-[#4C1D95] hover:text-[#7C3AED] rounded-lg font-medium"
              >
                <LogIn className="w-5 h-5 text-[#6D28D9]" />
                Login
              </button>
              
              <button
                onClick={() => { handleRegister(); setIsMenuOpen(false); }}
                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Register
              </button>
              
              
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
