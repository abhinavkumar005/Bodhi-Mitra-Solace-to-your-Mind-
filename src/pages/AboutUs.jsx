import React, { useEffect } from 'react';
import { 
  Heart, 
  Shield, 
  Users, 
  Award, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin,
  Star,
  Calendar,
  TrendingUp,
  FileText,
  Medal
} from 'lucide-react';

export default function AboutUs() {
  // Scroll-triggered staggered animations
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

  const safetyStandards = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      desc: 'All chats are encrypted in transit and at rest. No third-party access.'
    },
    {
      icon: Users,
      title: 'Verified Professionals',
      desc: 'Every psychologist is RCI-licensed and university-vetted.'
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Protocols',
      desc: '24/7 crisis response team trained in suicide prevention.'
    },
    {
      icon: Shield,
      title: 'Anti-Misuse System',
      desc: '3-strike policy protects counselors while keeping help accessible.'
    }
  ];

  const certifications = [
    { name: 'Rehabilitation Council of India', logo: 'RCI' },
    { name: 'National Mental Health Policy', logo: 'NMHP' },
    { name: 'Gautam Buddha University', logo: 'GBU' },
    { name: 'ASIST Suicide Prevention', logo: 'ASIST' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3FF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4C1D95] to-[#312E81] text-white py-12 md:py-16 animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <div className="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">About Bodhi-Mitra</h1>
            <p className="text-base md:text-lg lg:text-xl opacity-90 max-w-2xl mx-auto px-2">
              A student-first mental health initiative by Gautam Buddha University — safe, anonymous, and always here for you.
            </p>
          </div>
        </div>
      </section>

      {/* About Bodhi-Mitra */}
      <section className="py-12 md:py-16 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#312E81] mb-4">Our Story</h2>
            <p className="text-[#6D28D9] opacity-80 max-w-4xl mx-auto px-2">
              Bodhi-Mitra was born from a simple truth: students deserve mental health support that’s fast, private, and truly understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#DDD6FE]">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#7C3AED] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-bold text-[#312E81] mb-3">Why We Started</h3>
                    <p className="text-[#312E81] opacity-90 mb-3">
                      In 2024, a campus survey revealed that 73% of GBU students reported feeling overwhelmed by academic pressure — yet only 12% sought help due to stigma, cost, or fear of exposure.
                    </p>
                    <p className="text-[#312E81] opacity-90">
                      Bodhi-Mitra was created to close this gap — offering immediate, anonymous, and free support from certified professionals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="space-y-4">
                <div className="bg-[#F5F3FF] rounded-xl p-5 border border-[#7C3AED]">
                  <div className="flex">
                    <div className="w-2 h-2 bg-[#7C3AED] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-[#312E81]">Our Name</h3>
                      <p className="text-[#6D28D9] text-sm mt-1">
                        <span className="font-medium">Bodhi</span> = Awakening (Sanskrit)  
                        <span className="font-medium">Mitra</span> = Friend (Sanskrit)  
                        → “Awakening Friend”
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-[#DDD6FE]">
                  <div className="flex items-center">
                    <Medal className="w-5 h-5 text-[#7C3AED] mr-3" />
                    <div>
                      <h3 className="font-bold text-[#312E81]">GBU Initiative</h3>
                      <p className="text-[#6D28D9] text-sm mt-1">
                        Developed under the guidance of the Vice-Chancellor and Psychology Department — fully integrated with campus wellness programs.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFF7FA] rounded-xl p-5 border border-[#DC2626]/20">
                  <div className="flex">
                    <AlertTriangle className="w-5 h-5 text-[#DC2626] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-[#312E81]">Ethical Commitment</h3>
                      <p className="text-[#6D28D9] text-sm mt-1">
                        We follow RCI guidelines and DPDP Act 2023. Student data is never shared with colleges, parents, or authorities — without explicit consent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ MESSAGES: VC → DEAN → HOD (line by line, no "Leadership" header) */}
      <section className="py-12 md:py-16 bg-white animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#312E81] mb-4">Messages from Gautam Buddha University</h2>
            <p className="text-[#6D28D9] opacity-80 max-w-2xl mx-auto">
              Guidance and vision from university leaders
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {/* 🎓 VC Message */}
            <div className="bg-[#F5F3FF] rounded-xl overflow-hidden shadow-sm border border-[#DDD6FE]">
              <div className="h-32 bg-gradient-to-r from-[#4C1D95] to-[#312E81] flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white overflow-hidden border-2 border-white shadow-lg">
                  <img
                    src="/images/leadership/vc.jpg"
                    alt="Prof. Rana Pratap Singh"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-[#7C3AED] flex items-center justify-center">
                          <span class="text-white text-xl font-bold">AK</span>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
              <div className="p-5">
                <div className="text-center mb-3">
                  <h3 className="font-bold text-[#312E81] text-lg">Prof. (Dr.) Arun Kumar</h3>
                  <p className="text-[#6D28D9] text-sm">Vice-Chancellor</p>
                  <p className="text-[#6D28D9] text-xs opacity-70 mt-1">Gautam Buddha University</p>
                </div>
                <div className="pt-3 border-t border-[#DDD6FE]">
                  <p className="text-[#312E81] text-sm italic leading-relaxed">
                    “Bodhi-Mitra embodies our university's commitment to holistic student development. Mental health is not a luxury — it's a necessity. I commend this initiative for creating a safe, stigma-free space where students can seek help with dignity.”
                  </p>
                </div>
              </div>
            </div>

            {/* 🩺 Dean Message */}
            <div className="bg-[#F5F3FF] rounded-xl overflow-hidden shadow-sm border border-[#DDD6FE]">
              <div className="h-32 bg-gradient-to-r from-[#4C1D95] to-[#312E81] flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white overflow-hidden border-2 border-white shadow-lg">
                  <img
                    src="/images/leadership/dean.jpg"
                    alt="Dr. Anand Pratap Singh"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-[#7C3AED] flex items-center justify-center">
                          <span class="text-white text-xl font-bold">AS</span>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
              <div className="p-5">
                <div className="text-center mb-3">
                  <h3 className="font-bold text-[#312E81] text-lg">Dr. Anand Pratap Singh</h3>
                  <p className="text-[#6D28D9] text-sm">Head, Consultant Clinical Psychologist</p>
                  <p className="text-[#6D28D9] text-xs opacity-70 mt-1">School of Psychological Sciences</p>
                </div>
                <div className="pt-3 border-t border-[#DDD6FE]">
                  <p className="text-[#312E81] text-sm italic leading-relaxed">
                    “As Dean, my vision is simple: no student should suffer in silence. Bodhi-Mitra is not just a platform — it's a promise. A promise of confidentiality, compassion, and evidence-based care — available 24/7, right from your phone.”
                  </p>
                </div>
              </div>
            </div>

            {/* 🧠 HOD Message */}
            <div className="bg-[#F5F3FF] rounded-xl overflow-hidden shadow-sm border border-[#DDD6FE]">
              <div className="h-32 bg-gradient-to-r from-[#4C1D95] to-[#312E81] flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white overflow-hidden border-2 border-white shadow-lg">
                  <img
                    src="/images/leadership/hod.jpg"
                    alt="Dr. Meena Sharma"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-[#7C3AED] flex items-center justify-center">
                          <span class="text-white text-xl font-bold">MS</span>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
              <div className="p-5">
                <div className="text-center mb-3">
                  <h3 className="font-bold text-[#312E81] text-lg">Dr. Meena Sharma</h3>
                  <p className="text-[#6D28D9] text-sm">Head of Department</p>
                  <p className="text-[#6D28D9] text-xs opacity-70 mt-1">Psychology Department, GBU</p>
                </div>
                <div className="pt-3 border-t border-[#DDD6FE]">
                  <p className="text-[#312E81] text-sm italic leading-relaxed">
                    “Our department stands firmly behind Bodhi-Mitra. Every psychologist on this platform is rigorously vetted, trained in student-specific crisis protocols, and committed to ethical practice. Your trust is our highest priority.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Trust */}
      <section className="py-12 md:py-16 bg-[#F5F3FF] animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#312E81] mb-4">Your Safety Is Our Priority</h2>
            <p className="text-[#6D28D9] opacity-80 max-w-2xl mx-auto px-2">
              We've built multiple layers of protection so you can seek help with complete confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {safetyStandards.map((standard, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-[#DDD6FE] hover:shadow-md transition-shadow animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center mx-auto mb-4">
                  <standard.icon className="w-7 h-7 text-[#7C3AED]" />
                </div>
                <h3 className="font-bold text-[#312E81] mb-2">{standard.title}</h3>
                <p className="text-[#312E81] opacity-80 text-sm">{standard.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-[#F5F3FF] rounded-xl p-6 border-2 border-[#7C3AED]">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#7C3AED] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h3 className="font-bold text-[#312E81] mb-2">Our Commitment to You</h3>
                  <p className="text-[#312E81] opacity-90">
                    Every psychologist on Bodhi-Mitra undergoes a rigorous 3-step verification:
                    <br />
                    <span className="font-medium">1.</span> License validation with RCI  
                    <br />
                    <span className="font-medium">2.</span> Background check & reference verification  
                    <br />
                    <span className="font-medium">3.</span> Student-specific crisis training
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 md:py-16 bg-white animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#312E81] mb-4">Verified & Certified</h2>
            <p className="text-[#6D28D9] opacity-80 max-w-2xl mx-auto px-2">
              We adhere to the highest national standards for mental health practice.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="bg-[#F5F3FF] rounded-xl p-6 flex flex-col items-center border border-[#DDD6FE] animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-[#EDE9FE] flex items-center justify-center mb-4">
                  <div className="text-[#312E81] font-bold text-lg">{cert.logo}</div>
                </div>
                <h3 className="font-bold text-[#312E81] text-center text-sm">{cert.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-[#4C1D95] to-[#312E81] text-white animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">We're Here to Help</h2>
            <p className="text-base md:text-lg opacity-90 px-2">
              Have questions? Need support? We're just a message away.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Mail, title: 'Email Support', text: 'support-Bodhi-Mitra@gbu.in', sub: 'Response within 24 hours' },
              { icon: Phone, title: 'Phone Support', text: '+91 91529 87821', sub: 'Mon-Sat, 9 AM - 9 PM' },
              { icon: MapPin, title: 'Campus Office', text: 'Student Wellness Center', sub: 'Room 205, Psychology Department' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center animate-on-scroll"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="opacity-90">{item.text}</p>
                <p className="text-sm opacity-75 mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#4C1D95] to-[#312E81] text-white py-8 md:py-10 animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-[#7C3AED] rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold">Bodhi<span className="text-white/80">-Mitra</span></span>
          </div>
          <p className="opacity-90 max-w-2xl mx-auto px-2 text-sm">
            A student-first mental health platform — certified, confidential, and always here for you.
          </p>
          <div className="mt-4 pt-4 border-t border-white/20 text-xs opacity-80">
            © {new Date().getFullYear()} Bodhi-Mitra | Gautam Buddha University
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeUp {
          from { 
            opacity: 0; 
            transform: translateY(24px) scale(0.98);
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
      `}</style>
    </div>
  );
}