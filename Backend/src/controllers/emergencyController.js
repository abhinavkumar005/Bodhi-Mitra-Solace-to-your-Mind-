// controllers/emergencyController.js

import Emergency from '../models/Emergency.js';
import User from '../models/User.js';
import { getIO } from '../config/socket.js';

// Create emergency (student)
export const createEmergency = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    
    // Check for existing pending emergency
    const existing = await Emergency.findOne({ 
      student: studentId, 
      status: 'pending' 
    });
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'You already have a pending emergency request' 
      });
    }
    
    // Create emergency
    const emergency = await Emergency.create({ student: studentId });
    
    // Notify ALL online psychologists
    const io = getIO();
    const psychologists = await User.find({ 
      role: 'psychologist', 
      isActive: true 
    });
    
    psychologists.forEach(psych => {
      io.to(`psychologist_${psych._id}`).emit('new-emergency', {
        emergencyId: emergency._id,
        studentId: emergency.student,
        timestamp: emergency.createdAt
      });
    });
    
    res.status(201).json({
      success: true,
       emergency
    });
  } catch (err) {
    next(err);
  }
};

// Accept emergency (psychologist self-assigns)
export const acceptEmergency = async (req, res, next) => {
  try {
    const { id } = req.params;
    const psychologistId = req.user.id;

    // Verify user is psychologist
    const psychologist = await User.findById(psychologistId);
    if (!psychologist || psychologist.role !== 'psychologist') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only psychologists can accept emergencies' 
      });
    }

    // Find pending emergency
    const emergency = await Emergency.findOne({
      _id: id,
      status: 'pending'
    });

    if (!emergency) {
      return res.status(404).json({ 
        success: false, 
        message: 'Emergency not found or already taken' 
      });
    }

    // Assign to this psychologist
    emergency.psychologist = psychologistId;
    emergency.status = 'assigned';
    await emergency.save();

    // Notify student
    const io = getIO();
    io.to(`student_${emergency.student}`).emit('psychologist-accepted', {
      emergencyId: emergency._id,
      psychologistId,
      psychologistName: psychologist.name
    });

    res.status(200).json({
      success: true,
       emergency
    });
  } catch (err) {
    next(err);
  }
};

// Close emergency (psychologist)
export const closeEmergency = async (req, res, next) => {
  try {
    const { id } = req.params;
    const psychologistId = req.user.id;
    
    const emergency = await Emergency.findOneAndUpdate(
      { _id: id, psychologist: psychologistId },
      { status: 'closed' },
      { new: true }
    );
    
    if (!emergency) {
      return res.status(404).json({ 
        success: false, 
        message: 'Emergency not found or not assigned to you' 
      });
    }
    
    // Notify student
    const io = getIO();
    io.to(`student_${emergency.student}`).emit('emergency-closed', {
      emergencyId: emergency._id
    });
    
    res.status(200).json({
      success: true,
       emergency
    });
  } catch (err) {
    next(err);
  }
};

// Get student's emergency history
export const getMyEmergencies = async (req, res, next) => {
  try {
    const emergencies = await Emergency.find({ student: req.user.id })
      .populate('psychologist', 'name email')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      results: emergencies.length,
       emergencies
    });
  } catch (err) {
    next(err);
  }
};

// Get assigned emergencies (for psychologist)
export const getAssignedEmergencies = async (req, res, next) => {
  try {
    const emergencies = await Emergency.find({ 
      psychologist: req.user.id,
      status: { $in: ['assigned', 'resolved'] }
    })
    .populate('student', 'name rollNumber email')
    .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      results: emergencies.length,
       emergencies
    });
  } catch (err) {
    next(err);
  }
};

// Get all emergencies (for admin)
export const getAllEmergencies = async (req, res, next) => {
  try {
    const emergencies = await Emergency.find()
      .populate('student', 'name rollNumber')
      .populate('psychologist', 'name')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      results: emergencies.length,
       emergencies
    });
  } catch (err) {
    next(err);
  }
};