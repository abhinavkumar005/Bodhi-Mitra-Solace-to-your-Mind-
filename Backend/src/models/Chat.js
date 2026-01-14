// models/Chat.js

import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  emergency: {
    type: mongoose.Schema.ObjectId,
    ref: 'Emergency',
    required: true
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

export default mongoose.model('Chat', chatSchema);