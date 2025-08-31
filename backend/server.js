import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// CORS configuration
const corsOptions = {
  origin: [
    'https://remics.microsoftinnovations.club',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Validation middleware
const validateRegistration = (req, res, next) => {
  const { name, year, reg_number, email, is_attending } = req.body;
  
  // Check required fields
  if (!name || !year || !reg_number || !email || typeof is_attending !== 'boolean') {
    return res.status(400).json({
      success: false,
      message: 'All fields are required (name, year, reg_number, email, is_attending)'
    });
  }
  
  // Validate name
  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Name must be at least 2 characters long'
    });
  }
  
  // Validate year
  if (!Number.isInteger(year) || year < 1 || year > 4) {
    return res.status(400).json({
      success: false,
      message: 'Year must be between 1 and 4'
    });
  }
  
  // Validate register number format: ##XXX[1|5]###
  const regNumberRegex = /^\d{2}[A-Z]{3}[15]\d{3}$/;
  if (!regNumberRegex.test(reg_number)) {
    return res.status(400).json({
      success: false,
      message: 'Register number must be in format ##XXX[1|5]### (e.g., 23BCE1123)'
    });
  }
  
  // Validate email format and domain
  const emailRegex = /^[^\s@]+@vitstudent\.ac\.in$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Email must end with @vitstudent.ac.in'
    });
  }
  
  next();
};

// POST /register endpoint
app.post('/register', validateRegistration, async (req, res) => {
  const { name, year, reg_number, email, is_attending, token } = req.body;
  
  try {
    const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
      );

    if (!response.data.success) {
      return res.status(400).json({
        success: false,
        message: 'Captcha verification failed'
      });
    }

    // Check for existing registration by email or register number
    const { data: existing, error: checkError } = await supabase
      .from('registrations')
      .select('email, regnum')
      .or(`email.eq.${email},regnum.eq.${reg_number}`)
      .limit(1);
    
    if (checkError) {
      console.error('Supabase check error:', checkError);
      return res.status(500).json({
        success: false,
        message: 'Database error occurred'
      });
    }
    
    if (existing && existing.length > 0) {
      const duplicate = existing[0];
      if (duplicate.email === email) {
        return res.status(409).json({
          success: false,
          message: 'Email already registered'
        });
      } else if (duplicate.regnum === reg_number) {
        return res.status(409).json({
          success: false,
          message: 'Register number already exists'
        });
      }
    }
    
    // Insert new registration
    const { data, error: insertError } = await supabase
      .from('registrations')
      .insert([{
        name: name.trim(),
        year,
        regnum: reg_number.toUpperCase(),
        email: email.toLowerCase(),
        is_attending
      }])
      .select();
    
    if (insertError) {
      console.error('Supabase insert error:', insertError);
      
      // Handle unique constraint violations
      if (insertError.code === '23505') {
        return res.status(409).json({
          success: false,
          message: 'Registration already exists'
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Failed to save registration'
      });
    }
    
    console.log(`New registration: ${name} (${email})`);
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: data[0]
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Register endpoint: http://localhost:${PORT}/register`);
});

export default app;