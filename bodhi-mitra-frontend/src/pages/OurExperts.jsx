import React from 'react';
import { GraduationCap, User } from 'lucide-react';

export default function OurExperts() {
  // ✅ SECTION 1: HEAD / DEAN
  
  const dean = {
    name: 'Dr. Anand Pratap Singh',
    title: 'Head, Consultant Clinical Psychologist',
    image: '/images/experts/dean.svg'
  };

  // ✅ SECTION 2: HIGHLIGHTED TRIAD (Ashfia, Anu, Puja)
  const highlighted = [
    { name: 'Dr. Ashfia Nishat', title: 'Consultant Counselling Psychologist', image: '/images/experts/ashfia-nishat.svg' },
    { name: 'Dr. Anu Malik', title: 'Consultant Counselling Psychologist', image: '/images/experts/anu-malik.svg' },
    { name: 'Dr. Puja Kumari', title: 'Consultant Counselling Psychologist', image: '/images/experts/puja-kumari.svg' }
  ];

  // ✅ SECTION 3: REMAINING CONSULTANTS
  const remainingConsultants = [
    { name: 'Dr. Anu Teotia', title: 'Consultant Counselling Psychologist', image: '/images/experts/anu-teotia.svg' },
    { name: 'Dr. Munmun Lepcha', title: 'Consultant Counselling Psychologist', image: '/images/experts/munmun-lepcha.svg' },
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
    { name: 'Mr. Vivek Khatkar', title: 'Trainee Psychologist', image: '/images/experts/vivek-khatkar.svg' },
    { name: 'Ms. Vanshika Thukral', title: 'Trainee Psychologist', image: '/images/experts/vanshika-thukral.svg' },
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
        {/* 🥇 SECTION 1: HEAD / DEAN — IN WHITE CARD */}
        <section className="mb-12 md:mb-16">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-[#312E81] flex items-center justify-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#7C3AED]" />
              Head of the Department
            </h2>
          </div>

          {/* Single centered card (white background, like consultants) */}
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-[#DDD6FE]">
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-[#F5F3FF]">
                <img
                  src={dean.image}
                  alt={dean.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-[#312E81] mt-4 text-xl">{dean.name}</h3>
              <p className="text-[#6D28D9] mt-1 text-base">{dean.title}</p>
            </div>
          </div>
        </section>

        {/* ✅ SECTION 2: HIGHLIGHTED TRIAD — HORIZONTAL LINE */}
        <section className="mb-12 md:mb-16">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-[#312E81] flex items-center justify-center gap-2">
              <User className="w-5 h-5 text-[#7C3AED]" />
              Senior Psychologists
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
            {highlighted.map((expert, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#DDD6FE]">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 text-center max-w-48">
                  <h3 className="font-bold text-[#312E81] text-base">{expert.name}</h3>
                  <p className="text-[#6D28D9] text-sm mt-1">{expert.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🥉 SECTION 3: REMAINING CONSULTANTS — MIST PURPLE CARDS */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-lg md:text-xl font-semibold text-[#312E81] text-center mb-8 flex items-center justify-center gap-2">
            <User className="w-5 h-5 text-[#7C3AED]" />
            Consultant Psychologists
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {remainingConsultants.map((consultant, index) => (
              <div 
                key={index} 
                className="bg-[#F5F3FF] rounded-xl p-5 text-center shadow-sm border border-[#DDD6FE]"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#F5F3FF]">
                  <img
                    src={consultant.image}
                    alt={consultant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-[#312E81] mt-4 text-base">{consultant.name}</h3>
                <p className="text-[#6D28D9] text-sm mt-1">{consultant.title}</p>
              </div>
            ))}
          </div>
        </section>
        {/* 🎓 SECTION 4: TRAINEES — WHITE CARDS */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-lg md:text-xl font-semibold text-[#312E81] text-center mb-6 flex items-center justify-center gap-2">
            <User className="w-5 h-5 text-[#7C3AED]" />
            Trainee Psychologists
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trainees.map((trainee, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-4 text-center shadow-sm border border-[#DDD6FE]"
              >
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-[#F5F3FF] bg-[#F5F3FF] flex items-center justify-center">
                  <img
                    src={trainee.image}
                    alt={trainee.name}
                    className="w-full h-full object-cover"
                  />
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