import React, { useEffect, useState } from 'react';
import EventLanding from './components/EventLanding';
import RegistrationForm from './components/RegistrationForm';
import { saveFormData, getRegistrationCount } from './client';

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
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
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
      <div className="absolute inset-0 overflow-hidden z-5">
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
      </div>
      {hasSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white/10 backdrop-blur-md text-white border-1 border-white rounded-xl shadow-lg p-6 max-w-lg w-full text-center">
            <h2 className="text-lg font-semibold text-white">
              You have successfully registered your spot!<br/>
              Join us at <br/><b>Kamaraj Auditorium</b> on<b> August 6, 2025 11:00 AM</b>
            </h2>
            <button
              onClick={() => setHasSubmitted(false)}
              className="mt-4 px-4 py-2 bg-white text-black rounded-lg hover:border-black transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;