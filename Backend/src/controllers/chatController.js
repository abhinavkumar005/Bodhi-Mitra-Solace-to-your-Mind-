// controllers/chatController.js

import Chat from '../models/Chat.js';
import Emergency from '../models/Emergency.js';
import { getIO } from '../config/socket.js';

export const sendMessage = async (req, res, next) => {
  try {
    const { emergencyId, message } = req.body;
    const senderId = req.user.id;
    const role = req.user.role;
    
    const emergency = await Emergency.findOne({
      _id: emergencyId,
      $or: [
        { student: senderId },
        { psychologist: senderId }
      ],
      status: { $in: ['assigned', 'resolved'] }
    });
    
    if (!emergency) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to send messages in this emergency' 
      });
    }
    
    const chat = await Chat.create({
      emergency: emergencyId,
      sender: senderId,
      message
    });
    
    const io = getIO();
    const recipientId = senderId.equals(emergency.student) 
      ? emergency.psychologist 
      : emergency.student;
    
    const recipientRole = senderId.equals(emergency.student) 
      ? 'psychologist' 
      : 'student';
    
    io.to(`${recipientRole}_${recipientId}`).emit('new-message', {
      chatId: chat._id,
      emergencyId,
      senderId,
      message,
      timestamp: chat.timestamp
    });
    
    res.status(201).json({
      success: true,
       chat
    });
  } catch (err) {
    next(err);
  }
};

export const getChatHistory = async (req, res, next) => {
  try {
    const { emergencyId } = req.params;
    const userId = req.user.id;
    
    const emergency = await Emergency.findOne({
      _id: emergencyId,
      $or: [
        { student: userId },
        { psychologist: userId }
      ]
    });
    
    if (!emergency) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to view this chat' 
      });
    }
    
    const messages = await Chat.find({ emergency: emergencyId })
      .populate('sender', 'name role')
      .sort('timestamp');
    
    res.status(200).json({
      success: true,
      results: messages.length,
       messages
    });
  } catch (err) {
    next(err);
  }
};