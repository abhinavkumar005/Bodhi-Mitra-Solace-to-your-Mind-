// src/controllers/adminController.js

import User from '../models/User.js';
import Emergency from '../models/Emergency.js';

// Create psychologist
export const createPsychologist = async (req, res, next) => {
  try {
    const { name, email, specialization, password } = req.body;
    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Psychologist with this email already exists' 
      });
    }
    
    const psychologist = await User.create({
      name,
      email,
      specialization,
      password,
      role: 'psychologist'
    });

    res.status(201).json({
      success: true,
       data:{
        id: psychologist._id,
        name: psychologist.name,
        email: psychologist.email,
        specialization: psychologist.specialization
      }
    });
  } catch (err) {
    next(err);
  }
};

// Deactivate user
export const deactivateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
       data:{ id: user._id, isActive: user.isActive }
    });
  } catch (err) {
    next(err);
  }
};

// Get analytics
export const getAnalytics = async (req, res, next) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student', isActive: true });
    const totalPsychologists = await User.countDocuments({ role: 'psychologist', isActive: true });
    const pendingEmergencies = await Emergency.countDocuments({ status: 'pending' });
    const resolvedEmergencies = await Emergency.countDocuments({ status: 'resolved' });
    
    res.status(200).json({
      success: true,
       data: {
        totalStudents,
        totalPsychologists,
        pendingEmergencies,
        resolvedEmergencies,
        activeEmergencies: pendingEmergencies + resolvedEmergencies
      }
    });
  } catch (err) {
    next(err);
  }
};