// models/Emergency.js

import mongoose from 'mongoose';

const emergencySchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  psychologist: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'resolved', 'closed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400
  }
}, {
  timestamps: true
});

export default mongoose.model('Emergency', emergencySchema);