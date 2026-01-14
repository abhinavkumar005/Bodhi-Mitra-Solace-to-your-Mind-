// src/controllers/authController.js

import User from '../models/User.js';
import OTP from '../models/OTP.js';
import { generateOTP, hashOTP } from '../utils/otp.js';
import { sendOTPEmail } from '../utils/email.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

export const registerStudent = async (req, res, next) => {
  try {
    const { name, rollNumber, phone, email } = req.body;
    
    const existingStudent = await User.findOne({ 
      $or: [{ email }, { rollNumber }] 
    });
    if (existingStudent) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student with this email or roll number already exists' 
      });
    }

    const student = await User.create({
      name,
      rollNumber,
      phone,
      email,
      role: 'student'
    });

    const otp = generateOTP();
    await sendOTPEmail(email, otp);
    const hashedOtp = await hashOTP(otp);
    
    await OTP.create({
      email,
      hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful. Check email for OTP',
      data: { studentId: student._id }
    });
  } catch (err) {
    next(err);
  }
};

export const requestOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email, role: 'student' });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }
    if (!user.isActive) {
      return res.status(403).json({ 
        success: false, 
        message: 'Account deactivated' 
      });
    }

    const otp = generateOTP();
    await sendOTPEmail(email, otp);
    const hashedOtp = await hashOTP(otp);
    
    await OTP.create({
      email,
      hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    res.status(200).json({
      success: true,
      message: 'OTP sent to your email'
    });
  } catch (err) {
    next(err);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    
    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!otpRecord) {
      return res.status(400).json({ 
        success: false, 
        message: 'No OTP request found. Please request a new OTP' 
      });
    }
    
    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ 
        success: false, 
        message: 'OTP expired. Please request a new one' 
      });
    }
    
    const isValid = await bcrypt.compare(otp, otpRecord.hashedOtp);
    if (!isValid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid OTP' 
      });
    }
    
    const user = await User.findOne({ email, role: 'student' });
    if (!user || !user.isActive) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied' 
      });
    }
    
    await OTP.deleteOne({ _id: otpRecord._id });
    
    const token = signToken(user._id);
    
    // ✅ FIXED: Added "data" key
    res.status(200).json({
      success: true,
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }
    
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(user.role === 'psychologist' || user.role === 'admin')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    if (!user.isActive) {
      return res.status(403).json({ 
        success: false, 
        message: 'Account deactivated' 
      });
    }
    
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password; // For plain text password (not recommended)

    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'password incorrect' 
      });
    }
    
    const token = signToken(user._id);
    
    // ✅ FIXED: Added "data" key
    res.status(200).json({
      success: true,
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (err) {
    next(err);
  }
};