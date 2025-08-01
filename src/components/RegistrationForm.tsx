import React, { useState } from 'react';
import { ArrowLeft, User, Calendar, Hash, Mail, Users, Rocket } from 'lucide-react';

interface RegistrationFormProps {
  onBack: () => void;
  onSubmit: () => void;
  registrationCount: number;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onBack, onSubmit, registrationCount }) => {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    registerNumber: '',
    email: '',
    willRegister: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.registerNumber.trim()) newErrors.registerNumber = 'Register number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.willRegister) newErrors.willRegister = 'Please select an option';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-48 h-full mb-6">
            <img src='public/logo.png' className='w-48 w-full' />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 mb-4">
            Book your spot now!!
          </h1>
          <p className="text-gray-400 text-lg">Seats are filling up fast</p>
        </div>

        {/* Registration Counter */}
        <div className="absolute top-4 right-4 z-20 mt-1">
          <div className="inline-flex items-center backdrop-blur-md rounded-full px-6 py-3 border border-white/30">
            <Users className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-semibold">{registrationCount} already registered!</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-black backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-2xl">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="flex items-center text-white font-semibold mb-3">
                <User className="w-5 h-5 mr-2 text-white" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
            </div>

            {/* Year */}
            <div>
              <label className="flex items-center text-white font-semibold mb-3">
                <Calendar className="w-5 h-5 mr-2 text-gray-300" />
                Academic Year
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-3 py-3 bg-white/10 border border-white/30 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
              >
                <option value="" className="bg-black text-gray-800">Select your year</option>
                <option value="1st Year" className="bg-black">1st Year</option>
                <option value="2nd Year" className="bg-black">2nd Year</option>
                <option value="3rd Year" className="bg-black">3rd Year</option>
                <option value="4th Year" className="bg-black">4th Year</option>
              </select>
              {errors.year && <p className="text-red-400 text-sm mt-2">{errors.year}</p>}
            </div>

            {/* Register Number */}
            <div>
              <label className="flex items-center text-white font-semibold mb-3">
                <Hash className="w-5 h-5 mr-2 text-gray-200" />
                Register Number
              </label>
              <input
                type="text"
                name="registerNumber"
                value={formData.registerNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                placeholder="Enter your register number"
              />
              {errors.registerNumber && <p className="text-red-400 text-sm mt-2">{errors.registerNumber}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center text-white font-semibold mb-3">
                <Mail className="w-5 h-5 mr-2 text-gray-100" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
            </div>

            {/* Registration Confirmation */}
            <div>
              <label className="flex items-center text-white font-semibold mb-3">
                <Users className="w-5 h-5 mr-2 text-white" />
                Will you be registering for the event?
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="willRegister"
                    value="yes"
                    checked={formData.willRegister === 'yes'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-white bg-transparent border-2 border-white/30 focus:ring-white focus:ring-2"
                  />
                  <span className="ml-3 text-white">Yes, I will register</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="willRegister"
                    value="no"
                    checked={formData.willRegister === 'no'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-gray-400 bg-transparent border-2 border-white/30 focus:ring-gray-400 focus:ring-2"
                  />
                  <span className="ml-3 text-white">No, I am occupied</span>
                </label>
              </div>
              {errors.willRegister && <p className="text-red-400 text-sm mt-2">{errors.willRegister}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center px-6 py-3  rounded-xl text-white hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
            
            <button
              type="submit"
              className="flex-1 group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-black bg-gradient-to-r from-white via-gray-200 to-gray-300 rounded-xl shadow-2xl shadow-white/50 hover:shadow-white/70 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">Book your spot . . .</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-200 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Rocket className="ml-3 w-5 h-5 group-hover:animate-pulse" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;