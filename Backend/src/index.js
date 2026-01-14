// src/index.js

import 'dotenv/config';

import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import connectDB from './config/database.js';
import { initializeSocket, getIO } from './config/socket.js';

import authRoutes from './routes/authRoutes.js';
import emergencyRoutes from './routes/emergencyRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Validate env vars
const requiredEnvVars = [
  'MONGO_URI',
  'JWT_SECRET',
  'SENDGRID_API_KEY',
  'EMAIL_FROM',
  'CLIENT_URL'
];

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

const app = express();
const server = http.createServer(app);

connectDB();

initializeSocket(server);

// ✅ CRITICAL: Parse JSON body FIRST
app.use(express.json({ limit: '10mb' }));

// Then other middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(cors({
  origin: process.env.CLIENT_URL, // e.g., http://localhost:3000
  credentials: true,
}));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/emergencies', emergencyRoutes);
app.use('/api/v1/chats', chatRoutes);
app.use('/api/v1/admin', adminRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`🌍 Client URL: ${process.env.CLIENT_URL}`);
  console.log(`📡 Socket.IO ready`);
});