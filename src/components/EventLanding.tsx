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
          <div className="flex flex-col items-center justify-center mt-10">
            <img src='/mic-logo.png' alt="MIC Logo" className="w-32 h-32 bg-white/80 rounded-full" />
            <p className="text-white mt-3">MICROSOFT INNOVATIONS CLUB <br/> presents</p>
            <img src="/logo.png" alt="Event Logo" className="w-128 h-auto" />
          </div>
        </div>
        {/* <button
          onClick={onJoinNow}
          className="group lg:hidden block inline-flex items-center justify-center px-12 py-4 text-xl font-bold text-black bg-gradient-to-r from-white via-gray-200 to-gray-300 rounded-full shadow-2xl shadow-white/50 hover:shadow-white/70 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
        >
          <span className="relative z-10">JOIN NOW</span>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
          <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        </div>
        </button> */}
        <div className=" block space-y-6 p-4">
          <button
            onClick={onJoinNow}
            className="group relative inline-flex items-center justify-center px-12 py-4 text-xl font-bold text-black bg-gradient-to-r from-white via-gray-200 to-gray-300 rounded-full shadow-2xl shadow-white/50 hover:shadow-white/70 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
          >
            <span className="relative z-10">JOIN NOW</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
          </button>

          <div 
            className="flex items-center justify-center cursor-pointer hover:border-white/50 transition-all duration-300 transform hover:scale-110 p-2 rounded-lg"
            onClick={() => window.open('https://chat.whatsapp.com/IvnYqfcgkHV1mZjjXovFaD?mode=ac_t', '_blank')}
          >
            <img 
              src="whatsapp.png" 
              alt="WhatsApp" 
              className="w-8 h-8 mr-3" 
            />
            <span className="font-semibold text-lg text-white">Join us on WhatsApp</span>
          </div>
        </div>

        
        <div 
          className="group absolute hidden top-20 right-4 inline-flex mb-10 items-center justify-center px-12 py-4 text-xl font-bold text-white rounded-full  transition-all duration-300 transform"
          >
          <button
          onClick={onJoinNow}
          className="group absolute hidden lg:block inline-flex items-center justify-center px-12 py-4 text-xl font-bold text-black bg-gradient-to-r from-white via-gray-200 to-gray-300 rounded-full shadow-2xl shadow-white/50 hover:shadow-white/70 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
        >
            <span className="relative z-10">JOIN NOW</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
          </button>
          <br></br>
          <div className="flex items-center cursor-pointer hover:border-white/50 transition-all duration-300 transform hover:scale-110"
            onClick={() => window.open('https://chat.whatsapp.com/IvnYqfcgkHV1mZjjXovFaD?mode=ac_t', '_blank')}>
            <img 
              src="whatsapp.png" 
              alt="WhatsApp" 
              className="w-8 h-8 mr-3 mt-14 cursor-pointer "
            />
            <span className="font-semibold text-lg mt-14">Join us on WhatsApp</span>
          </div>
        </div>

        
        {/* <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          <LogosSection />
        </p> */}

        {/* Event Details */}
        {/* <div className="flex flex-col items-center grid grid-cols-1 lg:grid-cols-3 mb-12 mt-12 text-center ">
          <div className="flex items-center justify-center mb-3">
            <Calendar className="w-6 h-6 text-white mr-4" />
            <p className="text-white text-lg">August 6, 2025</p>
          </div>
          
          <div className="flex items-center justify-center mb-3 ">
            <Clock className="w-6 h-6 text-white mr-4" />
            <p className="text-white text-lg">11:30 AM - 01:30 PM</p>
          </div>
          
          <div className="flex items-center justify-center mb-3">
            <MapPin className="w-6 h-6 text-white mr-4" />
            <p className="text-white text-lg">Kamaraj Auditorium</p>
          </div>
        </div> */}
        {/* <!-- Mobile: 2-column grid (icons | text), Desktop: 3-column grid --> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12 mt-12">
          {/* <!-- Mobile: Icons column --> */}
          <div className="flex flex-col gap-2 justify-center items-center lg:hidden">
            <table className="w-auto items-center justify-center text-center">
              <tbody>
                <tr><td><Calendar className="w-6 h-6 text-white mr-4 mb-4" /></td><td><p className="text-white text-2xl text-left mb-4">Monday, September 8, 2025</p></td></tr>
                <tr><td><Clock className="w-6 h-6 text-white mr-4 mb-4" /></td><td><p className="text-white text-2xl text-left mb-4">09:00 AM - 12:00 PM</p></td></tr>
                <tr><td><MapPin className="w-6 h-6 text-white mr-4 mb-4" /></td><td><p className="text-white text-2xl text-left  mb-4">Netaji Auditorium</p></td></tr>
              </tbody>
            </table>
          </div>

          {/* <!-- Desktop: Individual items --> */}
          <div className="hidden lg:flex justify-center items-center">
            <Calendar className="w-6 h-6 text-white mr-4" />
            <p className="text-white text-lg">Monday, September 8, 2025</p>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <Clock className="w-6 h-6 text-white mr-4" />
            <p className="text-white text-lg">09:00 AM - 12:00 PM</p>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <MapPin className="w-6 h-6 text-white mr-4" />
            <p className="text-white text-lg">Netaji Auditorium</p>
          </div>
        </div>




        {/* Registration Counter commented to be added later*/}
        {/* <div className="absolute top-3 right-4 z-20 mt-1">
          <div className="inline-flex items-center backdrop-blur-md rounded-full px-6 py-3 border border-white/30">
            <Users className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-semibold">{registrationCount} already registered!</span>
          </div>
        </div> */}

        
        
        <div className="max-w-sm mx-auto text-center py-16 px-6 backdrop-blur-md rounded-lg  mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
            {/* Join VIT's Most Elite Student Clubs <br/> Home to the top 1% of VITians who lead innovation, not just participate in it. */}
            What's in store?
          </h1>
          
          <p className="text-lg text-white mb-6 text-left flex items-start">
            <span className="text-yellow-400 mr-3 mt-1"><Zap/></span>
            <span><span className="font-bold">Leads on Stage</span> <br/> Visions & what’s next
            </span>
          </p>
          
          <p className="text-lg text-white mb-6 text-left flex items-start">
            <span className="text-blue-400 mr-3 mt-1"><HandshakeIcon/></span>
            <span><span className="font-bold">Recruitment Insights</span> <br/> Your pathway to MIC</span>
          </p>
          
          <p className="text-lg text-white mb-6 text-left flex items-start">
            <span className="text-green-400 mr-3 mt-1"><GroupIcon/></span>
            <span><span className="font-bold">Fun and Interactions</span> <br/> Connect. Express. Play.</span>
          </p>
          
          <p className="text-lg text-white mb-6 text-left flex items-start">
            <span className="text-purple-400 mr-3 mt-1"><Crown/></span>
            <span><span className="font-bold">Big Reveals</span> <br/>Months in the making.</span>
          </p>
          
          <p className="text-lg text-white mb-6 text-left flex items-start">
            <span className="text-red-400 mr-3 mt-1"><Sparkles/></span>
            <span><span className="font-bold">5 Years of MIC</span> <br/> Innovations and Community</span>
          </p>
          
          {/* <p className="text-lg text-white text-left flex items-start">
            <span className="text-cyan-400 mr-3 mt-1"><Club/></span>
            <span><span className="font-bold">Be Where the Future Is Built</span> <br/> While others settle for average, you'll be part of the movement that defines what excellence at VIT truly looks like.</span>
          </p> */}
        </div>

        {/* Join Button */}
        <button
          onClick={onJoinNow}
          className="group relative inline-flex items-center justify-center px-12 py-4 text-xl font-bold text-black bg-gradient-to-r from-white via-gray-200 to-gray-300 rounded-full shadow-2xl shadow-white/50 hover:shadow-white/70 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
        >
          <span className="relative z-10">JOIN NOW</span>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        </button>


        <div className="text-sm text-gray-500 mt-4 mb-5 leading-relaxed">
          <p className="mb-2">
            This is just an RSVP and doesn't confirm your seat. Please be there early as seats are first come, first serve.
          </p>
          <p className="italic">
            Happy networking!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventLanding;