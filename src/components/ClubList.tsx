import React from 'react';
import { Trophy, Sparkles, Zap, Star, Crown, Award } from 'lucide-react';

const LogoWithHover = ({ logo, company, description, color }) => {
  return (
    <div className="relative group">

      {/* <div className="w-40 h-40 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg overflow-hidden">
        <img 
            src={logo} 
            alt={company}
            className="w-30 h-30 rounded-full object-cover"
        />
      </div> */}

        <div className={`w-40 h-40 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg overflow-hidden border border-white/20'}`}>
        <img 
            src={logo} 
            alt={company}
            className="w-32 h-32 rounded-full object-cover backdrop-blur-md"
        />

        </div>
        
      
      {/* Hover Menu */}
      <div className="absolute mb-20 bottom-20 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-4 w-60 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-2000 pointer-events-none group-hover:pointer-events-auto border border-white/20">
        <h3 className="font-bold text-white mb-2">{company}</h3>
        <p className="text-white text-sm mb-3 mt-4">{description}</p>
      </div>
    </div>
  );
};

const LogosSection = () => {
  const logos = [
    { logo: '/avr-logo.png', company: 'AVR Club', description: 'Excellence in digital transformation', color: 'bg-red-500' },
    { logo: '/android-club-logo.png', company: 'Android Club', description: 'Sustainable solutions for tomorrow', color: 'bg-green-500' },
    { logo: '/aic-logo.png', company: 'Artificial Intelligence Club', description: 'Leading innovation in technology solutions.', color: 'bg-blue-500' },
    { logo: '/mic-logo.png', company: 'Microsoft Innovations Club', description: 'Smart infrastructure for smart cities', color: 'bg-yellow-500' },
    { logo: '/bic-logo.png', company: 'Business Innovation Community', description: 'Creative solutions, infinite possibilities', color: 'bg-purple-500' },
    { logo: '/cyscom-logo.png', company: 'Cyscom', description: 'Research and development excellence', color: 'bg-indigo-500' },
    { logo: '/codechef-logo.png', company: 'CodeChef VITC', description: 'Building the future, one step at a time', color: 'bg-pink-500' }
  ];

  return (
    <div className="w-full py-12">
      <h2 className="text-3xl font-bold text-white text-center mb-6">Clubs Partners</h2>
      
      <div className="flex justify-center items-center gap-5 px-4  max-w-full mx-auto">
        {logos.map((logoData, index) => (
          <LogoWithHover
            key={index}
            logo={logoData.logo}
            company={logoData.company}
            description={logoData.description}
            color={logoData.color}
          />
        ))}
      </div>
    </div>
  );
};

export default LogosSection;