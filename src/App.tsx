import React, { useEffect, useState } from 'react';
import EventLanding from './components/EventLanding';
import RegistrationForm from './components/RegistrationForm';
import { saveFormData, getRegistrationCount } from './client';
import { Analytics } from "@vercel/analytics/react"
import { SidebarCloseIcon, X } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'registration'>('landing');
  const [registrationCount, setRegistrationCount] = useState(0); // Starting count
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleJoinNow = () => {
    setCurrentPage('registration');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  useEffect(() => {
    // Fetch initial registration count from Supabase
    const fetchRegistrationCount = async () => {
      try {
        const count = await getRegistrationCount(); // Call to get the count
        console.log('Initial Registration Count:', count);
        setRegistrationCount(count);
      } catch (error) {
        console.error('Error fetching registration count:', error);
      }
    };

    fetchRegistrationCount();
  }, []);

  const handleRegistrationSubmit = async (formData) => {
    // Here you would typically send data to a server
    console.log('Registration Data:', formData.name, formData.year, formData.reg_number, formData.email, formData.is_attending);
    const regCount = await saveFormData(formData).catch(error => {
      console.error('Error saving registration:', error);
    });
    console.log('Registration Count:', regCount);
    setHasSubmitted(true);
    setRegistrationCount(regCount); 
    setCurrentPage('landing');
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden w-full max-w-full mx-auto"
      style={{
        backgroundImage: 'url(/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <Analytics />
      
      {/* Content */}
      <div className="relative z-10">
        {currentPage === 'landing' ? (
          <EventLanding onJoinNow={handleJoinNow} registrationCount={registrationCount} />
        ) : (
          <RegistrationForm 
            onBack={handleBackToLanding} 
            onSubmit={handleRegistrationSubmit}
            registrationCount={registrationCount}
          />
        )}
      </div>

      {/* Animated stars */}
      {/* <div className="absolute inset-0 overflow-hidden z-5">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div> */}
      {hasSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-xl shadow-lg p-6 max-w-lg w-full text-center relative">
            {/* Close button */}
            {/* <button
              onClick={() => setHasSubmitted(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-300 transition-colors duration-200 text-2xl font-bold w-8 h-8 flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button> */}
            
            <h2 className="text-lg font-semibold text-white mb-6">
              You have successfully RSVP'd to ClubCon 25!<br/>
              Join us at <br/><b>Kamaraj Auditorium</b> on<b> August 6, 2025 11:00 AM</b>
            </h2>
            
            <div className="flex flex-col space-y-3">
              {/* WhatsApp button */}
              <button
                onClick={() => window.open('https://chat.whatsapp.com/IZmx9W9KGbo3a0kftGOfXe?mode=ac_t', '_blank')}
                className="flex items-center justify-center px-4 py-3 bg-green-300 hover:bg-green-600 text-black rounded-lg transition-colors duration-200 font-semibold"
              >
                <img 
                  src="whatsapp.png" 
                  alt="WhatsApp" 
                  className="w-5 h-5 mr-2" 
                />
                Join us on WhatsApp
              </button>
              
              {/* OK button */}
              <button
                onClick={() => setHasSubmitted(false)}
                className="px-4 py-2 text-white rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;