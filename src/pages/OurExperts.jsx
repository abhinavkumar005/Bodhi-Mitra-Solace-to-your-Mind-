import React from 'react';
import { GraduationCap, User } from 'lucide-react';

export default function OurExperts() {
  // ✅ SECTION 1: HEAD / DEAN
  const dean = {
    name: 'Dr. Anand Pratap Singh',
    title: 'Head, Consultant Clinical Psychologist',
    image: '/images/experts/dean.svg'
  };

  // ✅ SECTION 2: SENIOR CONSULTANT
  const seniorConsultant = {
    name: 'Dr. Anu Malik',
    title: 'Consultant Counselling Psychologist',
    image: '/images/experts/anu-malik.svg'
  };

  // ✅ SECTION 3: CONSULTANT PSYCHOLOGISTS
  const consultants = [
    { name: 'Dr. Anu Teotia', title: 'Consultant Counselling Psychologist', image: '/images/experts/anu-teotia.svg' },
    { name: 'Dr. Ashfia Nishat', title: 'Consultant Counselling Psychologist', image: '/images/experts/ashfia-nishat.svg' },
    { name: 'Dr. Munmun Lepcha', title: 'Consultant Counselling Psychologist', image: '/images/experts/munmun-lepcha.svg' },
    { name: 'Dr. Puja Kumari', title: 'Consultant Counselling Psychologist', image: '/images/experts/puja-kumari.svg' },
    { name: 'Dr. Shipra Sharma', title: 'Consultant Counselling Psychologist', image: '/images/experts/shipra-sharma.svg' },
    { name: 'Ms. Aastha Gupta', title: 'Consultant Counselling Psychologist', image: '/images/experts/aastha-gupta.svg' },
    { name: 'Ms. Gayatri Kumar', title: 'Consultant Clinical Psychologist', image: '/images/experts/gayatri-kumar.svg' },
    { name: 'Ms. Mansi Sengar', title: 'Consultant Clinical Psychologist', image: '/images/experts/mansi-sengar.svg' },
    { name: 'Ms. Nikita Yadav', title: 'Consultant Counselling Psychologist', image: '/images/experts/nikita-yadav.svg' },
    { name: 'Ms. Ritu Sahu', title: 'Consultant Counselling Psychologist', image: '/images/experts/ritu-sahu.svg' },
    { name: 'Ms. Samiya Ayaz', title: 'Consultant Clinical Psychologist', image: '/images/experts/samiya-ayaz.svg' }
  ];

  // ✅ SECTION 4: TRAINEES
  const trainees = [
    { name: 'Priya Verma', title: 'Trainee Psychologist' },
    { name: 'Arjun Mehta', title: 'Trainee Psychologist' },
    { name: 'Zara Khan', title: 'Trainee Psychologist' },
    { name: 'Rohan Das', title: 'Trainee Psychologist' }
  ];

  return (
    <div className="min-h-screen bg-[#EDE9FE] pb-12">
      {/* Hero Section */}
      <section className="bg-white border-b border-[#DDD6FE] py-8 md:py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#312E81]">Our Experts</h1>
          <p className="text-[#6D28D9] mt-2 max-w-2xl mx-auto px-2">
            A dedicated team of certified mental health professionals supporting student well-being with care and confidentiality.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* 🥇 SECTION 1: HEAD / DEAN */}
        <section className="mb-12 md:mb-16">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-[#312E81] flex items-center justify-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#7C3AED]" />
              Head of the Department
            </h2>
          </div>
          
          <div className="flex justify-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#7C3AED] shadow-lg">
              <img
                src={dean.image}
                alt={dean.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full bg-[#7C3AED] flex items-center justify-center">
                      <span class="text-white text-2xl font-bold">${dean.name.split(' ')[0].charAt(0)}${dean.name.split(' ')[1].charAt(0)}</span>
                    </div>
                  `;
                }}
              />
            </div>
          </div>
          
          <div className="mt-6 text-center max-w-md mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-[#312E81]">{dean.name}</h3>
            <p className="text-[#6D28D9] mt-1">{dean.title}</p>
          </div>
        </section>

        {/* 🥈 SECTION 2: SENIOR CONSULTANT */}
        <section className="mb-12 md:mb-16">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-[#312E81] flex items-center justify-center gap-2">
              <User className="w-5 h-5 text-[#7C3AED]" />
              Senior Consultant
            </h2>
          </div>
          
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#DDD6FE] shadow-md">
              <img
                src={seniorConsultant.image}
                alt={seniorConsultant.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full bg-[#7C3AED] flex items-center justify-center">
                      <span class="text-white text-xl font-bold">${seniorConsultant.name.split(' ')[0].charAt(0)}${seniorConsultant.name.split(' ')[1].charAt(0)}</span>
                    </div>
                  `;
                }}
              />
            </div>
          </div>
          
          <div className="mt-4 text-center max-w-md mx-auto">
            <h3 className="text-lg md:text-xl font-bold text-[#312E81]">{seniorConsultant.name}</h3>
            <p className="text-[#6D28D9] mt-1">{seniorConsultant.title}</p>
          </div>
        </section>

        {/* 🥉 SECTION 3: CONSULTANT PSYCHOLOGISTS */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-lg md:text-xl font-semibold text-[#312E81] text-center mb-8 flex items-center justify-center gap-2">
            <User className="w-5 h-5 text-[#7C3AED]" />
            Consultant Psychologists
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {consultants.map((consultant, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-5 text-center shadow-sm border border-[#DDD6FE] hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#F5F3FF]">
                  <img
                    src={consultant.image}
                    alt={consultant.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-[#7C3AED] flex items-center justify-center">
                          <span class="text-white text-lg font-bold">
                            ${consultant.name.split(' ').slice(0, 2).map(n => n.charAt(0)).join('')}
                          </span>
                        </div>
                      `;
                    }}
                  />
                </div>
                <h3 className="font-bold text-[#312E81] mt-4 text-base">{consultant.name}</h3>
                <p className="text-[#6D28D9] text-sm mt-1">{consultant.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🎓 SECTION 4: TRAINEES */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-lg md:text-xl font-semibold text-[#312E81] text-center mb-6 flex items-center justify-center gap-2">
            <User className="w-5 h-5 text-[#7C3AED]" />
            Trainee Psychologists
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trainees.map((trainee, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-4 text-center shadow-sm border border-[#DDD6FE] hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-[#F5F3FF] bg-[#F5F3FF] flex items-center justify-center">
                  <span className="text-[#7C3AED] text-sm font-bold">
                    {trainee.name.split(' ').slice(0, 2).map(n => n.charAt(0)).join('')}
                  </span>
                </div>
                <h3 className="font-bold text-[#312E81] mt-3 text-sm">{trainee.name}</h3>
                <p className="text-[#6D28D9] text-xs mt-1">{trainee.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🛡️ TRUST & ETHICS NOTE */}
        <section className="mt-12 pt-6 border-t border-[#DDD6FE]">
          <div className="bg-[#F5F3FF] rounded-xl p-4 md:p-5 max-w-4xl mx-auto">
            <p className="text-center text-sm text-[#312E81] opacity-90">
              <span className="font-medium">🛡️ Trust Note:</span> All experts associated with Bodhi-mitra are verified professionals.  
              Student interactions are confidential and conducted only within the platform.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}