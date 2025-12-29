import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  AlertTriangle, 
  Shield, 
  User, 
  Heart,
  FileText, 
  MessageCircle, 
  Clock, 
  CheckCircle,
  Linkedin,
  MessageSquare,
  Globe,
  X as CloseIcon
} from 'lucide-react';

// Inline SVG for WhatsApp
const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.883 11.883 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// Inline SVG for Instagram
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.204.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.204 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.204-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default function ContactUs() {
  const [issueCategory, setIssueCategory] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Scroll-triggered animations
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

  const crisisNumbers = [
    { name: 'Bodhi-Mitra Crisis Line', number: '+91 91529 87821', desc: '24/7 student support' },
    { name: 'Police Emergency', number: '100', desc: 'Immediate danger' },
    { name: 'Women Helpline', number: '1091', desc: 'Gender-based emergencies' },
    { name: 'National Suicide Helpline', number: '91529 87821', desc: 'Confidential counseling' },
    { name: 'Vandrevala Foundation', number: '9999 666 555', desc: 'Mental health crisis' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setIssueCategory('');
      setIssueDescription('');
      setContactInfo('');
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F3FF]">
      {/* Emergency Banner */}
      <div className="bg-[#DC2626] text-white py-3 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center text-sm">
            <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="font-medium">
              In immediate danger? Call <span className="underline">100</span> or our crisis line: <span className="underline">+91 91529 87821</span>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[#4C1D95] to-[#312E81] text-white animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">We're Here to Help</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Multiple ways to reach us — whether it's a technical issue, feedback, or urgent support.
            </p>
          </div>
        </div>
      </section>

      {/* Crisis Hotlines */}
      <section className="py-12 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#312E81] mb-2">📞 Emergency Crisis Hotlines</h2>
              <p className="text-[#6D28D9] opacity-80">
                If you're in immediate danger or severe distress, call these numbers now:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {crisisNumbers.map((hotline, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-5 shadow-sm border border-[#DDD6FE] hover:shadow-md transition-shadow animate-on-scroll"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="font-bold text-[#312E81] mb-1">{hotline.name}</h3>
                  <div className="flex items-center mb-2">
                    <Phone className="w-4 h-4 text-[#DC2626] mr-2" />
                    <a href={`tel:${hotline.number.replace(/\s/g, '')}`} className="text-[#DC2626] font-bold text-lg hover:underline">
                      {hotline.number}
                    </a>
                  </div>
                  <p className="text-sm text-[#312E81] opacity-80">{hotline.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#F5F3FF] border-2 border-[#7C3AED] rounded-xl p-5 animate-on-scroll">
              <div className="flex">
                <div className="w-2 h-2 bg-[#7C3AED] rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                <div>
                  <h3 className="font-bold text-[#312E81]">Remember:</h3>
                  <p className="text-[#312E81] opacity-90 mt-1">
                    These lines are staffed by trained professionals who understand student mental health crises. 
                    You won't be judged — only supported.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Report an Issue */}
              <div className="bg-white rounded-xl shadow-sm border border-[#DDD6FE] p-6 animate-on-scroll">
                <div className="flex items-center mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#F5F3FF] flex items-center justify-center mr-3">
                    <FileText className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#312E81]">Report an Issue</h2>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#312E81] mb-2">
                        Issue Category <span className="text-[#DC2626]">*</span>
                      </label>
                      <select
                        value={issueCategory}
                        onChange={(e) => setIssueCategory(e.target.value)}
                        className="w-full px-4 py-3 border border-[#DDD6FE] rounded-xl focus:ring-2 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED] outline-none transition"
                        required
                      >
                        <option value="">Select an issue</option>
                        <option value="technical">App not working</option>
                        <option value="chat">Chat not connecting</option>
                        <option value="emergency">Emergency button issue</option>
                        <option value="login">Login/OTP problems</option>
                        <option value="misuse">Report misuse</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#312E81] mb-2">
                        Description <span className="text-[#DC2626]">*</span>
                      </label>
                      <textarea
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                        placeholder="Please describe what happened..."
                        className="w-full px-4 py-3 border border-[#DDD6FE] rounded-xl focus:ring-2 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED] outline-none transition h-32"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#312E81] mb-2">
                        Contact Information (Optional)
                      </label>
                      <input
                        type="text"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder="Email or phone (for follow-up)"
                        className="w-full px-4 py-3 border border-[#DDD6FE] rounded-xl focus:ring-2 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED] outline-none transition"
                      />
                      <p className="text-xs text-[#6D28D9] opacity-80 mt-1">
                        We respect anonymity — this is only for follow-up if you want a response.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Submit Report
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>

                {showSuccess && (
                  <div className="mt-4 p-3 bg-[#F5F3FF] border border-[#7C3AED]/50 rounded-lg flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#7C3AED] mr-2" />
                    <span className="text-[#312E81] font-medium">
                      Thank you! Your report has been submitted. We'll review it shortly.
                    </span>
                    <button 
                      onClick={() => setShowSuccess(false)}
                      className="ml-auto text-[#7C3AED] hover:text-[#312E81]"
                    >
                      <CloseIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Technical Support & Office Info */}
              <div className="space-y-6">
                {/* Technical Support */}
                <div className="bg-white rounded-xl shadow-sm border border-[#DDD6FE] p-6 animate-on-scroll">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#F5F3FF] flex items-center justify-center mr-3">
                      <MessageCircle className="w-5 h-5 text-[#7C3AED]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#312E81]">Technical Support</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-[#F5F3FF] rounded-lg p-4 border border-[#DDD6FE]">
                      <h3 className="font-medium text-[#312E81] mb-2">Quick Solutions</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-[#7C3AED] mt-1 mr-2 flex-shrink-0" />
                          <span className="text-[#312E81] opacity-80">App crashing? Try restarting your device</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-[#7C3AED] mt-1 mr-2 flex-shrink-0" />
                          <span className="text-[#312E81] opacity-80">Chat not loading? Check your internet connection</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-[#7C3AED] mt-1 mr-2 flex-shrink-0" />
                          <span className="text-[#312E81] opacity-80">OTP not received? Wait 60 seconds before resending</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex flex-col items-center justify-center p-4 bg-[#F5F3FF] hover:bg-[#EDE9FE] border border-[#DDD6FE] rounded-xl transition-colors">
                        <Clock className="w-6 h-6 text-[#7C3AED] mb-2" />
                        <span className="text-sm font-medium text-[#312E81]">Live Chat Support</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-4 bg-[#F5F3FF] hover:bg-[#EDE9FE] border border-[#DDD6FE] rounded-xl transition-colors">
                        <FileText className="w-6 h-6 text-[#7C3AED] mb-2" />
                        <span className="text-sm font-medium text-[#312E81]">Support Tickets</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Office Information */}
                <div className="bg-white rounded-xl shadow-sm border border-[#DDD6FE] p-6 animate-on-scroll">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#F5F3FF] flex items-center justify-center mr-3">
                      <MapPin className="w-5 h-5 text-[#7C3AED]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#312E81]">Our Campus Office</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-[#312E81] mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-[#312E81]">Student Wellness Center</p>
                        <p className="text-[#312E81] opacity-80">Room 205, Admin Building</p>
                        <p className="text-[#312E81] opacity-80">Gautam Buddha University</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-[#312E81] mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-[#312E81]">Office Hours</p>
                        <p className="text-[#312E81] opacity-80">Mon-Sat: 9 AM - 6 PM</p>
                        <p className="text-[#6D28D9] opacity-80 text-sm">*Psychologists available 24/7 online</p>
                      </div>
                    </div>
                    
                    <div className="bg-[#F5F3FF] rounded-lg p-3 border border-[#DDD6FE]">
                      <p className="text-sm text-[#312E81] opacity-80">
                        <span className="font-medium">Visit us for:</span><br />
                        • In-person counseling appointments<br />
                        • Technical assistance<br />
                        • Feedback sessions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Support */}
      <section className="py-12 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[#F5F3FF] rounded-xl p-8 border-2 border-[#7C3AED] text-center animate-on-scroll">
            <div className="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#312E81] mb-2">Email Support</h2>
            <p className="text-[#6D28D9] opacity-90 mb-4">
              For feedback, complaints, psychologist concerns, or general inquiries
            </p>
            <a 
              href="mailto:support-Bodhi-Mitra@gbu.in" 
              className="text-xl font-bold text-[#7C3AED] hover:underline flex items-center justify-center mx-auto"
            >
              support-Bodhi-Mitra@gbu.in
            </a>
            <p className="text-sm text-[#6D28D9] opacity-70 mt-2">
              Expected response time: Within 24 hours
            </p>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-12 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#312E81] mb-2">Join Our Community</h2>
            <p className="text-[#6D28D9] opacity-80 mb-6">
              Follow us for mental health tips, campus events, and student stories
            </p>
            
            <div className="flex justify-center space-x-4">
              <a 
                href="#" 
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E4405F] hover:scale-105 transition-transform"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-6 h-6 text-white" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#25D366] hover:scale-105 transition-transform"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-6 h-6 text-white" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#7C3AED] hover:scale-105 transition-transform"
                aria-label="Community Chat"
              >
                <MessageSquare className="w-6 h-6 text-white" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#0A66C2] hover:scale-105 transition-transform"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </a>
            </div>
            
            <div className="mt-6 bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl p-4 inline-block animate-on-scroll">
              <p className="text-sm text-[#6D28D9] opacity-80">
                <span className="font-medium">Note:</span> Social media is for community support only. 
                For personal mental health concerns, please use our secure chat or call our crisis line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Footer */}
      <section className="py-8 bg-gradient-to-r from-[#4C1D95] to-[#312E81] text-white animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-12 h-12 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Your Safety Is Our Priority</h3>
            <p className="opacity-90">
              All reports are reviewed by our Ethics & Safety Team. 
              We follow RCI guidelines and maintain strict confidentiality.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-[#4C1D95] to-[#312E81] text-white py-6 animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-[#7C3AED] rounded-full flex items-center justify-center">
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
            © {new Date().getFullYear()} Bodhi-Mitra. Certified by RCI & National Mental Health Council.
          </p>
        </div>
      </footer>

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