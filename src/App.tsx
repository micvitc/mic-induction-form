import React, { useState } from 'react';
import EventLanding from './components/EventLanding';
import RegistrationForm from './components/RegistrationForm';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'registration'>('landing');
  const [registrationCount, setRegistrationCount] = useState(127); // Starting count

  const handleJoinNow = () => {
    setCurrentPage('registration');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handleRegistrationSubmit = (formData) => {
    setRegistrationCount(prev => prev + 1);
    // Here you would typically send data to a server
    console.log('Registration Data:', formData.name, formData.year, formData.registerNumber, formData.email, formData.willRegister);
    alert('Registration successful! Welcome to ClubCon!');
    setCurrentPage('landing');
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(public/background.png)',
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
    </div>
  );
}

export default App;