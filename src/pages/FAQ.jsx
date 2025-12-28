import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Clock, 
  AlertTriangle, 
  Lock, 
  User,
  Phone,
  Heart,
  MessageCircle,
  CheckCircle,
  ChevronDown,
  X
} from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

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

  const faqs = [
    {
      question: "Is this anonymous?",
      answer: "Yes. You can talk without sharing your name, phone number, or college ID. You may use a nickname like 'Student A' or 'Anonymous'. Your real identity is never revealed to the psychologist — not even if you register later."
    },
    {
      question: "Is this free for students?",
      answer: "Yes! Quick Chat, Emergency SOS, and all basic counseling sessions are completely free for enrolled students. We believe mental health support should never be a financial burden."
    },
    {
      question: "How long does a psychologist take to reply?",
      answer: "Usually within 15–30 seconds during Quick Connect. In busy hours (exam season), it may take up to 2–3 minutes. Emergency requests are prioritized and connected in under 30 seconds."
    },
    {
      question: "When should I use the emergency button?",
      answer: "Use the emergency button only when:\n• You feel physically or emotionally unsafe\n• You're experiencing a panic attack or breakdown\n• You have thoughts of self-harm\n• You need immediate human support\n\nNote: Repeated misuse (3+ times) will temporarily disable emergency access to protect our psychologists — but you can still use Quick Chat."
    },
    {
      question: "Do you record calls or chats?",
      answer: "No, never. All chats use end-to-end encryption — not even our team can read them. Voice notes exist only during your active session and are deleted immediately when the chat ends. We don't record calls or store audio."
    },
    {
      question: "Is my information shared with the college?",
      answer: "Absolutely not. Your college, professors, hostel wardens, or parents will never know you used Bodhi-Mitra. We're an independent platform with strict privacy policies — your usage is 100% confidential."
    },
    {
      question: "What if I don't want to create an account?",
      answer: "No problem at all! You can use Quick Connect or Emergency SOS immediately without registration. Just enter a nickname (or leave it blank) and start chatting. Your anonymity is fully protected."
    },
    {
      question: "Can I talk anytime?",
      answer: "Yes! Bodhi-Mitra is available 24/7. Our psychologists work in shifts to ensure someone is always online to support you — whether it's 2 AM during exam stress or a weekend crisis."
    },
    {
      question: "What if someone abuses the psychologist?",
      answer: "We take counselor safety seriously. Psychologists can flag misuse (abusive language, fake emergencies). After 3 misuse incidents, emergency access is temporarily disabled — but normal chat remains open. Genuine emergencies are always prioritized."
    },
    {
      question: "Can I talk about anything?",
      answer: "Yes — everything is welcome. Academic stress, relationship issues, family pressure, anxiety, depression, loneliness, identity questions, hostel problems... There's no 'wrong' reason to reach out. You won't be judged — only heard."
    },
    {
      question: "What if I cry or can't type during the chat?",
      answer: "That's completely okay. Many students feel this way. You can:\n• Send a voice note instead of typing\n• Use our 'I need a moment' button\n• Ask for breathing exercises\n• Simply type 'I'm overwhelmed' — your psychologist will guide you gently"
    },
    {
      question: "Can I stop the session anytime?",
      answer: "Yes, absolutely. You control the conversation. Click 'End Session' anytime — no questions asked. You won't be pressured to continue, and you can start a new chat whenever you're ready."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F5F3FF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4C1D95] to-[#312E81] text-white py-12 md:py-16 animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">Frequently Asked Questions</h1>
            <p className="text-base md:text-lg lg:text-xl opacity-90 max-w-2xl mx-auto px-2">
              Quick answers to help you feel safe and confident using Bodhi-Mitra.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-4 md:py-6 bg-white border-b border-[#DDD6FE] animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[#F5F3FF] rounded-xl p-4 md:p-6 border border-[#DDD6FE]">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-[#7C3AED] rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h2 className="text-base md:text-lg font-bold text-[#312E81] mb-1">You're not alone in wondering...</h2>
                <p className="text-[#6D28D9] opacity-90 text-sm md:text-base">
                  We've answered the questions students ask most — so you can get help without hesitation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-8 md:py-12 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-12">
              {[
                { icon: Shield, label: 'Anonymous', color: 'text-[#7C3AED]' },
                { icon: Lock, label: 'Secure', color: 'text-[#7C3AED]' },
                { icon: Users, label: '24/7 Support', color: 'text-[#7C3AED]' },
                { icon: Heart, label: 'No Judgment', color: 'text-[#DC2626]' }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-xl p-4 text-center shadow-sm border border-[#DDD6FE] animate-on-scroll"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#F5F3FF] flex items-center justify-center mx-auto mb-2">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-xs font-medium text-[#312E81]">{item.label}</span>
                </div>
              ))}
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3 md:space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#DDD6FE] animate-on-scroll"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-[#F5F3FF] transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#EDE9FE] flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-[#6D28D9] font-bold text-sm">{index + 1}</span>
                      </div>
                      <h3 className="font-bold text-[#312E81]">{faq.question}</h3>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-[#6D28D9] transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 pb-5 pt-0 border-t border-[#DDD6FE]">
                      <div className="text-sm text-[#312E81] opacity-90 leading-relaxed">
                        {faq.answer.split('\n').map((line, i) => 
                          line.startsWith('•') ? (
                            <p key={i} className="flex items-start mt-2">
                              <CheckCircle className="w-4 h-4 text-[#7C3AED] mt-0.5 mr-2 flex-shrink-0" />
                              <span>{line.substring(2)}</span>
                            </p>
                          ) : (
                            <p key={i} className="mb-2">{line}</p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reassurance Box */}
            <div className="mt-8 md:mt-12 bg-[#FFF7FA] rounded-xl p-5 md:p-6 border border-[#DC2626]/20 animate-on-scroll">
              <div className="flex flex-col md:flex-row">
                <div className="w-12 h-12 rounded-full bg-[#DC2626] flex items-center justify-center flex-shrink-0 mb-3 md:mb-0 md:mr-4">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#312E81] text-lg mb-2">Still have questions?</h3>
                  <p className="text-[#312E81] opacity-90 mb-3">
                    It's completely normal to feel unsure. You can:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-start">
                      <Phone className="w-4 h-4 text-[#DC2626] mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-[#6D28D9]">Call: +91 91529 87821</span>
                    </div>
                    <div className="flex items-start">
                      <MessageCircle className="w-4 h-4 text-[#DC2626] mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-[#6D28D9]">Email: support-Bodhi-Mitra@gbu.in</span>
                    </div>
                    <div className="flex items-start">
                      <User className="w-4 h-4 text-[#DC2626] mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-[#6D28D9]">Visit: Student Wellness Center, Room 205</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Talk?</h2>
            <p className="text-base md:text-lg lg:text-xl opacity-90 mb-6 px-2">
              No registration needed. Just choose what feels right for you right now.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
              <button 
                onClick={() => window.location.href = '/emergency'}
                className="flex flex-col items-center justify-center p-5 bg-[#DC2626] hover:bg-[#B91C1C] rounded-xl transition-all duration-300 active:scale-95 shadow-lg"
              >
                <AlertTriangle className="w-8 h-8 mb-2" />
                <span className="font-bold text-lg">Emergency Help</span>
                <span className="text-sm opacity-90 mt-1">For immediate distress</span>
              </button>
              
              <button 
                onClick={() => window.location.href = '/quick-connect'}
                className="flex flex-col items-center justify-center p-5 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 active:scale-95 backdrop-blur-sm"
              >
                <MessageCircle className="w-8 h-8 mb-2" />
                <span className="font-bold text-lg">Talk Now</span>
                <span className="text-sm opacity-90 mt-1">Anonymous chat in 30 sec</span>
              </button>
            </div>
            
            <p className="text-sm opacity-80 mt-6 px-2">
              You're not weak for needing help — you're strong for seeking it.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#4C1D95] to-[#312E81] text-white py-6 md:py-8 animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-10 h-10 bg-[#7C3AED] rounded-full flex items-center justify-center">
              <img 
    src="/images/logo.svg" 
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
            <span className="text-lg font-bold">Bodhi<span className="text-white/80">-Mitra</span></span>
          </div>
          <p className="opacity-80 text-sm">
            A student-first mental health platform — safe, private, and always here for you.
          </p>
        </div>
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeUp {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.98);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-up {
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-on-scroll {
          opacity: 0;
        }
        button {
          @apply active:scale-95 transition-transform;
        }
      `}</style>
    </div>
  );
}