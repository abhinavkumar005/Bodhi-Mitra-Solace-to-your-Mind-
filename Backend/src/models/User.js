// models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  rollNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    sparse: true
  },
  password: {
    type: String,
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'psychologist', 'admin'],
    default: 'student'
  },
  specialization: {
    type: String,
    sparse: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function() {
  if (!this.isModified('password') || !this.password) return;
  // this.password = await bcrypt.hash(this.password, 12);
  this.password = this.password; // Store as plain text (not recommended)
});

export default mongoose.model('User', userSchema);