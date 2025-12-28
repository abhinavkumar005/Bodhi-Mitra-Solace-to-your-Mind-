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
  User2,
  FileCheck
} from 'lucide-react';

export default function AboutUs() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Staggered animation
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

  const psychologists = [
    {
      name: 'Dr. Ananya Mehta',
      title: 'Clinical Psychologist',
      qualification: 'Ph.D. Clinical Psychology, Gautam Buddha University',
      experience: '8 years',
      specialties: ['Student Mental Health', 'Crisis Intervention', 'Anxiety Disorders'],
      certifications: ['RCI Licensed', 'Certified CBT Practitioner'],
      image: 'https://placehold.co/300x300/EDE9FE/312E81?text=AM'
    },
    {
      name: 'Dr. Rajiv Sharma',
      title: 'Counseling Psychologist',
      qualification: 'M.Phil. Counseling Psychology, Gautam Buddha University',
      experience: '12 years',
      specialties: ['Depression', 'Academic Stress', 'Relationship Issues'],
      certifications: ['RCI Licensed', 'ASIST Suicide Prevention'],
      image: 'https://placehold.co/300x300/F5F3FF/312E81?text=RS'
    },
    {
      name: 'Dr. Priya Desai',
      title: 'Child & Adolescent Specialist',
      qualification: 'Ph.D. Developmental Psychology, Gautam Buddha University',
      experience: '6 years',
      specialties: ['Exam Anxiety', 'Hostel Adjustment', 'Family Conflict'],
      certifications: ['RCI Licensed', 'Trauma-Informed Care Certified'],
      image: 'https://placehold.co/300x300/DDD6FE/6D28D9?text=PD'
    },
    {
      name: 'Dr. Arjun Patel',
      title: 'Psychiatrist (Consulting)',
      qualification: 'MD Psychiatry, Gautam Buddha University',
      experience: '15 years',
      specialties: ['Medication Management', 'Severe Depression', 'Bipolar Disorders'],
      certifications: ['MCI Registered', 'Fellow, Indian Psychiatric Society'],
      image: 'https://placehold.co/300x300/E0D6FE/7C3AED?text=AP'
    }
  ];

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
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">We're Here for You</h1>
            <p className="text-base md:text-lg lg:text-xl opacity-90 max-w-2xl mx-auto px-2">
              Certified mental health professionals dedicated to student well-being — because no one should face their struggles alone.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 md:py-16 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#312E81] mb-3 md:mb-4">Our Purpose</h2>
            <p className="text-[#6D28D9] opacity-80 max-w-2xl mx-auto px-2">
              Bodhi-Mitra was born from a simple truth: students deserve mental health support that's fast, private, and truly understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-[#DDD6FE] animate-on-scroll">
              <div className="w-12 h-12 rounded-full bg-[#F5F3FF] flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-[#7C3AED]" />
              </div>
              <h3 className="text-xl font-bold text-[#312E81] mb-3">Our Vision</h3>
              <p className="text-[#312E81] opacity-90">
                To make mental health support accessible, stigma-free, and instantly available to every student — on their terms.
              </p>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-[#DDD6FE] animate-on-scroll">
              <div className="w-12 h-12 rounded-full bg-[#F5F3FF] flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#7C3AED]" />
              </div>
              <h3 className="text-xl font-bold text-[#312E81] mb-3">Our Mission</h3>
              <p className="text-[#312E81] opacity-90">
                We provide fast, confidential, student-friendly mental health support through certified professionals, ensuring emotional safety for every user.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Psychologists */}
      <section className="py-12 md:py-16 bg-white animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#312E81] mb-3 md:mb-4">Meet Our Psychologists</h2>
            <p className="text-[#6D28D9] opacity-80 max-w-2xl mx-auto px-2">
              Every counselor on Bodhi-Mitra is licensed, experienced, and specially trained in student mental health.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {psychologists.map((psych, index) => (
              <div 
                key={index} 
                className="bg-[#F5F3FF] rounded-xl md:rounded-2xl overflow-hidden hover:shadow-lg transition-shadow border border-[#DDD6FE] animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-40 md:h-48 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center border-2 md:border-4 border-white">
                    <span className="text-[#7C3AED] font-bold text-xl md:text-2xl">
                      {psych.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-bold text-[#312E81] text-base md:text-lg mb-1">{psych.name}</h3>
                  <p className="text-[#6D28D9] font-medium mb-2">{psych.title}</p>
                  
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center text-sm">
                      <GraduationCap className="w-4 h-4 text-[#7C3AED] mr-2 flex-shrink-0" />
                      <span className="text-[#312E81] opacity-80">{psych.qualification}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 text-[#7C3AED] mr-2 flex-shrink-0" />
                      <span className="text-[#312E81] opacity-80">{psych.experience} experience</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs font-medium text-[#312E81] opacity-70 mb-1.5">Specializes in:</p>
                    <div className="flex flex-wrap gap-1">
                      {psych.specialties.map((spec, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 bg-[#EDE9FE] text-[#6D28D9] text-xs rounded-full border border-[#DDD6FE]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-[#DDD6FE]">
                    <div className="flex flex-wrap gap-2">
                      {psych.certifications.map((cert, i) => (
                        <span 
                          key={i} 
                          className="flex items-center text-[10px] text-[#6D28D9] font-medium"
                        >
                          <CheckCircle className="w-3 h-3 mr-1 text-[#7C3AED]" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-12 text-center max-w-3xl mx-auto animate-on-scroll">
            <div className="bg-[#F5F3FF] rounded-xl md:rounded-2xl p-5 md:p-6 border-2 border-[#7C3AED]">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#7C3AED] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div className="text-left">
                  <h3 className="font-bold text-[#312E81] mb-2">Our Commitment to You</h3>
                  <p className="text-[#312E81] opacity-90">
                    Every psychologist undergoes a rigorous 3-step verification:
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
      <section className="py-12 md:py-16 bg-[#F5F3FF] animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#312E81] mb-3 md:mb-4">Verified & Certified</h2>
            <p className="text-[#6D28D9] opacity-80 max-w-2xl mx-auto px-2">
              We adhere to the highest national standards for mental health practice and student safety.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-8 md:mb-12">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 flex flex-col items-center shadow-sm border border-[#DDD6FE] animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#F5F3FF] flex items-center justify-center mb-3 md:mb-4">
                  <div className="text-[#312E81] font-bold text-base md:text-lg">{cert.logo}</div>
                </div>
                <h3 className="font-bold text-[#312E81] text-center text-sm md:text-base">{cert.name}</h3>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-12 max-w-4xl mx-auto animate-on-scroll">
            <div className="bg-[#FFF7FA] rounded-xl md:rounded-2xl p-5 md:p-6 border border-[#DC2626]/20">
              <div className="flex flex-col md:flex-row">
                <AlertTriangle className="w-6 h-6 text-[#DC2626] mt-0.5 mr-0 md:mr-3 mb-2 md:mb-0 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#312E81] mb-2">Ethical Practice Statement</h3>
                  <p className="text-[#312E81] opacity-90">
                    Bodhi-Mitra follows the <span className="font-medium">Indian Psychiatric Society Code of Ethics</span> and 
                    <span className="font-medium"> Rehabilitation Council of India Guidelines</span>. 
                    We maintain strict confidentiality and never share student data without explicit consent — except in life-threatening emergencies where safety is at risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Trust */}
      <section className="py-12 md:py-16 bg-white animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#312E81] mb-3 md:mb-4">Your Safety Is Our Priority</h2>
            <p className="text-[#6D28D9] opacity-80 max-w-2xl mx-auto px-2">
              We've built multiple layers of protection so you can seek help with complete confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto mb-8 md:mb-12">
            {safetyStandards.map((standard, index) => (
              <div 
                key={index} 
                className="bg-[#F5F3FF] rounded-xl md:rounded-2xl p-5 md:p-6 text-center hover:bg-white transition-colors border border-[#DDD6FE] animate-on-scroll"
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

          <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-[#F5F3FF] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[#DDD6FE] animate-on-scroll">
                <div className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-[#312E81] mb-2">Privacy by Design</h4>
                <ul className="text-[#312E81] opacity-80 space-y-1 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-[#7C3AED] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Anonymous option for all chats</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-[#7C3AED] mr-2 mt-0.5 flex-shrink-0" />
                    <span>No data stored without consent</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-[#7C3AED] mr-2 mt-0.5 flex-shrink-0" />
                    <span>GDPR & DPDP Act compliant</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#F5F3FF] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[#DDD6FE] animate-on-scroll">
                <div className="w-10 h-10 rounded-full bg-[#DC2626] flex items-center justify-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-[#312E81] mb-2">Emergency Response</h4>
                <ul className="text-[#312E81] opacity-80 space-y-1 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-[#DC2626] mr-2 mt-0.5 flex-shrink-0" />
                    <span>≤30 second response time target</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-[#DC2626] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Campus location sharing (opt-in)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-[#DC2626] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Escalation to senior psychologists</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#FFF7FA] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[#DC2626]/20 animate-on-scroll">
                <div className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-[#312E81] mb-2">Anti-Misuse Protection</h4>
                <ul className="text-[#312E81] opacity-80 space-y-1 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-[#7C3AED] mr-2 mt-0.5 flex-shrink-0" />
                    <span>3-strike system for emergency abuse</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-[#7C3AED] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Psychologist can flag misuse</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-[#7C3AED] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Genuine emergencies always prioritized</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-[#4C1D95] to-[#312E81] text-white animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">We're Here to Help</h2>
            <p className="text-base md:text-lg lg:text-xl opacity-90 px-2">
              Have questions? Need support? We're just a message away.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-8 md:mb-12">
            {[
              { icon: Mail, title: 'Email Support', text: 'support-Bodhi-Mitra@gbu.in', sub: 'Response within 24 hours' },
              { icon: Phone, title: 'Phone Support', text: '+91 91529 87821', sub: 'Mon-Sat, 9 AM - 9 PM' },
              { icon: MapPin, title: 'Campus Office', text: 'Student Wellness Center', sub: 'Room 205, Psychology Department' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 text-center animate-on-scroll"
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

          <div className="mt-6 md:mt-8 max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 text-center animate-on-scroll">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Prefer us to contact you?</h3>
            <p className="opacity-90 mb-3 md:mb-4 px-2">
              Leave your details and we'll call you back at a time that works for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="text" 
                placeholder="Your name" 
                className="flex-1 px-4 py-3 rounded-xl text-[#312E81] bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              />
              <button 
                className="px-5 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-xl transition-colors whitespace-nowrap"
              >
                Request Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#4C1D95] to-[#312E81] text-white py-8 md:py-10 animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center">
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
          </div>
          <p className="opacity-90 max-w-2xl mx-auto px-2 text-sm md:text-base">
            A student-first mental health platform — certified, confidential, and always here for you.
          </p>
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/20 text-xs md:text-sm opacity-80">
            © {new Date().getFullYear()} Bodhi-Mitra. All rights reserved. 
            Certified by National Mental Health Council & RCI.
          </div>
        </div>
      </footer>

      {/* Global Animations */}
      <style jsx>{`
        @keyframes fadeUp {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95);
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
        button, [role="button"] {
          transition: all 0.2s ease;
        }
        button:hover {
          transform: translateY(-2px);
        }
        button:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>
    </div>
  );
}