import React from 'react';
import { Rocket, Calendar, Clock, MapPin, Users, Club, Zap, HandshakeIcon, GroupIcon, Crown, Sparkles } from 'lucide-react';
import LogosSection from './ClubList';

interface EventLandingProps {
  onJoinNow: () => void;
  registrationCount: number;
}

const EventLanding: React.FC<EventLandingProps> = ({ onJoinNow,  registrationCount }) => {
  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-4">
          <div className="inline-flex items-center justify-center mt-10">
            <img src="/logo.png" alt="Event Logo" className="w-128 h-auto max-w-full" />
          </div>
        </div>

        
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          <LogosSection />
        </p>

        {/* Event Details */}
        <div className="flex flex-col items-center grid grid-cols-3">
          <div className="flex items-center mb-3">
            <Calendar className="w-6 h-6 text-white mr-4" />
            <p className="text-white text-lg">August 6, 2025<br/>Wednesday</p>
          </div>
          
          <div className="flex items-center mb-3">
            <Clock className="w-6 h-6 text-white mr-4" />
            <p className="text-white text-lg">11:00 AM - 01:30 PM</p>
          </div>
          
          <div className="flex items-center mb-3">
            <MapPin className="w-10 h-10 text-white mr-4" />
            <p className="text-white text-lg">Kamaraj Auditorium, Dr. A.P.J. Abdul Kalam Block, AB3</p>
          </div>
        </div>

        {/* Registration Counter */}
        <div className="absolute top-3 right-4 z-20 mt-1">
          <div className="inline-flex items-center backdrop-blur-md rounded-full px-6 py-3 border border-white/30">
            <Users className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-semibold">{registrationCount} already registered!</span>
          </div>
        </div>

        <button
          onClick={onJoinNow}
          className="group absolute top-20 right-4 inline-flex items-center justify-center px-12 py-4 text-xl font-bold text-black bg-gradient-to-r from-white via-gray-200 to-gray-300 rounded-full shadow-2xl shadow-white/50 hover:shadow-white/70 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
        >
          <span className="relative z-10">JOIN NOW</span>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        </button>
        
        <div className="max-w-5xl mx-auto text-center py-16 px-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
            Join VIT's Most Elite Student Clubs <br/> Home to the top 1% of VITians who lead innovation, not just participate in it.
          </h1>
          
          <p className="text-lg text-white mb-6 text-left flex items-start">
            <span className="text-yellow-400 mr-3 mt-1"><Zap/></span>
            <span><span className="font-bold">Work on High-Impact, Real-World Projects</span> <br/> Go beyond classroom theory with initiatives that drive visible change and build your legacy.</span>
          </p>
          
          <p className="text-lg text-white mb-6 text-left flex items-start">
            <span className="text-blue-400 mr-3 mt-1"><HandshakeIcon/></span>
            <span><span className="font-bold">Strengthen Your LinkedIn with Credible Experience</span> <br/> Gain recognition through roles and achievements that recruiters and companies value.</span>
          </p>
          
          <p className="text-lg text-white mb-6 text-left flex items-start">
            <span className="text-green-400 mr-3 mt-1"><GroupIcon/></span>
            <span><span className="font-bold">Network with VIT's Most Influential Students</span> <br/> Collaborate with changemakers who are shaping VIT's future across tech, business, design, and beyond.</span>
          </p>
          
          <p className="text-lg text-white mb-6 text-left flex items-start">
            <span className="text-purple-400 mr-3 mt-1"><Crown/></span>
            <span><span className="font-bold">Develop Practical Leadership & Execution Skills</span> <br/> Take up core roles, lead teams, manage events, and own responsibilities from day one.</span>
          </p>
          
          <p className="text-lg text-white mb-6 text-left flex items-start">
            <span className="text-red-400 mr-3 mt-1"><Sparkles/></span>
            <span><span className="font-bold">Get Exclusive Exposure to National-Level Events & Collaborations</span> <br/> Be the face of VIT at major hackathons, conferences, and inter-collegiate showcases.</span>
          </p>
          
          <p className="text-lg text-white text-left flex items-start">
            <span className="text-cyan-400 mr-3 mt-1"><Club/></span>
            <span><span className="font-bold">Be Where the Future Is Built</span> <br/> While others settle for average, you'll be part of the movement that defines what excellence at VIT truly looks like.</span>
          </p>
        </div>

        {/* Join Button */}
        <button
          onClick={onJoinNow}
          className="group relative inline-flex items-center justify-center px-12 py-4 text-xl font-bold text-black bg-gradient-to-r from-white via-gray-200 to-gray-300 rounded-full shadow-2xl shadow-white/50 hover:shadow-white/70 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
        >
          <span className="relative z-10">JOIN NOW</span>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        </button>


        <p className="text-gray-400 mb-8 mt-2 text-sm">
          Limited seats available
        </p>
      </div>
    </div>
  );
};

export default EventLanding;