import React, { useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Mic, 
  Users, 
  AlertTriangle, 
  Heart, 
  CheckCircle, 
  EyeOff,
  FileText,
  Phone,
  MapPin,
  X,
  Star
} from 'lucide-react';

export default function PrivacySafety() {
  const safetySections = [
    {
      id: 'anonymous',
      icon: EyeOff,
      title: 'Anonymous & Confidential Support',
      description: 'You can talk without revealing your identity. Your real name, college ID, or personal details are not required to start a chat.',
      details: [
        'Chat using just a nickname (or stay completely anonymous)',
        'Psychologists see only your nickname and optional age group',
        'No student, staff, or system can identify who you are',
        'Your identity stays private — always'
      ]
    },
    {
      id: 'encryption',
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All chat messages and files are protected with military-grade encryption.',
      details: [
        'Every message is encrypted before leaving your device',
        'Not even our administrators can read your conversations',
        'Files (PDFs, images) are encrypted in transit and at rest',
        'Chats auto-delete after session unless you choose to save'
      ]
    },
    {
      id: 'voice',
      icon: Mic,
      title: 'No Voice Recordings',
      description: 'Your voice notes or calls are never recorded. They are only streamed temporarily.',
      details: [
        'Voice notes exist only during your active session',
        'All audio is deleted immediately when the chat ends',
        'Calls (if enabled) use secure WebRTC with zero recording',
        'No voice data is stored on our servers'
      ]
    },
    {
      id: 'college',
      icon: Users,
      title: 'No Data Shared with College',
      description: 'Your college will never know you used this service. We do not share any information with your institution.',
      details: [
        'Platform is fully independent — no university integration',
        'No college email required for registration',
        'Zero reports sent to academic authorities',
        'Your privacy is protected from hostel wardens, professors, and admin'
      ]
    },
    {
      id: 'misuse',
      icon: AlertTriangle,
      title: 'Respectful Environment',
      description: 'We ensure safety for all. Misuse or harassment may lead to restricted access — but your identity stays protected.',
      details: [
        'Psychologists can flag misuse (abusive language, fake emergencies)',
        '3 misuse incidents → temporary emergency access restriction',
        'Even in misuse cases, your identity remains anonymous',
        'Genuine emergencies are always prioritized and never penalized'
      ]
    },
    {
      id: 'emergency',
      icon: Heart,
      title: 'Emergency Support Policy',
      description: 'If you’re in danger (self-harm or severe distress), the psychologist offers guidance — never forces disclosure.',
      details: [
        'Psychologists follow RCI-approved crisis protocols',
        'They cannot track your location without explicit consent',
        'Help includes: crisis numbers, breathing techniques, campus resources',
        'No personal details are ever demanded — your safety comes first'
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const delay = index * 100;
            entry.target.style.animationDelay = `${delay}ms`;
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F3FF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4C1D95] to-[#312E81] text-white py-16 animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Safety & Privacy</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Your safety matters most. This platform is made to help you, not judge you. Everything you share stays private.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="py-8 bg-white border-b border-[#DDD6FE] animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[#F5F3FF] rounded-xl p-6 border-2 border-[#7C3AED]">
            <div className="flex">
              <div className="w-2 h-2 bg-[#7C3AED] rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
              <div>
                <h2 className="text-xl font-bold text-[#312E81] mb-2">Our Promise to You</h2>
                <p className="text-[#312E81] opacity-90">
                  <span className="font-medium">We will never:</span> 
                  <br />• Ask for your real name unless you choose to share it
                  <br />• Share your chats with colleges, parents, or authorities
                  <br />• Record your voice or calls
                  <br />• Track your location without permission
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Sections */}
      <section className="py-12 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#312E81] mb-4">How We Keep You Safe</h2>
            <p className="text-[#6D28D9] opacity-80 max-w-2xl mx-auto">
              Simple, clear protections — so you can focus on what matters: your well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {safetySections.map((section, index) => (
              <div 
                key={section.id} 
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#DDD6FE] hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-[#F5F3FF] p-5 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#EDE9FE] flex items-center justify-center mr-4">
                    <section.icon className="w-6 h-6 text-[#7C3AED]" />
                  </div>
                  <h3 className="font-bold text-[#312E81]">{section.title}</h3>
                </div>
                <div className="p-5">
                  <p className="text-[#312E81] opacity-90 mb-4">
                    {section.description}
                  </p>
                  <ul className="space-y-2">
                    {section.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#7C3AED] mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-[#312E81] opacity-80">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Protocol Banner */}
          <div className="mt-12 max-w-4xl mx-auto animate-on-scroll">
            <div className="bg-[#FFF7FA] rounded-xl p-6 border border-[#DC2626]/20">
              <div className="flex flex-col md:flex-row">
                <div className="w-12 h-12 rounded-full bg-[#DC2626] flex items-center justify-center flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#312E81] text-xl mb-2">In Life-Threatening Emergencies</h3>
                  <p className="text-[#312E81] opacity-90 mb-3">
                    If you express intent to harm yourself or others, our psychologists will:
                  </p>
                  <ul className="space-y-2 text-sm">
                    {[
                      'Offer immediate crisis resources (112, helplines)',
                      'Guide you to campus counseling cell (if you consent)',
                      'Never demand personal details — your safety comes first'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start" style={{ animationDelay: `${i * 100}ms` }}>
                        <span className="w-2 h-2 bg-[#DC2626] rounded-full mt-2 mr-3"></span>
                        <span className="text-[#312E81] opacity-80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control Your Information */}
      <section className="py-16 bg-white animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <Star className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-[#312E81] mb-4">You Control Your Information</h2>
            <p className="text-xl text-[#6D28D9] opacity-90 mb-8">
              Your choices matter. Here’s what you can do:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Start Anonymous',
                  desc: 'No registration needed for Quick Chat or Emergency SOS',
                  icon: EyeOff
                },
                {
                  title: 'Skip Personal Details',
                  desc: 'First name, gender, college — all optional during registration',
                  icon: X
                },
                {
                  title: 'Delete Chat History',
                  desc: 'Clear your session history anytime from your dashboard',
                  icon: FileText
                },
                {
                  title: 'Opt Out of Location',
                  desc: 'Location sharing is always optional — even in emergencies',
                  icon: MapPin
                }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="bg-[#F5F3FF] rounded-xl p-6 hover:bg-white transition-all duration-300 border border-[#DDD6FE] animate-on-scroll"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#EDE9FE] flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-[#7C3AED]" />
                  </div>
                  <h3 className="font-bold text-[#312E81] mb-2">{item.title}</h3>
                  <p className="text-[#312E81] opacity-80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-[#F5F3FF] animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#312E81] mb-8">Common Questions</h2>
            
            <div className="space-y-4">
              {[
                {
                  question: 'Will my parents or professors find out I used Bodhi-Mitra?',
                  answer: 'No. We never share your information with colleges, parents, or authorities. Your usage is completely private.'
                },
                {
                  question: 'Can psychologists see my phone number or email?',
                  answer: 'Only if you choose to register — and even then, they see only your nickname. Your contact details are used only for OTP login.'
                },
                {
                  question: 'What if I misuse the emergency button by mistake?',
                  answer: 'Don’t worry! Genuine emergencies are never penalized. Our system understands mistakes — only repeated intentional misuse triggers restrictions.'
                },
                {
                  question: 'Are my chats saved forever?',
                  answer: 'No. Chats are deleted after your session unless you explicitly choose to save them in your account.'
                }
              ].map((faq, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-xl p-5 border border-[#DDD6FE] hover:shadow-md transition-all animate-on-scroll"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <h3 className="font-bold text-[#312E81] mb-2 flex items-center">
                    <Phone className="w-4 h-4 text-[#7C3AED] mr-2" />
                    {faq.question}
                  </h3>
                  <p className="text-[#312E81] opacity-80 pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Footer */}
      <section className="py-12 bg-gradient-to-r from-[#4C1D95] to-[#312E81] text-white animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6">
              <img 
    src="/images/pschylogo.svg" 
    alt="Bodhi-Mitra Logo"
    className="w-15 h-auto rounded-full max-h-16 object-contain"
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
            <h2 className="text-2xl font-bold mb-4">Built on Trust, Designed for Safety</h2>
            <p className="text-lg opacity-90 mb-8">
              Bodhi-Mitra follows the highest ethical standards for student mental health support — 
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Shield, text: 'RCI Certified' },
                { icon: Lock, text: 'End-to-End Encryption' },
                { icon: Users, text: 'Student-First Design' }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center bg-white/10 px-4 py-2 rounded-full animate-on-scroll"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Note */}
      <div className="bg-gradient-to-r from-[#4C1D95] to-[#312E81] text-white py-8 animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <p className="opacity-90 max-w-2xl mx-auto">
            If you have concerns about privacy or safety, contact our Ethics Officer: 
            <br />
            <span className="font-medium underline">ethics-Bodhi-Mitra@gbu.in</span>
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeUp {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.97);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-up {
          animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-on-scroll {
          opacity: 0;
        }
        button, .card-hover {
          @apply transition-all duration-300;
        }
        .card-hover:hover {
          @apply transform -translate-y-1 shadow-md;
        }
      `}</style>
    </div>
  );
}