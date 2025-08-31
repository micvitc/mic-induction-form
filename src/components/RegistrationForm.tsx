import React, { useState, useRef } from 'react';
import { ArrowLeft, User, Calendar, Hash, Mail, Users, Rocket } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";



interface RegistrationFormProps {
  onBack: () => void;
  onSubmit: () => void;
  registrationCount: number;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onBack, onSubmit, registrationCount }) => {
  const [formData, setFormData] = useState({
    name: '',
    year: 0,
    reg_number: '',
    email: '',
    is_attending: true
  });

  const captchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);


  const [errors, setErrors] = useState<Record<string, string>>({});
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (e.target.type === 'radio') {
      setFormData(prev => ({ ...prev, is_attending: value === 'true' }));
      return;
    }
    if (e.target.name === 'year') {
      setFormData(prev => ({ ...prev, year: parseInt(value[0]) }));
      return;
    }
    if (e.target.name === 'reg_number') {
      setFormData(prev => ({ ...prev, reg_number: value.toUpperCase() }));
      return;
    }
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
    
    // Register number validation: ##XXX[1|5]### format
    if (!formData.reg_number.trim()) {
      newErrors.registerNumber = 'Register number is required';
    } else if (!/^\d{2}[A-Za-z]{3}[15]\d{3}$/.test(formData.reg_number.trim())) {
      newErrors.registerNumber = 'Register number must be in format ##XXX[1|5]### (e.g., 21ABC1234 or 21ABC5678)';
    }
    
    // Email validation: must end with @vitstudent.ac.in
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.trim().endsWith('@vitstudent.ac.in')) {
      newErrors.email = 'Email must end with @vitstudent.ac.in';
    } else if (!/^[^\s@]+@vitstudent\.ac\.in$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.is_attending) newErrors.is_attending = 'Please select an option';

    if (captchaRef === null){
      newErrors.captcha = 'Please complete the CAPTCHA';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      const capVal = captchaRef!.current.getValue();
      onSubmit({ token: capVal, ...formData });
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-48 h-full mb-6">
            <img src='/logo.png' className='w-48 w-full' />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 mb-4">
            Book your spot now!!
          </h1>
          <p className="text-gray-400 text-lg">Seats are filling up fast</p>
        </div>

        {/* Registration Counter to be added later */}
        {/* <div className="absolute top-4 right-4 z-20 mt-1">
          <div className="inline-flex items-center backdrop-blur-md rounded-full px-6 py-3 border border-white/30">
            <Users className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-semibold">{registrationCount} already registered!</span>
          </div>
        </div> */}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-2xl">
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
                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
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
                <option value={1} className="bg-black">1st Year</option>
                <option value={2} className="bg-black">2nd Year</option>
                <option value={3} className="bg-black">3rd Year</option>
                <option value={4} className="bg-black">4th Year</option>
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
                name="reg_number"
                value={formData.reg_number}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
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
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
              <p className='text-white mt-2'>Use your @vitstudent.ac.in email</p>
            </div>

            {/* Registration Confirmation */}
            <div>
              <label className="flex items-center text-white font-semibold mb-3">
                <Users className="w-5 h-5 mr-2 text-white" />
                Will you be attending the event?
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="is_attending"
                    value="true"
                    checked={formData.is_attending === true}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-white bg-transparent border-2 border-white/30 focus:ring-white focus:ring-2"
                  />
                  <span className="ml-3 text-white">Yes, I will attend</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="is_attending"
                    value="false"
                    checked={formData.is_attending === false}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-gray-400 bg-transparent border-2 border-white/30 focus:ring-gray-400 focus:ring-2"
                  />
                  <span className="ml-3 text-white">No, I am occupied</span>
                </label>
              </div>
              {errors.is_attending && <p className="text-red-400 text-sm mt-2">{errors.is_attending}</p>}
            </div>
          </div>

          <ReCAPTCHA className="mt-6"
                  sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY} 
                  ref={captchaRef}
                  onChange={(token)=>setCaptchaToken(token)}
          />
          

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
            {/* {{ console.log(captchaToken); }} */}
            <button
              type="submit"
              disabled={!captchaToken} 
              className={`flex-1 group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-black bg-gradient-to-r from-white via-gray-200 to-gray-300 rounded-xl shadow-2xl shadow-white/50 hover:shadow-white/70 transition-all duration-300 transform hover:scale-105"
              ${!captchaToken 
                ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
                : "text-black bg-gradient-to-r from-white via-gray-200 to-gray-300 hover:shadow-white/70 hover:scale-105"
              }`}
            >
              <span className="relative z-10">Book your spot . . .</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-200 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Rocket className="ml-3 w-5 h-5 group-hover:animate-pulse" />
            </button>
          </div>
        </form>
        <div className="text-sm text-gray-500 mt-4 mb-5 leading-relaxed">
          <p className="mb-2">
            This is just an RSVP and doesn't confirm your seat. Please be there early as seats are first come, first serve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;