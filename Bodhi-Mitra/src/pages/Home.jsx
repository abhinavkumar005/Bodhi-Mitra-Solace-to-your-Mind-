import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Shield, 
  Users, 
  Heart, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  MapPin,
  X
} from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [emergencyModal, setEmergencyModal] = useState(false);
  const [safetyStep, setSafetyStep] = useState(1);
  const [selectedMode, setSelectedMode] = useState(null);
  const [misuseWarning, setMisuseWarning] = useState(false);
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1700);
    return () => clearTimeout(timer);
  }, []);

  const taglines = [
    "You're not alone. Get help now.",
    "Safe, anonymous support is just a tap away.",
    "Talk to a certified psychologist in minutes.",
    "Your mental health matters — reach out today.",
    "Confidential help, available 24/7."
  ];
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  useEffect(() => {
    const showMisuse = Math.random() > 0.8;
    if (showMisuse) {
      setMisuseWarning(true);
    }
  }, []);

  const handleEmergencyClick = () => {
    if (misuseWarning) {
      setEmergencyModal(true);
      setSafetyStep(0);
    } else {
      setEmergencyModal(true);
      setSafetyStep(1);
    }
  };

  const handleConfirmEmergency = () => {
    setSafetyStep(2);
    setTimeout(() => {
      setConnected(true);
      setTimeout(() => {
        setConnected(false);
        setEmergencyModal(false);
        setSafetyStep(1);
      }, 3000);
    }, 800);
  };

  return (
    <div 
      className="pt-16 min-h-screen bg-[#F5F3FF] relative overflow-hidden"
      style={{
        backgroundImage: 'url("/images/BG3.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* 🔆 Lighter overlay: image more visible, text still readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3FF]/25 via-[#F5F3FF]/85 to-[#EDE9FE]/30 pointer-events-none"></div>

      {loading && (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-white pt-24">
    {/* Typing Effect Tagline */}
<div className="typing-container">
  <div className="typing-text">
    <span>Bodhi-Mitra</span>, Solace to your mind.
  </div>
</div>

<style jsx>{`
  .typing-container {
    font-size: 1.7Frem; /* text-xs for navbar */
    font-weight: 800; /* Bold */
    color: #6D28D9;
    min-height: 1.25em;
    display: flex;
    align-items: center;
  }
  .typing-text {
    overflow: hidden;
    white-space: nowrap;
    border-right: 1.5px solid #6D28D9;
    animation: 
      typing 1s steps(35, end) forwards,
      blink 0.7s step-end infinite;
  }
  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes blink {
    50% { border-color: transparent; }
  }
`}</style>
    {/* Video — no container, no bg overlay */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full max-w-md h-auto rounded-xl shadow-sm"
      aria-hidden="true"
    >
      <source src="/videos/psy-loop.mp4" type="video/mp4" />
      {/* Fallback if video fails */}
      <div className="w-full max-w-md h-48 bg-[#F5F3FF] rounded-xl flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-[#7C3AED] border-t-transparent rounded-full animate-spin"></div>
      </div>
    </video>

    {/* Text below video */}
    <p className="mt-6 text-center text-[#312E81] font-medium max-w-xs px-4">
      Connecting you to safe, confidential support...
    </p>
    
  </div>
)}  

      {!loading && (
        <>
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-12 md:py-20 text-center relative z-10">
            <div className="relative h-16 md:h-20 mb-4">
              {taglines.map((tagline, index) => (
                <h1
                  key={index}
                  className={`absolute inset-x-0 top-0 mx-auto text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] max-w-3xl
                    transition-all duration-700 ease-in-out z-10
                    drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]
                    ${index === currentTagline 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4 pointer-events-none'}`}
                >
                  {tagline}
                </h1>
              ))}
            </div>

            <p className="text-lg md:text-xl text-[#111111] max-w-2xl mx-auto mb-10 opacity-90 animate-fade-in">
              Talk to a certified psychologist in minutes — safe, anonymous, and confidential.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-6 animate-fade-in-delay">
              <button
                onClick={() => navigate('/emergency')}
                className="flex items-center justify-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold py-4 px-6 rounded-xl 
                  drop-shadow-lg hover:drop-shadow-xl
                  transition-all duration-300 transform hover:scale-[1.02]"
              >
                <AlertTriangle className="w-5 h-5" />
                Emergency Help — Start Now
              </button>
              <Link 
                to="/quick-connect" 
                className="flex items-center justify-center gap-2 bg-white border-2 border-[#7C3AED]/30 hover:bg-[#F5F3FF] text-[#312E81] font-medium py-4 px-6 rounded-xl transition-all duration-300 hover:border-[#7C3AED]"
              >
                <MessageCircle className="w-5 h-5 text-[#7C3AED]" />
                Talk Now — Anonymous Chat
              </Link>
            </div>

            <p className="text-sm text-[#312E81] max-w-xl mx-auto opacity-80 animate-fade-in-delay-2">
              <span className="font-medium">⚠️ If you are in immediate danger, call 112 or your local emergency number.</span>
            </p>
          </section>

          {/* How It Works */}
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-center text-[#312E81] mb-10 animate-fade-in">
              How Bodhi-Mitra Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Users className="w-8 h-8 text-[#7C3AED]" />, title: "Reach Out", desc: "Click Emergency or Talk Now — no registration needed." },
                { icon: <Clock className="w-8 h-8 text-[#7C3AED]" />, title: "Connect", desc: "Get matched with a psychologist in under 60 seconds." },
                { icon: <Heart className="w-8 h-8 text-[#7C3AED]" />, title: "Get Support", desc: "Talk safely. Exit anytime. Your privacy is protected." }
              ].map((step, i) => (
                <div 
                  key={i}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-[#DDD6FE] hover:shadow-md transition-shadow duration-300 animate-slide-up opacity-0"
                  style={{ animationDelay: `${i * 0.2}s`, animationFillMode: 'forwards' }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#F5F3FF] flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#312E81] mb-2">{step.title}</h3>
                  <p className="text-[#6D28D9] opacity-90">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Trust & Safety */}
          <section className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#F5F3FF] to-[#EDE9FE] rounded-2xl p-8 border-2 border-[#DDD6FE] animate-slide-up-delay">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#312E81] mb-4">Your Safety Is Our Priority</h2>
                  <ul className="space-y-3">
                    {[
                      "✅ Certified psychologists trained in student mental health",
                      "✅ Fully anonymous — no name, number, or email required",
                      "✅ End-to-end encrypted conversations",
                      "✅ Partnered with university counseling cells",
                      "✅ Misuse protection to keep counselors safe"
                    ].map((item, i) => (
                      <li 
                        key={i} 
                        className="flex items-start opacity-0 animate-fade-in-stagger"
                        style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'forwards' }}
                      >
                        <CheckCircle className="w-5 h-5 text-[#7C3AED] mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-[#312E81] opacity-90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative animate-pop-in">
                    <div className="w-48 h-48 rounded-full bg-[#F5F3FF] flex items-center justify-center border-2 border-[#DDD6FE]">
                      <Shield className="w-24 h-24 text-[#7C3AED]" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-[#7C3AED] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Safe & Verified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats & Impact */}
          <section className="container mx-auto px-4 py-12 text-center">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <p className="text-lg text-[#6D28D9] opacity-90 italic mb-6">
                “73% of students report feeling overwhelmed by academic pressure. You’re not weak for needing help — you’re strong for seeking it.”
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: "92%", label: "users felt safer" },
                  { value: "<60s", label: "avg. connection time" },
                  { value: "24/7", label: "support available" },
                  { value: "100%", label: "anonymous option" }
                ].map((stat, i) => (
                  <div 
                    key={i}
                    className="bg-white p-4 rounded-xl shadow-sm border border-[#DDD6FE] hover:shadow-md transition-shadow animate-fade-in-stagger"
                    style={{ animationDelay: `${i * 0.2}s`, animationFillMode: 'forwards' }}
                  >
                    <div className="text-2xl font-bold text-[#7C3AED]">{stat.value}</div>
                    <div className="text-sm text-[#312E81] opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ✅ FIXED FOOTER: Isolated with solid bg & elevation */}
          <div className="relative z-20 bg-gradient-to-r from-[#4C1D95] to-[#312E81] 
                          shadow-[0_-4px_20px_rgba(0,0,0,0.12)]">
            <div className="container mx-auto px-4">
              <footer className="text-white py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <img 
    src="/images/pschylogo.svg" 
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
                      <span className="text-xl font-bold">Bodhi<span className="text-white/90">-Mitra</span></span>
                    </div>
                    <p className="text-gray-200 text-sm opacity-90">
                      A student-first mental health platform — fast, safe, and always there for you.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-white/90">Quick Links</h3>
                    <ul className="space-y-2 text-gray-200 text-sm opacity-90">
                      {['About', 'How It Works', 'Privacy Policy', 'Terms of Use'].map((link) => (
                        <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-white/90">Support</h3>
                    <ul className="space-y-2 text-gray-200 text-sm opacity-90">
                      {['Contact Us', 'FAQ', 'Crisis Resources', 'Campus Partners'].map((link) => (
                        <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-white/90">Crisis Help</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-[#FFE4DC]">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <span>Immediate Danger? Call 112</span>
                      </div>
                      <div className="flex items-center text-white/90">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>Helpline: 9152987821</span>
                      </div>
                      <div className="flex items-center text-white/90">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Find Campus Support</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/20 mt-8 pt-6 text-center text-gray-300 text-sm opacity-80">
                  © {new Date().getFullYear()} Bodhi-Mitra. All rights reserved.
                </div>
                
              </footer>
            </div>
          </div>

          {/* Mobile Emergency CTA */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#DDD6FE] md:hidden z-30">
            <button
              onClick={() => navigate('/emergency')}
              className="w-full flex items-center justify-center gap-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold py-4 px-4 rounded-xl 
                         drop-shadow-lg hover:drop-shadow-xl transition-colors duration-300"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>EMERGENCY HELP — ONE TAP</span>
            </button>
            <p className="text-xs text-center text-[#312E81] opacity-70 mt-2">
              Not an emergency? Try <button onClick={() => navigate('/quick-connect')} className="text-[#DC2626] underline font-medium">Talk Now</button>
            </p>
          </div>

          {/* Custom Animations */}
          <style>{`
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            @keyframes fade-in-delay { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes fade-in-delay-2 { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes slide-up-delay { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes fade-in-stagger { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
            @keyframes pop-in { 0% { opacity: 0; transform: scale(0.8); } 70% { transform: scale(1.05); } 100% { opacity: 1; transform: scale(1); } }
            .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
            .animate-fade-in-delay { animation: fade-in-delay 0.6s ease-out 0.2s forwards; }
            .animate-fade-in-delay-2 { animation: fade-in-delay-2 0.6s ease-out 0.4s forwards; }
            .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
            .animate-slide-up-delay { animation: slide-up-delay 0.6s ease-out 0.3s forwards; }
            .animate-fade-in-stagger { animation: fade-in-stagger 0.5s ease-out forwards; }
            .animate-pop-in { animation: pop-in 0.5s ease-out 0.4s forwards; }
          `}</style>
        </>
      )}
    </div>
  );
}