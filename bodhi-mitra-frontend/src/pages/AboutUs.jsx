import React, { useEffect } from 'react';
import { 
  Heart, Shield, Users, Award, Lock, AlertTriangle, CheckCircle, GraduationCap,
  Mail, Phone, MapPin, Star, Calendar, TrendingUp, FileText, Medal
} from 'lucide-react';

export default function AboutUs() {
  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const safetyStandards = [
    { icon: Lock, title: 'End-to-End Encryption', desc: 'All chats are encrypted in transit and at rest. No third-party access.' },
    { icon: Users, title: 'Verified Professionals', desc: 'Every psychologist is RCI-licensed and university-vetted.' },
    { icon: AlertTriangle, title: 'Emergency Protocols', desc: '24/7 crisis response team trained in suicide prevention.' },
    { icon: Shield, title: 'Anti-Misuse System', desc: '3-strike policy protects counselors while keeping help accessible.' }
  ];

  const certifications = [
    { name: 'Gautam Buddha University', logo: <img 
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
    /> },
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
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">About Bodhi-Mitra</h1>
            <p className="text-base md:text-lg lg:text-xl opacity-90 max-w-2xl mx-auto px-2">
              A student-first mental health initiative by Gautam Buddha University — safe, anonymous, and always here for you.
            </p>
          </div>
        </div>
      </section>

      {/* 🎓 MESSAGES LAYOUT: VC + Our Story */}
      <section className="py-12 md:py-16 animate-on-scroll">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 1. VICE CHANCELLOR (LEFT) */}
            <div>
              <div className="relative bg-[#F5F3FF] rounded-2xl p-6 md:p-8 border border-[#DDD6FE] shadow-sm h-full">
                <div className="absolute top-4 right-4 w-32 h-44 md:w-40 md:h-48 rounded-lg overflow-hidden border-2 border-white shadow-lg z-10 transform">
                  <img
                    src="/images/leadership/vc.png"
                    alt="Prof. (Dr.) Arun Kumar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-[#7C3AED] flex items-center justify-center">
                          <span class="text-white text-lg font-bold">AK</span>
                        </div>
                      `;
                    }}
                  />
                </div>
                
                <div className="mb-4 pt-16">
                  <h5 className="text-lg md:text-xl font-italic text-[#11111]">From the Desk of Vice Chancellor</h5>
                  <h3 className="text-lg md:text-xl font-bold text-[#312E81]">Prof. Rana Pratap Singh</h3>
                  <p className="text-[#6D28D9]">Vice Chancellor, Gautam Buddha University</p>
                  <br /><br />
                </div>
                
                <div className="pt-4 border-t border-[#DDD6FE]">
                  <p className="text-[#312E81] text-sm md:text-base leading-relaxed">
                    The Department of Psychology and Mental Health, under the School of Humanities and Social Sciences, has consistently been at the forefront of mental health education and service delivery. It is with pride that I introduce “<span className="font-medium">Bodhi Mitra</span>,” an innovative digital platform designed to ensure continuous and comprehensive mental health support for our students at the campus.
                    <br /><br />
                    “<span className="font-medium">Bodhi Mitra</span>” embodies the essence of a mind-mate in your journey toward mental wellness. The platform provides round-the-clock access to licensed clinical psychologists, counselling psychologists, and trained professionals who are committed to addressing psychological needs ranging from stress, anxiety, and adjustment difficulties to crisis intervention and therapeutic care.
                    <br /><br />
                    Through one-to-one consultations, psychological assessments, crisis management, and ongoing therapeutic support, “<span className="font-medium">Bodhi Mitra</span>” offers a safe, confidential, and compassionate environment. Our aim is not only to provide immediate support but also to foster resilience and promote a culture of self-awareness, empathy, and mental health literacy within the university community.
                    <br /><br />
                    I am confident that this initiative will strengthen our collective efforts in building a nurturing environment where every student feels seen, supported, and empowered. I extend my heartfelt appreciation to the Department of Psychology and Mental Health and the team “<span className="font-medium">Bodhi Mitra</span>” for this commendable step toward promoting holistic wellbeing and inclusivity on our campus.
                    <br /><br />
                    I wish the entire team great success in their continued mission of care, compassion, and excellence.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Story + Name + GBU (RIGHT) */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#DDD6FE]">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#7C3AED] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-bold text-[#312E81] mb-3">Our Story</h3>
                    <p className="text-[#312E81] opacity-90 mb-3">
                      In recent days, it has become evident across the GBU campus that academic pressure is taking a serious toll on students, with 73% reporting feelings of being overwhelmed. Yet, despite the growing burden, only 12% come forward to seek help—often silenced by stigma, financial barriers, and the fear of being judged or exposed.
                    </p>
                    <p className="text-[#312E81] opacity-90">
                      Bodhi-Mitra was created to close this gap — offering immediate, anonymous, and free support from certified professionals.
                    </p>
                  </div>
                </div>
              </div>

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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎓 MESSAGES LAYOUT: DEAN + HOD */}
      <section className="py-12 md:py-16 bg-[#F5F3FF] animate-on-scroll">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 2. DEAN (LEFT) */}
            <div>
              <div className="relative bg-white rounded-2xl p-6 md:p-8 border border-[#DDD6FE] shadow-sm h-full">
                <div className="absolute top-4 right-4 w-32 h-44 md:w-40 md:h-48 rounded-lg overflow-hidden border-2 border-white shadow-lg z-10 transform">
                  <img
                    src="/images/leadership/dean.jpg"
                    alt="Dr. Anand Pratap Singh"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-[#7C3AED] flex items-center justify-center">
                          <span class="text-white text-lg font-bold">AS</span>
                        </div>
                      `;
                    }}
                  />
                </div>
                
                <div className="mb-4 pt-16">
                  <h5 className="text-lg md:text-xl font-italic text-[#11111]">From the Desk of Dean,</h5>
                  <h5 className="text-lg md:text-xl font-italic text-[#6D28D9]">School of Humanities and Social Sciences</h5>
                  <h3 className="text-lg md:text-xl font-bold text-[#312E81]">Dr. Madhav Govind</h3>
                  <p className="text-[#6D28D9]">Gautam Buddha University</p>
                  
                </div>
                
                <div className="pt-4 border-t border-[#DDD6FE]">
                  <p className="text-[#312E81] text-sm md:text-base leading-relaxed">
                    It gives me immense pride and joy to share the launch of “<span className="font-medium">Bodhi Mitra</span>”, an innovative digital initiative of the Department of Psychology and Mental Health under the School of Humanities and Social Sciences, Gautam Buddha University. Conceived with a deep sense of compassion and academic responsibility, “<span className="font-medium">Bodhi Mitra</span>” symbolizes our collective commitment to nurturing mental wellbeing, emotional resilience, and holistic development among our students.
                    <br /><br />
                    The changing times have highlighted the indispensability of mental health support in every sphere of life, particularly for young minds who are balancing academic demands and personal growth. In this context, “<span className="font-medium">Bodhi Mitra</span>” stands as a reliable digital platform offering seamless access to psychological care and guidance. With the help of licensed clinical psychologists, counselling professionals, and trained experts, the platform provides round-the-clock psychosocial and therapeutic support to students, both on campus and remotely.
                    <br /><br />
                    Beyond clinical assistance, “<span className="font-medium">Bodhi Mitra</span>” focuses on promoting mental health through sensitisation programmes, workshops, and ongoing awareness initiatives that enhance emotional literacy and destigmatize mental health concerns. The platform’s integrative approach, combining scientific understanding with empathy, reflects the ethos of the School of Humanities and Social Sciences, where human values and intellectual growth go hand in hand.
                    <br /><br />
                    I extend my heartfelt congratulations to the dedicated faculty, clinicians, and trainees of the Department of Psychology and Mental Health for conceptualizing and implementing this much-needed initiative. I am confident that “<span className="font-medium">Bodhi Mitra</span>” will serve as a beacon of hope, care, and transformation, ensuring that no student feels alone in their journey toward wellbeing.
                    <br /><br />
                    I sincerely wish the team great success in carrying forward this noble mission of mental health empowerment and compassionate support to GBU family.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. HOD (RIGHT) */}
            <div>
              <div className="relative bg-[#F5F3FF] rounded-2xl p-6 md:p-8 border border-[#DDD6FE] shadow-sm h-full">
                <div className="absolute top-4 right-4 w-32 h-44 md:w-40 md:h-48 rounded-lg overflow-hidden border-2 border-white shadow-lg z-10 transform">
                  <img
                    src="/images/leadership/hod.svg"
                    alt="Dr. Meena Sharma"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-[#7C3AED] flex items-center justify-center">
                          <span class="text-white text-lg font-bold">MS</span>
                        </div>
                      `;
                    }}
                  />
                </div>
                
                <div className="mb-4 pt-16">
                  <h5 className="text-lg md:text-xl font-italic text-[#11111]">From the Desk of HOD, </h5>
                  <h5 className="text-lg md:text-xl font-italic text-[#11111]">Psychology Department</h5>

                  <h3 className="text-lg md:text-xl font-bold text-[#312E81]">Dr. Anand Pratap Singh</h3>
                  <p className="text-[#6D28D9]">Gautam Buddha University</p>
                  
                </div>
                
                <div className="pt-4 border-t border-[#DDD6FE]">
                  <p className="text-[#312E81] text-sm md:text-base leading-relaxed">
                    Across the globe, there has been a steady and concerning rise in psychological and emotional difficulties, with university students representing a particularly vulnerable population. The transitional demands of higher education: academic pressure, identity formation, interpersonal challenges, financial stressors, and uncertainty about the future intersect with developmental and psychosocial vulnerabilities. These pressures have been further intensified in recent years by rapid social change, digital immersion, and the lingering psychosocial impact of global disruptions. As a result, concerns such as stress, anxiety, low mood, social withdrawal, sleep disturbances, and emotional dysregulation are increasingly reported among students, often remaining unrecognised until they significantly impair wellbeing and functioning.
                    <br /><br />
                    Within the university context, mental health is not peripheral to academic life; it is foundational to learning, growth, and meaningful engagement. As both the Head of the Department of Psychology and Mental Health and a practising Clinical Psychologist, I strongly believe that institutions of higher education carry an ethical responsibility to create environments that actively support psychological wellbeing, reduce stigma, and promote timely access to professional care.
                    <br /><br />
                    It is within this framework that <span className="font-medium">Bodhi Mitra</span> was conceptualised and developed. Bodhimitra is envisioned as a comprehensive, ethically grounded digital mental health platform that extends care beyond conventional boundaries of time and space. Its core purpose is to ensure that students and staff of Gautam Buddha University have access to confidential, professional, and responsive mental health support, whether they are navigating everyday stressors or experiencing significant psychological distress.
                    <br /><br />
                    <span className="font-medium">Bodhi Mitra</span> integrates individual psychological support, crisis response, and preventive mental health initiatives within a single platform. By combining one-to-one professional care with mental health promotion, awareness, and capacity-building activities, it seeks not only to respond to distress but also to strengthen resilience, self-awareness, and help-seeking behaviours within the university community.
                    <br /><br />
                    The vision of <span className="font-medium">Bodhi Mitra</span> is to foster a campus culture where mental health is acknowledged, protected, and prioritised, where seeking support is viewed as a strength rather than a limitation. Through this initiative, Gautam Buddha University reaffirms its commitment to safeguarding the psychological well-being of its students and staff, recognising that a mentally healthy academic community is essential for personal development, academic excellence, and collective growth.
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
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-[#DDD6FE] hover:shadow-md transition-shadow"
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
                className="bg-[#F5F3FF] rounded-xl p-6 flex flex-col items-center border border-[#DDD6FE]"
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
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
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
            <span className="ml-3 text-xl font-bold">Bodhi<span className="text-white/80">-Mitra</span></span>
          </div>
          <p className="opacity-90 max-w-2xl mx-auto px-2 text-sm">
            A student-first mental health platform, always here for you.
          </p>
          <div className="mt-4 pt-4 border-t border-white/20 text-xs opacity-80">
            © {new Date().getFullYear()} Bodhi-Mitra | Gautam Buddha University
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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