// routes/chatRoutes.js

import express from 'express';
import {
  sendMessage,
  getChatHistory
} from '../controllers/chatController.js';
import { protect, allowRoles } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(allowRoles('student', 'psychologist'), sendMessage);

router.route('/:emergencyId')
  .get(allowRoles('student', 'psychologist'), getChatHistory);

export default router;